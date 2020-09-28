import { persons } from "./variables.js";
import { container } from "./variables.js";

//function display list of people
export function displayPeopleList () {
  let currentYear = new Date().getFullYear();
  const dateNow = Date.now();
  const array = persons.map(per => {
    const birthDateMonth = new Date(per.birthday).getMonth();
    const birthDateDay = new Date(per.birthday).getDay();
    const date = `${(birthDateMonth + 1)}/${birthDateDay + 1}/${currentYear}`;
    const dateTime = new Date(`${date}`);
    const dateMiliseconds = dateTime.getTime();
    const dateDiff = dateMiliseconds - dateNow;
    let daysToGo = Math.round(dateDiff / (1000 * 60 * 60 * 24));
    //if the birthday has gone, plus it to 356 days.
    if (daysToGo < 0) {
      daysToGo = daysToGo + 365;
    }
    const birthday = per.birthday;
    const arr = date.split("/");
    const monthIndex =  parseInt(arr[0],10) - 1;
    //list of months
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //Month that are matches the index.
    const birthMonths = monthNames[monthIndex];
    const diff = (Math.round((dateNow - birthday) / (1000 * 60 * 60 * 24 * 365)));
    if (arr[1].endsWith("1")) {
      arr[1] = `${arr[1]}st`
    } else if (arr[1].endsWith("2")) {
      arr[1] = `${arr[1]}nd`
    } else if (arr[1].endsWith("3")) {
      arr[1] = `${arr[1]}rd`
    } else if (arr[1] == "11" || arr[1] == "12" || arr[1] == "13") {
      arr[1] = `${arr[1]}th`
    } else {
      arr[1] = `${arr[1]}th`
    }
    const person = {
      firstName : per.firstName,
      lastName : per.lastName,
      id : per.id,
      birthday : per.birthday,
      days : daysToGo,
      picture : per.picture,
      year : diff,
      month : birthMonths,
      daysOfbirth : arr[1],
    }
    return person
  });
  //sort the people by the days to go of their birthdays
  const peopleSorted = array.sort(function(a, b) {
    return a.days - b.days;
  });
  //html for the people sorted.
  const html = peopleSorted.map(person => {
    return `
    <div class="row mt-3" data-id="${person.id}">
      <div class="col">
        <img src="${person.picture}" class="rounded-circle">
      </div>
      <div class="col">
        <span>${person.firstName} ${person.lastName} is turning <b>${person.year + 1}</b> on <b>${person.month}</b> the <b>${person.daysOfbirth}</b></span>
      </div>
      <div class="col">${person.days} days</div>
      <div class="col">
        <button type="button" value="${person.id}" data-id="${person.id}" class="edit">edit</button>
      </div>
      <div class="col">
        <button type="button" value="${person.id}" class="delete" data-id="${person.id}">delete</button>
      </div>
    </div>`
  });
  container.innerHTML = html.join("");
}
