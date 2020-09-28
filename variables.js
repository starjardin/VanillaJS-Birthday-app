import { displayPeopleList } from "./displayList.js"
//element in the html
export const container = document.querySelector(".container");
export const addBtn = document.querySelector(".add");
export const formEl = document.querySelector(".formSubmit");
export const search = document.querySelector('[name="search"]');

//state 
let persons = [];
// import { displayPeopleList } from "./displayList.js";
//fetch people
export const fetchpeople = async () => {
    const peopleUrl = await fetch(`people.json`)
    const data = await peopleUrl.json();
    persons = [...data];
    displayPeopleList(persons);
    return data;
};

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
restoreFromLocalStorage();

//delete person popup
 export async function deletePersonPupup (idOfPeopleToDelete) {
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
    console.log(persons);
    container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
    deletePopup();
  }, {once: true})
};
//export persons variable, default export
export default persons;
