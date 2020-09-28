//delete person function
export function deletePerson (e) {
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
