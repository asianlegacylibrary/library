// parsing query params to lucene syntax
// eventually mapping to elasticsearch DSL syntax

// fielded search
// business_title:(senior NOT junior) AND posting_type:external

// fuzzy search
// searchFields=business_title&$select=business_title&search=business_title:asosiate~

// proximity search (word boundary after tilde)
// searchFields=business_title&$select=business_title&search=business_title:%22senior%20analyst%22~4

// term boosting (don't have to offer this as url param option)
// could be cool option for translators to specify for search terms
// search=business_title:computer^2 analyst

// wildcard, can be used for single term but not phrase
// searchFields=business_title&$select=business_title&search=business_title:prog*

// PSEUDO CODE

// keep URL PARAMS and search bar /options in sync /////////////////////

// 1. take url params and map to interface and elasticsearch DSL

// 2. take interface selections / text and map to url params and elasticsearch DSL

// 3. understand lucene query parser and elasticsearch DSL

export function queryParser(params) {
    console.log('i in parser sir', params)
    return params
}
