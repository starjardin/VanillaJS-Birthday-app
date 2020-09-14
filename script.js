//I need to fetch but how : create a function to fetch the data from person.json
//put the data in the local storage

const fetchpeople = async () => {
    const peopleUrl = await fetch(`people.json`)
    const data = await peopleUrl.json();
    return data;
};

//This is the films collections
const fetchPeoleObjects = async () => {
  const films = await fetchpeople();
  console.log(films);
}
fetchPeoleObjects();
