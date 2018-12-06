function range(start, end) {
    return [...Array(end-start+1).keys()].map(i => i + start);
}

export default (CellFactory, OrganismFactory, width, height) => {

    const GRID_WIDTH = width
    const GRID_HEIGHT = height

    const cells = [];

    range(0, width*height - 1).forEach(i => {
        cells.push(CellFactory(OrganismFactory, i % width, Math.floor(i / height)))
    })

    cells.forEach(source => {
        source.add(cells.filter(target => {
            return target !== source
                && Math.abs(target.getPosition().x - source.getPosition().x) <= 1
                && Math.abs(target.getPosition().y - source.getPosition().y) <= 1
        }))
    })

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
        initialDispatch.forEach(dispatch => {
            cells
                .filter(cell => dispatch.x === cell.getPosition().x && dispatch.y === cell.getPosition().y)
                .map(cell => {
                    cell.receive(dispatch.spores)
                    cell.incubate()
                })
        })
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
