import World from '../src/World'

describe('we test world', () => {
    test('world is defined', () => {
        const world = World()
        expect(world).toBeDefined()
    })

    test('world creates grid filled with Cell', () => {
        let timeCalled = 0;

        const CellMock = () => {
            timeCalled++

            return {
                add: () => {},
                incubate: () => {}
            }
        }

        World(CellMock, {}, 3, 3)
        expect(timeCalled).toBe(9)
    })

    test('the neighbours are added to the cells', () => {
        // GIVEN
        let timeCalled = 0;

        const CellMock = () => {
            return {
                add: () => { timeCalled++ }
            }
        }

        // WHEN
        World(CellMock, {}, 2, 5)

        // THEN
        expect(timeCalled).toBe(10)
    })

    test('world can render itself', () => {
        const world = World()

        expect(world.render).toBeDefined()
    })

    test('world can start a new cycle', () => {
        const world = World()

        expect(world.startCycle).toBeDefined()
    })

    test('when world initializes, each marked cell receive n spores', () => {
        let sporesDispatched = 0;

        const initialDispatch = [
            {x: 0, y: 0, spores: 1},
            {x: 1, y: 0, spores: 2},
            {x: 2, y: 2, spores: 3},
            {x: 2, y: 1, spores: 4},
        ]

        const CellMock = () => {
            return {
                add: () => {},
                incubate: () => {},
                receive: (spores) => {
                    sporesDispatched += spores
                }
            }
        }

        const world = World(CellMock, {}, 3, 3)
        world.initialize(initialDispatch)
        expect(sporesDispatched).toBe(10)
    })

    test('world makes each cell to dispatch on new cycle', () => {
        let timeDispatchCalled = 0;
        let timeIncubateCalled = 0;

        const CellMock = () => {
            return {
                add: () => {},
                incubate: () => { timeIncubateCalled++ },
                dispatch: () => { timeDispatchCalled++ }
            }
        }

        const world = World(CellMock, {}, 3, 3)

        world.startCycle()

        expect(timeIncubateCalled).toBe(9)
        expect(timeDispatchCalled).toBe(9)
    })
})