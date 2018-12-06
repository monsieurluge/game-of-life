import Cell from "../src/Cell";

describe('we test cells', () => {
    test('cell is defined', () => {
        // GIVEN
        const cell = Cell()

        // THEN
        expect(cell).toBeDefined()
    })

    test('cell can have neighbours', () => {
        // GIVEN
        const cell = Cell()

        // THEN
        expect(cell.add).toBeDefined()
    })

    test('cell do not dispatch any spore if she did not receive at least one spore', () => {
        // GIVEN
        let timeCalled = 0;

        const neighbour = {
            receive: () => {
                timeCalled++
            }
        }

        const cell = Cell()

        // WHEN
        cell.add([{...neighbour}, {...neighbour}, {...neighbour}, {...neighbour}])
        cell.dispatch()

        // THEN
        expect(timeCalled).toBe(0)
    })


    test('cell dispatch one spore to each neighbour', () => {
        // GIVEN
        let timeCalled = 0;

        const neighbour = {
            getPosition: () =>  {},
            receive: (spores) => {
                expect(spores).toBe(1)
                timeCalled++
            }
        }

        const OrganismMock = () => {
            return {
                live: () => {}
            }
        }

        const cell = Cell(OrganismMock)

        // WHEN
        cell.add([{...neighbour}, {...neighbour}, {...neighbour}, {...neighbour}])
        cell.receive(1)
        cell.incubate()
        cell.dispatch()

        // THEN
        expect(timeCalled).toBe(4)
    })

    test('no spores, no organism', () => {
        // GIVEN
        let timeCalled = 0
        const OrganismMock = () => timeCalled++

        const cell = Cell(OrganismMock)

        // WHEN
        cell.incubate()

        // THEN
        expect(timeCalled).toBe(0)
    })

    test('he is alive ! alive !', () => {
        // GIVEN
        let timeCalled = 0
        const OrganismMock = () => {
            return {
                live: () => timeCalled++
            }
        }

        const cell = Cell(OrganismMock)

        // WHEN
        cell.receive(3)
        cell.incubate()

        // THEN
        expect(timeCalled).toBe(1)
    })

    test('an organism has to exist in order to be fed', () => {
        // GIVEN
        let timeCalled = 0
        const OrganismMock = () => {
            timeCalled++
        }

        const cell = Cell(OrganismMock)

        // WHEN
        cell.incubate()
        cell.eatSpores()

        // THEN
        expect(timeCalled).toBe(0)
    })

    test('an organism has to be fed', () => {
        // GIVEN
        let timeCalled = 0
        const OrganismMock = () => {
            return {
                live: () => {  }  ,
                feed: () => { timeCalled++ }
            }
        }

        const cell = Cell(OrganismMock)

        // WHEN
        cell.receive(3)
        cell.incubate()
        cell.eatSpores()

        // THEN
        expect(timeCalled).toBe(1)
    })

    test('cell can render itself', () => {
        // GIVEN
        const cell = Cell()

        // THEN
        expect(cell.render).toBeDefined()
    })
})