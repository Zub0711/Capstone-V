// Capstone V
// In this project I will be using the fetch method to Get information about a city in south africa

// First I get the api from rapid api

const cityName = "Cape Town";

const url1 = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=ZA&namePrefix=${cityName}`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6b961853ccmsh8779e06d27a5185p145af5jsn6dbc5326f857",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

// Then I create a async function to fetch the information from the api
const cityInfo = async () => {
  // The await & fetch method is used to get the information from the api
  let info = await fetch(url1, options);

  // I use json() ro retrieve info from the api
  let result = await info.json();
  // I then retrieve the population info and log it to console
  console.log(" Population " + result.data[0].population);
  // I save the city Id in the variable wikiId
  let wikiId = result.data[0].wikiDataId;
  // I then create the second function
  // As the I am on the free Api account I cannot call more then 3 at once
  // So I use the setTimeout method to delay one of the api calls
  setTimeout(async function () {
    const url2 = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${wikiId}`;
    const options2 = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6b961853ccmsh8779e06d27a5185p145af5jsn6dbc5326f857",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };
    // I use a try catch block in the event of an error
    try {
      // I repeat the method from the previous function in order toe get the elevation
      const response = await fetch(url2, options2);
      const result = await response.json();
      // I then log it to console
      console.log(" Elevation " + result.data.elevationMeters + "m");
    } catch (error) {
      console.error(error);
    }
  }, 2000);

  weather();
};

// I repeat this with the second function

const url3 =
  "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=-33.925277777&lon=18.423888888&units=metric&lang=en";
const options3 = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6b961853ccmsh8779e06d27a5185p145af5jsn6dbc5326f857",
    "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
  },
};
// The third function is the api for the weather info
// I then repeat the process with the third function
const weather = async () => {
  try {
    let info2 = await fetch(url3, options3);
    let result2 = await info2.json();
    console.log(" Temperature " + result2.data[0].temp);
  } catch (error) {
    console.log(error);
  }
};

// I then log the function to the console
console.log(cityInfo());
