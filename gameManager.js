class GameManager {
    constructor(coord) {
        this.coord = coord
        this.pawnSize = 125
    }

    reset() {
        for (let i = 0; i < this.coord.length; i++) {
            for (let j = 0; j < this.coord.length; j++) {
                if (i == 0)
                    this.coord[i][j].pres = 'b'
                if (i == 1)
                    this.coord[i][j].pres = 'e'
                if (i == 2)
                    this.coord[i][j].pres = 'w'
            }
        }
        this.update()
    }

    update() {
        let curX
        let curY
        let curPres
        let pawn
        for (let i = 0; i < this.coord.length; i++) {
            for (let j = 0; j < this.coord.length; j++) {
                curX = this.coord[i][j].x
                curY = this.coord[i][j].y
                curPres = this.coord[i][j].pres
                pawn = new Pawn(curX, curY, this.pawnSize, curPres)

                pawn.show()
                
            }
        }
    }
}

class Pawn {
    constructor(x, y, size, pres) {
        this.x = x
        this.y = y
        this.size = size
        this.pres = pres
    }

    show() {
        strokeWeight(4)
        switch (this.pres) {
            case 'b':
                fill(0)
                stroke(255)
                break;
            case 'w':
                fill(255)
                stroke(0)
                break;
            case 'e':
                noFill()
                noStroke()
                break;
        }

        ellipse(this.x, this.y, this.size)
    }

    clicked() {
        if (dist(mouseX, mouseY, this.x, this.y) < this.size/2) {
            console.log("pawn")
        }
    }
}