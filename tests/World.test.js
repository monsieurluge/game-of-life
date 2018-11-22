import { World } from '../src/World'

describe('we test world', () => {
    test('world is defined', () => {
        const world = new World()
        expect(world).toBeDefined()
    })
})