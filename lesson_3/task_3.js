/*
3. Товары в корзине хранятся в массиве. Задачи:
a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/

function countBasketPrice(userBasket) {
    let price = 0;
    for (item of userBasket) {
        price += item[2];
    };
    return price;
}


let item1 = ['6.53" Смартфон Xiaomi Redmi 9A 32 ГБ зеленый', 1, 8499];
let item2 = ['Фитнес-браслет Samsung Galaxy Fit2', 1, 3499];
let item3 = ['6.53" Защитная пленка Domani для смартфона универсальная', 1, 49];
let basket = [item1, item2, item3];

alert(`Сумма товаров в корзине - ${countBasketPrice(basket)}`)
