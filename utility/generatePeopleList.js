export function generatePeopleList(people) {
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
      const futureAge = today.getFullYear() - year;
      const momentYear = today.getFullYear();
      const birthDayDate = new Date(momentYear, month, currentDay );
      let oneDay = 1000 * 60 * 60 * 24;
      const getTheDate = birthDayDate.getTime() - today.getTime();
      const dayLeft = Math.ceil(getTheDate / oneDay);
      return `
      <div class="row mt-3" data-id="${person.id}">
        <div class="col">
          <img src="${person.picture}" class="rounded-circle">
        </div>
        <div class="col">
          <div>
            ${person.firstName} ${person.lastName} 
            is turning 
            <b>${futureAge <= 1 ? futureAge + ` year` : futureAge + ` years`}</b> 
            on
            <b>${new Date(person.birthday).toLocaleString("en-US", { month : "long"})}</b> 
            the 
            <b>
              <time datetime="${fullDate}">
                ${new Date(person.birthday)
                .toLocaleString("en-US", 
                { day: "numeric" })}<sup>${nthDate(currentDay)}</sup>
              </time> 
            </b>
          </div>
        </div>
        <div class="col">
          ${dayLeft < 0 ? dayLeft * -1 + " " + "days ago" :
            dayLeft <= 1 ? dayLeft + " " + "day" :
            dayLeft + 'days'}
        </div>
        <div class="col">
          <button 
            type="button" 
            value="${person.id}" 
            data-id="${person.id}" 
            class="edit">
            <span>edit</span>
          </button>
        </div>
        <div class="col">
          <button 
            type="button" 
            value="${person.id}" 
            class="delete" data-id="${person.id}">
            <span>delete</span>
          </button>
        </div>
      </div>`
    }).join('');
}