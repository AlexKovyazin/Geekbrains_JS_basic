/*
Присвоить переменной а значение в промежутке [0..15]. 
С помощью оператора switch организовать вывод чисел от a до 15.
*/

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}


function printNumbers(num) {
    if (num > 15) {
        return null
    }

    alert(num);
    printNumbers(++num);
}


let a = getRandomIntInclusive(0, 15);
alert(`Число а = ${a}`);

switch (a) {
    case 0:
        printNumbers(0);
        break;
    case 1:
        printNumbers(1);
        break;
    case 2:
        printNumbers(2);
        break;
    case 3:
        printNumbers(3);
        break;
    case 4:
        printNumbers(4);
        break;
    case 5:
        printNumbers(5);
        break;
    case 6:
        printNumbers(6);
        break;
    case 7:
        printNumbers(7);
        break;
    case 8:
        printNumbers(8);
        break;
    case 9:
        printNumbers(9);
        break;
    case 10:
        printNumbers(10);
        break;
    case 11:
        printNumbers(11);
        break;
    case 12:
        printNumbers(12);
        break;
    case 13:
        printNumbers(13);
        break;
    case 14:
        printNumbers(14);
        break;
    case 15:
        printNumbers(15);
        break;
}

/*
Но можно же обойтись просто функцией и передать в нее переменную а
Или написать цикл
*/
