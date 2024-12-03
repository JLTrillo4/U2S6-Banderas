//AQUI MI CODIGO

document.addEventListener("DOMContentLoaded", () => {
    const apiURL = "https://restcountries.com/v3.1/all";
    const countriesList = document.getElementById("countries-list");
  
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.classList.add("hidden");
    modal.innerHTML = `
      <div id="modal-content">
        <button id="close-button">Cerrar</button>
        <div id="country-details"></div>
      </div>
    `;
    document.body.appendChild(modal);
  
    const closeButton = modal.querySelector("#close-button");
    const countryDetails = modal.querySelector("#country-details");
  
    async function fetchCountries() {
      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }
        const countries = await response.json();
        renderCountries(countries);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    function renderCountries(countries) {
      countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  
      countries.forEach((country) => {
        const countryDiv = document.createElement("div");
        countryDiv.classList.add("country");
  
        const flagElement = document.createElement("img");
        flagElement.src = country.flags.png;
        flagElement.alt = `${country.name.common} Flag`;
        flagElement.classList.add("flag");
  
        const nameElement = document.createElement("p");
        nameElement.textContent = country.name.common;
  
        countryDiv.appendChild(flagElement);
        countryDiv.appendChild(nameElement);
  
        countryDiv.addEventListener("click", () => {
          showCountryDetails(country);
        });
  
        countriesList.appendChild(countryDiv);
      });
    }
  
    function showCountryDetails(country) {
      const htmlContent = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}" class="modal-flag"/>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
        <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Lado de conducción:</strong> ${country.car.side}</p>
      `;
      countryDetails.innerHTML = htmlContent;
      modal.classList.remove("hidden");
    }
  
    closeButton.addEventListener("click", () => {
      modal.classList.add("hidden");
      countryDetails.innerHTML = "";
    });
  
    fetchCountries();
  });