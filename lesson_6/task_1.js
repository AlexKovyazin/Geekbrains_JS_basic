const cartItem = {
    render(item) {
        return  `<div class='item-wrapper'>
                    <div class='item-props'>
                        <div class='prop'>Наименование: ${item.name}</div>
                        <div class='prop'>Цена за ед.: ${item.price}</div>
                        <div class='prop'>Количество: ${item.amount}</div>
                        <div class='prop'>Стоимость: ${item.price * item.amount}</div>
                    </div>
                </div>`
    }
}

const catalogItem = {
    render(item) {
        return  `<div class='item-wrapper'>
                    <div class='item-props'>
                        <div class='prop'>Наименование: ${item.name}</div>
                        <div class='prop'>Цена за ед.: ${item.price}</div>
                    </div>
                    <button class='button-buy' data-id="${item.id}">Купить</button>
                </div>`
    }
}

const cart = {
    cartBlock: null,
    cartButton: null,
    cartItem,
    items: [],

    addToCart(item, amount) {
        productIndex = this.isInCart(item);
        if (productIndex >= 0) {
            this.items[productIndex].amount += amount;
        }
        else {
            item['amount'] = amount;
            this.items.push(item);
        }
    },

    isInCart(item) {
        if (this.items.length) {
            productIndex = 0;
            for (product of this.items) {
                if (item.id == product.id) {
                    return productIndex;
                }
                else {
                    productIndex++;
                    continue;
                };
            };
        }
        return -1;
    },

    getCartPrice() {
        let price = 0;
        for (product in this.items) {
            price += this.items[product].price * this.items[product].amount;
        }
        return price;
    },

    init() {
        this.cartBlock = document.querySelector('.cart');
        this.render();
    },

    render() {
        this.cartBlock.innerHTML = '<h3>Корзина</h3>';
        if (this.items.length) {
            this.items.forEach(item => {
                this.cartBlock.insertAdjacentHTML('beforeend', this.cartItem.render(item));
            });
            this.cartBlock.insertAdjacentHTML('beforeend', `<b>В корзине ${this.items.length} товаров стоимостью ${this.getCartPrice()}</b>`);
        }
        else {
            this.cartBlock.innerHTML = '<h3>Корзина</h3>Корзина пуста';
        }
    }
}

const catalog = {
    cart,
    catalogBlock: null,
    catalogButton: null,
    catalogItem,
    items: [],

    addToCatalog(item) {
        productIndex = this.isInCatalog(item);
        if (productIndex >= 0) {
            return;
        }
        else {
            this.items.push(item)
        }
    },

    isInCatalog(item) {
        if (this.items.length) {
            productIndex = 0;
            for (product of this.items) {
                if (item.id == product.id) {
                    return productIndex;
                }
                else {
                    productIndex++;
                    continue;
                };
            };
        }
        return -1;
    },

    init() {
        this.catalogBlock = document.querySelector('.catalog');
        this.catalogBlock.addEventListener('click', event => this.addToCart(event));
        this.render();
    },

    addToCart(event) {
        console.log('catalog.addToCart запущена');
        if (!event.target.classList.contains('button-buy')) return;
        itemID = +event.target.dataset.id;
        for (item of this.items) {
            if (item.id == itemID) {
                this.cart.addToCart(item, 1);
                this.cart.render();
                return;
            }
        } 
    },

    render() {
        if (this.items.length) {
            this.items.forEach(item => {
                this.catalogBlock.insertAdjacentHTML('beforeend', this.catalogItem.render(item));

            });
        }
        else {
            this.cartBlock.textContent = 'Что-то сломалось: в каталоге отсутсвуют товары';
        }
    }

}

function makeItem(id, name, price) {
    const item = {
        'id': id,
        'name': name,
        'price': price,
        'amount': null
    }
    return item
}


let item1 = makeItem(00001, '6.53" Смартфон Xiaomi Redmi 9A 32 ГБ зеленый', 8499);
let item2 = makeItem(00002, 'Фитнес-браслет Samsung Galaxy Fit2', 3499);
let item3 = makeItem(00003, '6.53" Защитная пленка Domani для смартфона универсальная', 49);
let item4 = makeItem(00004, '11.6" Ноутбук Acer TravelMate B1 TMB118-M-C0EA черный', 13849);
let item5 = makeItem(00005, '11.6" Ноутбук Lenovo IdeaPad Slim 1-11AST-05 серый', 20999);
let item6 = makeItem(00006, '19.5" Монитор DEXP FF201H', 7899);


catalog.addToCatalog(item1);
catalog.addToCatalog(item2);
catalog.addToCatalog(item3);
catalog.addToCatalog(item4);
catalog.addToCatalog(item5);


catalog.init();
cart.init();
