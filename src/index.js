import World from './World'
import Cell from './Cell'
import Organism from './Organism'
import Farmer from './Farmer'
import { block, glider } from './patterns'

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const world = World(Cell, Organism)
const farmer = Farmer([block, glider])

world.initialize(50, 50)

farmer.prepare({name: 'block', x: 15, y: 15})
farmer.prepare({name: 'glider', x: 0, y: 0})
farmer.sow(world)

window.setInterval(() => {
    world.startCycle(),
    world.render(ctx, canvas.width, canvas.height)
}, 30)

window.setInterval(() => {
    farmer.prepare({name: 'glider', x: 0, y: 0})
    farmer.sow(world)
}, 1000)
