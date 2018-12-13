export default (CellFactory, OrganismFactory) => {

    const GRID_WIDTH = 10
    const GRID_HEIGHT = 10

    let locations = [];

    const createLocations = (width, height) => {
        locations = []

        for(let i = 0; i< width * height; i++) {
            locations.push({
                cell: CellFactory(OrganismFactory),
                position: { x: i % width, y: Math.floor(i / height) }
            })
        }
    }

    const isNeighbourOf = source => target => {
        return target.cell !== source.cell
            && Math.abs(target.position.x - source.position.x) <= 1
            && Math.abs(target.position.y - source.position.y) <= 1
    }

    const getCoords = (col, row) => {
        return {
            x: col * GRID_WIDTH,
            y: row * GRID_HEIGHT
        }
    }

    const renderCellWith = context => positionedCell => {
        const coords = getCoords(positionedCell.position.x, positionedCell.position.y)

        context.beginPath()
        context.translate(coords.x, coords.y)

        positionedCell.cell.render(context, GRID_WIDTH,GRID_HEIGHT)

        context.fill()
        context.translate(-coords.x, -coords.y)
    }

    const initializeCell = dispatch => locations
        .filter(findCellAt(dispatch))
        .map(generateOrganism(dispatch.spores))

    const findCellAt = ({ x, y }) => ({position}) => x === position.x && y === position.y

    const generateOrganism = spores => ({cell}) => {
        cell.receive(spores)
        cell.incubate(cell)
    }

    const createNeighbourhood = location => {
        location.cell.add(locations
            .filter(isNeighbourOf(location))
            .map(location => location.cell)
        )
    }

    const initialize = (width, height) => {
        createLocations(width, height)

        locations.map(createNeighbourhood)
    }

    const render = (context, width, height) => {
        context.clearRect(0, 0, width, height);
        locations.forEach(positionedCell => renderCellWith(context)(positionedCell))
    }

    const startCycle = () => {
        locations.forEach(({cell}) => cell.dispatch())
        locations.forEach(({cell}) => cell.incubate(cell))
    }

    const sow = dispatch => dispatch.forEach(initializeCell)

    return { initialize, render, startCycle, sow }

}
