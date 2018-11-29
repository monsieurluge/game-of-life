import World from '../src/World'

describe('we test world', () => {
    test('world is defined', () => {
        const world = World()
        expect(world).toBeDefined()
    })

    test('world can render itself', () => {
        const world = World()

        expect(world.render).toBeDefined()
    })
})