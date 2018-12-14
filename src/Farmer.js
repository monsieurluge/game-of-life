const Farmer = function(patterns) {

  var dispatchs = []

  const prepare = ({name,x,y}) => {
    const pattern = patterns
      .filter(pattern => name === pattern.name)
      .shift()

    if (pattern) {
      pattern.positions.forEach(position => {
        dispatchs.push({
          x: position.x + x,
          y: position.y + y,
          spores: 3
        })
      })
    }

    return this
  }

  const sow = world => {
    world.sow(dispatchs)
    dispatchs = []
  }

  //
  
  this.prepare = prepare
  this.sow = sow
}

export default Farmer