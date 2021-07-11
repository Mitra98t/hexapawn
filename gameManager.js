class GameManager {
    constructor(coord, boardSize) {
        this.coord = coord
        this.pawnSize = 125
        this.cellsize = boardSize / this.coord.length
        // true white - false black
        this.turn = true
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
        this.turn = true
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
        if (this.getTurn() != this.coord[r][c].pres && this.isSomeActive() == -1) return

        if (this.coord[r][c].pres == 'e') {
            if (this.isSomeActive() != -1) {
                let activeCoord = this.isSomeActive()
                if(!this.isMoveOk(activeCoord.row, activeCoord.col, r, c)) return
                let type = this.coord[activeCoord.row][activeCoord.col].pres
                this.coord[activeCoord.row][activeCoord.col].pres = 'e'
                this.coord[activeCoord.row][activeCoord.col].active = false
                this.coord[r][c].pres = type
                this.nextTurn()
                return
            }
            return
        }


        if (this.coord[r][c].active)
            this.coord[r][c].active = !this.coord[r][c].active
        else if (this.isSomeActive() == -1) {
            console.log(this.isSomeActive())
            this.coord[r][c].active = !this.coord[r][c].active
        }
        else {
            let activeCoord = this.isSomeActive()
            if (this.coord[activeCoord.row][activeCoord.col].pres == this.coord[r][c].pres) {
                this.coord[activeCoord.row][activeCoord.col].active = !this.coord[activeCoord.row][activeCoord.col].active
                this.coord[r][c].active = !this.coord[r][c].active
            }
            else {
                if(!this.isMoveOk(activeCoord.row, activeCoord.col, r, c)) return
                this.coord[r][c].pres = this.coord[activeCoord.row][activeCoord.col].pres
                this.coord[activeCoord.row][activeCoord.col].pres = 'e'
                this.coord[activeCoord.row][activeCoord.col].active = !this.coord[activeCoord.row][activeCoord.col].active
                this.nextTurn()
            }
        }

        return
    }

    isSomeActive() {
        for (let i = 0; i < this.coord.length; i++) {
            for (let j = 0; j < this.coord.length; j++) {
                if (this.coord[i][j].active)
                    return { row: i, col: j }
            }
        }

        return -1
    }

    nextTurn() {
        this.turn = !this.turn
        return this.turn
    }

    getTurn() {
        return this.turn ? 'w' : 'b'
    }

    isMoveOk(sR, sC, fR, fC) {
        console.log(sR, sC, fR, fC)
        if (sC == fC) {
            if (this.coord[sR][sC].pres == 'w') {
                if (sR == fR + 1) {
                    if (this.coord[fR][fC].pres == 'e')
                        return true
                }
            }
            else{
                if (sR == fR - 1) {
                    if (this.coord[fR][fC].pres == 'e')
                        return true
                }
            }
            return false
        }
        else{
            if(sC == fC + 1 || sC == fC - 1){
                if (this.coord[sR][sC].pres == 'w') {
                    if (sR == fR + 1) {
                        if (this.coord[fR][fC].pres == 'b')
                            return true
                    }
                }
                else{
                    if (sR == fR - 1) {
                        if (this.coord[fR][fC].pres == 'w')
                            return true
                    }
                }
                return false
            }
        }
        return false
    }
}