import Cell from "../src/Cell";

describe('we test cells', () => {
    test('cell is defined', () => {
        const cell = Cell()
        expect(cell).toBeDefined()
    })

    test('cell can have neighbours', () => {
        const cell = Cell()

        expect(cell.add).toBeDefined()
    })

    test('cell do not dispatch any spore if', () => {
        let timeCalled = 0;
        
        const neighbour = {
            receive: () => { 
                timeCalled++
            }
        }
        
        const cell = Cell()
        
        cell.add([{...neighbour}, {...neighbour}, {...neighbour}, {...neighbour}])

        cell.dispatch()
        expect(timeCalled).toBe(0)
    })


    test('cell dispatch one spore to each neighbour', () => {
        let timeCalled = 0;
        
        const neighbour = {
            receive: (spores) => { 
                expect(spores).toBe(1)
                timeCalled++
            }
        }
        
        const cell = Cell()
        
        cell.add([{...neighbour}, {...neighbour}, {...neighbour}, {...neighbour}])

        cell.dispatch(8)
        expect(timeCalled).toBe(4)
    })

    test('no spores, no organism', () => {

        let timeCalled = 0
        const OrganismMock = () => timeCalled++

        const cell = Cell(OrganismMock)
        cell.incubate()

        expect(timeCalled).toBe(0)
    }) 

    test('he is alive ! alive !', () => {

        let timeCalled = 0
        const OrganismMock = () => {
            return {
                live: () => timeCalled++
            }
        }

        const cell = Cell(OrganismMock)
        cell.receive(3)
        cell.incubate()

        expect(timeCalled).toBe(1)
    }) 

    test('an organism has to exist in order to be fed', () => {

        let timeCalled = 0
        const OrganismMock = () => {
            timeCalled++
        }

        const cell = Cell(OrganismMock)
        cell.incubate()
        cell.eatSpores()

        expect(timeCalled).toBe(0)
    }) 

    test('an organism has to be fed', () => {

        let timeCalled = 0
        const OrganismMock = () => {
            return {
                live: () => {  }  ,
                feed: () => { timeCalled++ }
            }
        }

        const cell = Cell(OrganismMock)
        cell.receive(3)
        cell.incubate()
        cell.eatSpores()

        expect(timeCalled).toBe(1)
    }) 
})