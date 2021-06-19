/*
2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. 
Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
2.1. Пустая корзина должна выводить строку «Корзина пуста»;
2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».

3*. Сделать так, чтобы товары в каталоге выводились при помощи JS:
3.1. Создать массив товаров (сущность Product);
3.2. При загрузке страницы на базе данного массива генерировать вывод из него. 
HTML-код должен содержать только div id=”catalog” без вложенного кода. 
Весь вид каталога генерируется JS.
*/

function makeItem(id, name, price) {
    const item = {
        'id': id,
        'name': name,
        'price': price
    }
    return item
}

function isInCart(item) {
    productIndex = 0;
    for (product of cart) {
        if (product[0] == item.id) {
            return productIndex;
        }
        else {
            productIndex++;
            continue;
        };
    };
    return -1;
}

function isInCatalog(item) {
    productIndex = 0;
    for (product of catalog) {
        if (product[0] == item.id) {
            return productIndex;
        }
        else {
            productIndex++;
            continue;
        };
    };
    return -1;
}

function addToCart(item, amount) {
    productIndex = isInCart(item);
    if (productIndex >= 0) {
        cart[productIndex][3] += amount;
    }
    else {
        cart.push([item.id, item.name, item.price, amount])
    }
}

function addToCatalog(item, amount) {
    productIndex = isInCatalog(item);
    if (productIndex >= 0) {
        catalog[productIndex][3] += amount;
    }
    else {
        catalog.push([item.id, item.name, item.price, amount])
    }
}

function getCartPrice() {
    let price = 0;
    for (product in cart) {
        price += cart[product][2] * cart[product][3];
    }
    return price;
}

function getCartProductsAmount() {
    let amount = 0;
    for (product in cart) {
        amount += cart[product][3]
    }
    return amount;
}

function showCartProps() {
    cartDiv = document.getElementById('cart');

    cartStatus = document.createElement('p');
    cartStatus.className = 'cart-status';
    cartDiv.appendChild(cartStatus);

    let cartProductsAmount = getCartProductsAmount();   // Вычисляем здесь, чтобы не считать дважды
    if (cartProductsAmount == 0) {
        cartStatus.innerHTML = 'Корзина пуста';
    }
    else {
        cartStatus.innerHTML = `В корзине: ${cartProductsAmount} товаров на сумму ${getCartPrice()} рублей`;
    }
}

function showCatalog() {
    catalogDiv = document.getElementById('catalog');

    // Создаем общий нмерованный список, куда будут добавляться продукты
    ol = document.createElement('ol');
    ol.className = 'catalog-list';
    catalogDiv.appendChild(ol);

    for (product of catalog) {
        // Добавляем элементы <li> с продуктами в общий список
        li = document.createElement('li');
        li.className = 'product';
        ol.appendChild(li);

        // Создаем обертку для ненумерованных элементов с характеристиками продукта
        ul = document.createElement('ul');
        ul.className = 'product-prop-wrapper';
        li.appendChild(ul);

        // Для каждой характеристики продукта создаём элемент ненумерованного списка
        for (let productPropIndex = 0; productPropIndex < product.length; productPropIndex++) {
            productText = '';
            innerLi = document.createElement('li');
            innerLi.className = 'product-prop'
            switch (productPropIndex) {
                case 0:
                    productText += `ID: ${product[productPropIndex]}`;
                    break;
                case 1:
                    productText += `Name: ${product[productPropIndex]}`;
                    break;
                case 2:
                    productText += `Price: ${product[productPropIndex]}`;
                    break;
                case 3:
                    productText += `Amount: ${product[productPropIndex]}`;
                    break;
            }
            innerLi.innerHTML = productText;
            ul.appendChild(innerLi);
        }
    }
}


cart = []       // cart = ['id', 'productName', price, amount]
catalog = []    // cart = ['id', 'productName', price, amount]. 
// Различие лишь в том, что в случае с каталогом amount отражает общее количество товара на складе.

let item1 = makeItem(00001, '6.53" Смартфон Xiaomi Redmi 9A 32 ГБ зеленый', 8499);
let item2 = makeItem(00002, 'Фитнес-браслет Samsung Galaxy Fit2', 3499);
let item3 = makeItem(00003, '6.53" Защитная пленка Domani для смартфона универсальная', 49);

addToCart(item1, 2);
addToCart(item2, 1);
addToCart(item1, 1);
addToCart(item3, 5);

addToCatalog(item1, 1);
addToCatalog(item3, 5);
addToCatalog(item1, 1);

showCatalog();
showCartProps();
