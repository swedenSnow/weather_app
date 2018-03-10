const apixu_API = "https://api.apixu.com/v1/forecast.json?key=50bab9bae1bd4dca94c93510180603&q=stockholm&days=6";

// Varibles for current weather
const currentCity = document.createElement('h3');
const currentCondition = document.createElement('p');
const currentIcon = document.createElement('img');
const currentTemp = document.createElement('h1');
const lastUpdatetitle = document.createElement('p');
const lastUpdate = document.createElement('p');
const currentDay = document.createElement('h1');


//////////////////////////////////////
// Writes 3letters weekday instead
/////////////////////////////////////
// const lastUpdate = document.createElement('p');
// Days object
// const  days = {
//     'Mon': 'Monday',
//     'Tue': 'Tuesday',
//     'Wed': 'Wednesday',
//     'Thu': 'Thursday',
//     'Fri': 'Friday',
//     'Sat': 'Saturday'
//  }

//  const dateName = new Date().toString().split(' ')[0]; //get day abreviation first
//   console.log(days[dateName]);
 //////////////////////////////////////////
 //////////////////////////////////////////

 
 //////////////////////////////////////////
 // Function instead to print whole dayname
  //////////////////////////////////////////
  function getDay(){
     const day = new Date();
     const weekday = 
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
            'Thursday', 'Friday', 'Saturday'
        ];
     return weekday[day.getDay()];
 }

    async function getData(){
         weather = await fetchData(apixu_API)
        console.log(weather);

        currentCity.textContent = `${weather.location.name}, ${weather.location.country}`;
        currentDay.textContent = getDay();
        currentCondition.textContent = weather.current.condition.text;
        currentIcon.setAttribute("src", `https:${weather.current.condition.icon}`);
        currentTemp.textContent = Math.round(weather.current.temp_c) + " °C";
        lastUpdatetitle.textContent = "Last updated: ";
        lastUpdate.textContent = weather.current.last_updated;
        

        //Create nodes in the DOM
        document.getElementById("current-weather__city").appendChild(currentCity);
        document.getElementById('current-weather__day').appendChild(currentDay);
        document.getElementById("icon-text__container").appendChild(currentIcon);
        document.getElementById("current-weather__temp").appendChild(currentTemp);
        document.getElementById("icon-text__container").appendChild(currentCondition);
        document.getElementById("currentweather").appendChild(lastUpdatetitle);
        document.getElementById("currentweather").appendChild(lastUpdate);
 
    }
    
    
    
    async function fetchData(url) {
        
        var promise = await fetch(url);
        var data = await promise.json();
        return data;
    }

    /////////////////////////////////
    //R U N  T H E  F U N C T I O N
    ////////////////////////////////
    getData()