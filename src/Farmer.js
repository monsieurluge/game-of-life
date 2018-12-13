export default (patterns) => {

  let dispatchs = []

  return {
    sow: world => {
      world.sow(dispatchs)
      dispatchs = []
    },
    prepare: ({name, x, y}) => {

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
  }
}