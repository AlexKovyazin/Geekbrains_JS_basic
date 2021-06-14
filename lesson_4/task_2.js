function makeItem(name, price) {
    const item = {
        'name': name,
        'price': price
    }
    return item
}

function addToCart(item, amount) {
    if (cart[item.name] != undefined) {
        cart[item.name][0] += amount;
    }
    else {
        cart[item.name] = [amount, item.price]
        
    }    
}

function getCartPrice() {
    let price = 0;
    for (productName in cart) {
        price += cart[productName][0] * cart[productName][1];
    }
    return price;
}


cart = {}  // cart = {'testProduct': amount, price}

let item1 = makeItem('6.53" Смартфон Xiaomi Redmi 9A 32 ГБ зеленый', 8499);
let item2 = makeItem('Фитнес-браслет Samsung Galaxy Fit2', 3499);
let item3 = makeItem('6.53" Защитная пленка Domani для смартфона универсальная', 49);

addToCart(item1, 2);
addToCart(item2, 1);
addToCart(item1, 1);
addToCart(item3, 1);
console.log(getCartPrice());
