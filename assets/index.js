let stop = false;

const game = document.querySelectorAll('.game')[0];
const counterLabel = document.querySelectorAll('.counter')[0];

let roflanPomoika;
let visibleObjects = [];

const speed = 75;
let count = 0;
let debug = 0;
let catched = 0;

let startDelay = 100;
let generatingDelay = 1000;

setInterval(function () {
    debug++;
    if (!stop) {
        // if (debug === 10) stop = true;

        let roflanObject = document.createElement("img");
        roflanObject.setAttribute('src', 'assets/apple.png');
        roflanObject.setAttribute('height', '50px');
        roflanObject.setAttribute('width', '50px');
        roflanObject.setAttribute('style', 'position: absolute; top: 0px;');
        roflanObject.setAttribute('id', count.toString());
        let randomLeft = getRandomArbitrary(game.getBoundingClientRect()['left'], game.getBoundingClientRect()['left'] + 750);
        roflanObject.style.left = randomLeft + "px";
        roflanObject.style.top = "5px";
        game.insertAdjacentElement('beforeend', roflanObject);

        visibleObjects.push([roflanObject, setTimeout(function () {
            const moving = setInterval(function () {

                let topCount = parseInt(roflanObject.style.top.substring(0, roflanObject.style.top.length - 2));
                if (roflanObject.getBoundingClientRect()["y"] + 25 === roflanPomoika.getBoundingClientRect()['y']) {
                    console.log("EBALO: " + roflanObject.getBoundingClientRect()["x"] + " POMOIKA: " + roflanPomoika.getBoundingClientRect()['x']);

                    if (Math.abs(roflanPomoika.getBoundingClientRect()['x'] - roflanObject.getBoundingClientRect()["x"]) < 50) {
                        catched++;
                        game.removeChild(roflanObject);
                        visibleObjects[parseInt(roflanObject.getAttribute("id"))] = null;
                        clearInterval(moving);
                        counterLabel.innerText = catched.toString();
                    }
                }

                if (roflanObject.getBoundingClientRect()["y"] > roflanPomoika.getBoundingClientRect()['y']) {
                    roflanObject.style.filter = " grayscale(100%)";
                    roflanObject.src = 'assets/pominki.png';
                }

                if (topCount > game.getBoundingClientRect()['bottom'] - 50) {
                    game.removeChild(roflanObject);
                    visibleObjects[parseInt(roflanObject.getAttribute("id"))] = null;
                    clearInterval(moving);
                }

                topCount++;
                roflanObject.style.top = topCount.toString() + "px";
            }, getRandomArbitrary(1, 35))
        }, startDelay)]);

    }
    count++;

}, generatingDelay);


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function execute() {
    roflanPomoika = document.createElement("img");
    roflanPomoika.setAttribute('src', 'assets/pomoika.png');
    roflanPomoika.setAttribute('style', "position: absolute; top: 0px; left:" + game.getBoundingClientRect()['left'] + "px;right:0px;");
    roflanPomoika.setAttribute('height', '100px');
    roflanPomoika.setAttribute('width', '75px');

    roflanPomoika.style.top = "509px";

    game.insertAdjacentElement('beforeend', roflanPomoika);

    function moveLeft() {
        let incLeft = parseInt(roflanPomoika.style.left.substring(0, roflanPomoika.style.left.length - 2));

        if (incLeft - speed > game.getBoundingClientRect()['left'])
            roflanPomoika.style.left = incLeft - speed + "px";
        else
            roflanPomoika.style.left = game.getBoundingClientRect()['left'] + "px";
    }

    function moveRight() {
        let incRight = parseInt(roflanPomoika.style.left.substring(0, roflanPomoika.style.left.length - 2));
        if (incRight + speed < 1286)
            roflanPomoika.style.left = incRight + speed + "px";
        else
            roflanPomoika.style.left = "1286px";

    }

    document.addEventListener("keydown", ev => {

        switch (ev.key) {
            case "a":
                moveLeft();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "A":
                moveLeft();
                break;
            case "d" :
                moveRight();
                break;
            case "D":
                moveRight();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "В":
                moveRight();
                break;
            case "в":
                moveRight();
                break;
            case "ф":
                moveLeft();
                break;
            case "Ф":
                moveLeft();
                break;
        }
    });
}


execute();