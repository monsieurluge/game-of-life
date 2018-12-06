import World from '../src/World'

describe('we test world', () => {
    test('world is defined', () => {
        // GIVEN
        const CellMock = () => {
            return {
                add: () => {},
                getPosition: () => { return { x: 0, y: 0} }
            }
        }

        // WHEN
        const world = World(CellMock, {}, 3, 3)

        // THEN
        expect(world).toBeDefined()
    })

    test('world creates grid filled with Cell', () => {
        // GIVEN
        let timeCalled = 0;

        const CellMock = () => {
            timeCalled++

            return {
                add: () => {},
                incubate: () => {},
                getPosition: () => { return { x: 0, y: 0} }
            }
        }

        // WHEN
        World(CellMock, {}, 3, 3)

        // THEN
        expect(timeCalled).toBe(9)
    })

    test('the neighbours are added to the cells', () => {
        // GIVEN
        let timeCalled = 0;

        const CellMock = () => {
            return {
                add: () => { timeCalled++ },
                getPosition: () => { return { x: 0, y: 0} }
            }
        }

        // WHEN
        World(CellMock, {}, 2, 5)

        // THEN
        expect(timeCalled).toBe(10)
    })

    test('world can render itself', () => {
        // GIVEN
        const CellMock = () => {
            return {
                add: () => {},
                getPosition: () => { return { x: 0, y: 0} }
            }
        }

        // WHEN
        const world = World(CellMock, {}, 0, 0)

        // THEN
        expect(world.render).toBeDefined()
    })

    test('world can start a new cycle', () => {
        // GIVEN
        const CellMock = () => {
            return {
                add: () => {},
                getPosition: () => { return { x: 0, y: 0} }
            }
        }

        // WHEN
        const world = World(CellMock, {}, 0, 0)

        // WHEN, THEN
        expect(world.startCycle).toBeDefined()
    })

    test.skip('when world initializes, each marked cell receive n spores', () => {
        // GIVEN
        let sporesDispatched = 0;
        let incubateCalled = 0;

        const initialDispatch = [
            {x: 0, y: 0, spores: 1},
            {x: 1, y: 0, spores: 2},
            {x: 2, y: 2, spores: 3},
            {x: 2, y: 1, spores: 4},
        ]

        const CellMock = () => {
            return {
                add: () => {},
                incubate: () => { incubateCalled++ },
                receive: (spores) => { sporesDispatched += spores },
                getPosition: () => { return { x: 0, y: 0} }
            }
        }

        const world = World(CellMock, {}, 3, 3)

        // WHEN
        world.initialize(initialDispatch)

        // THEN
        expect(sporesDispatched).toBe(10)
        expect(incubateCalled).toBe(9)
    })

    test.skip('world makes each cell to dispatch on new cycle', () => {
        // GIVEN
        let timeDispatchCalled = 0;
        let timeIncubateCalled = 0;

        const CellMock = () => {
            return {
                add: () => {},
                incubate: () => { timeIncubateCalled++ },
                dispatch: () => { timeDispatchCalled++ },
                getPosition: () => { return { x: 0, y: 0} }
            }
        }

        const world = World(CellMock, {}, 3, 3)

        // WHEN
        world.startCycle()

        // THEN
        expect(timeIncubateCalled).toBe(9)
        expect(timeDispatchCalled).toBe(9)
    })
})