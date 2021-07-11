const width = 1905
const height = 925

const relX = 650
const relY = 100
const size = 600

// TODO aggiungere booleano per la presenza del pedone
const coord = [
    [{ x: relX + 100, y: relY + 100, pres: 'e', active: false }, { x: relX + 300, y: relY + 100, pres: 'e', active: false }, { x: relX + 500, y: relY + 100, pres: 'e', active: false }],
    [{ x: relX + 100, y: relY + 300, pres: 'e', active: false }, { x: relX + 300, y: relY + 300, pres: 'e', active: false }, { x: relX + 500, y: relY + 300, pres: 'e', active: false }],
    [{ x: relX + 100, y: relY + 500, pres: 'e', active: false }, { x: relX + 300, y: relY + 500, pres: 'e', active: false }, { x: relX + 500, y: relY + 500, pres: 'e', active: false }],
]

let table
let gameManager
let cnv
function setup() {
    cnv = createCanvas(width, height)
    table = new Table(relX, relY, size)
    gameManager = new GameManager(coord, size)
    gameManager.reset()
}

function draw() {
    background(225)
    table.show()
    gameManager.update()
}

function mousePressed() {
    if(isResetPressed(mouseX, mouseY)){
        gameManager.reset()
        return 
    }
    let cell = cellFromCoords(mouseX, mouseY, gameManager.getCoord())
    console.log(cell)
    if (cell == -1) return

    gameManager.toggleActive(cell.row, cell.col)

    console.table(gameManager.getCoord())
}

function cellFromCoords(x, y, coord) {
    let row
    let col
    for (i in coord) {
        col = coord[i].findIndex((cell, j) => (cell.x - 100 < x && cell.x + 100 > x) && (cell.y - 100 < y && cell.y + 100 > y))
        if (col != -1) {
            row = i
            break
        }
    }
    return col == -1 ? col : { row: Number(row), col: Number(col) }
}

function isResetPressed(x, y) {
    if(x > 10 && x < 110 && y > 10 && y < 110) return true

    return false
}