import World from './World'
import Cell from './Cell'
import Organism from './Organism'

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const buildPattern = (name, x, y) => {
    const dispatchs = []
    const pattern = patterns
        .filter(pattern => name === pattern.name)
        .shift()

    if(pattern) {
        pattern.positions.forEach(position => {
            dispatchs.push({
                x: position.x + x,
                y: position.y + y,
                spores: 3
            })
        })
    }
    return dispatchs
}

const patterns = [
    {
        name: 'block',
        positions: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 1, y: 1},
            {x: 0, y: 1},
        ]
    },
    {
        name: 'glider',
        positions: [
            {x: 1, y: 0},
            {x: 2, y: 1},
            {x: 0, y: 2},
            {x: 1, y: 2},
            {x: 2, y: 2},
        ]
    },
    {
        name: 'glider-inverse-x',
        positions: [
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: 2},
            {x: 1, y: 2},
            {x: 2, y: 2},
        ]
    },
]

const initialDispatch = buildPattern('block', 1, 2)
                        .concat(buildPattern('glider', 5, 0))
                        .concat(buildPattern('glider-inverse-x', 20, 0))

    /*
    {x: 1, y: 5, spores: 3},
    {x: 1, y: 6, spores: 3},
    {x: 2, y: 5, spores: 3},
    {x: 2, y: 6, spores: 3},
    //
    {x: 11, y: 5, spores: 3},
    {x: 11, y: 6, spores: 3},
    {x: 11, y: 7, spores: 3},

    {x: 12, y: 4, spores: 3},
    {x: 12, y: 8, spores: 3},

    {x: 13, y: 3, spores: 3},
    {x: 13, y: 9, spores: 3},

    {x: 14, y: 3, spores: 3},
    {x: 14, y: 9, spores: 3},

    {x: 15, y: 6, spores: 3},

    {x: 16, y: 4, spores: 3},
    {x: 16, y: 8, spores: 3},

    {x: 17, y: 5, spores: 3},
    {x: 17, y: 6, spores: 3},
    {x: 17, y: 7, spores: 3},

    {x: 18, y: 6, spores: 3},
    //
    {x: 21, y: 3, spores: 3},
    {x: 21, y: 4, spores: 3},
    {x: 21, y: 5, spores: 3},
    {x: 22, y: 3, spores: 3},
    {x: 22, y: 4, spores: 3},
    {x: 22, y: 5, spores: 3},
    {x: 23, y: 2, spores: 3},
    {x: 23, y: 6, spores: 3},
    {x: 25, y: 1, spores: 3},
    {x: 25, y: 2, spores: 3},
    {x: 25, y: 6, spores: 3},
    {x: 25, y: 7, spores: 3},
    //
    {x: 35, y: 3, spores: 3},
    {x: 36, y: 3, spores: 3},
    {x: 35, y: 4, spores: 3},
    {x: 36, y: 4, spores: 3},
    */


const world = World(Cell, Organism)

world.initialize(50, 50, initialDispatch)
world.render(ctx, canvas.width, canvas.height)


window.setInterval(() => {
    world.startCycle()
    world.render(ctx, canvas.width, canvas.height)
}, 150)
