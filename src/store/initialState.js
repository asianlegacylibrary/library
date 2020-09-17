export const initialState = {
    searchTerm: '',
    elasticsearch: {
        results: {
            isFetching: false,
            url: null,
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
}
