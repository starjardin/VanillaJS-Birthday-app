// import { format, compareAsc } from 'date-fns';
//I need to fetch but how : create a function to fetch the data from person.json
//put the data in the local storage
/* *********************************** */

//delete a person
const container = document.querySelector(".container");
const addBtn = document.querySelector(".add");
const formEl = document.querySelector(".formSubmit");

let persons = [];
const fetchpeople = async () => {
    const peopleUrl = await fetch(`people.json`)
    const data = await peopleUrl.json();
    return data;
};

async function restoreFromLocalStorage () {
  const listOfOeople = JSON.parse(localStorage.getItem('persons'));
  if (listOfOeople) {
    persons = listOfOeople;
  } 
  displayPeopleList(persons);
  container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
};
restoreFromLocalStorage();

async function initlocalStorage() {
  // persons = await fetchpeople();
  localStorage.setItem("persons", JSON.stringify(persons));
}
initlocalStorage();

function displayPeopleList () {
  let currentYear = new Date().getFullYear();
  console.log(currentYear);
  const dateNow = Date.now();
  const array = persons.map(per => {
    const birthMonth = new Date(per.birthday).getMonth();
    const birthDateDay = new Date(per.birthday).getDay();
    const date = `${(birthMonth + 1)}/${birthDateDay + 1}/${currentYear}`;
    const dateTime = new Date(`${date}`)
    const dateMilis = dateTime.getTime();
    const dateDiff = dateMilis - dateNow;
    const numbersOfDays = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    const daysToGo = numbersOfDays;
    const birthday = per.birthday;
    const d = new Date(birthday);
    const dat = d.toLocaleDateString();
    const arr = dat.split("/");
    const monthIndex =  parseInt(arr[0],10) - 1;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const birthMonths = monthNames[monthIndex];
    const diff = (Math.floor((dateNow - birthday) / (1000 * 60 * 60 * 24 * 365)));
    const person = {
      firstName : per.firstName,
      lastName : per.lastName,
      id : per.id,
      birthday : per.birthday,
      days : daysToGo,
      picture : per.picture,
      year : diff,
      month : birthMonths,
      daysOfbirth : arr[1],
    }
    return person
  })
  const peopleSorted = array.sort(function(a, b) {
    return a.days - b.days;
  });
  const html = peopleSorted.map(person => {
    return `
    <div class="row mt-3" data-id="${person.id}">
      <div class="col">
        <img src="${person.picture}" class="rounded-circle">
      </div>
      <div class="col">
        <span>${person.firstName} ${person.lastName} is turning <b>${person.year}</b> on <b>${person.month}</b> the <b>${person.daysOfbirth}th</b></span>
      </div>
      <div class="col">${person.days} days</div>
      <div class="col">
        <button type="button" value="${person.id}" data-id="${person.id}" class="edit">edit</button>
      </div>
      <div class="col">
        <button type="button" value="${person.id}" class="delete" data-id="${person.id}">delete</button>
      </div>
    </div>`
  });
  container.innerHTML = html.join("");
}

function editPerson (e) {
  const editButton = e.target.matches(".edit");
  if (editButton) {
    const button = e.target.closest(".edit");
    const id = button.dataset.id;
    editPersonPopup(id);
  }
}

async function editPersonPopup(id) {
  const personToEdit = persons.find(person => person.id === id);
  return new Promise(async function(resolve) {
    const formEl = document.createElement('form');
    formEl.classList.add("form");
    formEl.insertAdjacentHTML("afterbegin", `
      <div class="form-group">
        <label for="lastName">${personToEdit.lastName}</label>
        <input type="text" class="form-control" id="${personToEdit.id}" name="lastName" value="${personToEdit.lastName}"> 
      </div>
      <div class="form-group">
        <label for="firstName">${personToEdit.firstName}</label>
        <input type="text" class="form-control" name="firstName" id="${personToEdit.id}" value="${personToEdit.firstName}">
      </div>
      <div class="form-group">
        <label for="birthday">Birthday</label>
        <input type="text" id="birthday" class="form-control" name="birthday" id="${personToEdit.birthday}" value="${personToEdit.birthday}">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    `);
    document.body.appendChild(formEl);
    formEl.classList.add("open");
    formEl.addEventListener("submit", e => {
      e.preventDefault();
      const form = e.currentTarget;
      const newPerson = {
        id: id,
        lastName: form.lastName.value,
        firstName : form.firstName.value,
        birthday : form.birthday.value,
        picture : personToEdit.picture,
      }

      const editedPerson = persons.find(person => person.id === newPerson.id);
      editedPerson.firstName = newPerson.firstName;
      editedPerson.lastName = newPerson.lastName;
      editedPerson.birthday = newPerson.birthday;
      container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
      formEl.classList.remove("open");
    }, {once: true});
  })
}

function deletePerson (e) {
  const deleteBtn = e.target.matches(".delete");
  if (deleteBtn) {
    const idOfPeopleToDelete = e.target.closest('.delete').dataset.id;
    deletePersonPupup(idOfPeopleToDelete);
  }
};

async function deletePersonPupup (idOfPeopleToDelete) {
  const peopleToDelete = persons.find(per => per.id === idOfPeopleToDelete);
  const yesBtn = document.createElement("button");
  yesBtn.type = "button";
  yesBtn.textContent = "Yes";
  const noBtn = document.createElement("button");
  noBtn.type = "button";
  noBtn.textContent = "No";
  const btnPopup = document.createElement('div');
  btnPopup.classList.add('div');
  btnPopup.textContent = `Are you sure you want to delete ${peopleToDelete.firstName} ${peopleToDelete.lastName}`
  btnPopup.appendChild(yesBtn);
  btnPopup.appendChild(noBtn);
  document.body.appendChild(btnPopup);
  btnPopup.classList.add("open");

  function deletePopup () {
    btnPopup.classList.remove("open");
  }

  noBtn.addEventListener("click", e => {
    deletePopup()
  });

  yesBtn.addEventListener("click", e => {
    const peopleRest = persons.filter(person => person.id !== idOfPeopleToDelete);
    persons = peopleRest;
    container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
    deletePopup();
  }, {once: true})
};

container.addEventListener("click", editPerson);
container.addEventListener("click", deletePerson);
container.addEventListener("listOfPeopleUpdated", displayPeopleList);
container.addEventListener("listOfPeopleUpdated", initlocalStorage);

/******************************************************************** */
//add new person
function showForm() {
  formEl.removeAttribute("hidden");
}

function submitForm (e) {
  e.preventDefault();
  const form = e.currentTarget;
  const newPerson = {
    firstName : form.firstName.value,
    lastName : form.lastName.value,
    id : form.id.value,
    picture : form.picture.value,
  }
  persons.push(newPerson);
  container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
  formEl.hidden = true;
  form.reset();
}

addBtn.addEventListener("click", showForm);
formEl.addEventListener("submit", submitForm);