const api = '55e3c44031e9dacbb3b917ac774d32cf';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', () => {
    let long;
    let lat;

    //Accessing the Geolocation of the User
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            //Storing the Longitude and Latitude in Variables
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${api}&units=metric`;
            console.log(base);
            fetch(base)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const { temp } = data.main;
                    const place = data.name;
                    const { description, icon } = data.weather[0];
                    const { sunrise, sunset } = data.sys;

                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    const fahrenheit = (temp * 9) / 5 + 32;

                    //Converting Epoch(Unix) time to GMT
                    const sunriseGMT = new Date(sunrise * 1000);
                    const sunsetGMT = new Date(sunset * 1000);

                    // Interacting with DOM to show data
                    iconImg.src = iconUrl;
                    loc.textContent = `${place}`;
                    desc.textContent = `${description}`;
                    tempC.textContent = `${temp.toFixed(2)} °C`;
                    tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
                    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
                })
        });
    }
});