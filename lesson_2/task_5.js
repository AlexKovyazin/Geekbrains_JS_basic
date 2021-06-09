/*
Реализовать четыре основные арифметические операции в виде функций с двумя параметрами.
Обязательно использовать оператор return.
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


let a = 6
let b = 2
alert(`a = ${a}`)
alert(`b = ${b}`)

alert(`Результат сложения a и b функцией add равен ${add(a, b)}`)
alert(`Результат вычитания a и b функцией sub равен ${sub(a, b)}`)
alert(`Результат умножения a и b функцией mul равен ${mul(a, b)}`)
alert(`Результат деления a и b функцией div равен ${div(a, b)}`)
