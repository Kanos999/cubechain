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
        this.cube[3][3] = colors.YELLOW;

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
        this.cube[6][3] = colors.YELLOW;

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
        this.cube[9][3] = colors.WHITE;
    }


    // given an (x, y), rotate the face around that position
    moveLeft(turns=1) {
        console.log("Moving left");
        for (let i = 0; i < turns; i++) {
            this.rotateFace(4,1, 3);
            this.shiftCol(3, 3);  
        }
              
    }

    moveRight(turns=1) {
        console.log("Moving Right");
        for (let i = 0; i < turns; i++) {
            this.rotateFace(4,7, 3);
            this.shiftCol(5, -3); 
        }
    }

    moveUp(turns=1) {
        console.log("Moving up");
        for (let i = 0; i < turns; i++) {
            this.moveRight(3);  
            this.moveLeft();  
            this.shiftCol(4, 3);  
            this.moveFront();

            this.moveRight();  
            this.moveLeft(3);  
            this.shiftCol(4, -3); 
        }
    }

    moveDown(turns=1) {
        console.log("Moving down");
        for (let i = 0; i < turns; i++) {
            this.moveRight();  
            this.moveLeft(3);  
            this.shiftCol(4, -3);  
            this.moveFront();

            this.moveRight(3);  
            this.moveLeft();  
            this.shiftCol(4, 3); 
        }
    }

    moveFront(turns=1) {
        console.log("Moving front");
        for (let i = 0; i < turns; i++) {
            this.rotateFace(4,4, 5);
        }
    }

    moveBack(turns=1) {
        console.log("Moving back");
        for (let i = 0; i < turns; i++) {
            this.rotateFace(4,4, 9);
            this.rotateFace(4,4, 9);
            this.rotateFace(4,4, 9);

            this.rotateFace(4,4, 7);

            this.rotateFace(10,4, 3);
        }
    }


    // Rotate a size*size grid centered at x,y clockwise
    rotateFace(x,y, size) {
        //take a copy of the face
        var N = Math.floor(size / 2);
        var tmp = [];
        for (let i = x-N; i <= x+N; i++) {
            tmp[i-x+N] = [];
            for (let j = y-N; j <= y+N; j++) {
                tmp[i-x+N][j-y+N] = this.cube[i][j]
            }
        }

        tmp = rotate90Clockwise(tmp, size);

        for (let i = x-N; i <= x+N; i++) {
            for (let j = y-N; j <= y+N; j++) {
                var tmpCell = tmp[i-x+N][j-y+N]
                if (!tmpCell) continue;
                this.cube[i][j] = tmpCell;
            }
        }
    }


    // Shifts a column downwards by N cells
    shiftCol(col, N) {
        const numRows = this.cube.length;
        let tmp = [];
        for (let i = 0; i < numRows; i++) {
            tmp[i] = this.cube[(i - N + numRows) % numRows][col];
        }
        for (let i = 0; i < numRows; i++) {
            this.cube[i][col] = tmp[i];
        }
    }

}



function rotate90Clockwise(arr, N) {
    // printing the matrix on the basis of
    // observations made on indices.
    var newArr = [];
    for (j = 0; j < N; j++) {
        newArr[j] = []
        for (i = N - 1; i >= 0; i--)
            newArr[j][N-i-1] = arr[i][j];
        
    }

    return newArr;
}