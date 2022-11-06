window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(".description");
  const temperatureDegree = document.querySelector(".temperature-degree");
  const locationTimezone = document.querySelector(".location-timezone");
  const temperatureSection = document.querySelector(".degree-section");
  const temperatureSpan = document.querySelector(".degree-section span");
  const border = document.querySelector(".border");
  const temperatureDiv = document.querySelector(".temperature");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      border.style.borderBottom = "black dashed 2px";
      temperatureDiv.style.display = "flex";

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}/`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //set dom elements from api
          const { temperature, summary, icon } = data.currently;
          temperatureDegree.textContent = Math.floor(temperature);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //formula for c
          let celsius = Math.floor((temperature - 32) * (5 / 9));
          //set icon
          setIcons(icon, document.querySelector(".icon"));
          //set c
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "f") {
              temperatureSpan.textContent = "c";
              temperatureDegree.textContent = celsius;
            } else {
              temperatureSpan.textContent = "f";
              temperatureDegree.textContent = Math.floor(temperature);
            }
          });
        });
    });
  }

  const setIcons = (icon, iconId) => {
    const skycons = new Skycons({ color: "black" });
    const currentIcon = icon.replaceAll("-", "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  };
});
