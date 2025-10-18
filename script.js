const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherbox = document.querySelector(".weather-box");
const weatherd = document.querySelector(".weather-details");

search.addEventListener('click', () => {
    const APIkey = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temparature');
            const description = document.querySelector('.weather-box .description');
            const hum = document.querySelector('.weather-details .hum span');
            const wind = document.querySelector('.weather-details .wind span');

            // Update weather image based on the weather condition
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Clouds':
                    image.src = 'cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = 'default.png'; 
                    break;
            }

            
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            hum.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} km/h`;

            
            weatherbox.style.display = 'block';
            weatherd.style.display = 'block';
        })
        .catch(error => {
            alert(error.message); // Alert user if there's an error
        });
});
