import Farmer from "../src/Farmer";

describe('we test farmers', () => {
    test('farmer prepare', () => {
        // GIVEN
        const farmer = Farmer([])

        // THEN
        expect(farmer.prepare).toBeDefined()
    })

    test('farmer sow', () => {
        // GIVEN
        let sowCalled = 0;
        const farmer = Farmer([])
        const WorldMock = () => {
            return {
                sow: () => sowCalled++
            }
        }
        const world = WorldMock()

        // WHEN
        farmer.sow(world)

        // THEN
        expect(sowCalled).toBe(1)
    })

    test('farmer can create a dispatch', () => {
        // GIVEN
        const testPattern = {
            name: 'test',
            positions: [
                { x: 0, y: 0 }
            ]
        }
        const farmer = Farmer([testPattern])

        const WorldMock = () => {
            return {
                sow: (dispatch) => {
                    expect(dispatch).toEqual([{
                        x: 0,
                        y: 1,
                        spores: 3
                    }])
                }
            }
        }
        const world = WorldMock()

        // WHEN
        farmer.prepare({ name: 'test', x: 0, y: 1 })
        farmer.sow(world)
    })

    test('farmer reset after sow', () => {
        // GIVEN
        const testPattern = {
            name: 'test',
            positions: [
                { x: 0, y: 0 }
            ]
        }
        const farmer = Farmer([testPattern])

        let called = false
        const WorldMock = () => {
            return {
                sow: (dispatch) => {
                    if (called) {
                        expect(dispatch).toEqual([])
                    } else {
                        called = true
                        expect(dispatch).toEqual([{
                            x: 0,
                            y: 1,
                            spores: 3
                        }])
                    }
                }
            }
        }
        const world = WorldMock()

        // WHEN
        farmer.prepare({ name: 'test', x: 0, y: 1 })
        farmer.sow(world)
        farmer.sow(world)
    })
});