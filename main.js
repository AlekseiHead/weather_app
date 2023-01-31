const apiKey = "3cc2b25ebc13413c826142649233101";

/*----------- Элементы на странице -----------*/
const header = document.querySelector('.header');
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

// слушаем отправку формы

form.onsubmit = function (e) {
    //Отменяем отправку формы
    e.preventDefault();

    // Берем значение из инпута, обрезаем пробелы
    let city = input.value.trim();

    // Делаемм запрос на сервер
    // Адрес запроса
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    // Выполняем запрос
    fetch(url)
        .then((response) => {
            return response.json();
        })
		.then((data) => {
			console.log(data);
			
			// Проверка на ошибку

			if (data.error) {
				// Если есть ошибка - выводит ее

				// Удаляем предыдущую карточку
			const prevCard = document.querySelector('.card');
				if (prevCard) prevCard.remove();

				// Отобразить карточку с ошибкой
				const html = `<div class="card">${data.error.message}</div>`;
				
				// Отображаем карточку на странице
			header.insertAdjacentHTML('afterend', html);

			} else {
				// Если нет ошибки - выводит карточку
				// Отображаем полученные данные в карточку

			

            // Разметка для карточки
            const html = `<div class="card">
								<h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>
								<div class="card-weather">
									<div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
									<img class="card-img" src="./img/day_rain1.png" alt="Weather image">
								</div>
								<div class="card-description">${data.current.condition.text}</div>
							</div>`;
			// Отображаем карточку на странице
			header.insertAdjacentHTML('afterend', html);

			}

            

			
    });
}
