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

    render() {
        if (this.props.data.length < 1) {
            return null
        }
        return (
            <div className='search-results'>
                <Card className='MuiCard-root' square={true} elevation={1}>
                    <CardActions>
                        <Button onClick={this.props.history.goBack}>
                            Back To Search
                        </Button>
                    </CardActions>
                    <CardContent>
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
