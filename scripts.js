document.addEventListener('DOMContentLoaded', () => {
    // Сортировка блюд по алфавиту один раз при загрузке
    dishes.sort((a, b) => a.name.localeCompare(b.name));

    // Объект конфигурации для связки категории блюда, ID контейнера и ID селекта
    const categoriesConfig = {
        soup: {
            gridId: 'soups-grid',
            selectId: 'soup-select'
        },
        main: {
            gridId: 'main-dishes-grid',
            selectId: 'main-dish-select'
        },
        salad: {
            gridId: 'salads-grid',
            selectId: 'salad-select'
        },
        drink: {
            gridId: 'drinks-grid',
            selectId: 'drink-select'
        },
        dessert: {
            gridId: 'desserts-grid',
            selectId: 'dessert-select'
        }
    };

    // Состояние: хранит выбранные объекты блюд
    let selectedDishes = {
        soup: null,
        main: null,
        salad: null,
        drink: null,
        dessert: null
    };

    // Функции

    // Функция создания HTML карточки
    function createDishCard(dish) {
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.setAttribute('data-dish', dish.keyword);
        
        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="dish-info">
                <p class="dish-price">${dish.price}Р</p>
                <p class="dish-name">${dish.name}</p>
                <p class="dish-weight">${dish.count}</p>
            </div>
            <button class="add-button">Добавить</button>
        `;
        return card;
    }

    // Функция отрисовки блюд в конкретной категории
    function renderCategory(category, filterKind = null) {
        const config = categoriesConfig[category];
        const gridElement = document.getElementById(config.gridId);
        
        gridElement.innerHTML = '';

        let dishesToRender = dishes.filter(d => d.category === category);
        
        if (filterKind) {
            dishesToRender = dishesToRender.filter(d => d.kind === filterKind);
        }

        dishesToRender.forEach(dish => {
            const card = createDishCard(dish);
            gridElement.appendChild(card);
        });
    }

    // Инициализация селектов в форме
    function initFormSelects() {
        for (const [category, config] of Object.entries(categoriesConfig)) {
            const select = document.getElementById(config.selectId);
            while (select.options.length > 1) {
                select.remove(1);
            }

            const categoryDishes = dishes.filter(d => d.category === category);
            categoryDishes.forEach(dish => {
                const option = new Option(dish.name, dish.keyword);
                select.add(option);
            });
        }
    }

    // Обновление значений в селектах на основе selectedDishes
    function updateOrderForm() {
        for (const [category, config] of Object.entries(categoriesConfig)) {
            const select = document.getElementById(config.selectId);
            select.value = selectedDishes[category] ? selectedDishes[category].keyword : "";
        }
    }

    // Расчет стоимости
    function calculateAndDisplayTotal() {
        let totalCost = 0;
        const totalCostContainer = document.getElementById('total-cost-container');
        const totalCostValueEl = document.getElementById('total-cost-value');

        for (const item of Object.values(selectedDishes)) {
            if (item) {
                totalCost += item.price;
            }
        }

        if (totalCost > 0) {
            totalCostValueEl.textContent = `${totalCost}Р`;
            totalCostContainer.style.display = 'flex';
        } else {
            totalCostContainer.style.display = 'none';
        }
    }

    // Функция для уведомлений
    // Создает динамическое модальное окно с сообщением
    function showNotification(message) {
        // Создаем оверлей
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        // Создаем контейнер сообщения
        const container = document.createElement('div');
        container.className = 'modal-container';

        // Текст
        const text = document.createElement('p');
        text.className = 'modal-text';
        text.textContent = message;

        // Кнопка
        const btn = document.createElement('button');
        btn.className = 'modal-btn';
        btn.textContent = 'Окей \uD83D\uDC4C'; // Добавляем эмодзи

        // Добавление обработчика закрытия
        btn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        // Сборка
        container.appendChild(text);
        container.appendChild(btn);
        overlay.appendChild(container);

        // Добавление на страницу
        document.body.appendChild(overlay);
    }

    // Обработчик событий

    // 1. Инициализация при загрузке
    Object.keys(categoriesConfig).forEach(cat => renderCategory(cat));
    initFormSelects();

    // 2. Логика фильтрации
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const button = e.target;
            const section = button.closest('.menu-section');
            const category = section.dataset.category;
            const kind = button.dataset.kind;

            if (button.classList.contains('active')) {
                button.classList.remove('active');
                renderCategory(category, null);
            } else {
                section.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                renderCategory(category, kind);
            }
        });
    });

    // 3. Добавление блюда в заказ
    const mainContent = document.querySelector('.main .container');
    mainContent.addEventListener('click', (event) => {
        const card = event.target.closest('.dish-card');
        if (!card) return;

        const dishKeyword = card.dataset.dish;
        const dish = dishes.find(d => d.keyword === dishKeyword);

        if (dish) {
            selectedDishes[dish.category] = dish;
            updateOrderForm();
            calculateAndDisplayTotal();
        }
    });

    // 4. Ручное изменение селектов
    const selects = document.querySelectorAll('.order-form select');
    selects.forEach(select => {
        select.addEventListener('change', () => {
            const selectedKeyword = select.value;
            let categoryName = select.name;
            if (categoryName === 'main-dish') categoryName = 'main';
            
            const dish = selectedKeyword ? dishes.find(d => d.keyword === selectedKeyword) : null;
            selectedDishes[categoryName] = dish;
            calculateAndDisplayTotal();
        });
    });
    
    // 5. Кнопка сброса
    const resetBtn = document.querySelector('.btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            selectedDishes = { soup: null, main: null, salad: null, drink: null, dessert: null };
            document.getElementById('total-cost-container').style.display = 'none';
        });
    }

    // 6. Валидация формы
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Останавливаем отправку по умолчанию

        const { soup, main, salad, drink, dessert } = selectedDishes;

        // Проверка: ничего не выбрано
        if (!soup && !main && !salad && !drink && !dessert) {
            showNotification('Ничего не выбрано. Выберите блюда для заказа');
            return;
        }

        // Проверка: выбраны только напиток или десерт (отсутствует еда)
        if (!soup && !main && !salad && (drink || dessert)) {
            showNotification('Выберите главное блюдо');
            return;
        }

        // Проверка: есть суп, но нет главного/салата
        if (soup && !main && !salad) {
            showNotification('Выберите главное блюдо/салат/стартер');
            return;
        }

        // Проверка: есть салат, но нет супа/главного
        if (salad && !soup && !main) {
            showNotification('Выберите суп или главное блюдо');
            return;
        }

        // Проверка: есть еда (любая комбинация), но нет напитка
        if ((soup || main || salad) && !drink) {
            showNotification('Выберите напиток');
            return;
        }

        // Если все проверки пройдены, то отправляем форму
        orderForm.submit(); 
    });
});