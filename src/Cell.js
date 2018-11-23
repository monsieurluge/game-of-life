export default (Organism, x, y) => {
    let totalSpores = 0;
    let organism;
    let neighbours = []

    return {
        //p: {x, y},
        //n: neighbours,
        add: (newNeighbour) => {
            newNeighbour.map(n => neighbours.push(n))
        },
        dispatch: (spores) => {
            if (spores === undefined) {
                return;
            }
            neighbours.map(neighbour => neighbour.receive(1));
        },
        eatSpores: () => {
            if (organism) {
                organism.feed(totalSpores);
            }
        },
        incubate: () => {
            if (0 === totalSpores) {
                return;
            }
            organism = organism || OrganismFactory(this);
            organism.live();
        },
        receive: (spores) => {
            totalSpores += spores;
        }, 
        dying: () => {
            organism = undefined
        },
        render: (ctx, width, height) => {
            ctx.rect(1, 1,width-2,height-2);
        }
    };
}