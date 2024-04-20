// script.js
import axios from 'axios';
import "./styles.css";
// script.js
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchVacancies(query);
    }
});

function searchVacancies(query) {
    axios.get('https://api.hh.ru/vacancies', {
        params: {
            text: query,
            per_page: 10
        }
    })
    .then(response => {
        const vacancies = response.data.items;
        resultsContainer.innerHTML = ''; // Очистка результатов перед добавлением новых

        vacancies.forEach(vacancy => {
            const vacancyElement = document.createElement('div');
            vacancyElement.classList.add('vacancy');
            vacancyElement.innerHTML = `
                <h3>${vacancy.name}</h3>
                <p>${vacancy.snippet.responsibility}</p>
                <a href="${vacancy.alternate_url}" target="_blank">Подробнее</a>
            `;
            resultsContainer.appendChild(vacancyElement);
        });
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
    });
}