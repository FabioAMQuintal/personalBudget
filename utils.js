let envelopeCount = 0

const createEnvelope = queryArguments => {
    let currentCount;
    envelopeCount++
    currentCount = envelopeCount
    return {
        id: currentCount,
        name: queryArguments.name,
        amount: queryArguments.amount
    }
}

const getEnvelopeById = (idx, arr) => {
    return arr.find(d => d.id === Number(idx))
}

const deleteEnvelope = (idx, arr) => {
    return arr.findIndex(x => {
        return x.id === Number(idx)
    })
}





module.exports = {
    createEnvelope: createEnvelope,
    getEnvelopeById: getEnvelopeById,
    deleteEnvelope: deleteEnvelope
}