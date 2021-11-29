import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import '../../assets/css/mui/Card.scss'
import '../../assets/css/mui/Button.scss'
import '../../assets/css/Search-Card.scss'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchDetailsAction } from '../../store/actions'
import DetailHits from './DetailHits'
import { BackButton } from '../ButtonBack'
import { getNested } from '../../utilities'

class Details_PreConnect extends React.Component {
    state = {
        params: {
            id: null,
            q: ''
        }
    }

    componentDidMount = () => {
        //let q = new URLSearchParams(this.props.location.state.from).get('q')

        // get id
        let id = this.props.match.params.id ? this.props.match.params.id : null
        // get Q from URL params
        let q = ''
        let locationParams = Object.fromEntries(
            new URLSearchParams(this.props.location.search)
        )
        if ('q' in locationParams) {
            q = locationParams.q
        } else {
            let from = getNested(this.props.location, 'state', 'from')
            q = from ? from.split('q=').pop().split('&')[0] : ''
        }
        // fetch data
        this.setState(
            {
                params: {
                    ...this.state.params,
                    id: id,
                    q: q
                }
            },
            () => {
                this.initializeSearch(this.state.params)
            }
        )
    }

    initializeSearch = (params) => {
        this.props.fetchDetailsAction(params)
        this.handleRouting(params)
    }

    handleLocation = (initialLocation) => {
        if (initialLocation) {
            this.props.history.push('/search')
        } else {
            this.props.history.goBack()
        }
    }

    handleRouting = (params) => {
        let u = new URLSearchParams(params).toString()
        //let pathName = `/${constants.searchUrlBase}${this.props.location.search}`
        let pathName = `/details/${params.id}/search?q=${params.q}`

        this.props.history.push({
            //pathname: `/${url}?q=${param}`,
            pathname: pathName,
            state: u,
            from: this.props.location.pathname
            //search: u
        })
    }

    render() {
        if (this.props.data.length < 1) {
            return null
        }
        if (!this.state.params.id) {
            return null
        }
        return (
            <div className='search-results'>
                <BackButton>Back To Search</BackButton>
                <Card className='MuiCard-root' square={true} elevation={1}>
                    {/* <CardActions>
                        
                    </CardActions> */}
                    <CardContent className='detail-hits'>
                        <DetailHits
                            data={this.props.data}
                            total={this.props.total}
                            mainId={this.state.params.id}
                        />
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.elasticsearch.details.data.hits,
    total: state.elasticsearch.details.data.total.value
})

export const Details = connect(mapStateToProps, {
    fetchDetailsAction
})(withRouter(Details_PreConnect))
