"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result;
    },
};

const map = {
    cells: {},
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';
        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);

                this.cells[`x${col}_y${row}`] = td;
            }
        }
    },

    render(snakePointsArray, foodPoint, obstaclePointsArray) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);

        // task_2. Добавляем к ячейкам препятствий класс и добавляем их в usedCells 
        obstaclePointsArray.forEach((point) => {
            const obstacleCell = this.cells[`x${point.x}_y${point.y}`];
            obstacleCell.classList.add('obstacle');
            this.usedCells.push(obstacleCell);
        });
    },
};

const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    setDirection(direction) {
        this.direction = direction;
    },

    isOnPoint(point) {
        return this.getBody().some((snakePoint) => {
            return snakePoint.x === point.x && snakePoint.y === point.y;
        });
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.getBody().unshift(this.getNextStepHeadPoint());
        this.getBody().pop();
    },

    growUp() {
        const lastBodyIndex = this.getBody().length - 1;
        const lastBodyPoint = this.getBody()[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);

        this.getBody().push(lastBodyPointClone);
    },

    getNextStepHeadPoint() {
        const firstPoint = this.getBody()[0];

        switch (this.direction) {
            case 'up':
                return { x: firstPoint.x, y: firstPoint.y - 1 };
            case 'right':
                return { x: firstPoint.x + 1, y: firstPoint.y };
            case 'down':
                return { x: firstPoint.x, y: firstPoint.y + 1 };
            case 'left':
                return { x: firstPoint.x - 1, y: firstPoint.y };
        }
    },
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

// task_2. Объект препятствий
const obstacle = {
    obstacleCells: [],

    generateNewObstacle() {
        this.obstacleCells = [];

        const firstPoint = this.generateFirstObstacleCell();
        this.obstacleCells.push(firstPoint);

        // Размер препятствий задаётся здесь
        for (let i = 0; i <= ((config.getColsCount() + config.getColsCount()) / 2); i++) {
            let nextPoint = null;
            let previousPoint = this.getPreviousObstaclePoint();

            // Пришлось заменить while(true) на for во избежание случая, 
            // когда первая точка генерируется в месте, 
            // где рост количества ячеек препятствия до заданного значения невозможен с учётом условий 
            // isNearbyToSnakeCell(), isFreeCell(), isInGameField()
            for (let j = 0; j <= 10; j++) {
                let rndDirection = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

                switch (rndDirection) {
                    case 1: // up
                        nextPoint = { x: previousPoint.x, y: previousPoint.y - 1 };
                        break;
                    case 2: // right
                        nextPoint = { x: previousPoint.x + 1, y: previousPoint.y };
                        break;
                    case 3: // down
                        nextPoint = { x: previousPoint.x, y: previousPoint.y + 1 };
                        break;
                    case 4: // left
                        nextPoint = { x: previousPoint.x - 1, y: previousPoint.y };
                        break;
                };

                // Проверяем не занята ли ячейка, не находится ли она рядом со змейкой и находится ли она в границах карты. После этого пушим
                if (this.isFreeCell(nextPoint) &&
                    !this.isNearbyToSnakeCell(nextPoint) &&
                    this.isInGameField(nextPoint)) {
                    this.obstacleCells.push(nextPoint);
                    break;
                };
            };
        };
    },

    generateFirstObstacleCell() {
        while (true) {
            let firstPoint = game.getRandomFreeCoordinates();
            if (!this.isNearbyToSnakeCell(firstPoint)) {
                return firstPoint;
            }
        }
    },

    getPreviousObstaclePoint() {
        return this.obstacleCells[this.obstacleCells.length - 1];
    },

    // Проверяет не находится ли ячейка в пределах трёх ячеек от змейки
    isNearbyToSnakeCell(cell) {
        let resultX = false;
        let resultY = false;

        for (let point of snake.body) {
            if (-5 <= (Math.abs(cell.x) - Math.abs(point.x)) && (Math.abs(cell.x) - Math.abs(point.x)) <= 5) {
                resultX = true;
            };
        };
        for (let point of snake.body) {
            if (-5 <= (Math.abs(cell.y) - Math.abs(point.y)) && (Math.abs(cell.y) - Math.abs(point.y)) <= 5) {
                resultY = true;
            };
        };
        return resultX && resultY;
    },

    // Проверяет не занята ли ячейка
    isFreeCell(cell) {
        const exclude = [food.getCoordinates(), ...snake.getBody(), ...this.getObstacleCells()];
        return !exclude.some((point) => cell.x === point.x && cell.y === point.y);
    },

    isInGameField(cell) {
        return cell.x >= 0 && cell.y >= 0 &&
            cell.x < config.getColsCount() && cell.y < config.getRowsCount()
    },

    getObstacleCells() {
        return this.obstacleCells;
    },
}

const game = {
    config,
    map,
    snake,
    food,
    obstacle, // task_2
    status,
    tickInterval: null,
    userPoints: 0,

    init(userSettings = {}) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.log(err);
            }

            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        this.setEventHandlers();
        this.reset();
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());

        // task_1. DRY. 
        // Чтобы не писать повторно блок кода, для обнуления очков при начале новой игры 
        // после только что сыгранной необходимо вызвать функцию addPoint() при userPoints = -1
        this.userPoints = -1;
        this.addPoint();

        // task_2
        this.obstacle.obstacleCells = [];
        this.userPoints = 0;

        this.render();
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => {
            this.tickHandler();
        }, 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },

    tickHandler() {
        if (!this.canMakeStep()) return this.finish();
        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            // task_1
            this.addPoint();
            // task_2. Обновляем местоположение препятствия каждые три очка.
            if (this.userPoints % 3 == 0) {
                obstacle.generateNewObstacle();
            };

            this.food.setCoordinates(this.getRandomFreeCoordinates());

            if (this.isGameWon()) this.finish();
        }

        this.snake.makeStep();
        this.render();
    },

    // task_1. Добавляет очко игроку
    addPoint() {
        this.userPoints += 1;

        const userPointsBlock = document.getElementById('user-points');
        userPointsBlock.innerHTML = '';
        userPointsBlock.insertAdjacentHTML('beforeend', this.renderUserPoints());
    },

    // task_1. Генерирует шаблонную строку для отображения очков игрока
    renderUserPoints() {
        return `<p>Ваш счёт: ${this.userPoints}</p>`
    },

    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isOnPoint(nextHeadPoint) &&
            nextHeadPoint.x < this.config.getColsCount() &&
            nextHeadPoint.y < this.config.getRowsCount() &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0 &&
            // task_2
            !this.isObstaclePoint(nextHeadPoint);
    },

    // task_2. Проверяем не находится ли голова змеи на следующем ходе в препятствии
    isObstaclePoint(cell) {
        return [...obstacle.getObstacleCells()].some((point) => cell.x === point.x && cell.y === point.y);
    },

    setPlayButton(txt, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = txt;

        isDisabled
            ? playButton.classList.add('disabled')
            : playButton.classList.remove('disabled');
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            },
        ];
    },

    getRandomFreeCoordinates() {
        // task_2. Добавил проверку на ячейку препятсвия
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody(), ...this.obstacle.getObstacleCells()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            // if (!exclude.some((exPoint) => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) return rndPoint;
            if (!exclude.some((exPoint) => {
                return rndPoint.x === exPoint.x && rndPoint.y === exPoint.y;
            })) return rndPoint;
        }
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', (event) => {
            this.keyDownHandler(event);
        });
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) this.snake.setDirection(direction);
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.obstacle.getObstacleCells());
    },
};



game.init({ speed: 8, winFoodCount: 50 });
