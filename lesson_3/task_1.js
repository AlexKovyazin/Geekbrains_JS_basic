/*
С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/

let currentNum = 1;     // текущее делимое

while (currentNum <= 100) {
    let subCounter = 0; // счётчик делений
    let subNum = 1;     // текущий делитель
    while (subNum <= currentNum) {
        if (currentNum % subNum == 0) {
            subCounter++;
            if (subCounter > 2) {
                break;
            }
        }
        subNum++
    }
    if (subCounter <= 2) {
        console.log (currentNum);
    }
    currentNum++;
}
