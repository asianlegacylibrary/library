import '../../assets/css/Search-Card.scss'
import React from 'react'
import { modelKeys, rootFields, colophonField } from '../../store/statics'

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
                subV = (
                    <span
                        dangerouslySetInnerHTML={{
                            __html: v
                                .replace(/(\r\n|\n|\r)/gm, '<br>')
                                .replace(/(<br\s*\/?>){3,}/gi, '<br>')
                        }}
                    />
                )
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
                                .replace(/(\r\n|\n|\r)/gm, '<br>')
                                .replace(/(<br\s*\/?>){3,}/gi, '<br>')
                        }}
                    />
                </p>
            )
        }
    })

    return { meta, title }
}

export function CardDetails({ data }) {
    const { meta, title } = buildDetails(data)

    let a = rootFields.author in data._source ? buildAuthor(data._source) : null

    let s =
        rootFields.subject in data._source
            ? buildNestedData(data._source, 'subject')
            : null

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

            {a !== null ? a : null}

            {s !== null ? s : null}
        </React.Fragment>
    )
}
