export const Cell = (OrganismFactory, x, y) => {
    let totalSpores = 0;
    let organism;
    var neighbours = 'test';    

    const add = (newNeighbours) => {
        neighbours = 'nope'//newNeighbours.concat()
    }

    return {
        n: neighbours,
        position: {x, y},
        add,
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
            organism = organism || new OrganismFactory(this);
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
};