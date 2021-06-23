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

function addToCart(item, amount) {
    productIndex = isInCart(item);
    if (productIndex >= 0) {
        cart[productIndex][3] += amount;
    }
    else {
        cart.push([item.id, item.name, item.price, amount])
    }
}

function getCartPrice() {
    let price = 0;
    for (productName in cart) {
        price += cart[productName][0] * cart[productName][1];
    }
    return price;
}


cart = []  // cart = {'testProduct': amount, price}

let item1 = makeItem(00001, '6.53" Смартфон Xiaomi Redmi 9A 32 ГБ зеленый', 8499);
let item2 = makeItem(00002, 'Фитнес-браслет Samsung Galaxy Fit2', 3499);
let item3 = makeItem(00003, '6.53" Защитная пленка Domani для смартфона универсальная', 49);

addToCart(item1, 2);
addToCart(item2, 1);
addToCart(item1, 1);
addToCart(item3, 5);
console.log(cart);
