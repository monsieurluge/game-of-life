export const Organism = (cell) => {
    let age = 0;
    return {
        feed: (spores) => {
            if (2 === spores && 0 === age) {
                cell.dying();
            }
            if (2 > spores) {
                cell.dying();
            }
            if (3 < spores) {
                cell.dying();
            }
            age++;
        },
        live: () => cell.eatSpores(),
        spread: () => cell.dispatch()
    };
};