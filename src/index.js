import World from './World'
import Cell from './Cell'

const canva=document.getElementById("game");
const ctx=canva.getContext("2d");

const world = World(10,10)
world.render(ctx)
