export const World = () => {
}

export const Cell = (OrganismFactory, neighbours) => {
    let totalSpores = 0
    let organism

    return {
        dispatch: (spores) => {
            if(spores === undefined) {
                return
            }

            neighbours.map(neighbour => neighbour.receive(1))
        },

        eatSpores: () => {
            if (organism) {
                organism.feed(totalSpores)
            }
        },

        incubate: () => {
            if (0 === totalSpores) {
                return
            }

            organism = organism || new OrganismFactory(this)
            organism.live()
        },

        receive: (spores) => {
            totalSpores += spores
        }
    }
}

export const Organism = ( cell ) => {
    let age = 0

    return {
        feed: (spores) => {
            if (2 === spores && 0 === age) {
                cell.dying(this)
            }
            if (2 > spores) {
                cell.dying(this)
            }
            if (3 < spores) {
                cell.dying(this)
            }
            age++
        },
        live: () => cell.eatSpores(),
        spread: () => cell.dispatch()
    }
}
