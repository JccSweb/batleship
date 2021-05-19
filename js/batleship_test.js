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
    ships: [{
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
    ],
    fire: function (guess) {
        console.log(guess)
        for (let i = 0; i < this.numShips; i++) {
            console.log(guess)
            let ship = this.ships[i];
            var index = ship.locations.indexOf(guess);

            if (index >= 0) {
                console.log("1")
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


/* view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26"); */

model.fire("53");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("44");
model.fire("12");
model.fire("11");
model.fire("10");


console.log(controler.parseGuess("A0"));
console.log(controler.parseGuess("B6"));
console.log(controler.parseGuess("G3"));
console.log(controler.parseGuess("H0"));
console.log(controler.parseGuess("A7"));


controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");

controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");


controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");