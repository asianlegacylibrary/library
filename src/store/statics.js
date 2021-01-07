export const apiUrl = 'https://api.asianlegacylibrary.org/resources'
export const fieldMapping = {
    'bibframe:maintitle': 'Main Title',
    'bibframe:varianttitle': 'Variant Title',
    'bibframe:varianttitle@eng': 'Title (English)',
    'bibframe:varianttitle@skt': 'Title (Sanskrit)',
    'bibframe:varianttitle@colophon': 'Colophon',
    //'bibframe:collection': 'Collection',
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
    'bibframe:varianttitle@eng',
    'bibframe:person'
    //'bibframe:varianttitle@colophon',
    //'bibframe:collection',

    //'bibframe:role@author[0].bibframe:variantname'
]

export const mainTitleField = 'bibframe:maintitle'
export const mainTitleEngField = 'bibframe:varianttitle@eng'
export const colophonField = 'bibframe:varianttitle@colophon'

export const modelKeys = {
    author: [
        'bibframe:person',
        'bibframe:role@author.bibframe:name',
        'bibframe:role@author.bibframe:variantname',
        'bibframe:role@author.bibframe:variantname@eng',
        'bibframe:role@author.bibframe:variantname@skt'
    ],
    title: [
        'bibframe:maintitle',
        'bibframe:varianttitle',
        'bibframe:varianttitle@eng',
        'bibframe:varianttitle@skt',
        'bibframe:varianttitle@colophon'
    ],
    meta: [
        'bibframe:collection',
        'bibframe:language',
        'bibframe:identifier',
        'all:chklevel'
    ]
}

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

export const collections = {
    ACM: { desc: 'ACI Course Materials', color: 'col-blue' },
    ENB: { desc: 'English Buddhist Texts', color: 'col-gold' },
    ENO: { desc: 'English Non-Buddhist Texts', color: 'col-red' },
    GA: { desc: 'ACIP Graphics', color: 'col-blue' },
    GM: { desc: 'Mongolia Graphics', color: 'col-gold' },
    GSP: { desc: 'St. Petersburg Graphics', color: 'col-red' },
    KG: { desc: 'Kangyur', color: 'col-blue' },
    RCE: { desc: 'Ref-Sanskrit Catalogs', color: 'col-red' },
    RCS: { desc: 'Ref-Sanskrit Catalogs', color: 'col-gold' },
    RCT: { desc: 'Ref-Tibetan Catalogs', color: 'col-blue' },
    RDC: { desc: 'Ref-Dictionaries', color: 'col-red' },
    RDCS: { desc: 'Ref-Sanskrit Dictionaries', color: 'col-gold' },
    RDCT: { desc: 'Ref-Tibetan Dictionaries', color: 'col-blue' },
    RDO: { desc: 'Ref-Documents', color: 'col-red' },
    RGS: { desc: 'Ref-Sanskrit Grammars', color: 'col-gold' },
    RH: { desc: 'Ref-Histories', color: 'col-blue' },
    RHT: { desc: 'Ref-Tibetan Histories', color: 'col-red' },
    SKB: { desc: 'Sanskrit, Buddhist Texts', color: 'col-gold' },
    SKO: { desc: 'Sanskrit, Non-Buddhist Texts', color: 'col-blue' },
    SB: { desc: 'Sungbum', color: 'col-red' },
    TG: { desc: 'Tengyur', color: 'col-gold' },
    LDK: { desc: 'Ladakh', color: 'col-blue' },
    MNG: { desc: 'Mongolia', color: 'col-red' },
    STP: { desc: 'St. Petersburg', color: 'col-gold' },
    TR: { desc: 'Translations', color: 'col-red' }
}

export const rootFields = {
    author: 'bibframe:role@author',
    subject: 'bibframe:subject'
}

export const URLParamsForUser = {
    q: '',
    filter: '',
    search_fields: '',
    highlights: true,
    page_size: 10,
    page: 1,
    //near: null,
    class: 'works'
}

export const URLParamsPlaceholders = {
    //q: 'Query',
    filter: {
        name: 'filter',
        value: 'ex. author:exists,collection:-SB,items:exists (negate with -)'
    },
    search_fields: {
        name: 'search fields',
        value: 'ex. title,colophon,data,subject,author'
    },
    highlights: { name: 'highlights', value: 'true or false' },
    page_size: {
        name: 'page size',
        value: 'number of results returned in each page'
    },
    page: { name: 'page number', value: '' },
    //near: 'Proximity',
    class: { name: 'Class', value: 'works, items, subjects, persons' }
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
        placeholder: 'ex. title,colophon,data,subject,author'
    }
}
