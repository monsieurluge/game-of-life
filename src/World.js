function range(start, end) {
    return [...Array(end-start+1).keys()].map(i => i + start);
}

export default (CellFactory, OrganismFactory, width, height) => {

    const GRID_WIDTH = 10
    const GRID_HEIGHT = 10

    const positionedCells = [];

    range(0, width*height - 1).forEach(i => {
        positionedCells.push({
            cell: CellFactory(OrganismFactory),
            position: { x: i % width, y: Math.floor(i / height) }
        })
    })

    positionedCells.forEach(source => {
        source.cell.add(
            positionedCells.filter(target => {
                return target.cell !== source.cell
                    && Math.abs(target.position.x - source.position.x) <= 1
                    && Math.abs(target.position.y - source.position.y) <= 1
            })
            .map(positionedCell => positionedCell.cell)
        )
    })

    const getCoords = (col, row) => {
        return {
            x: col * GRID_WIDTH,
            y: row * GRID_HEIGHT
        }
    }

    const renderCellWith = context => (positionedCell) => {
        //debugger
        const coords = getCoords(positionedCell.position.x, positionedCell.position.y)

        context.beginPath()
        context.translate(coords.x, coords.y)

        //
        positionedCell.cell.render(context, GRID_WIDTH,GRID_HEIGHT)

        //
        context.fill()
        context.translate(-coords.x, -coords.y)
    }

    const initialize = (initialDispatch)  => {
        initialDispatch.forEach(dispatch => {
            positionedCells
                .filter(({position}) => dispatch.x === position.x && dispatch.y === position.y)
                .map(({cell}) => {
                    cell.receive(dispatch.spores)
                    cell.incubate(cell)
                })
        })
    }

    const render = (context, width, height) => {
        context.clearRect(0, 0, width, height);
        positionedCells.forEach(positionedCell => renderCellWith(context)(positionedCell))
    }

    const startCycle = () => {
        positionedCells.forEach(({cell}) => cell.dispatch())
        positionedCells.forEach(({cell}) => cell.incubate(cell))
    }

    return { initialize, render, startCycle }

}
