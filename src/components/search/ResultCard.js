import { Button } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import '../../assets/css/mui/Card.scss'
import '../../assets/css/mui/Button.scss'
import '../../assets/css/Search-Card.scss'
import { mainDisplayFields } from '../../store/statics'

import { CardDetails } from './CardDetails'

import React, { useState } from 'react'
import { collections } from '../../store/statics'

//const hlt_keys = ['author-tibetan', 'title-tibetan', 'colophon']

// build from the highlights returned if any
function buildHighlights(highlights, source) {
    let b = []
    //let display = mainDisplayFields
    let display = mainDisplayFields.filter(
        (item) => item in source && !(item in highlights)
    )

    //let remainingDisplayFields = fieldMapping

    Object.entries(highlights).forEach(([key, v]) => {
        // temp to take out experimental text analysis field
        if (key.includes('.with_payloads')) return
        // check highlight against main display fields
        // and delete main display fields already included in highlights
        // if (mainDisplayFields.includes(key))
        //     display = display.filter((item) => item !== key)

        // map fields to proper display names *** currently off
        //if (key in fieldMapping) key = fieldMapping[key]
        let vArr = []
        // for now just push first author in array to display
        if (key.toLowerCase().includes('author')) {
            vArr.push(
                <React.Fragment>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: v[0].replace(/(\r\n|\n|\r)/gm, '<br>')
                        }}
                    />
                    <br />
                    <br />
                </React.Fragment>
            )
        } else {
            console.log(v)
            v = v.join(' ')
            console.log(key, v)
            //v.forEach((a, i) => {
            vArr.push(
                <React.Fragment key={key}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: v.replace(/(\r\n|\n|\r)/gm, '<br>')
                        }}
                    />
                </React.Fragment>
            )
            //})
        }

        if (mainDisplayFields.includes(key)) {
            b.unshift(
                <div key={key} className='main-field'>
                    <span className='span-title'>{key}: </span>
                    {vArr}
                </div>
            )
        } else {
            b.push(
                <div key={key}>
                    <span className='span-title'>{key}: </span>
                    {vArr}
                </div>
            )
        }
    })

    if (display.length > 0) {
        let mainFields = []
        display.sort().forEach((item) => {
            mainFields.push(
                <div key={item} className='main-field'>
                    <span className='span-title'>{item}: </span>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: source[item].replace(
                                /(\r\n|\n|\r)/gm,
                                '<br>'
                            )
                        }}
                    />
                    <br />
                    <br />
                </div>
            )
        })
        b.unshift(
            <div key='main-fields' className='main-fields'>
                {mainFields}
            </div>
        )
    }

    return b
}

export function ResultCard({ data }) {
    const { _id, highlight, _source } = data

    let h = highlight == null ? null : buildHighlights(highlight, _source)

    //console.log('remaining!', remaining)
    // const remain =
    //     remaining == null ? null : buildRemaining(data._source, remaining)

    // Declare a new state variable, which we'll call "count"
    const [isActive, setIsActive] = useState(false)
    const toggle = () => setIsActive(!isActive)
    const activatedDetails = isActive ? 'make-visible' : ''

    const coll = Object.keys(collections).find(
        (c) => _source['bibframe:collection'] === c
    )

    console.log(collections[coll].color)

    return (
        <Card className='MuiCard-root' square={true} elevation={1}>
            <CardContent>
                <div className='result-meta'>
                    <span
                        className='meta-collection'
                        style={{
                            border: `1px solid var(--col-neutral)`
                        }}
                    >
                        {collections[coll].desc.toUpperCase()}
                        {'    '}
                    </span>

                    <span className='boldy'>ID: </span>
                    <span className='boldy'>{_id} </span>
                </div>
                {h ? <div className='card-highlights'>{h}</div> : null}
                {/* {remain ? (
                    <div className='card-highlights'>{remain}</div>
                ) : null} */}
            </CardContent>
            <CardActions>
                <Button onClick={toggle} size='small' color='primary'>
                    {isActive ? 'Hide Details' : 'Show Details'}
                </Button>
                {/* <a
                    href='#!'
                    onClick={(e) => this.handleFavorites(result, e)}
                    className='favorites right'
                >
                    <i className={`fa fa-star fa-lg ${activatedFavorite}`} />
                </a> */}

                <div
                    className={`more-content ${activatedDetails} blue-grey-text darken-4`}
                >
                    <CardDetails data={data} />
                </div>
            </CardActions>
        </Card>
    )
}
