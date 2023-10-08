const apikey = "9705eef22291fd2b9c78698c1f47bbe4";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

getWeatherData = async (cityValue) => {
  try {
    const res =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric
    `);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`,
    ];

    weatherDataEl.querySelector(".icon").innerHTML = `<img
    src="https://openweathermap.org/img/wn/${icon}@2x.png"
    alt="Weather Icon"
  />`;

    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;

    weatherDataEl.querySelector(".description").textContent = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map(
        (detail) => `
      <div>${detail}</div>`
      )
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";

    weatherDataEl.querySelector(".temperature").textContent = "";

    weatherDataEl.querySelector(".description").textContent =
      "An error happend, please try again later";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
};
