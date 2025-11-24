const dishes = [
    // Супы (6 шт: 2 рыбных, 2 мясных, 2 вегетарианских)
    {
        keyword: 'borsch',
        name: 'Борщ',
        price: 250,
        category: 'soup',
        count: '300г',
        image: 'images/Борщ.png',
        kind: 'meat'
    },
    {
        keyword: 'tom-yam',
        name: 'Том Ям с креветками',
        price: 365,
        category: 'soup',
        count: '350г',
        image: 'images/Том ям.png',
        kind: 'fish'
    },
    {
        keyword: 'norwegian-soup',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        count: '300г',
        image: 'images/Норвежский суп.png',
        kind: 'fish'
    },
    {
        keyword: 'gazpacho',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        count: '300г',
        image: 'images/Гаспачо.png',
        kind: 'veg'
    },
    {
        keyword: 'mushroom-soup',
        name: 'Грибной суп-пюре',
        price: 185,
        category: 'soup',
        count: '330г',
        image: 'images/Грибной суп.png',
        kind: 'veg'
    },
    {
        keyword: 'ramen',
        name: 'Рамен с курицей',
        price: 320,
        category: 'soup',
        count: '400г',
        image: 'images/Рамен.png',
        kind: 'meat'
    },

    // Второе (6 шт: 2 рыбных, 2 мясных, 2 вегетарианских)
    {
        keyword: 'lasagna',
        name: 'Лазанья',
        price: 385,
        category: 'main',
        count: '250г',
        image: 'images/Лазанья.png',
        kind: 'meat'
    },
    {
        keyword: 'cutlets-puree',
        name: 'Котлеты из курицы с пюре',
        price: 225,
        category: 'main',
        count: '300г',
        image: 'images/Котлеты с пюре.png',
        kind: 'meat'
    },
    {
        keyword: 'fried-potatoes-mushrooms',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main',
        count: '280г',
        image: 'images/Картошка.jpeg',
        kind: 'veg'
    },
    {
        keyword: 'fish-rice',
        name: 'Рыбная котлета с рисом',
        price: 320,
        category: 'main',
        count: '250г',
        image: 'images/Рыбная котлета.png',
        kind: 'fish'
    },
    {
        keyword: 'pizza',
        name: 'Пицца Маргарита',
        price: 450,
        category: 'main',
        count: '400г',
        image: 'images/Пицца.png',
        kind: 'veg'
    },
    {
        keyword: 'shrimp-pasta',
        name: 'Паста с креветками',
        price: 340,
        category: 'main',
        count: '280г',
        image: 'images/Паста.png',
        kind: 'fish'
    },

    // Салаты и закуски (6 шт: 1 рыбный, 1 мясной, 4 вегетарианских)
    {
        keyword: 'caesar',
        name: 'Цезарь с курицей',
        price: 370,
        category: 'salad',
        count: '220г',
        image: 'images/Цезарь.png',
        kind: 'meat'
    },
    {
        keyword: 'caprese',
        name: 'Капрезе с моцареллой',
        price: 350,
        category: 'salad',
        count: '235г',
        image: 'images/Капрезе.png',
        kind: 'veg'
    },
    {
        keyword: 'tuna-salad',
        name: 'Салат с тунцом',
        price: 480,
        category: 'salad',
        count: '250г',
        image: 'images/Салат с тунцом.png',
        kind: 'fish'
    },
    {
        keyword: 'fries',
        name: 'Картофель фри с соусом',
        price: 210,
        category: 'salad',
        count: '150г',
        image: 'images/Картошка фри.png',
        kind: 'veg'
    },
    {
        keyword: 'greek-salad',
        name: 'Греческий салат',
        price: 330,
        category: 'salad',
        count: '220г',
        image: 'images/Греческий.png',
        kind: 'veg'
    },
    {
        keyword: 'spring-roll',
        name: 'Спринг-роллы с овощами',
        price: 240,
        category: 'salad',
        count: '180г',
        image: 'images/Спринг роллы.png',
        kind: 'veg'
    },

    // Напитки (6 шт: 3 холодных, 3 горячих)
    {
        keyword: 'mors',
        name: 'Морс клюквенный',
        price: 120,
        category: 'drink',
        count: '500мл',
        image: 'images/Морс.jpeg',
        kind: 'cold'
    },
    {
        keyword: 'herbal-tea',
        name: 'Чай с травами',
        price: 180,
        category: 'drink',
        count: '1000мл',
        image: 'images/Чай.jpeg',
        kind: 'hot'
    },
    {
        keyword: 'milkshake',
        name: 'Милкшейк',
        price: 200,
        category: 'drink',
        count: '400мл',
        image: 'images/Милкшейк.png',
        kind: 'cold'
    },
    {
        keyword: 'cola',
        name: 'Кока-кола',
        price: 140,
        category: 'drink',
        count: '330мл',
        image: 'images/Кола.png',
        kind: 'cold'
    },
    {
        keyword: 'coffee',
        name: 'Кофе Американо',
        price: 150,
        category: 'drink',
        count: '200мл',
        image: 'images/Кофе.png',
        kind: 'hot'
    },
    {
        keyword: 'green-tea',
        name: 'Зеленый чай',
        price: 100,
        category: 'drink',
        count: '300мл',
        image: 'images/Зеленый чай.png',
        kind: 'hot'
    },

    // Десерты (6 шт: 3 маленьких, 2 средних, 1 большой)
    {
        keyword: 'cheesecake',
        name: 'Нью-Йорк чизкейк',
        price: 280,
        category: 'dessert',
        count: '150г',
        image: 'images/Чизкейк.png',
        kind: 'medium'
    },
    {
        keyword: 'brownie',
        name: 'Шоколадный брауни',
        price: 260,
        category: 'dessert',
        count: '120г',
        image: 'images/Брауни.png',
        kind: 'small'
    },
    {
        keyword: 'ice-cream',
        name: 'Шарик мороженого',
        price: 100,
        category: 'dessert',
        count: '80г',
        image: 'images/Морожное.png',
        kind: 'small'
    },
    {
        keyword: 'donut',
        name: 'Пончик с глазурью',
        price: 120,
        category: 'dessert',
        count: '90г',
        image: 'images/Пончик.png',
        kind: 'small'
    },
    {
        keyword: 'tiramisu',
        name: 'Тирамису',
        price: 330,
        category: 'dessert',
        count: '180г',
        image: 'images/Тирамису.png',
        kind: 'medium'
    },
    {
        keyword: 'cake-set',
        name: 'Набор пирожных (3 шт)',
        price: 650,
        category: 'dessert',
        count: '450г',
        image: 'images/Пирожные.png',
        kind: 'large'
    }
];