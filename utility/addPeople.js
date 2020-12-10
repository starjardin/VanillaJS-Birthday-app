import people from '../variables'

export function addNewPerson(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const birthDate = form.birthday.value;
  const dateTime = Date.parse(birthDate);
  if (!birthDate || !form.firstName.value || form.lastName.value || form.id.value || form.picture.value) {
    alert("Please fill all of the fields")
  }
  //create an obj for the new pers
  const newPerson = {
    firstName : form.firstName.value,
    lastName : form.lastName.value,
    id : form.id.value,
    picture : form.picture.value,
    birthday : dateTime,
  }
  //push the new pers to the persons array.
  people = [...people, newPerson]
  container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
  formEl.hidden = true;
  form.reset();
};
