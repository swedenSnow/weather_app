
// Varibles for current weather
const apixu_API = "https://api.apixu.com/v1/forecast.json?key=50bab9bae1bd4dca94c93510180603&q=stockholm&days=6&lang=sv";
const currentCity = document.createElement('h3');
const currentDayofDay = document.createElement('h3');
const currentCondition = document.createElement('h1');
const currentHumidity = document.createElement('h5');
const averageWind = document.createElement('p');
const currentIcon = document.createElement('img');
const currentTemp = document.createElement('h1');
const lastUpdatetitle = document.createElement('p');
const lastUpdate = document.createElement('p');
const currentDay = document.createElement('h1');
const feelsLike = document.createElement('p');

//  Array varibles for 5 days forecast weather
const imgIcon = [];
const textTemp = [];
const minTextTemp = [];
const maxTextTagTemp = [];
const forecastDayText = [];
const forecastDayNameText = [];
const forecastCondition = [];
const forecastWind = [];


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
        currentDayofDay.textContent = getSun();
        currentDay.textContent = getDay();
        currentCondition.textContent = weather.current.condition.text;
        // averageWind.textContent = "Average wind speed " + getWind () + " " + "m/s";
        currentHumidity.textContent = "Humidity: " + weather.current.humidity + " " + "%" + " " + " " + " " + "Wind speed " + getWind () + " " + "m/s";
        feelsLike.textContent =  "Feels like " + weather.current.feelslike_c + " °C";
        currentIcon.setAttribute("src", `https:${weather.current.condition.icon}`);
        currentTemp.textContent = Math.round(weather.current.temp_c) + " °C";
        lastUpdatetitle.textContent = "Last updated: ";
        lastUpdate.textContent = weather.current.last_updated;
        //Create nodes in the DOM
        document.getElementById("current-weather__city").appendChild(currentCity);
        document.getElementById("current-weather__city").appendChild(currentDayofDay);
        document.getElementById('current-weather__day').appendChild(currentDay);
        document.getElementById("icon-text__container").appendChild(currentIcon);
        document.getElementById("current-weather__temp").appendChild(currentTemp);
        document.getElementById("current-weather__temp").appendChild(feelsLike);
        document.getElementById("icon-text__container").appendChild(currentCondition);
        document.getElementById("current-weather__day").appendChild(currentHumidity);
        // document.getElementById("current-weather__temp").appendChild(averageWind);
        document.getElementById("last_update").appendChild(lastUpdatetitle);
        document.getElementById("last_update").appendChild(lastUpdate);

        //////////////////////////////
        // Transform kph---> m/s
        /////////////////////////////
        function getWind (kph){
            kph = weather.current.wind_kph
            return Math.round(weather.current.wind_kph / 3.6);
          
        }


        function getSun (){
            const itsDay = weather.current.is_day
            console.log(itsDay);
            if(weather.current.is_day===1){
                return "Daytime ☀️"

            }
            else {
                return "Nighttime 🌙"
            }
          
        }
    
       const sunny =  getSun();
       console.log(sunny);      
    
        for (let i = 1; i < 6; i++) {
            
            forecastWind[i] = document.createElement('p');
            forecastWind[i].textContent = getWind(weather.forecast.forecastday[i].day.avgvis_km);
            forecastDayText[i] = document.createElement('h2');
            forecastDayText[i].textContent = weather.forecast.forecastday[i].day.condition.text
            forecastCondition[i] = document.createElement('h2');
            forecastCondition[i].textContent = weather.forecast.forecastday[i].date;
            imgIcon[i] = document.createElement("img");
            imgIcon[i].setAttribute("src", `http:${weather.forecast.forecastday[i].day.condition.icon}`);
            
           //MAX and MIN temperatures
            maxTextTagTemp[i] = document.createElement('p');
            maxTextTagTemp[i].textContent = 'Max Temp: ' + Math.round(weather.forecast.forecastday[i].day.maxtemp_c) + " °C ";
            minTextTemp[i] = document.createElement('p');
            minTextTemp[i].textContent =' Min Temp: ' + Math.round(weather.forecast.forecastday[i].day.mintemp_c) +  " °C " ;
            
            document.getElementById(`forecast${[i]}`).appendChild(imgIcon[i]);
            document.getElementById(`forecast${[i]}`).appendChild(forecastDayText[i]);
            document.getElementById(`forecast${[i]}`).appendChild(maxTextTagTemp[i]);
            document.getElementById(`forecast${[i]}`).appendChild(minTextTemp[i]);
            document.getElementById(`forecast${[i]}`).appendChild(forecastCondition[i]);
        }

}
    
    
//////////////////////////////////////
// Async 
/////////////////////////////////////
    async function fetchData(url) {
        
        var promise = await fetch(url);
        var data = await promise.json();
        return data;
    }
//////////////////////////////////////
// Lets go!
/////////////////////////////////////
    getData()
    
