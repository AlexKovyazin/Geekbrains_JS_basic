/*
1. Создать функцию, генерирующую шахматную доску. 
При этом можно использовать любые html-теги по своему желанию. 
Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. 
Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
*/

function createChessDesk() {
    chessDesk = document.getElementById('chess-desk');

    for (let row = 0; row < 10; row++) {
        const trElem = document.createElement('tr');
        chessDesk.appendChild(trElem)

        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('td');
            trElem.appendChild(cell);

            // Задаем классы ячейкам с подписями строк и столбцов
            if (row == 0 | row == 9) {
                cell.className = 'col-text';
            }
            else if (col == 0 | col == 9) {
                cell.className = 'str-text';
            }
            else if ((row + col) % 2 != 0) {
                cell.className = 'black';
            }
            else {
                cell.className = 'white';
            }
        }
    }

    // Подписываем столбцы
    let colCharCnt = 97;
    let colPairCnt = 1;
    let colStartEnd = 0;
    for (el of document.getElementsByClassName('col-text')) {
        // Откатываем состояние счётчика до кода буквы "a" при достижении кода "h"
        if (colCharCnt == 105) {
            colCharCnt = 97;
        }
        // Оставляем пустыми столбцы находящиеся за пределами поля доски
        if (colStartEnd == 0 | colStartEnd == 9 | colStartEnd == 10 | colStartEnd == 19) {
            colStartEnd++;
            continue;
        }
        // Добавляем в ячейку букву по коду
        el.innerHTML = `${String.fromCharCode(colCharCnt++)}`;
        colStartEnd++;
    }

    // Подписываем строки
    let strCnt = 1;
    let strPairCnt = 1;
    for (el of document.getElementsByClassName('str-text')) {
        if (strCnt > 8) {
            strCnt = 1;
        }
        // В каждой строке находится два элемента класса 'str-text', поэтому цифры необходимо вставлять парами
        if (strPairCnt % 2 == 0) {
            el.innerHTML = `${strCnt++}`;
        }
        else {
            el.innerHTML = `${strCnt}`;
        }
        strPairCnt++;

    }

    // Задаем классы черным и белым клеткам
    for (el of document.getElementsByClassName('black')) {
        el.style.backgroundColor = 'black';
        el.style.height = '20px';
        el.style.width = '20px';
        el.style.borderSpacing = '0px';
    }
    for (el of document.getElementsByClassName('white')) {
        el.style.borderSpacing = '0px';
        el.style.borderStyle = 'solid';
        el.style.borderWidth = '1px';
    }
    for (el of document.getElementsByClassName('col-text')) {
        el.style.textAlign = 'center';
    }
    for (el of document.getElementsByClassName('str-text')) {
        el.style.textAlign = 'center';
    }
}

createChessDesk();
