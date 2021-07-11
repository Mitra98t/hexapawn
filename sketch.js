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
    if(gameManager.checkWin() == 'w' || gameManager.checkWin() == 'b'){
        table.showWin(gameManager.checkWin())
    }
    else{
        table.show()
        gameManager.update()
    }

}

function mousePressed() {
    if (isResetPressed(mouseX, mouseY)) {
        gameManager.reset()
        return
    }
    let cell = cellFromCoords(mouseX, mouseY, gameManager.getCoord())
    if (cell == -1) return

    gameManager.toggleActive(cell.row, cell.col)
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
    resetPos = table.getResetCoord()
    if (x > resetPos.x && x < resetPos.x + resetPos.sizeX && y > resetPos.y && y < resetPos.y + resetPos.sizeY) return true

    return false
}