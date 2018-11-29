function range(start, end) {
    return [...Array(end-start+1).keys()].map(i => i + start);
}

export default (CellFactory, OrganismFactory, width, height) => {

    const GRID_WIDTH = 10
    const GRID_HEIGHT = 10

    const cells = [] //@TODO Array(height).fill().map((_, i) => i * i);

    //
    for(let row = 0;row < height; row++) {
        cells[row] = []
        for(let col = 0; col < width; col++) {
            cells[row][col] = CellFactory(OrganismFactory, col, row)
        }
    }

    //

    cells.forEach((row, y) => row.forEach((cell, x) => {
        const neighbours = []

        const notMe = (x, y) => {
            return !(x == 0 && y == 0);
        }

        const inBound = (x, y) => {
            return y>=0
                && y<height
                && x>=0
                && x<width
        }

        range(-1, 1).forEach(offsetX => {
            range(-1, 1).forEach(offsetY => {
                if(notMe(offsetX, offsetY) && inBound(y+offsetY, x+offsetX)) {
                    neighbours.push(cells[y+offsetY][x+offsetX])
                }
            })
        })

        cell.add(neighbours)
    }))

    //console.log(cells)

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

    const initialize = (initialDispatch)  => {
        cells.forEach((row, y) => row.forEach((cell, x) => {
            initialDispatch
                .filter(dispatch => dispatch.x === x && dispatch.y === y)
                .map(dispatch => cell.receive(dispatch.spores))

            cell.incubate(cell)
        }))
    }

    const render = (context, width, height) => {
        context.clearRect(0, 0, width, height);

        cells.forEach((row, rowIndex) => row.forEach((_, col) => {
            renderCellWith(context)(rowIndex, col)
        }))
    }

    const startCycle = () => {
        cells.forEach((row, _) => row.forEach((cell, _) => {
            cell.dispatch()
        }))

        cells.forEach((row, _) => row.forEach((cell, _) => {
            cell.incubate(cell)
        }))
    }

    return { initialize, render, startCycle }

}
