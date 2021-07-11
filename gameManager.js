class GameManager {
    constructor(coord, boardSize) {
        this.coord = coord
        this.pawnSize = 125
        this.cellsize = boardSize / this.coord.length
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

                this.coord[i][j].active = false
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

                if (this.coord[i][j].active) {
                    fill(250, 250, 0, 100)
                    noStroke()
                    rect(curX - 100, curY - 100, this.cellsize)
                }

                pawn = new Pawn(curX, curY, this.pawnSize, curPres)
                pawn.show()
            }
        }
    }

    getCoord() { return this.coord }

    toggleActive(r, c) {
        if(this.coord[r][c].pres == 'e'){
            if(this.isSomeActive() != -1){
                let activeCoord = this.isSomeActive()
                let type = this.coord[activeCoord.row][activeCoord.col].pres
                this.coord[activeCoord.row][activeCoord.col].pres = 'e'
                this.coord[activeCoord.row][activeCoord.col].active = false
                this.coord[r][c].pres = type
                return
            }
            return
        }


        if (this.coord[r][c].active)
            this.coord[r][c].active = !this.coord[r][c].active
        else if (this.isSomeActive() == -1){
            console.log(this.isSomeActive())
            this.coord[r][c].active = !this.coord[r][c].active
        }
        else{
            let activeCoord = this.isSomeActive()
            if(this.coord[activeCoord.row][activeCoord.col].pres == this.coord[r][c].pres){
                this.coord[activeCoord.row][activeCoord.col].active = !this.coord[activeCoord.row][activeCoord.col].active
                this.coord[r][c].active = !this.coord[r][c].active
            }
            else{
                this.coord[r][c].pres = this.coord[activeCoord.row][activeCoord.col].pres
                this.coord[activeCoord.row][activeCoord.col].pres = 'e'
                this.coord[activeCoord.row][activeCoord.col].active = !this.coord[activeCoord.row][activeCoord.col].active
            }
        }

        return
    }

    isSomeActive() {
        for(let i = 0; i < this.coord.length; i++){
            for(let j = 0; j < this.coord.length; j++){
                if(this.coord[i][j].active)
                    return {row: i, col: j}
            }
        }

        return -1
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
}