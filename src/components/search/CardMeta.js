import '../../assets/css/Search-Card.scss'
import React from 'react'
import { modelKeys } from '../../store/statics'

const buildDetails = (result) => {
    let meta = []
    //let author = []
    let title = []

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

export function CardMeta({ data }) {
    const { meta, title } = buildDetails(data)

    return (
        <React.Fragment>
            <div className='meta-items'>
                <p className='meta-item'>{meta}</p>
            </div>

            {title.length > 0 ? (
                <div className='title-items'>
                    <hr />
                    {title}
                </div>
            ) : null}
        </React.Fragment>
    )
}
