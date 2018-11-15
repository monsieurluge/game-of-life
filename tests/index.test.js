import { Organism, Cell } from '../src'

// ------------------------------------------------------------ CELLS

test('cell is defined', () => {
    const cell = new Cell()
    expect(cell).toBeDefined()
})

test('cell do not dispatch any spore if', () => {
    let timeCalled = 0;
    
    const neighbour = {
        receive: () => { 
            timeCalled++
        }
    }
    
    const cell = new Cell(Organism, [{...neighbour}, {...neighbour}, {...neighbour}, {...neighbour}])
    
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
    
    const cell = new Cell(Organism, [{...neighbour}, {...neighbour}, {...neighbour}, {...neighbour}])
    
    cell.dispatch(8)
    expect(timeCalled).toBe(4)
})

test('no spores, no organism', () => {

    let timeCalled = 0
    const OrganismMock = () => timeCalled++

    const cell = new Cell(OrganismMock, [])
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

    const cell = new Cell(OrganismMock, [])
    cell.receive(3)
    cell.incubate()

    expect(timeCalled).toBe(1)
}) 

test('an organism has to exist in order to be fed', () => {

    let timeCalled = 0
    const OrganismMock = () => {
        timeCalled++
    }

    const cell = new Cell(OrganismMock, [])
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

    const cell = new Cell(OrganismMock, [])
    cell.receive(3)
    cell.incubate()
    cell.eatSpores()

    expect(timeCalled).toBe(1)
}) 

// ------------------------------------------------------------ ORGANISMS

test('organism is defined', () => {
    const organism = new Organism()
    expect(organism).toBeDefined()
})

test('organism can spread', () => {
    let timeCalled = 0;
    
    const mockedCell = {
        dispatch: () => { timeCalled++ }        
    }

    const organism = new Organism( mockedCell )
    organism.spread()
    expect(timeCalled).toBe(1)
})

test('an living organism tries to eat spores', () => {
    let timeCalled = 0;
    
    const mockedCell = {
        eatSpores: () => { timeCalled++ }        
    }

    const organism = new Organism( mockedCell )
    organism.live()
    expect(timeCalled).toBe(1)
})

test('feed 3 spores => stay alive', () => {
    let timeCalled = 0;
    
    const mockedCell = {
        dying: () => { timeCalled++ }        
    }

    const organism = new Organism( mockedCell )

    organism.feed(3)

    expect(timeCalled).toBe(0)                
})


test('feed 2 spores => die if first meal', () => {
    let timeCalled = 0;
    
    const mockedCell = {
        dying: () => { timeCalled++ }        
    }

    const organism = new Organism( mockedCell )
    organism.feed(2)

    expect(timeCalled).toBe(1)
})

test('feed 2 spores => do not die if not first meal', () => {
    let timeCalled = 0;
    
    const mockedCell = {
        dying: () => { timeCalled++ }        
    }

    const organism = new Organism( mockedCell )
    organism.feed(3)
    organism.feed(2)

    expect(timeCalled).toBe(0)
})

test('feed 1 spore => die', () => {
    let timeCalled = 0;
    
    const mockedCell = {
        dying: () => { timeCalled++ }        
    }

    const organism = new Organism( mockedCell )
    organism.feed(1)

    expect(timeCalled).toBe(1)
})

test('feed 4 spore => die', () => {
    let timeCalled = 0;
    
    const mockedCell = {
        dying: () => { timeCalled++ }        
    }

    const organism = new Organism( mockedCell )
    organism.feed(4)

    expect(timeCalled).toBe(1)
})
