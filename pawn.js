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