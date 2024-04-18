export const isStepOptional = (optionals: number[], step: number): boolean => {
    return optionals.includes(step)
}

export const isStepSkipped = (skipped: Set<number>, step: number) => {
    return skipped.has(step)
}