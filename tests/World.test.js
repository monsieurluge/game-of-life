import World from '../src/World'

describe('we test world', () => {
    test('world is defined', () => {
        // GIVEN
        const CellMock = () => {
            return {
                add: () => {},
            }
        }

        // WHEN
        const world = World(CellMock, {})

        // THEN
        expect(world).toBeDefined()
    })

    test('world can render itself', () => {
        // GIVEN
        const CellMock = () => {
            return {
                add: () => {},
            }
        }
        // WHEN
        const world = World(CellMock, {})

        // THEN
        expect(world.render).toBeDefined()
    })

    test('world can start a new cycle', () => {
        // GIVEN
        const CellMock = () => {
            return {
                add: () => {},
            }
        }

        // WHEN
        const world = World(CellMock, {})

        // WHEN, THEN
        expect(world.startCycle).toBeDefined()
    })

    test('when world initializes, each marked cell receive n spores', () => {
        // GIVEN
        let cellsCreated = 0;
        let neighboursAdded = 0;
        let sporesDispatched = 0;
        let incubateCalled = 0;

        const initialDispatch = [
            {x: 0, y: 0, spores: 1},
            {x: 1, y: 0, spores: 2},
            {x: 2, y: 2, spores: 3},
            {x: 2, y: 1, spores: 4},
        ]

        const CellMock = () => {
            cellsCreated++

            return {
                add: () => { neighboursAdded++ },
                incubate: () => { incubateCalled++ },
                receive: (spores) => { sporesDispatched += spores }
            }
        }

        const world = World(CellMock, {})

        // WHEN
        world.initialize(3, 3, initialDispatch)

        // THEN
        expect(cellsCreated).toBe(9)
        expect(neighboursAdded).toBe(9)
        expect(sporesDispatched).toBe(10)
        expect(incubateCalled).toBe(4)
    })

    test('world makes each cell to dispatch on new cycle', () => {
        // GIVEN
        let timeDispatchCalled = 0;
        let timeIncubateCalled = 0;

        const CellMock = () => {
            return {
                add: () => {},
                incubate: () => { timeIncubateCalled++ },
                dispatch: () => { timeDispatchCalled++ },
            }
        }

        const world = World(CellMock, {})

        // WHEN
        world.initialize(3, 3, [])
        world.startCycle()

        // THEN
        expect(timeIncubateCalled).toBe(9)
        expect(timeDispatchCalled).toBe(9)
    })
})