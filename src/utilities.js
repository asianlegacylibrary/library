// get value of nested object, undefined if doesn't exist
export const getNested = (obj, ...args) => {
    return args.reduce((obj, level) => obj && obj[level], obj)
}
