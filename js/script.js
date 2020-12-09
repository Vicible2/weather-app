const button = document.querySelector('#run');

const weatherDayOne = document.querySelector('.weatherDayOne');
const weatherDayTwo = document.querySelector('.weatherDayTwo');
const weatherDayThree = document.querySelector('.weatherDayThree');
const weatherDayFour = document.querySelector('.weatherDayFour');
const weatherDayFive = document.querySelector('.weatherDayFive');

const city = document.querySelector('.city');

//API variables
const api = {
    key: "e9bbcf9d2a14bd33b5c8c0b51d3cb1eb",
    base: "http://api.openweathermap.org/data/2.5/",
}

const apiImg = {
    key: "O0AyJhfn9YR67YQQX9d9FbCUAZ3YbjshWKlAeSD-4d4",
    base: "https://api.unsplash.com/",
}

//coordinates variables
let coords = [];
let dailyTemps = [];

button.addEventListener('click', () => {
    console.log(city.value);

    //check if form is empty, error if true
    if (city.value.length == 0) {
        alert('Please enter a location!')
    };

    //Fetch the weather of today to get Coordinates
    fetch(`${api.base}weather?q=${city.value}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        })
        .then(data => {
            weatherDayOne.innerHTML = data.main.temp;
            coords = data.coord;
            getDailyTempData();
            return console.log(data);
        })

    //function to get daily forecast
    function getDailyTempData() {
        console.log(coords.lon, coords.lat);
        fetch(`${api.base}onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${api.key}`)
            .then(dailyWeather => {
                return dailyWeather.json();
            })
            .then(dailyData => {
                dailyTemps = dailyData.daily;
                console.log(dailyTemps);
                tempSelect();
                changeTempColor();
                return console.log(dailyData);
            })
    }

    function tempSelect() {
        weatherDayOne.innerHTML = `${dailyTemps[1]["temp"]["day"]}°C`;
        weatherDayTwo.innerHTML = `${dailyTemps[2]["temp"]["day"]}°C`;
        weatherDayThree.innerHTML = `${dailyTemps[3]["temp"]["day"]}°C`;
        weatherDayFour.innerHTML = `${dailyTemps[4]["temp"]["day"]}°C`;
        weatherDayFive.innerHTML = `${dailyTemps[5]["temp"]["day"]}°C`;
    }

    // function to change color based on temp
    function changeTempColor() {

        //daily temp variables.
        let day1 = dailyTemps[1]["temp"]["day"];
        let day2 = dailyTemps[2]["temp"]["day"];
        let day3 = dailyTemps[3]["temp"]["day"];
        let day4 = dailyTemps[4]["temp"]["day"];
        let day5 = dailyTemps[5]["temp"]["day"];

        if (day1 >= -10 && day1 < 2) {
            weatherDayOne.style.color = "#7de9fa";
        } else if (day1 >= 2 && day1 < 4) {
            weatherDayOne.style.color = "#bafffa";
        } else if (day1 >= 4 && day1 < 12) {
            weatherDayOne.style.color = "#fffb80";
        } else {
            weatherDayOne.style.color = "#ffc559";
        }

        if (day2 >= -10 && day2 < 2) {
            weatherDayTwo.style.color = "#7de9fa";
        } else if (day2 >= 2 && day2 < 4) {
            weatherDayTwo.style.color = "#bafffa";
        } else if (day2 >= 4 && day2 < 12) {
            weatherDayTwo.style.color = "#fffb80";
        } else {
            weatherDayTwo.style.color = "#ffc559";
        }

        if (day3 >= -10 && day3 < 2) {
            weatherDayThree.style.color = "#7de9fa";
        } else if (day3 >= 2 && day3 < 4) {
            weatherDayThree.style.color = "#bafffa";
        } else if (day3 >= 4 && day3 < 12) {
            weatherDayThree.style.color = "#fffb80";
        } else {
            weatherDayThree.style.color = "#ffc559";
        }

        if (day4 >= -10 && day4 < 2) {
            weatherDayFour.style.color = "#7de9fa";
        } else if (day4 >= 2 && day4 < 4) {
            weatherDayFour.style.color = "#bafffa";
        } else if (day4 >= 4 && day4 < 12) {
            weatherDayFour.style.color = "#fffb80";
        } else {
            weatherDayFour.style.color = "#ffc559";
        }

        if (day5 >= -10 && day5 < 2) {
            weatherDayFive.style.color = "#7de9fa";
        } else if (day5 >= 2 && day5 < 4) {
            weatherDayFive.style.color = "#bafffa";
        } else if (day5 >= 4 && day5 < 12) {
            weatherDayFive.style.color = "#fffb80";
        } else {
            weatherDayFive.style.color = "#ffc559";
        }
    }
    /*    
        regular weather call -> take lat/long coordinates. Insert as variables in https://openweathermap.org/api/one-call-api .
        add &units=metric for Celcius -> select value of daily.temp.day (avg temp during the day)
    */

    //Get random background for every city filled in form
    fetch(`${apiImg.base}search/photos/?query=${city.value}&client_id=${apiImg.key}`)
        .then(background => {
            return background.json()
        })
        .then(data => {
            let randomSelector = Math.floor(Math.random() * 5);
            let imageUrl = data["results"][randomSelector]["urls"]["full"]
            document.body.style.backgroundImage = `url(${imageUrl})`;
            document.body.style.backgroundSize = "cover";
        });
});