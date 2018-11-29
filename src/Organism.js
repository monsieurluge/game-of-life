export default (cell) => {
    let age = 0;

    const feed = spores => {
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
    }

    const live = () => cell.eatSpores()
    const spread = () => cell.dispatch()

    return {feed, live, spread};
};