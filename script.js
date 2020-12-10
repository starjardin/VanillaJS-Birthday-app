import people, { container, addBtn, formEl, searchByName, searchByMonth } from './variables'
import { generatePeopleList } from './utility/generatePeopleList'
import { editPerson } from './utility/edit'
import { deletePerson } from './utility/delete'
import { addNewPerson } from './utility/addPeople'
import {  searchPeopleByName, filterPersonMonth } from './utility/search'


export function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export async function destroyPopup(popup) {
  popup.classList.remove('open'); 
  await wait(500);
  popup.remove();
  popup = null;
}

//add to local storage
function initlocalStorage() {
  localStorage.setItem("persons", JSON.stringify(people));
}

//restore form local storage
function restoreFromLocalStorage() {
  let listOfOeople = JSON.parse(localStorage.getItem('people'));
  if (!people.length) {
    people = listOfOeople;
  }
   people
   container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
};

//function display list of people
const displayPeopleList = () => {
  const html = generatePeopleList(people)
  container.innerHTML = html
}
displayPeopleList()

function showForm() {
  formEl.removeAttribute("hidden");
}

// Reset the list
const resteInputSearch = e => {
  formSearch.reset();
  // displayList();
}

//listeners
container.addEventListener("click", editPerson);
container.addEventListener("click", deletePerson);
container.addEventListener("listOfPeopleUpdated", displayPeopleList);
container.addEventListener("listOfPeopleUpdated", initlocalStorage);
restoreFromLocalStorage();
addBtn.addEventListener("click", showForm);
formEl.addEventListener("submit", addNewPerson);
searchByName.addEventListener("keyup", searchPeopleByName);
searchByMonth.addEventListener("change", filterPersonMonth);
