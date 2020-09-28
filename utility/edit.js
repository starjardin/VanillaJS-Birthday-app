import persons, { container, initlocalStorage, restoreFromLocalStorage } from "../variables.js"
import { displayPeopleList } from "../displayList.js"
//edit person function
export function editPerson (e) {
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


container.addEventListener("listOfPeopleUpdated", displayPeopleList);
container.addEventListener("listOfPeopleUpdated", initlocalStorage);
restoreFromLocalStorage();
