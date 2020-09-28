// "use strict";
// import { format, compareAsc } from 'date-fns';
//I need to fetch but how : create a function to fetch the data from person.json
//put the data in the local storage
/* *********************************** */

import { persons } from "./variables.js";
import { container } from "./variables.js";
import { addBtn } from "./variables.js";
import { formEl } from "./variables.js";
import { initlocalStorage } from "./localStorage.js";
import { restoreFromLocalStorage } from "./localStorage.js";
import { displayPeopleList } from "./displayList.js";
import { deletePerson } from "./utility/delete.js";
import { editPerson } from "./utility/edit.js";
import { submitForm } from "./utility/addPeople.js";
import { showForm } from "./utility/addPeople.js";

//fetch people
const fetchpeople = async () => {
    const peopleUrl = await fetch(`people.json`)
    const data = await peopleUrl.json();
    persons = [...data];
    container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
    return data;
};

//listeners
container.addEventListener("click", editPerson);
container.addEventListener("click", deletePerson);
container.addEventListener("listOfPeopleUpdated", displayPeopleList);
container.addEventListener("listOfPeopleUpdated", initlocalStorage);
restoreFromLocalStorage();
addBtn.addEventListener("click", showForm);
formEl.addEventListener("submit", submitForm);