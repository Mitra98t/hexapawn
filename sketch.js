const width = 1905
const height = 925

const relX = 650
const relY = 100
const size = 600

// TODO aggiungere booleano per la presenza del pedone
const coord = [
    [{ x: relX + 100, y: relY + 100, pres: 'e' }, { x: relX + 300, y: relY + 100, pres: 'e' }, { x: relX + 500, y: relY + 100, pres: 'e' }],
    [{ x: relX + 100, y: relY + 300, pres: 'e' }, { x: relX + 300, y: relY + 300, pres: 'e' }, { x: relX + 500, y: relY + 300, pres: 'e' }],
    [{ x: relX + 100, y: relY + 500, pres: 'e' }, { x: relX + 300, y: relY + 500, pres: 'e' }, { x: relX + 500, y: relY + 500, pres: 'e' }],
]

let table
let gameManager
let cnv
function setup() {
    cnv = createCanvas(width, height)
    table = new Table(relX, relY, size)
    gameManager = new GameManager(coord)
    gameManager.reset()
}

function draw() {
    background(225);
    table.show()
    gameManager.update()
}

function mousePressed() {
    console.log("ciao")
}