import World from './World'
import Cell from './Cell'

const canva=document.getElementById("game");
const ctx=canva.getContext("2d");

const world = World(Cell, 5,5)
world.render(ctx)
