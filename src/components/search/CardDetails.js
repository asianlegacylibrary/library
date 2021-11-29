import '../../assets/css/Search-Card.scss'
import React from 'react'
import { CardMeta } from './CardMeta'
import { rootFields } from '../../store/statics'

function buildNestedAuthorData(source, type) {
    let nestedType = Object.entries(source).map(([k, v]) => {
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
    })

    return (
        <div key={type} className={`${type}-data`}>
            {nestedType}
        </div>
    )
}

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
    let author = Object.entries(source[rootFields.author]).map(([k, v]) => {
        if (v != null) {
            let subV = []
            if (typeof v === 'object' && !Array.isArray(v)) {
                return buildNestedAuthorData(v, 'author')
            } else if (Array.isArray(v)) {
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

export function CardDetails({ data }) {
    let a = rootFields.author in data._source ? buildAuthor(data._source) : null

    let s =
        rootFields.subject in data._source
            ? buildNestedData(data._source, 'subject')
            : null

    return (
        <React.Fragment>
            <CardMeta data={data} />

            {a !== null ? a : null}

            {s !== null ? s : null}
        </React.Fragment>
    )
}
