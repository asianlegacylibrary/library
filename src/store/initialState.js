export const initialState = {
    //initialRender: true,
    searchTerm: '',
    elasticsearch: {
        details: {
            isFetching: false,
            total: {
                value: 0
            },
            data: {
                hits: [],
                total: {
                    value: 0
                },
                error: {}
            },
            error: {}
        },
        results: {
            isFetching: false,
            url: null,
            offset: 0,
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
        filter: '',
        search_fields: null,
        highlights: true,
        page_size: 10,
        page: 1,
        near: null,
        include_data: false
    }
}
