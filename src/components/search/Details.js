import { Button } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
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

class Details_PreConnect extends React.Component {
    state = {
        id: null
    }

    componentDidMount = () => {
        if (this.props.match.params.id) {
            this.setState({ id: this.props.match.params.id }, () => {
                this.props.fetchDetailsAction(this.state.id)
            })
        }
    }

    handleLocation = (initialLocation) => {
        if (initialLocation) {
            this.props.history.push('/search')
        } else {
            this.props.history.goBack()
        }
    }

    render() {
        console.log('history from POV of results component', this.props.history)
        let initialLocation = false
        if (this.props.history.location.state === undefined) {
            console.log('make back btn to search')
            initialLocation = true
        }
        if (this.props.data.length < 1) {
            return null
        }
        return (
            <div className='search-results'>
                {/* <Button onClick={this.handleLocation}>Back To Search</Button> */}
                <BackButton>Back To Search</BackButton>
                <Card className='MuiCard-root' square={true} elevation={1}>
                    {/* <CardActions>
                        
                    </CardActions> */}
                    <CardContent className='detail-hits'>
                        <DetailHits
                            data={this.props.data}
                            total={this.props.total}
                            mainId={this.state.id}
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
