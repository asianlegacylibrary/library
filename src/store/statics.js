export const fieldMapping = {
    'bibframe:maintitle': 'Main Title',
    'bibframe:varianttitle': 'Variant Title',
    'bibframe:varianttitle@eng': 'Title (English)',
    'bibframe:varianttitle@skt': 'Title (Sanskrit)',
    'bibframe:varianttitle@colophon': 'Colophon',
    'bibframe:collection': 'Collection',
    'all:items.bibframe:datasource': 'Text',
    'bibframe:datasource': 'Text',
    'bibframe:person': 'Author (general)',
    'bibframe:role@author.bibframe:name': 'Author',
    'bibframe:role@author.bibframe:variantname': 'Author (Variant)',
    'bibframe:role@author.bibframe:variantname@eng': 'Author (English)',
    'bibframe:role@author.bibframe:variantname@skt': 'Author (Sanskrit)'
}

export const mainDisplayFields = [
    'bibframe:maintitle',
    'bibframe:varianttitle@colophon',
    'bibframe:collection',
    'bibframe:person',
    'bibframe:role@author[0].bibframe:variantname'
]

export const languageMapping = {
    EN: 'English',
    TB: 'Tibetan',
    SK: 'Sanskrit'
}

export const collectionMapping = {
    SB: 'Sungbum',
    KG: 'Kangyur',
    TG: 'Tengyur'
}

export const rootFields = {
    author: 'bibframe:role@author'
}

export const URLParamsForUser = {
    //q: '',
    filter: '',
    search_fields: ''
    //highlights: true,
    //page_size: 10,
    //page: 1,
    //near: null,
    //class: 'works'
}

export const URLParamsPlaceholders = {
    //q: 'Query',
    filter: { name: 'filter', value: 'ex. author:exists,collection:SB' },
    search_fields: {
        name: 'search fields',
        value: 'ex. title,colophon,text,subject,author'
    }
    //highlights: 'true or false',
    //page_size: 'number of results returned in each page',
    //page: 'page number',
    //near: 'Proximity',
    //class: 'Class'
}

export const URLtest = {
    //q: {param: 'q', name: 'query', placeholder: 'Query'},
    filter: {
        param: 'filter',
        name: 'filter',
        placeholder: 'ex. author:exists,collection:SB'
    },
    search_fields: {
        param: 'search_fields',
        name: 'search fields',
        placeholder: 'ex. title,colophon,text,subject,author'
    }
}
