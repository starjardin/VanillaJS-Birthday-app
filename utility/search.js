import { people, searchByName, searchByMonth, container } from '../variables'
import { generatePeopleList } from './generatePeopleList'

export const searchPeopleByName = (e) => {
  const input = searchByName.value;
  const inputSearch = input.toLowerCase().trim();
  // Filter the list by the firstname or lastname
  const searchPerson = people.filter(person => person.lastName.toLowerCase().trim().includes(inputSearch) || 
    person.firstName.toLowerCase().trim().includes(inputSearch));
  const myHTML = generatePeopleList(searchPerson);
  container.innerHTML = myHTML;
}

export const filterPersonMonth = e => {
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