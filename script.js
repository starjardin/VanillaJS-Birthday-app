import axios from 'axios'
import format from 'date-fns/format'

//? This are block hmtl elements
const container = document.querySelector("#container");
const addBtn = document.querySelector(".add");
const cancelButton = document.querySelector(".cancelButton");
const formEl = document.querySelector(".formSubmit");
const searchByName = document.querySelector('[name="search"]');
const searchByMonth = document.querySelector('[name="month"]');
const birthdayInput = document.querySelector('#birthday')
const cancelAddPerson = document.querySelector(".close-form");
const header = document.querySelector(".header");
const headerText = header.querySelector(".row");

const date = new Date().toISOString().slice(0, 10)
birthdayInput.max = date


//? This is the api url
const endPoint = 'https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json';

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
        const today = new Date()
        const newPeopleArr = people.map(person => {
          const currentDay = format((person.birthday), "dd");
          const month = format((person.birthday), "LL");
          const momentYear = today.getFullYear();
          const birthDayDate = new Date(momentYear, month, currentDay);
          let oneDay = 1000 * 60 * 60 * 24;
          const getTheDate = birthDayDate.getTime() - today.getTime();
          const dayLeft = Math.floor(getTheDate / oneDay);
          return {
              ...person,
              dayLeft: dayLeft < 0 ? dayLeft + 365 : dayLeft
            }
          }
        )
        
        return newPeopleArr
          .sort((a, b) => (a.dayLeft - b.dayLeft))
          .map(person => {
          const currentDate = new Date(person.birthday);
          const month = format((person.birthday), "LL");
          const year = currentDate.getFullYear();
          const fullDate = `${ format(person.birthday, "do") } / ${ month } / ${ year }`;
          const futureAge = today.getFullYear() - year;
         return `
            <div class="row mt-3" data-id="${person.id}">
              <div class="col-sm picture">
                <img src="${person.picture}">
              </div>
              <div class="col-md">
                <div>
                  <h4>${person.firstName} ${person.lastName}</h4>
                  ${person.dayLeft < 0 ? "Turned" : "Turns"}
                  <strong>${futureAge}</strong> on ${new Date(person.birthday).toLocaleString("en-US", { month: "long" })}
                  <time datetime="${fullDate}">
                    <span>${format(person.birthday, "do")}</span>
                  </time> 
                </div>
              </div>

              <div class="col-sm btn-container buttons-container">
                <div>
                  ${person.dayLeft < 0 ? `In ${person.dayLeft + 365} days` :
                  person.dayLeft === 0 ? "Today" :
                  person.dayLeft === 1 ?  "Tomorrow" :
                  `In ${person.dayLeft} days`
                  }
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
        }).join("")
      }

      const addNewPerson = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const birthDate = form.birthday.value;
        const dateTime = Date.parse(birthDate);
        //create an object for the new person
        const newPerson = {
          firstName : form.firstName.value,
          lastName : form.lastName.value,
          id : Date.now(),
          picture : form.picture.value,
          birthday : dateTime,
        }
        
        //push the new pers to the persons array.
        people = [ ...people, newPerson ]
        container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
        formEl.hidden = true;
        document.body.style.overflow = "scroll"
        form.reset();
      };
      //function display list of people
      const displayPeopleList = () => {
        const html = generatePeopleList(people)
        if (people) {
          container.innerHTML = html
        } else if (!people) {
          container.innerHTML = "Loading....."
        }
      }

      const showForm = () => {
        formEl.removeAttribute("hidden");
      }
      
      const editPerson = (e) => {
        const editButton = e.target.matches(".edit");
        if (editButton) {
          const button = e.target.closest(".edit");
          const id = button.dataset.id;
          headerText.style.backgroundColor = "#F7FCFF"
          document.body.style.overflow = "hidden";
          document.body.style.backgroundColor = "#F7FCFF";
          editPersonPopup(id);
        }
      }

      //edit person popup
      const editPersonPopup = async (id) => {
        const personToEdit = people.find(person => person.id == id);
        return new Promise(async function(resolve) {
          //create a new form elem
          const formEl = document.createElement('form');
          formEl.classList.add("form");
          const personToEditBirthYear = format(personToEdit.birthday, "yyyy");
          const personToEditBirthMonth = format(personToEdit.birthday, "MM");
          const personToEditBrithDate = format(personToEdit.birthday, "dd");
          const personToEditBirthDay = `${ personToEditBirthYear }-${ personToEditBirthMonth }-${ personToEditBrithDate }`
          formEl.insertAdjacentHTML("afterbegin", `
            <h1>
              <b>Edit ${personToEdit.firstName} ${personToEdit.lastName}</b>
            </h1>
            <div class="form-group">
              <label for="firstName">Frist Name</label>
              <input
                type="text"
                class="form-control"
                name="firstName"
                id="${personToEdit.id }" 
                value="${ personToEdit.firstName}"
              >
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input 
                type="text"
                class="form-control"
                id="${personToEdit.id }" 
                name="lastName"
                value="${ personToEdit.lastName}"
              >
            </div>
            <div class="form-group">
              <label for="birthday">Birthday</label>
              <input
                type="date" id="birthday"
                class="form-control"
                name="birthday"
                id="${personToEdit.birthday}"
                value=${personToEditBirthDay}
              >
            </div>
            <button type="submit" class="btn btn-danger">Save changes</button>
          `);
          
          const editBirtdayInput = formEl.querySelector("#birthday")
          editBirtdayInput.max = date

          const cancelBtn = document.createElement('button')
          cancelBtn.type = 'button';
          cancelBtn.textContent = 'cancel'
          cancelBtn.classList.add("btn-cancel")
          formEl.appendChild(cancelBtn)
          document.body.appendChild(formEl);
          
          const closeFormBtn = document.createElement('button')
          closeFormBtn.type = 'button';
          closeFormBtn.textContent = ``
          closeFormBtn.classList.add("close-form")
          formEl.appendChild(closeFormBtn)
          document.body.appendChild(formEl);

          cancelBtn.addEventListener("click", async () => {
            await wait(300)
            destroyPopup(formEl);
            document.body.style.overflow = "scroll";
            document.body.style.backgroundColor = "#D8EEFE";
            headerText.style.backgroundColor = "#D8EEFE"
          })
          closeFormBtn.addEventListener("click", async () => {
            await wait(300)
            destroyPopup(formEl);
            document.body.style.overflow = "scroll";
            document.body.style.backgroundColor = "#D8EEFE";
            headerText.style.backgroundColor = "#D8EEFE"
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
            document.body.style.overflow = "scroll";
            document.body.style.backgroundColor = "#D8EEFE";

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
            const editedPerson = people.find(person => person.id == newPerson.id);
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
          document.body.style.overflow = "hidden";
          document.body.style.backgroundColor = "#F7FCFF";
          headerText.style.backgroundColor = "#F7FCFF"
        }
      };

      //delete person popup
        const deletePersonPupup = async (idOfPeopleToDelete) => {
        //find the id of the pers to delete
          const peopleToDelete = people.find(person => person.id == idOfPeopleToDelete);
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
          const text = document.createElement("p");
          text.textContent = `Are you sure you want to delete ${ peopleToDelete.firstName } ${ peopleToDelete.lastName }`
          const buttoncontainer = document.createElement("div");
          buttoncontainer.appendChild(yesBtn);
          buttoncontainer.appendChild(noBtn);
        //add both "yes" and "no" button to the container
          btnPopup.appendChild(text);
          btnPopup.appendChild(buttoncontainer);
        //add the container to the DOM
          document.body.appendChild(btnPopup);
        //open the popup by adding classlist of "open"
          btnPopup.classList.add("open");

        //if no gets clicked delete the popup
          noBtn.addEventListener("click", async () => {
            await wait(500)
            destroyPopup(btnPopup)
            document.body.style.overflow = "scroll";
            headerText.style.backgroundColor = "#D8EEFE"
            document.body.style.backgroundColor = "#D8EEFE";
        });

        //if yes button gets clicked delete the pers and ddestroy the popup
        yesBtn.addEventListener("click", async e => {
          people = people.filter(person => person.id != idOfPeopleToDelete);
          container.dispatchEvent(new CustomEvent('listOfPeopleUpdated'));
          await wait(500)
          destroyPopup(btnPopup)
          document.body.style.overflow = "scroll";
          headerText.style.backgroundColor = "#D8EEFE"
          document.body.style.backgroundColor = "#D8EEFE";
        }, {once: true})
      };

      const filterPeople = () => {
        const input = searchByName.value;
        const select = searchByMonth.value;
        const inputSearch = input.toLowerCase().trim();
        // Filter the list by the firstname or lastname
        const searchPerson = people.filter(person => person.lastName.toLowerCase().trim().includes(inputSearch) || 
          person.firstName.toLowerCase().trim().includes(inputSearch));
        const filterPerson = searchPerson.filter(person => {
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
      addBtn.addEventListener("click", () => {
        document.body.style.overflow = "hidden"
        showForm()
      });
      cancelButton.addEventListener("click", (e) => {
        (e.currentTarget.closest(".formSubmit")).hidden = true;
        document.body.style.overflow = "scroll"
      })
      formEl.addEventListener("submit", addNewPerson);
      searchByName.addEventListener("keyup", filterPeople);
      searchByMonth.addEventListener("change", filterPeople);
      cancelAddPerson.addEventListener("click", () => {
        formEl.hidden = true;
        document.body.style.overflow = "scroll"
      })
      
    }).catch(error => {
      console.log(error);
      container.innerHTML = error
  })
}

fetchPeople()