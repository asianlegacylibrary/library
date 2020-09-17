import '../../assets/css/Search.css'
import React from 'react'
import { fetchResultsAction, setSearchTerm } from '../../store/actions'
import { connect } from 'react-redux'
import { SearchBar } from './index'
import { withRouter } from 'react-router-dom'
import { constants } from '../../store/types'

class SearchForm_PreConnect extends React.Component {
    state = {
        term: ''
    }

    componentDidMount = () => {
        // check for url params on mount, add to state
        let term = new URLSearchParams(this.props.location.search).get('term')
        if (term) {
            this.setState({ term }, () => {
                this.handleNewSearch()
            })
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({ term: e.target.value })
    }

    handleNewSearch = () => {
        //e.preventDefault()
        console.log(this.props, this.state)
        this.props.setSearchTerm(this.state.term)
        this.props.fetchResultsAction({ term: this.state.term })
        this.handleRouting(constants.searchUrlBase, this.state.term)
    }

    handleRouting = (url, param) => {
        this.props.history.push({
            pathname: `/${url}?term=${param}`,
            state: param
        })
    }

    render() {
        return (
            <div className='search-container'>
                <SearchBar
                    value={this.state.term}
                    handleChange={this.handleChange}
                    handleNewSearch={this.handleNewSearch}
                />
            </div>
        )
    }
}

export const SearchForm = connect(null, { fetchResultsAction, setSearchTerm })(
    withRouter(SearchForm_PreConnect)
)
