import { Cell } from './Cell'

export const World = (width, height) => {
    
    const GRID_WIDTH = 10
    const GRID_HEIGHT = 10

    const cells = [] //@TODO Array(height).fill().map((_, i) => i * i);

    //
    for(let row = 0;row < height; row++) {
        cells[row] = []
        for(let col = 0;col < width; col++) {
            cells[row][col] = Cell({}, row, col)
        }
    }

    
    //

    cells.forEach((row, rowIndex) => row.forEach((cell, col) => {
        const neighbours = []

        const notMe = (x, y) => {
            return x != 0 && y != 0;            
        }

        const inBound = (x, y) => {
            return y>0
                && y<height
                && x>0
                && x<width
        }

        for(let x = -1;x <= 1; x++) {
            for(let y = -1;y <= 1; y++) {
                if(notMe(x, y) && inBound(rowIndex+y, col+x)) {
                    //console.log("QSDFQSDQMKSDJQMSKDJQMSDJ")
                    neighbours.push(cells[rowIndex+y][col+x])
                }
            }
        }


        console.log('before', cell)
        console.log('neighbours', neighbours)
        cell.add(neighbours)
        console.log('after', cell)
    }))

    console.log(cells)

    const getCoords = (col, row) => {
        return {
            x: col * GRID_WIDTH,
            y: row * GRID_HEIGHT
        }
    }

    const renderCellWith = context => (row, col) => {
        //debugger
        const coords = getCoords(col, row)

        context.beginPath()
        context.translate(coords.x, coords.y)
    
        //
        cells[row][col].render(context, GRID_WIDTH,GRID_HEIGHT)
    
        //
        context.fill()
        context.translate(-coords.x, -coords.y)
    }

    return {
        render: context => {
            cells.forEach((row, rowIndex) => row.forEach((_, col) => {
                renderCellWith(context)(rowIndex, col)
            }))            
        }
    }


}
