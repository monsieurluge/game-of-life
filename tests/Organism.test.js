import { Organism } from "../src/Organism";

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