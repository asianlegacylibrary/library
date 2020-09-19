import Card from '@material-ui/core/Card'
//import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import '../../assets/css/mui/Card.css'

import React from 'react'

//const hlt_keys = ['author-tibetan', 'title-tibetan', 'colophon']

function buildHighlights(highlights) {
    let b = []
    Object.entries(highlights).forEach(([key, v]) => {
        //console.log(k, v)

        b.push(
            <div key={key}>
                <span className='span-title'>{key}</span>
                <span
                    dangerouslySetInnerHTML={{
                        __html: v[0]
                    }}
                />
            </div>
        )
    })
    return b
}

export function ResultCard({ data }) {
    const { _id, highlight } = data
    const h = highlight == null ? null : buildHighlights(highlight)

    return (
        <Card className='MuiCard-root' square={true} elevation={0}>
            <CardContent>
                <div className='card-meta'>{_id}</div>
                {h ? <div className='card-highlights'>{h}</div> : null}
            </CardContent>
        </Card>
    )
}
