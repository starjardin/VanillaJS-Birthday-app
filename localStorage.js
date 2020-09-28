import { persons } from "./variables.js";
import { container } from "./variables.js";

//add to local storage
export async function initlocalStorage() {
  localStorage.setItem("persons", JSON.stringify(persons));
}

//restore form local storage
export async function restoreFromLocalStorage() {
  let listOfOeople = JSON.parse(localStorage.getItem('persons'));
  if (persons) {
    persons = listOfOeople;
  }
  if (!persons) {
    fetchpeople();
  }
  container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
};
