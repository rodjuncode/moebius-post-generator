let easycam;
let bigCubeSize = 500;
let levels = 50
let smallerCubeSize = bigCubeSize/levels;
let cubeColors;
let bgColor;

let content = '';
let hMargin = 30;
let vMargin = 40;

//let baseHue = 60;
let baseHue = 280;
let hueDistance = 35;

let hueSlider, inputTxt, saveButton;

let font;
function preload() {
    font = loadFont('CodeDemo-Bold.otf');
}

function setup() {
    createCanvas(400,400,WEBGL);

    generate();

    easycam = createEasyCam({distance:bigCubeSize*2});

    textFont(font);
    textSize(36);
    textAlign(LEFT,TOP);

    hueSlider = createSlider(0, 360, baseHue);
    hueSlider.position(0, height+10);
    hueSlider.style('width', '80px');

    inputTxt = createInput('Um gerador de posts, serve para alguma coisa?');
    inputTxt.position(5, height + 35);    

    saveButton = createButton('Salvar');
    saveButton.position(5, height + 70);
    saveButton.mousePressed(savePoster);

}

function savePoster() {
    save('poster.png');
}

function generate() {
    // bg color
    colorMode(HSB);
    bgColor = color(baseHue+(random(-hueDistance,hueDistance)),100,100);
    colorMode(RGB);
    // analogous cubes
    cubeColors = [];
    for (let i = 0; i < levels; i++) {
        cubeColors[i] = [];
        for (let j = 0; j < levels; j++) {
            cubeColors[i][j] = [];
            for (let k = 0; k < levels; k++) {
                let r = map(i,0,levels,0,255);
                let g = map(j,0,levels,0,255);
                let b = map(k,0,levels,0,255);
                let c = color(r,g,b);
                if (abs(hue(c) - baseHue) < hueDistance && lightness(c) == 50 && saturation(c) > 80) {
                    cubeColors[i][j][k] = map(random(),0,1,smallerCubeSize,smallerCubeSize*2);
                    //cubeColors[i][j][k] = smallerCubeSize;
                } else {
                    cubeColors[i][j][k] = false;
                }

                
            }
        }
    }
}

function draw() {
    background(bgColor);

    if (hueSlider.value() != baseHue) {
        baseHue = hueSlider.value();
        generate();
    }

    translate(-bigCubeSize/2,-bigCubeSize/2,-bigCubeSize/2);

    for (let i = 0; i < levels; i++) {
        for (let j = 0; j < levels; j++) {
            for (let k = 0; k < levels; k++) {
                if (cubeColors[i][j][k] != false) {
                    push();
                    let r = map(i,0,levels,0,255);
                    let g = map(j,0,levels,0,255);
                    let b = map(k,0,levels,0,255);
                    //stroke(r,g,b);
                    fill(r,g,b);
                    translate(i*smallerCubeSize,j*smallerCubeSize,k*smallerCubeSize);
                    box(cubeColors[i][j][k]);
                    pop();
                } 
            }
        }
    }

    
    // HeadUpDisplay
    displayText();

    //noLoop();

}

function displayText() {
    easycam.beginHUD();
    text(inputTxt.value(), hMargin, vMargin, width-hMargin*2, height-vMargin*2);
    easycam.endHUD();

}

// function keyReleased(){
//     if(key == 'r') console.log(easycam.getState());
//     if(key == 's') save('poster.png');
// }


  