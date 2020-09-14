// import { format, formatDistance, formatRelative, subDays } from "date-fns";
//I need to fetch but how : create a function to fetch the data from person.json
//put the data in the local storage
const container = document.querySelector(".container");

const fetchpeople = async () => {
    const peopleUrl = await fetch(`people.json`)
    const data = await peopleUrl.json();
    return data;
};

const fetchPeopleObjects = async () => {
  const people = await fetchpeople();
  displayPeopleList (people)
}


function displayPeopleList (people) {
  const html = people.map(person => {
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
        <button type="button" value="${person.id}" data-id="${person.id}">delete</button>
      </div>
    </div>`
  });
  container.innerHTML = html.join("");
}

function initlocalStorage(people) {
  localStorage.setItem("people", JSON.stringify(people));
}

function restoreFromLocalStorage (people) {
  const listOfPeople = JSON.parse(localStorage.getItem('people'));
  if (listOfPeople.length) {
    people.push(listOfPeople);
  }
}

function editPerson (e, people) {
  const editButton = e.target.matches(".edit");
  if (editButton) {
    const button = e.target.closest(".edit");
    const id = button.dataset.id;
    editPersonPopup(id);
  }
}

async function editPersonPopup(id) {
  const people = await fetchpeople();
  const personToEdit = people.find(person => person.id === id);
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
      const editedPerson = people.find(person => person.id === newPerson.id);
      console.log(personToEdit);
      editedPerson.firstName = newPerson.firstName;
      editedPerson.lastName = newPerson.lastName;
      editedPerson.birthday = newPerson.birthday;
      displayPeopleList (people)
      formEl.classList.remove("open");
    })
  })
}

container.addEventListener("click", editPerson);
fetchPeopleObjects();