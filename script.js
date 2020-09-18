// "use strict";
// import { format, compareAsc } from 'date-fns';
//I need to fetch but how : create a function to fetch the data from person.json
//put the data in the local storage
/* *********************************** */

//element in the html
const container = document.querySelector(".container");
const addBtn = document.querySelector(".add");
const formEl = document.querySelector(".formSubmit");

//state 
let persons = [];

//fetch people
const fetchpeople = async () => {
    const peopleUrl = await fetch(`people.json`)
    const data = await peopleUrl.json();
    persons = [...data];
    container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
    return data;
};

//add to local storage
async function initlocalStorage() {
  localStorage.setItem("persons", JSON.stringify(persons));
}

//restore form local storage
async function restoreFromLocalStorage() {
  const listOfOeople = JSON.parse(localStorage.getItem('persons'));
  if (persons) {
    persons = listOfOeople;
  }
  if (!persons) {
    fetchpeople();
  }
  container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
};

//function display list of people
function displayPeopleList () {
  let currentYear = new Date().getFullYear();
  const dateNow = Date.now();
  const array = persons.map(per => {
    const birthDateMonth = new Date(per.birthday).getMonth();
    const birthDateDay = new Date(per.birthday).getDay();
    const date = `${(birthDateMonth + 1)}/${birthDateDay + 1}/${currentYear}`;
    const dateTime = new Date(`${date}`);
    const dateMiliseconds = dateTime.getTime();
    const dateDiff = dateMiliseconds - dateNow;
    let daysToGo = Math.round(dateDiff / (1000 * 60 * 60 * 24));
    //if the birthday has gone, plus it to 356 days.
    if (daysToGo < 0) {
      daysToGo = daysToGo + 365;
    }
    const birthday = per.birthday;
    const arr = date.split("/");
    const monthIndex =  parseInt(arr[0],10) - 1;
    //list of months
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //Month that are matches the index.
    const birthMonths = monthNames[monthIndex];
    const diff = (Math.round((dateNow - birthday) / (1000 * 60 * 60 * 24 * 365)));
    if (arr[1].endsWith("1")) {
      arr[1] = `${arr[1]}st`
    } else if (arr[1].endsWith("2")) {
      arr[1] = `${arr[1]}nd`
    } else if (arr[1].endsWith("3")) {
      arr[1] = `${arr[1]}rd`
    } else if (arr[1] == "11" || arr[1] == "12" || arr[1] == "13") {
      arr[1] = `${arr[1]}th`
    } else {
      arr[1] = `${arr[1]}th`
    }
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
  });
  //sort the people by the days to go of their birthdays
  const peopleSorted = array.sort(function(a, b) {
    return a.days - b.days;
  });
  //html for the people sorted.
  const html = peopleSorted.map(person => {
    return `
    <div class="row mt-3" data-id="${person.id}">
      <div class="col">
        <img src="${person.picture}" class="rounded-circle">
      </div>
      <div class="col">
        <span>${person.firstName} ${person.lastName} is turning <b>${person.year + 1}</b> on <b>${person.month}</b> the <b>${person.daysOfbirth}</b></span>
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

//add new person
function showForm() {
  formEl.removeAttribute("hidden");
}

//submit the form for the new person
function submitForm (e) {
  e.preventDefault();
  const form = e.currentTarget;
  const birthDate = form.birthday.value;
  const dateTime = Date.parse(birthDate);
  console.log(dateTime);
  //create an obj for the new pers
  const newPerson = {
    firstName : form.firstName.value,
    lastName : form.lastName.value,
    id : form.id.value,
    picture : form.picture.value,
    birthday : dateTime,
  }
  //push the new pers to the persons array.
  persons.push(newPerson);
  container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
  formEl.hidden = true;
  form.reset();
}

//edit person function
function editPerson (e) {
  const editButton = e.target.matches(".edit");
  if (editButton) {
    const button = e.target.closest(".edit");
    const id = button.dataset.id;
    editPersonPopup(id);
  }
}

//edit person popup
async function editPersonPopup(id) {
  const personToEdit = persons.find(person => person.id === id);
  return new Promise(async function(resolve) {
    //create a new form elem
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
        <input type="date" id="birthday" class="form-control" name="birthday" id="${personToEdit.birthday}">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    `);
    document.body.appendChild(formEl);
    formEl.classList.add("open");
    //listeners for the for elem
    formEl.addEventListener("submit", e => {
      e.preventDefault();
      const form = e.currentTarget;
      const birthDate = new Date(form.birthday.value);
      const birthDateMiliseconds = birthDate.getTime();
      //create an obj for the edited pers
      const newPerson = {
        id: id,
        lastName: form.lastName.value,
        firstName : form.firstName.value,
        birthday : birthDateMiliseconds,
        picture : personToEdit.picture,
      }

      //reasign the value of the pers to the value of the new pers
      const editedPerson = persons.find(person => person.id === newPerson.id);
      editedPerson.firstName = newPerson.firstName;
      editedPerson.lastName = newPerson.lastName;
      editedPerson.birthday = newPerson.birthday;
      editedPerson.id = editedPerson.id;
      //uptdate the lsit
      container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
      formEl.classList.remove("open");
    }, {once: true});
  })
}

//delete person function
function deletePerson (e) {
  const deleteBtn = e.target.matches(".delete");
  if (deleteBtn) {
    //find the id of the pers to delete
    const idOfPeopleToDelete = e.target.closest('.delete').dataset.id;
    deletePersonPupup(idOfPeopleToDelete);
  }
};

//delete person popup
async function deletePersonPupup (idOfPeopleToDelete) {
  //find the id of the pers to delete
  const peopleToDelete = persons.find(per => per.id === idOfPeopleToDelete);
  //create buttons "yes"
  const yesBtn = document.createElement("button");
  yesBtn.type = "button";
  yesBtn.textContent = "Yes";
  //create "no" button
  const noBtn = document.createElement("button");
  noBtn.type = "button";
  noBtn.textContent = "No";
  const btnPopup = document.createElement('div');
  btnPopup.classList.add('div');
  btnPopup.textContent = `Are you sure you want to delete ${peopleToDelete.firstName} ${peopleToDelete.lastName}`
  //add both "yes" and "no" button to the container
  btnPopup.appendChild(yesBtn);
  btnPopup.appendChild(noBtn);
  //add the container to the DOM
  document.body.appendChild(btnPopup);
  //open the popup by adding classlist of "open"
  btnPopup.classList.add("open");

  //function to delete popup 
  function deletePopup () {
    btnPopup.classList.remove("open");
  }

  //if no gets clicked delete the popup
  noBtn.addEventListener("click", e => {
    deletePopup()
  });

  //if yes button gets clicked delete the pers and ddestroy the popup
  yesBtn.addEventListener("click", e => {
    const peopleRest = persons.filter(person => person.id !== idOfPeopleToDelete);
    persons = peopleRest;
    container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
    deletePopup();
  }, {once: true})
};

//listeners
container.addEventListener("click", editPerson);
container.addEventListener("click", deletePerson);
container.addEventListener("listOfPeopleUpdated", displayPeopleList);
container.addEventListener("listOfPeopleUpdated", initlocalStorage);
restoreFromLocalStorage();
addBtn.addEventListener("click", showForm);
formEl.addEventListener("submit", submitForm);