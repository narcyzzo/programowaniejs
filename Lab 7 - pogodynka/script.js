document.addEventListener("DOMContentLoaded", () => {
    const locationContainer = document.getElementById("locationContainer");
    const addLocationForm = document.getElementById("addLocationForm");
    const locationInput = document.getElementById("locationInput");
  
    let locations = JSON.parse(localStorage.getItem("locations")) || [];
  
    function renderLocations() {
      locationContainer.innerHTML = "";
      locations.forEach(location => {
        const locationDiv = document.createElement("div");
        locationDiv.classList.add("location");
        locationDiv.innerHTML = `
          <h2>${location.name}</h2>
          <div class="weather-info">
            <p>Temperature: ${location.weather.temp}°C</p>
            <p>Humidity: ${location.weather.humidity}%</p>
          </div>
          <button class="remove-btn">Remove</button>
        `;
        locationContainer.appendChild(locationDiv);
  
        const removeBtn = locationDiv.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
          removeLocation(location.name);
        });
      });
    }
  
    addLocationForm.addEventListener("submit", event => {
      event.preventDefault();
      const newLocation = locationInput.value.trim();
      if (newLocation) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&units=metric&appid=bf721c0ddcac79d06f94776a0730e5bd`)
          .then(response => {
            if (!response.ok) {
              throw new Error("Location not found!");
            }
            return response.json();
          })
          .then(data => {
            const weatherInfo = {
              temp: data.main.temp,
              humidity: data.main.humidity
            };
            const location = { name: newLocation, weather: weatherInfo };
            locations.push(location);
            localStorage.setItem("locations", JSON.stringify(locations));
            renderLocations();
            locationInput.value = "";
          })
          .catch(error => {
            alert(error.message);
          });
      }
    });
  
    function removeLocation(locationName) {
      locations = locations.filter(location => location.name !== locationName);
      localStorage.setItem("locations", JSON.stringify(locations));
      renderLocations();
    }
  
    renderLocations();
  });
  