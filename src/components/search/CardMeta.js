import '../../assets/css/Search-Card.scss'
import React from 'react'
import { modelKeys } from '../../store/statics'

const buildDetails = (result) => {
    let meta = []
    let title = []

    modelKeys.meta.forEach((key, i) => {
        //let type = checkLoc(result, key)
        if (key in result._source) {
            if (
                //Array.isArray(result._source[key]) &&
                result._source[key].constructor.name == 'Object' &&
                result._source[key] !== undefined
            ) {
                Object.entries(result._source[key]).forEach(([k, v]) => {
                    if (!k.includes('datasource')) {
                        meta.push(
                            <React.Fragment key={k}>
                                <span className="span-title">{k}: </span>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: v,
                                    }}
                                />
                                <br />
                            </React.Fragment>
                        )
                    }
                })
            } else {
                meta.push(
                    <React.Fragment key={i}>
                        <span className="span-title">{key}: </span>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: result._source[key],
                            }}
                        />
                        <br />
                    </React.Fragment>
                )
            }
        }
    })

    modelKeys.title.forEach((key, i) => {
        //let type = checkLoc(result, key)
        if (key in result._source) {
            title.push(
                <p key={i} className="author-item flow-text">
                    <span className="span-title">{key}: </span>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: result._source[key]
                                .replace(/(\r\n|\n|\r)/gm, '<br>')
                                .replace(/(<br\s*\/?>){3,}/gi, '<br>'),
                        }}
                    />
                </p>
            )
        }
    })

    return { meta, title }
}

export function CardMeta({ data }) {
    const { meta, title } = buildDetails(data)

    return (
        <React.Fragment>
            <div className="meta-items">
                <p className="meta-item">{meta}</p>
            </div>

            {title.length > 0 ? (
                <div className="title-items">
                    <hr />
                    {title}
                </div>
            ) : null}
        </React.Fragment>
    )
}
