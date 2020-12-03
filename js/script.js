const button = document.querySelector('#run');

const weatherDayOne = document.querySelector('.weatherDayOne');
const weatherDayTwo = document.querySelector('.weatherDayTwo');
const weatherDayThree = document.querySelector('.weatherDayThree');
const weatherDayFour = document.querySelector('.weatherDayFour');
const weatherDayFive = document.querySelector('.weatherDayFive');

const city = document.querySelector('.city');


const api = {
    key: "e9bbcf9d2a14bd33b5c8c0b51d3cb1eb",
    base: "http://api.openweathermap.org/data/2.5/",
}

const apiImg = {
    key: "O0AyJhfn9YR67YQQX9d9FbCUAZ3YbjshWKlAeSD-4d4",
    base: "https://api.unsplash.com/",
}

button.addEventListener('click', () => {

    console.log(city.value);

    if (city.value.length == 0) {
        alert('Please enter a location!')
    };

    fetch(`${api.base}weather?q=${city.value}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json()
        })
        .then(data => console.log(data))

        weatherDayOne.innerHTML = data.main.temp;

    fetch(`${apiImg.base}search/photos/?query=${city.value}&client_id=${apiImg.key}`)
        .then(background => {
            return background.json()
        })
        .then(data => console.log(data));

});