let view = {
    displayMessage: function (msg) {
        let messageArea = document.getElementById("messageArea")
        messageArea.innerHTML = msg
    },

    displayHit: function (location) {
        let cell = document.getElementById(location)
        cell.setAttribute("class", "hit")
    },

    displayMiss: function (location) {
        let cell = document.getElementById(location)
        cell.setAttribute("class", "miss")
    }

}

let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    generateShipLocations: function () {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip()
            } while (this.collision(locations))
            this.ships[i].locations = locations
        }
    },
    /* ships: [{
            locations: ["06", "16", "26"],
            hits: ["", "", ""]
        },
        {
            locations: ["24", "34", "44"],
            hits: ["", "", ""]
        },
        {
            locations: ["10", "11", "12"],
            hits: ["", "", ""]
        }
    ], */
    ships: [{
            locations: [0, 0, 0],
            hits: ["", "", ""]
        },
        {
            locations: [0, 0, 0],
            hits: ["", "", ""]
        },
        {
            locations: [0, 0, 0],
            hits: ["", "", ""]
        }
    ],
    generateShip: function () {
        let direction = Math.floor(Math.random() * 2)
        let row;
        let col;
        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)))
        } else {
            row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)))
            col = Math.floor(Math.random() * this.boardSize);
        }

        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },
    collision: function (locations) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true
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
                view.displayHit(guess)
                view.displayMessage("HIT")
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my batleship")
                    this.shipsSunk++;
                }
                return true
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.")
        return false
    },

    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false
            }
        }
        return true
    }
}


let controller = {
    guesses: 0,
    tried: [],
    processGuess: function (guess) {
        let location = this.parseGuess(guess)
        if (this.tried.indexOf(guess) >= 0) {
            alert("Oops, you already used that value");
            return false;
        }
        this.tried.push(guess)
        if (location) {
            this.guesses++;
            let hit = model.fire(location)
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage(`You sank all my ships, in ${this.guesses} guesses`)
            }
        }
    },
    parseGuess: function (guess) {
        const alphabet = ["A", "B", "C", "D", "E", "F", "G"];
        if (guess === null || guess.length !== 2) {
            alert("Oops, please enter a letter and a number on the board")
        } else {

            let firstChar = guess.charAt(0);
            let row = alphabet.indexOf(firstChar);
            let column = guess.charAt(1);

            if (isNaN(row) || isNaN(column)) {
                alert("Oops, that isn't on the board");
            } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
                alert("Oops, that's off the board!")
            } else {
                return row + column;
            }
        }
        return null;
    }
}


function init() {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    let guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}

function handleFireButton() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {
    let fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}
window.onload = init;