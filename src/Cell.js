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
            if(organism) {
                ctx.rect(1, 1, width-2,height-2);
            }
        }
    };
}