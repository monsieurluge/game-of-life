export const Cell = (OrganismFactory, neighbours) => {
    let totalSpores = 0;
    let organism;
    return {
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
        }
    };
};