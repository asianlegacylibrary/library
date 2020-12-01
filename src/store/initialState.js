export const initialState = {
    searchTerm: '',
    elasticsearch: {
        results: {
            isFetching: false,
            url: null,
            error: {},
            total: {
                value: 0
            },
            data: {
                hits: [],
                total: {
                    value: 0
                },
                error: {}
            }
        }
    },
    URLParams: {
        q: null,
        class: null,
        filter: null,
        search_fields: null,
        highlights: true,
        page_size: 10,
        page: 1,
        near: null,
        include_data: false
    }
}
