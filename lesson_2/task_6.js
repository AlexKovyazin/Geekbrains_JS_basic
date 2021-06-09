/*
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), 
где arg1, arg2 — значения аргументов, operation — строка с названием операции. 
В зависимости от переданного значения выполнить одну из арифметических операций (использовать функции из пункта 5) 
и вернуть полученное значение (применить switch).
*/

function add(firstNum, secondNum) {
    return firstNum + secondNum
}

function sub(firstNum, secondNum) {
    return firstNum - secondNum
}


function mul(firstNum, secondNum) {
    return firstNum * secondNum
}


function div(firstNum, secondNum) {
    return firstNum / secondNum
}


function mathOperation(arg1, arg2, operation) {
    switch (operation.toLowerCase()) {
        case 'add':
            return add(arg1, arg2);
            break;
        case 'sub':
            return sub(arg1, arg2);
            break;
        case 'mul':
            return mul(arg1, arg2);
            break;
        case 'div':
            return div(arg1, arg2);
    }
}


alert(mathOperation(2, 6, 'add'))
alert(mathOperation(2, 6, 'sub'))
alert(mathOperation(2, 6, 'mul'))
alert(mathOperation(2, 6, 'div'))
