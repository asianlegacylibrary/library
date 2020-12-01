export const fieldMapping = {
    'bibframe:maintitle': 'Main Title',
    'bibframe:varianttitle': 'Variant Title',
    'bibframe:varianttitle@eng': 'Title (English)',
    'bibframe:varianttitle@skt': 'Title (Sanskrit)',
    'bibframe:varianttitle@colophon': 'Colophon',
    'bibframe:collection': 'Collection',
    'all:items.bibframe:datasource': 'Text',
    'bibframe:datasource': 'Text',
    'bibframe:role@author.bibframe:variantname': 'Author (Variant)',
    'bibframe:role@author.bibframe:variantname@eng': 'Author (English)',
    'bibframe:role@author.bibframe:variantname@skt': 'Author (Sanskrit)'
}

export const mainDisplayFields = [
    'bibframe:maintitle',
    'bibframe:varianttitle@colophon',
    'bibframe:collection'
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
