var secretColour;
var secretColourCode;
var mode = "rgb" //rgb or cmy
var guessNum;
//called when 'play' pressed

pickColour();

function pickColour() {
    //clear previous guesses
    guessNum = 0;
    const guessTable = document.getElementsByClassName("table")[0]
    guessTable.innerHTML = ""

    const red = Math.floor(Math.random()*256);
    const green = Math.floor(Math.random()*256);
    const blue = Math.floor(Math.random()*256);
    secretColour = {
        "red":red,
        "green":green,
        "blue":blue,
    }
    secretColourCode = `rgb(${red}, ${green}, ${blue})`;

    const swatch = document.getElementById("swatch")
    swatch.style.background = `linear-gradient(90deg, ${secretColourCode} 50%, white 50%)`;

    const miniswatch = document.getElementsByClassName("compare")[0]
    miniswatch.style.background = `linear-gradient(90deg, ${secretColourCode} 50%, white 50%)`
    
    const playButton = document.getElementsByClassName("playButton")[0];
    playButton.style.display = "none";

    //reset the game otherwise
    const guessContainer = document.getElementsByClassName("guessContainer")[0];

}

function checkColour(guessColour) {
    //gets and rgb string
    //automate a bit - split guesscolour and secretcolour in the same way, then calculate abs distance for each, and assign colours
    const redG = Number(guessColour.split("(")[1].split(",")[0]);
    const greenG = Number(guessColour.split(",")[1]);
    const blueG = Number(guessColour.split(",")[2].slice(0, -1));

    const redD = Math.abs(redG-secretColour.red);
    const greenD = Math.abs(greenG-secretColour.green);
    const blueD = Math.abs(blueG-secretColour.blue);

    console.log(redD, greenD, blueD)
    return {
        "red": redD, 
        "green": greenD, 
        "blue": blueD
        };
}

function submitColour() {
    guessNum += 1
    addNum(guessNum);

    var guessColour
    if (mode === "rgb") {
        const red = document.getElementById("red")
        const green = document.getElementById("green")
        const blue = document.getElementById("blue")
    
        const redVal = (red.value | 0)
        const greenVal = (green.value | 0)
        const blueVal = (blue.value | 0)

        addCell(redVal)
        addCell(greenVal)
        addCell(blueVal)

        guessColour = `rgb(${redVal}, ${greenVal}, ${blueVal})`
        console.log(guessColour)

    } else if (mode === "cmy") {
        const cyan = document.getElementById("cyan")
        const magenta = document.getElementById("magenta")
        const yellow = document.getElementById("yellow")

        const cyanVal = (cyan.value | 0)
        const magentaVal = (magenta.value | 0)
        const yellowVal = (yellow.value | 0)

        addCell(cyanVal)
        addCell(magentaVal)
        addCell(yellowVal)

        guessColour = `rgb(${255 - (cyan.value | 0)}, ${255 - (magenta.value | 0)}, ${255 - (yellow.value | 0)})`
        console.log(guessColour)

    }

    addSwatch(secretColourCode, guessColour)

    const swatch = document.getElementById("swatch")
    swatch.style.background = `linear-gradient(90deg, ${secretColourCode} 50%, ${guessColour} 50%)`
    console.log(guessColour);

    //check colour accuracy
    const diffs = checkColour(guessColour);
    const diffsArr = Object.values(diffs);
    console.log(diffsArr)

    const table = document.getElementsByClassName("table")[0]
    const cells = Array.from(table.childNodes).slice(-4, -1)
    console.log(cells)

    let correctCount = 0;

    for (let i = 0; i<3; i++) {
        const thisCell = cells[i].childNodes[0];
    
        if (diffsArr[i] == 0) {
            thisCell.style.backgroundColor = "rgb(120, 242, 179)"
            correctCount += 1.1
        } else if (diffsArr[i] <= 5) {
            thisCell.style.backgroundColor = "rgb(67, 182, 27)"
            correctCount += 1
        } else if (diffsArr[i] <= 20) {
            thisCell.style.backgroundColor = "rgb(247, 196, 68)"
        }
    }

    console.log(correctCount);

    if (correctCount >= 3.3) {
        console.log("Exact Win!!!")
        //exactly correct! hide submit button, play again?
    } else if (correctCount >= 3.0) {
        console.log("Win!!!")
        //disable/hide submit button
        //close enough! do you want to continue for an exact match?
    }
}

function addCell(val) {
    const table = document.getElementsByClassName("table")[0]

    const tableCell = document.createElement("div")
    tableCell.className = "grid-item"

    const text = document.createElement("p")
    text.innerText = val;

    tableCell.appendChild(text)
    table.appendChild(tableCell)
} 

function addSwatch(correct, guess) {
    const table = document.getElementsByClassName("table")[0]

    const tableCell = document.createElement("div")
    tableCell.className = "grid-item"

    const swatch = document.createElement("div")
    swatch.className = "miniswatch compare"
    swatch.style.background = `linear-gradient(90deg, ${correct} 50%, ${guess} 50%)`

    tableCell.appendChild(swatch)
    table.appendChild(tableCell)
}

function addNum(num) {
    const table = document.getElementsByClassName("table")[0]

    const tableCell = document.createElement("div")
    tableCell.className = "grid-item guess-number"

    const text = document.createElement("p")
    text.innerText = num;

    tableCell.appendChild(text)
    table.appendChild(tableCell)
}