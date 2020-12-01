import Card from '@material-ui/core/Card'
//import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import '../../assets/css/Search-Results.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import { ResultCard } from './index'

export function Results() {
    const results = useSelector((state) => state.elasticsearch.results)
    let r = []

    if (results.isFetching) {
        return (
            <div className='search-results'>
                <Card className='MuiCard-root' square={true} elevation={0}>
                    SEARCHING
                </Card>
            </div>
        )
    }

    if (Object.keys(results.data.error).length > 0) {
        return (
            <div className='search-results'>
                <Card className='MuiCard-root' square={true} elevation={0}>
                    <CardContent>{results.data.error.errorStatus}</CardContent>
                </Card>
            </div>
        )
    }

    r = results.data.hits.map((r, i) => {
        return <ResultCard key={i} data={r} />
    })

    console.log(r)

    return <div className='search-results'>{r}</div>
}
