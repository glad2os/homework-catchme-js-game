let stop = false;

const game = document.querySelectorAll('.game')[0];
let visibleObjects = [];
let count = 0;
let debug = 0;
setInterval(function () {
    debug++;
    // if (debug === 4) stop = true;
    if (!stop) {
        let template = document.createElement("img");
        template.setAttribute('src', 'assets/apple.png');
        template.setAttribute('height', '50px');
        template.setAttribute('width', '50px');
        template.setAttribute('style', 'position: absolute; top: 0px;');
        template.setAttribute('id', count.toString());
        let randomLeft = getRandomArbitrary(game.getBoundingClientRect()['left'], game.getBoundingClientRect()['left'] + 750);
        template.style.left = randomLeft + "px";
        template.style.top = "0px";
        game.insertAdjacentElement('beforeend', template);

        visibleObjects.push([template, setTimeout(function () {
            const moving = setInterval(function () {

                let topCount = parseInt(template.style.top.substring(0, template.style.top.length - 2));

                if (topCount > 550) {
                    game.removeChild(template);
                    visibleObjects[parseInt(template.getAttribute("id"))] = null;
                    clearInterval(moving);
                }


                topCount++;
                template.style.top = topCount.toString() + "px";
            }, getRandomArbitrary(1, 250))
        }, 1)]);

    }
    count++;
}, 1000);


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
