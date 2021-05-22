let view = {
    displayMessage: function (msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },

    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit border");
    },

    displayMiss: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss border");
        },
        resetBoard: function () {
            let cells = document.querySelectorAll(".border");
            cells.forEach((element) => {
                element.removeAttribute("class");
                element.setAttribute("class", "border");
            });
            let restartButton = document.getElementById("restart");
            restartButton.setAttribute("class", "hidden");
            this.displayMessage("Click on the grid to starting shooting my ships!");
        },
        };

let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    generateShipLocations: function () {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
                }
            while (this.collision(locations));
            this.ships[i].locations = locations;
            }
    },
    ships: [{
        locations: [0, 0, 0],
        hits: ["", "", ""],
        }, {
            locations: [0, 0, 0],
        hits: ["", "", ""],
        }, {
            locations: [0, 0, 0],
        hits: ["", "", ""],
        }, ],
    generateShip: function () {
        let direction = Math.floor(Math.random() * 2);
        let row;
        let col;
        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(
                Math.random() * (this.boardSize - (this.shipLength + 1))
            );
        } else {
            row = Math.floor(
                Math.random() * (this.boardSize - (this.shipLength + 1))
            );
            col = Math.floor(Math.random() * this.boardSize);
        }

        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push(row + i + "" + col);
            }
        }
        return newShipLocations;
    },
    collision: function (locations) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },
    fire: function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },

    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
        },
        resetModel: function () {
            this.shipsSunk = 0;
            this.ships = [{
                locations: [0, 0, 0],
                hits: ["", "", ""],
            }, {
                locations: [0, 0, 0],
                hits: ["", "", ""],
            }, {
                locations: [0, 0, 0],
                hits: ["", "", ""],
            }, ]
        }
        };

let controller = {
    guesses: 0,
    tried: [],
    processGuess: function (location) {
            if (model.numShips === model.shipsSunk) {
                alert("You already won!");
                return false;
            }
            if (this.tried.indexOf(location) >= 0) {
            alert("Oops, you already used that value");
            return false;
        }
        this.tried.push(location);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage(
                    `You sank all my ships, in ${this.guesses} guesses`
                );
                let restartButton = document.getElementById("restart");
                restartButton.removeAttribute("class", "hidden");
            }
        }
    },
    resetController: function () {
        this.guesses = 0;
        this.tried = [];
    }
};

function init() {
    let positions = document.querySelectorAll(".border");
    positions.forEach((element) => {
        element.addEventListener("click", () => {
            let id = element.id;
            controller.processGuess(id);
        });
    });
    model.generateShipLocations();
    let restartButton = document.getElementById("restart");
    restartButton.addEventListener("click", () => {
                view.resetBoard();
                controller.resetController();
                model.resetModel();
                model.generateShipLocations();
    });
}
window.onload = init;