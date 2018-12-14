import Organism from "../src/Organism";

describe('we test organisms', () => {
    test('organism is defined', () => {
        // GIVEN
        const organism = Organism()

        // THEN
        expect(organism).toBeDefined()
    })

    test('organism can spread', () => {
        // GIVEN
        let timeCalled = 0;

        const mockedCell = {
            dispatch: () => { timeCalled++ }
        }

        const organism = Organism( mockedCell )

        // WHEN
        organism.spread()

        // THEN
        expect(timeCalled).toBe(1)
    })

    test('an living organism tries to eat spores', () => {
        // GIVEN
        let timeCalled = 0;

        const mockedCell = {
            eatSpores: () => { timeCalled++ }
        }

        const organism = Organism( mockedCell )

        // WHEN
        organism.live()

        // THEN
        expect(timeCalled).toBe(1)
    })

    test('feed 3 spores => stay alive', () => {
        // GIVEN
        let timeCalled = 0;

        const mockedCell = {
            dying: () => { timeCalled++ }
        }

        const organism = Organism( mockedCell )

        // WHEN
        organism.feed(3)

        // THEN
        expect(timeCalled).toBe(0)
    })

    test('feed 2 spores => die if first meal', () => {
        // GIVEN
        let timeCalled = 0;

        const mockedCell = {
            dying: () => { timeCalled++ }
        }

        const organism = Organism( mockedCell )

        // WHEN
        organism.feed(2)

        // THEN
        expect(timeCalled).toBe(1)
    })

    test('feed 2 spores => do not die if not first meal', () => {
        // GIVEN
        let timeCalled = 0;

        const mockedCell = {
            dying: () => { timeCalled++ }
        }

        const organism = Organism( mockedCell )

        // WHEN
        organism.feed(3)
        organism.feed(2)

        expect(timeCalled).toBe(0)
    })

    test('feed 1 spore => die', () => {
        // GIVEN
        let timeCalled = 0;

        const mockedCell = {
            dying: () => { timeCalled++ }
        }

        const organism = Organism( mockedCell )

        // WHEN
        organism.feed(1)

        // THEN
        expect(timeCalled).toBe(1)
    })
  
    test('feed 0 spore => die', () => {
        // GIVEN
        let timeCalled = 0;

        const mockedCell = {
            dying: () => { timeCalled++ }
        }

        const organism = Organism( mockedCell )

        // WHEN
        organism.feed(0)

        // THEN
        expect(timeCalled).toBe(1)
    })

    test('feed 4 spore => die', () => {
        // GIVEN
        let timeCalled = 0;

        const mockedCell = {
            dying: () => { timeCalled++ }
        }

        const organism = Organism( mockedCell )

        // WHEN
        organism.feed(4)

        // THEN
        expect(timeCalled).toBe(1)
    })

    test('can render itself', () => {
        // GIVEN
        const organism = Organism()

        // THEN
        expect(organism.render).toBeDefined()
    })
})