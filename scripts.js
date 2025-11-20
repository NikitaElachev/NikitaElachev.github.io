document.addEventListener('DOMContentLoaded', () => {
    // Объявление переменных

    // Контейнеры для карточек блюд
    const soupsGrid = document.querySelector('#soups-grid');
    const mainDishesGrid = document.querySelector('#main-dishes-grid');
    const drinksGrid = document.querySelector('#drinks-grid');
    const mainContent = document.querySelector('.main .container');

    // Элементы формы
    const soupSelect = document.getElementById('soup-select');
    const mainDishSelect = document.getElementById('main-dish-select');
    const drinkSelect = document.getElementById('drink-select');

    // Элементы для отображения стоимости
    const totalCostContainer = document.getElementById('total-cost-container');
    const totalCostValueEl = document.getElementById('total-cost-value');

    // Состояние: хранит ВЫБРАННЫЕ объекты блюд
    let selectedDishes = {
        soup: null,
        main: null,
        drink: null
    };

    // Функции

    function renderContent() {
        // 1. Сортировка по имени (алфавиту)
        dishes.sort((a, b) => a.name.localeCompare(b.name));

        // 2. Очистка контейнеров
        soupsGrid.innerHTML = '';
        mainDishesGrid.innerHTML = '';
        drinksGrid.innerHTML = '';
        soupSelect.length = 1;
        mainDishSelect.length = 1;
        drinkSelect.length = 1;

        // 3. Перебор массива и создание карточек и опций для селектов
        dishes.forEach(dish => {
            // Создание карточки блюда
            const dishCardHTML = `
                <div class="dish-card" data-dish="${dish.keyword}">
                    <img src="${dish.image}" alt="${dish.name}">
                    <div class="dish-info">
                        <p class="dish-price">${dish.price}Р</p>
                        <p class="dish-name">${dish.name}</p>
                        <p class="dish-weight">${dish.count}</p>
                    </div>
                    <button class="add-button">Выбрать</button>
                </div>
            `;

            // Создание опции для селекта
            const option = new Option(dish.name, dish.keyword);

            // 4. Добавление элементов в DOM
            switch (dish.category) {
                case 'soup':
                    soupsGrid.innerHTML += dishCardHTML;
                    soupSelect.add(option);
                    break;
                case 'main':
                    mainDishesGrid.innerHTML += dishCardHTML;
                    mainDishSelect.add(option);
                    break;
                case 'drink':
                    drinksGrid.innerHTML += dishCardHTML;
                    drinkSelect.add(option);
                    break;
            }
        });
    }
    
     //Обновляет значения в селектах формы на основе выбранных блюд.
    
    function updateOrderForm() {
        soupSelect.value = selectedDishes.soup ? selectedDishes.soup.keyword : "";
        mainDishSelect.value = selectedDishes.main ? selectedDishes.main.keyword : "";
        drinkSelect.value = selectedDishes.drink ? selectedDishes.drink.keyword : "";
    }
    
    //Рассчитывает и отображает итоговую стоимость заказа

    function calculateAndDisplayTotal() {
        let totalCost = 0;
        
        // Суммируем цены только выбранных блюд
        if (selectedDishes.soup) totalCost += selectedDishes.soup.price;
        if (selectedDishes.main) totalCost += selectedDishes.main.price;
        if (selectedDishes.drink) totalCost += selectedDishes.drink.price;

        if (totalCost > 0) {
            totalCostValueEl.textContent = `${totalCost}Р`;
            totalCostContainer.style.display = 'flex'; // Показываем блок
        } else {
            totalCostContainer.style.display = 'none'; // Скрываем блок
        }
    }


    // Заполнение форм

    // Обработчик клика по карточке блюда
    mainContent.addEventListener('click', (event) => {
        const card = event.target.closest('.dish-card');
        if (!card) return;

        const dishKeyword = card.dataset.dish;
        const dish = dishes.find(d => d.keyword === dishKeyword);

        if (dish) {
            // Обновляем состояние
            selectedDishes[dish.category] = dish;
            
            // Обновляем форму и стоимость
            updateOrderForm();
            calculateAndDisplayTotal();
        }
    });

    // Обработчик ручного изменения селекта в форме
    [soupSelect, mainDishSelect, drinkSelect].forEach(select => {
        select.addEventListener('change', () => {
            const selectedKeyword = select.value;
            const category = select.name === 'soup' ? 'soup' : select.name === 'main-dish' ? 'main' : 'drink';
            
            // Находим блюдо по keyword или сбрасываем, если выбрано "Выберите..."
            selectedDishes[category] = selectedKeyword ? dishes.find(d => d.keyword === selectedKeyword) : null;

            // Пересчитываем стоимость
            calculateAndDisplayTotal();
        });
    });
    renderContent();
});