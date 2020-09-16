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

const fetchPeopleObjects = async () => {
  const people = await fetchpeople();
}

async function initlocalStorage() {
  //fetching the data at the first time.
  // const persons = await fetchpeople();
  localStorage.setItem("persons", JSON.stringify(persons));
}

async function restoreFromLocalStorage () {
  const listOfOeople = JSON.parse(localStorage.getItem('persons'));
  if (listOfOeople.length) {
    persons.push(...listOfOeople);
  }
  container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
};

function displayPeopleList () {
  const html = persons.map(person => {
    return `
    <div class="row mt-3" data-id="${person.id}">
      <div class="col">
        <img src="${person.picture}" class="rounded-circle">
      </div>
      <div class="col">
        <span>${person.firstName} ${person.lastName}</span>
      </div>
      <div class="col">${person.birthday}</div>
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
container.addEventListener("listOfPeopleUpdated", initlocalStorage)
restoreFromLocalStorage();

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
  console.log(persons);
  container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
  formEl.hidden = true;
  form.reset();
}

addBtn.addEventListener("click", showForm);
formEl.addEventListener("submit", submitForm);

function findAge () {
  const currentYear = new Date().getFullYear();
  const dateNow = Date.now();
  const array = persons.map(per => {
    const month = new Date(per.birthday).getMonth();
    const day = new Date(per.birthday).getDay();
    const date = `${day + 1}/${(month + 1)}/${currentYear}`;
    const dateTime = new Date(`${date}`)
    const dateMilis = dateTime.getTime();
    const dateDiff = dateNow - dateMilis;
    const numbersOfDays = Math.floor(dateDiff / 86400000);
    per.birthday = numbersOfDays;
    return per;
  })
  // console.log(array);
}
findAge();