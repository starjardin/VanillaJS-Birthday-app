import { persons, formEl, container } from "../variables.js";
//add new person
export function showForm() {
  formEl.removeAttribute("hidden");
}

//submit the form for the new person
export function submitForm (e) {
  e.preventDefault();
  const form = e.currentTarget;
  const birthDate = form.birthday.value;
  const dateTime = Date.parse(birthDate);
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
};