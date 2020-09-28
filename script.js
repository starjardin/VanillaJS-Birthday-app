// "use strict";
// import { format, compareAsc } from 'date-fns';
//I need to fetch but how : create a function to fetch the data from person.json
//put the data in the local storage
/* *********************************** */

// let persons = [];

import persons, { container, addBtn, formEl, initlocalStorage, restoreFromLocalStorage } from "./variables.js";
import { deletePerson } from "./utility/delete.js";
import { editPerson } from "./utility/edit.js";
import { submitForm, showForm } from "./utility/addPeople.js";
import { displayPeopleList } from "./displayList.js";

//listeners
container.addEventListener("click", editPerson);
container.addEventListener("click", deletePerson);
container.addEventListener("listOfPeopleUpdated", displayPeopleList);
container.addEventListener("listOfPeopleUpdated", initlocalStorage);
restoreFromLocalStorage();
addBtn.addEventListener("click", showForm);
formEl.addEventListener("submit", submitForm);