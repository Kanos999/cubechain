const colors = {
    WHITE: "\x1b[47m  \x1b[0m",
    YELLOW: "\x1b[43m  \x1b[0m",
    RED: "\x1b[41m  \x1b[0m",
    ORANGE: "\x1b[45m  \x1b[0m",
    GREEN: "\x1b[42m  \x1b[0m",
    BLUE: "\x1b[44m  \x1b[0m",
    CLEAR: "\x1b[0m  "
}

module.exports = class RubiksCube { 
    constructor() {
        this.cube = this.initialise();
        this.populateCube();
    }

    initialise() {
        var arr = [];
        for(let i = 0; i < 12; i++) {
            arr[i] = [];
            for(let j = 0; j < 9; j++) {
                arr[i][j] = colors.CLEAR;
            }
        }
        return arr;
    }

    print() {
        for (let i = 0; i < this.cube.length; i++) {
            for (let j = 0; j < this.cube[i].length; j++) {
                process.stdout.write(this.cube[i][j]);
                if (j % 3 == 2) process.stdout.write("  ");
            }
            process.stdout.write("\n");
            if (i % 3 == 2) process.stdout.write("\n");
        }
    }
  
    populateCube() {
        // initialise GREEN
        for(var i = 0; i < 3; i++) {
            for(var j = 3; j < 6; j++) {
                this.cube[i][j] = colors.GREEN;
            }
        }
        this.cube[0][3] = colors.YELLOW;

        // initialise WHITE
        for(var i = 3; i < 6; i++) {
            for(var j = 3; j < 6; j++) {
                this.cube[i][j] = colors.WHITE;
            }
        }

        // initialise RED
        for(var i = 3; i < 6; i++) {
            for(var j = 0; j < 3; j++) {
                this.cube[i][j] = colors.RED;
            }
        }
        this.cube[3][0] = colors.YELLOW;

        // initialise BLUE
        for(var i = 6; i < 9; i++) {
            for(var j = 3; j < 6; j++) {
                this.cube[i][j] = colors.BLUE;
            }
        }

        // initialise ORANGE
        for(var i = 3; i < 6; i++) {
            for(var j = 6; j < 9; j++) {
                this.cube[i][j] = colors.ORANGE;
            }
        }
        this.cube[3][6] = colors.YELLOW;

        // initialise YELLOW
        for(var i = 9; i < 12; i++) {
            for(var j = 3; j < 6; j++) {
                this.cube[i][j] = colors.YELLOW;
            }
        }
    }


    // given an (x, y), rotate the face around that position
    moveLeft() {
        console.log("Moving left");
        this.rotateFace(4,1);
        
    }

    moveRight() {
        console.log("Moving Right");
        this.rotateFace(4,7);
    }

    moveUp() {
        console.log("Moving up");
        this.rotateFace(1,4);
    }

    moveDown() {
        console.log("Moving down");
    }

    moveFront() {
        console.log("Moving front");
    }

    moveBack() {
        console.log("Moving back");
    }


    // Rotate a face centered at x,y
    rotateFace(x,y) {
        //take a copy of the face
        var tmp = [];
        for (let i = x-1; i <= x+1; i++) {
            tmp[i-x+1] = [];
            for (let j = y-1; j <= y+1; j++) {
                tmp[i-x+1][j-y+1] = this.cube[i][j]
            }
        }

        tmp = rotate90Clockwise(tmp);

        for (let i = x-1; i <= x+1; i++) {
            for (let j = y-1; j <= y+1; j++) {
                var tmpCell = tmp[i-x+1][j-y+1]
                if (!tmpCell) continue;
                this.cube[i][j] = tmpCell;
            }
        }
    }

}



function rotate90Clockwise(arr) {
    // printing the matrix on the basis of
    // observations made on indices.
    var newArr = [];
    var N = 3;
    for (j = 0; j < N; j++) {
        newArr[j] = []
        for (i = N - 1; i >= 0; i--)
            newArr[j][N-i-1] = arr[i][j];
        
    }

    return newArr;
}