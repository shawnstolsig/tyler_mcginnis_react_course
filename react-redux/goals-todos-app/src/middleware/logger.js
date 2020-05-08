// log action to console and new state of store
const logger = (store) => (next) => (action) => {
    console.group(action.type ? action.type : "Thunk")
    console.log(`The action: ${action.type}`)
    const result = next(action)
    console.log(`The new state:`, store.getState())
    console.groupEnd()

    return result
}

export default logger