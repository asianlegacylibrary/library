export const initialState = {
    results: {
        isFetching: false,
        currentSearch: false,
        items: {
            hits: {
                total: {
                    value: 0
                },
                hits: []
            }
        },
        aggregations: {},
        lastUpdated: null
    }
}
