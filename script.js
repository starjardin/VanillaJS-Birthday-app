import axios from 'axios'

const container = document.querySelector("#container");
const addBtn = document.querySelector(".add");
const formEl = document.querySelector(".formSubmit");
const searchByName = document.querySelector('[name="search"]');
const searchByMonth = document.querySelector('[name="month"]');
const endPoint = 'https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json';
const year = document.querySelector(".year")
year.innerHTML = new Date().getFullYear()

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open'); 
  await wait(500);
  popup.remove();
  popup = null;
}

const fetchPeople = async () => {
  axios.get(endPoint)
    .then(response => {
      let people = response.data
      //add to local storage
      const initlocalStorage = () => {
        localStorage.setItem("people", JSON.stringify(people));
      }

      //restore form local storage
      const restoreFromLocalStorage = () => {
        let listOfPeople = JSON.parse(localStorage.getItem("people"));
        if (listOfPeople !== null) {
          people = listOfPeople;
        } else {
          people = response.data
        }
          container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
      };

      const generatePeopleList = (people) => {
        return people
          .sort((a, b) => new Date(a.birthday).getMonth() - new Date(b.birthday).getMonth())
          .map(person => {
            function nthDate(day) {
              if (day > 3 && day < 21) return "th";
              switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th"; 
              }
            }
            const today = new Date()
            const currentDate = new Date(person.birthday);
            const currentDay = currentDate.getDate();
            const month = currentDate.getMonth();
            const year = currentDate.getFullYear();
            const fullDate = `${currentDay}${nthDate(currentDay)} / ${month + 1} / ${year}`;
            const futureAge = today.getFullYear() - year + 1;
            const momentYear = today.getFullYear();
            const birthDayDate = new Date(momentYear, month, currentDay );
            let oneDay = 1000 * 60 * 60 * 24;
            const getTheDate = birthDayDate.getTime() - today.getTime();
            const dayLeft = Math.ceil(getTheDate / oneDay);
            return `
            <div class="row mt-3" data-id="${person.id}">
              <div class="col-sm">
                <img src="${person.picture}" class="rounded">
              </div>
              <div class="col-md">
                <div>
                  <h4>${person.firstName} ${person.lastName}</h4>
                  ${dayLeft < 0 ? "Turned" : "Turns"}
                  <strong>${futureAge}</strong> on ${new Date(person.birthday).toLocaleString("en-US", { month: "long" })}
                    <time datetime="${fullDate}">
                    ${new Date(person.birthday)
                    .toLocaleString("en-US", 
                    { day: "numeric" })}<sup>${nthDate(currentDay)}</sup>
                  </time> 
                </div>
              </div>

              <div class="col-sm btn-container buttons-container">
                <div>
                  ${dayLeft < 0 ? dayLeft * -1 + " " + "days ago" :
                  dayLeft === 0 ? "today" :
                  dayLeft === 1 ?  "Tomorrow" :
                  dayLeft + " " + 'days'}
                </div>
                <div>
                  <button 
                    type="button" 
                    value="${person.id}" 
                    data-id="${person.id}" 
                    class="edit">
                    <span>edit</span>
                  </button>
                  <button 
                    type="button" 
                    value="${person.id}" 
                    class="delete" data-id="${person.id}">
                    <span>delete</span>
                  </button>
                </div>
              </div>
            </div>`
          }
        ).join('');
      }

      const addNewPerson = (e) => {
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
        people = [...people, newPerson]
        container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
        formEl.hidden = true;
        form.reset();
      };

      //function display list of people
      const displayPeopleList = () => {
        const html = generatePeopleList(people)
        container.innerHTML = html
      }

      const showForm = () => {
        formEl.removeAttribute("hidden");
      }

      // Reset the list
      const resteInputSearch = e => {
        formSearch.reset();
        // displayList();
      }

      const editPerson = (e) => {
        const editButton = e.target.matches(".edit");
        if (editButton) {
          const button = e.target.closest(".edit");
          const id = button.dataset.id;
          editPersonPopup(id);
        }
      }

      //edit person popup
      const editPersonPopup = async (id) => {
        const personToEdit = people.find(person => person.id === id);
        return new Promise(async function(resolve) {
          //create a new form elem
          const formEl = document.createElement('form');
          formEl.classList.add("form");
          formEl.insertAdjacentHTML("afterbegin", `
            <h1>
              <b>Edit ${personToEdit.firstName} ${personToEdit.lastName}</b>
            </h1>
            <div class="form-group">
              <label for="firstName">Frist Name</label>
              <input type="text" class="form-control" name="firstName" id="${personToEdit.id}" value="${personToEdit.firstName}">
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="${personToEdit.id}" name="lastName" value="${personToEdit.lastName}"> 
            </div>
            <div class="form-group">
              <label for="birthday">Birthday</label>
              <input type="date" id="birthday" class="form-control" name="birthday" id="${personToEdit.birthday}">
            </div>
            <button type="submit" class="btn btn-danger">Save changes</button>
          `);

          const cancelBtn = document.createElement('button')
          cancelBtn.type = 'button';
          cancelBtn.textContent = 'cancel'
          cancelBtn.classList.add("btn-cancel")
          formEl.appendChild(cancelBtn)
          document.body.appendChild(formEl);

          cancelBtn.addEventListener("click", async () => {
            await wait(1000)
            destroyPopup(formEl)
          })

          formEl.classList.add("open");
          //listeners for the for elem
          formEl.addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            if (!form.birthday.value) {
              alert("Hey, what's your birthday")
              return
            }

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
            const editedPerson = people.find(person => person.id === newPerson.id);
            editedPerson.firstName = newPerson.firstName;
            editedPerson.lastName = newPerson.lastName;
            editedPerson.birthday = newPerson.birthday;
            editedPerson.id = editedPerson.id;
            //uptdate the lsit
            container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
            await wait(1000)
            destroyPopup(formEl)
          }, {once: true});
        })
      }

      //delete person function
      const deletePerson = (e) => {
        const deleteBtn = e.target.matches(".delete");
        if (deleteBtn) {
          //find the id of the pers to delete
          const idOfPeopleToDelete = e.target.closest('.delete').dataset.id;
          deletePersonPupup(idOfPeopleToDelete);
        }
      };

      //delete person popup
        const deletePersonPupup = async (idOfPeopleToDelete) => {
        //find the id of the pers to delete
        const peopleToDelete = people.find(person => person.id === idOfPeopleToDelete);
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

        //if no gets clicked delete the popup
          noBtn.addEventListener("click", async () => {
            await wait(500)
            destroyPopup(btnPopup)
        });

        //if yes button gets clicked delete the pers and ddestroy the popup
        yesBtn.addEventListener("click", async e => {
          people = people.filter(person => person.id !== idOfPeopleToDelete);
          container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
          await wait(500)
          destroyPopup(btnPopup)
        }, {once: true})
      };

      const searchPeopleByName = () => {
        const input = searchByName.value;
        const inputSearch = input.toLowerCase().trim();
        // Filter the list by the firstname or lastname
        const searchPerson = people.filter(person => person.lastName.toLowerCase().trim().includes(inputSearch) || 
          person.firstName.toLowerCase().trim().includes(inputSearch));
        const myHTML = generatePeopleList(searchPerson);
        container.innerHTML = myHTML;
      }

      const filterPersonMonth = () => {
        // Get the value of the select input
        const select = searchByMonth.value;
        const filterPerson = people.filter(person => {
          // Change the month of birth into string
          const getMonthOfBirth = new Date(person.birthday)
          .toLocaleString("en-US", 
          { month: "long" }); 

          // Filter the list by the month of birth
          return getMonthOfBirth.toLowerCase().includes(select.toLowerCase());
        });
        const myHTML = generatePeopleList(filterPerson);
        container.innerHTML = myHTML;
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
    }).catch(error => {
      console.log(error);
      container.innerHTML = error
  })
}

fetchPeople()