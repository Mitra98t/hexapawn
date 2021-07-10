class Table {
    constructor(x, y, size) {
        this.relX = x
        this.relY = y
        this.size = size
    }

    show() {
        stroke(0)
        strokeWeight(4)
        fill(255)
        rect(this.relX, this.relY, this.size)

        noStroke()

        let grad = true
        for (let i = 0; i < this.size; i += this.size / 3) {
            let x = this.relX
            let y = this.relY
            for (let j = 0; j < this.size; j += this.size / 3) {
                fill(grad ? 255 : 0)
                grad = !grad
                rect(x + i, y + j, this.size / 3)
            }
        }
    }

}