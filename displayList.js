import persons, { container } from "./variables.js";

//function display list of people
export function displayPeopleList () {
  let currentYear = new Date().getFullYear();
  const dateNow = Date.now();
  const array = persons.map(per => {
    //get the month of the birthday
    const birthDateMonth = new Date(per.birthday).getMonth();
    //get the day of the birthday
    const birthDateDay = new Date(per.birthday).getDay();
    //here is creating a date mmm/ddd/yyy
    const date = `${(birthDateMonth + 1)}/${birthDateDay + 1}/${currentYear}`;
    //get the time stamp of the date above; ex: 03/05/2020 = 381374912739123;
    const dateMiliseconds = new Date(`${date}`).getTime();
    //here is how far the birthday is (in milliseconds)
    const dateDiff = dateMiliseconds - dateNow;
    //here is how far the birthday is (in days)
    let daysToGo = Math.round(dateDiff / (1000 * 60 * 60 * 24));
    //if the birthday has gone, plus the numbers of the days rest to 356 days.
    if (daysToGo < 0) {
      daysToGo = daysToGo + 365;
    }
    const birthday = per.birthday;
    //split the date in order to get in which month the index is.
    const arr = date.split("/");
    const monthIndex =  parseInt(arr[0],10) - 1;
    //list of months
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    //Month that are matches the index.
    const birthMonths = monthNames[monthIndex];
    //here is to distinguish how many old years old the person is.
    const diff = (Math.round((dateNow - birthday) / (1000 * 60 * 60 * 24 * 365)));
    //if days are ending with 1, add "st" at the end
    if (arr[1].endsWith("1")) {
      arr[1] = `${arr[1]}st`
    }
    //if days are ending with 2, add "nd" at the end 
    else if (arr[1].endsWith("2")) {
      arr[1] = `${arr[1]}nd`
    }
    //if days are ending with 3, add "rd" at the end  
    else if (arr[1].endsWith("3")) {
      arr[1] = `${arr[1]}rd`
    }
    //exception 11, 12, 13 just stay with "th" at the end. 
    else if (arr[1] == "11" || arr[1] == "12" || arr[1] == "13") {
      arr[1] = `${arr[1]}th`
    }
    //the rest, just add th at the end. 
    else {
      arr[1] = `${arr[1]}th`
    }
    //here I added some entries to a persons in order to make it easier to display on html
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
    return person;
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
