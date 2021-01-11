import { Button } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import '../../assets/css/mui/Card.scss'
import '../../assets/css/mui/Button.scss'
import '../../assets/css/Search-Card.scss'
import { mainDisplayFields, apiUrl } from '../../store/statics'

import { CardDetails } from './CardDetails'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
                            __html: v[0]
                                .replace(/(\r\n|\n|\r)/gm, '<br>')
                                .replace(/(<br\s*\/?>){3,}/gi, '<br>')
                        }}
                    />
                    <br />
                    <br />
                </React.Fragment>
            )
        } else {
            //console.log(v)
            v = v.join(' ')
            //console.log(key, v)
            //v.forEach((a, i) => {
            vArr.push(
                <React.Fragment key={key}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: v
                                .replace(/(\r\n|\n|\r)/gm, '<br>')
                                .replace(/(<br\s*\/?>){3,}/gi, '<br>')
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
                            __html: source[item]
                                .replace(/(\r\n|\n|\r)/gm, '<br>')
                                .replace(/(<br\s*\/?>){3,}/gi, '<br>')
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

    const hasItemData = !!_source['all:items']
    //console.log(hasItemData)

    let h = highlight == null ? null : buildHighlights(highlight, _source)

    // Declare a new state variable, which we'll call "count"
    const [isActive, setIsActive] = useState(false)
    const toggle = () => setIsActive(!isActive)

    // const openInNewTab = (url) => {
    //     setDetailsActive(!detailsActive)
    //     //const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    //     const newWindow = window.open(url)
    //     if (newWindow) newWindow.opener = null
    // }

    const activatedDetails = isActive ? 'make-visible' : ''

    const coll = Object.keys(collections).find(
        (c) => _source['bibframe:collection'] === c
    )

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
                        {!!coll
                            ? collections[coll].desc.toUpperCase()
                            : 'UNKNOWN'}
                        {'    '}
                    </span>

                    <span className='boldy'>ID: </span>
                    <span className='boldy'>{_id} </span>
                    <Button
                        // onClick={() =>
                        //     openInNewTab(
                        //         `https://api.asianlegacylibrary.org/resources/${_id}?include_data=true`
                        //     )
                        // }

                        size='small'
                        color='primary'
                        className='go-right view-json'
                    >
                        <a href={`${apiUrl}/${_id}?include_data=true`}>
                            Open JSON Record
                        </a>
                    </Button>
                </div>
                {h ? <div className='card-highlights'>{h}</div> : null}
            </CardContent>

            <CardActions>
                <Button onClick={toggle} size='small' color='primary'>
                    {isActive ? 'Hide More...' : 'Show More...'}
                </Button>
                {hasItemData ? (
                    <Button
                        className='view-json go-right'
                        onClick={toggle}
                        size='small'
                        color='primary'
                    >
                        <Link to={`/details/${_id}`}>View Item Record</Link>
                    </Button>
                ) : null}

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
