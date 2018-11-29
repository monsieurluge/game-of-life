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
                add: () => {}
            }
        }

        World(CellMock, 3, 3)
        expect(timeCalled).toBe(9)    
    })

    test('world can render itself', () => {
        const world = World()

        expect(world.render).toBeDefined()
    })
})