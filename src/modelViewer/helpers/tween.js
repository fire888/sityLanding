export const createLinear = duration => {
    const timeStarted = Date.now()
    return f => f(Math.min(1, (Date.now() - timeStarted) / duration))
}


