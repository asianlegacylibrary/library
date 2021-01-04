import '../../assets/css/Search-Card.scss'
import React from 'react'
import { modelKeys, rootFields } from '../../store/statics'

function buildNestedData(source, type) {
    let nestedType = Object.entries(source[rootFields[type]][0]).map(
        ([k, v]) => {
            if (v != null) {
                let subV = []
                if (Array.isArray(v)) {
                    subV = v.map((a, i) => {
                        return (
                            <span key={i} className={`${type}-variants`}>
                                {a}
                            </span>
                        )
                    })
                } else {
                    subV = v
                }
                return (
                    <div key={k}>
                        <span className='span-title'>{k}: </span>
                        {subV}
                    </div>
                )
            }
            return null
        }
    )

    return (
        <div key={type} className={`${type}-data`}>
            {nestedType}
        </div>
    )
}

function buildAuthor(source) {
    let author = Object.entries(source[rootFields.author][0]).map(([k, v]) => {
        if (v != null) {
            let subV = []
            if (Array.isArray(v)) {
                subV = v.map((a, i) => {
                    return (
                        <span key={i} className='author-variants'>
                            {a}
                        </span>
                    )
                })
            } else {
                subV = v
            }
            return (
                <div key={k}>
                    <span className='span-title'>{k}: </span>
                    {subV}
                </div>
            )
        }
        return null
    })

    return (
        <div key='authors' className='author-data'>
            {author}
        </div>
    )
}

const buildDetails = (result) => {
    let meta = []
    //let author = []
    let title = []
    let colophon = []
    // const checkLoc = (result, key) => {
    //     let type = ''
    //     if ('highlight' in result && result.highlight[key]) {
    //         type = 'highlight'
    //     } else if (result._source[key]) {
    //         type = '_source'
    //     }
    //     return type
    // }
    modelKeys.meta.forEach((key, i) => {
        //let type = checkLoc(result, key)
        if (key in result._source) {
            meta.push(
                <React.Fragment key={i}>
                    <span className='span-title'>{key}: </span>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: result._source[key]
                        }}
                    />
                    <br />
                </React.Fragment>
            )
        }
    })

    modelKeys.title.forEach((key, i) => {
        //let type = checkLoc(result, key)
        if (key in result._source) {
            title.push(
                <p key={i} className='author-item flow-text'>
                    <span className='span-title'>{key}: </span>
                    <span
                        dangerouslySetInnerHTML={{
                            //__html: result[type][key]
                            __html: result._source[key]
                        }}
                    />
                </p>
            )
        }
    })
    if (result._source.colophon && result._source.colophon.length > 0) {
        //let type = checkLoc(result, 'colophon')
        //if (key in result._source) {
        colophon.push(
            <p key='colophon' className='author-item flow-text'>
                <span className='span-title'>COLOPHON: </span>
                <span
                    dangerouslySetInnerHTML={{
                        //__html: result[type].colophon
                        __html: result._source.colophon
                    }}
                />
            </p>
        )
        //}
    }

    return { meta, title, colophon }
}

export function CardDetails({ data }) {
    const { meta, title, colophon } = buildDetails(data)

    let a = rootFields.author in data._source ? buildAuthor(data._source) : null

    let s =
        rootFields.subject in data._source
            ? buildNestedData(data._source, 'subject')
            : null

    console.log(s)
    return (
        <React.Fragment>
            <div className='meta-items'>
                <p className='meta-item'>{meta}</p>
            </div>

            {/* {author.length > 0 ? (
                <div className='author-items'>
                    <hr />
                    {author}
                </div>
            ) : null} */}

            {title.length > 0 ? (
                <div className='title-items'>
                    <hr />
                    {title}
                </div>
            ) : null}

            {colophon.length > 0 ? colophon : null}

            {a !== null ? a : null}

            {s !== null ? s : null}
        </React.Fragment>
    )
}
