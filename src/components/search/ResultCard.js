import Card from '@material-ui/core/Card'
//import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import '../../assets/css/mui/Card.scss'
import '../../assets/css/Search-Card.scss'
import {
    fieldMapping,
    mainDisplayFields,
    rootFields
} from '../../store/statics'

import React from 'react'

//const hlt_keys = ['author-tibetan', 'title-tibetan', 'colophon']

// build from the highlights returned if any
function buildHighlights(highlights) {
    let b = []
    let display = mainDisplayFields
    //let remainingDisplayFields = fieldMapping
    Object.entries(highlights).forEach(([key, v]) => {
        // temp to take out experimental text analysis field
        if (key.includes('.with_payloads')) return
        // check highlight against main display fields
        // and delete main display fields already included in highlights
        if (mainDisplayFields.includes(key))
            display = display.filter((item) => item !== key)

        // map fields to proper display names
        if (key in fieldMapping) key = fieldMapping[key]
        let vArr = []
        if (key.toLowerCase().includes('author')) {
            vArr.push(
                <React.Fragment key={0}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: v[0]
                        }}
                    />
                    <br />
                    <br />
                </React.Fragment>
            )
        } else {
            v.forEach((a, i) => {
                vArr.push(
                    <React.Fragment key={i}>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: a
                            }}
                        />
                        <br />
                        <br />
                    </React.Fragment>
                )
            })
        }

        b.push(
            <div key={key}>
                <span className='span-title'>{key}</span>
                {vArr}
            </div>
        )
    })
    return [b, display]
}

function buildAuthor(source) {
    let author = Object.entries(source[rootFields.author][0]).map(([k, v]) => {
        if (v != null) {
            return <p key={k}>{`${k} ${v}`}</p>
        }
        return
    })

    return <div key='author-data'>{author}</div>
}

// remaining function required so we don't display the highlight fields twice (from source and highlight)
function buildRemaining(source, remaining) {
    let r = []
    Object.entries(source).forEach(([k, v]) => {
        if (k.includes('.with_payloads')) return
        //if (k.includes('colophon')) console.log('meow?')
        //console.log(k, v, remaining)

        let a = k === rootFields.author ? buildAuthor(source) : null

        r.push(a)

        if (remaining.includes(k)) {
            let value = Array.isArray(v) ? v[0] : v
            r.push(
                <div key={k}>
                    <span className='span-title'>{fieldMapping[k]}</span>
                    {value}
                </div>
            )
        }
    })
    return r
}

export function ResultCard({ data }) {
    const { _id, highlight, _source } = data

    let [h, remaining] =
        highlight == null ? [null, null] : buildHighlights(highlight)
    //console.log('remaining!', remaining)
    const remain = remaining == null ? null : buildRemaining(_source, remaining)

    return (
        <Card className='MuiCard-root' square={true} elevation={0}>
            <CardContent>
                <div className='card-meta'>{_id}</div>
                {h ? <div className='card-highlights'>{h}</div> : null}
                {remain ? (
                    <div className='card-highlights'>{remain}</div>
                ) : null}
            </CardContent>
        </Card>
    )
}
