export default (Organism) => {
    let totalSpores = 0
    let organism
    let neighbours = []

    return {
        add: (newNeighbour) => {
            newNeighbour.map(n => neighbours.push(n))
        },
        dispatch: () => {
            if (organism) {
                neighbours.map(neighbour => {
                    neighbour.receive(1)
                });
            }
        },
        eatSpores: () => {
            if (organism) {
                organism.feed(totalSpores)
            }
            totalSpores = 0
        },
        incubate: (cell) => {
            if (0 === totalSpores) {
                return
            }
            organism = organism || Organism(cell)
            organism.live()
        },
        receive: (spores) => {
            totalSpores += spores
        },
        dying: () => {
            organism = undefined
        },
        render: (ctx, width, height) => {
            ctx.strokeStyle="rgba(0,0,0,0.1)"
            ctx.lineWidth=1
            ctx.strokeRect(0, 0, width, height)

            if (organism) {
                organism.render(ctx, width, height);
            }
        }
    };
}