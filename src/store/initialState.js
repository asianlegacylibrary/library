export const initialState = {
    error: false,
    results: {
        isFetching: false,
        error: {},
        data: {
            hits: {
                total: {
                    value: 0
                },
                hits: []
            }
        }
    }
}
