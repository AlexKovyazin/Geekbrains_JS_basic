// 2. Не выполняя кода, ответить, что выведет браузер и почему:


if (!("a" in window)) {
    var a = 1;
}
alert(a); // 1. 
// Изначально в объекте window не объявлена переменная а. 
// В таком случае выполнится блок if и переменной будет присвоено значение 1.

// Ответ неверный.
// Непонятно почему возвращается undefined.
// console.log(!("a" in window)); возвращает true. Соответственно должен выполняться блок if.

// Нашёл такое объяснение этой магии:
// Функция не будет объявлена, если она определена в любой вложенном блоке: if, while и т. д.
// Т. е. такой пример сработает:

// alert (f (5))
// function f (x) {return (x*x)}

// А вот такой уже нет (даже с условием true):

// alert (f (5))
// if (true)
//   {
//   function f (x) {return (x*x)};
//   }

// Однако, если функция находится НЕ во вложенном блоке, то она БУДЕТ объявлена. Даже если до ее строчки интерпретатор заведомо никогда не дойдет:

// function main ()
//   {
//   alert (f (5));
//   return;
//   function f (x) {return (x*x)};
//   }
// main ();

// Отсюда делаю вывод, что объявлять переменные во вложенных блоках нельзя.


var b = function a(x) {
    x && a(--x);
};
alert(a); // Ошибка.
// Т.к. функция а присвоена переменной b и вызвать функцию по имени 'а' можно только внутри самой функции для рекурсии

// Ответ верный


function a(x) {
    return x * 2;
}
var a;
alert(a); // undefined
// Т.к. командой alert(a) вызывается переменная а, которой не присвоено значение.

// Ответ неверный
// Возвращает функцию a (не результат).

// Попробовал испольнить следующий код:
// var a = 10;
// var a = [1, 2, 3];
// console.log(a); Возвращает array

// Если далее дописать:
// function a(x) {
// return x * 5;
// };
// console.log(a); Вернёт функцию

// Нашел ответ на stackoverflow:
// Functions are a type of object which are a type of value.

// Values can be stored in variables (and properties, and passed as arguments to functions, etc).

// A function declaration:

// Creates a named function
// Creates a variable in the current scope with the same name as the function (unless such a variable already exists)
// Assigns the function to that variable
// Is hoisted
// A var statement:

// Creates a variable in the current scope with the specified name (unless such a variable already exists)
// Is hoisted
// Doesn't assign a value to that variable (unless combined with an assignment operator)
// Both your declaration and var statement are hoisted. Only one of them assigns a value to the variable a.

// Прочитал и усвоил.



function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3); // 10.
// Т.к. был использован метод функций arguments и аргумент a был переопределён

// Ответ верный.


function a() {
    alert(this);
}
a.call(null); // window
// т.к. null расположен в window???

// Ответ неуверенный, но верный
