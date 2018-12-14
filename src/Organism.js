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

    const render = (ctx, width, height) => {
        ctx.fillStyle="#4bb1d2"
        ctx.arc(width / 2,height / 2, (height-2) / 2, 0, 2*Math.PI);
    }

    return { feed, live, spread, render };
};