import '../../assets/css/Search.scss'
import React from 'react'
import { fetchResultsAction, resetURLParams } from '../../store/actions'
import { connect } from 'react-redux'
import { SearchBar, SearchOverview } from './index'
import { withRouter } from 'react-router-dom'
import { constants } from '../../store/types'

class SearchForm_PreConnect extends React.Component {
    state = {
        q: ''
    }

    componentDidMount = () => {
        // check for url params on mount, add to state
        //let q = new URLSearchParams(this.props.location.search).get('q')

        let params = Object.fromEntries(
            new URLSearchParams(this.props.location.search)
        )

        //console.log(params)

        if (Object.keys(params).length > 0) {
            if ('q' in params) {
                this.setState({ q: params.q }, () => {
                    this.initializeSearch(params, 'initialize')
                })
            } else {
                this.initializeSearch(params, 'initialize')
            }
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({ q: e.target.value })
    }

    initializeSearch = (params, paramAction) => {
        this.props.fetchResultsAction(params, paramAction)
        this.handleRouting(params)
    }

    updateSearchBarQuery = () => {
        //e.preventDefault()
        this.initializeSearch({ q: this.state.q }, 'reset')
        //this.handleRouting({ q: this.state.q })
    }

    handleRouting = (params) => {
        let u = new URLSearchParams(params).toString()
        //let pathName = `/${constants.searchUrlBase}${this.props.location.search}`
        let pathName = `/${constants.searchUrlBase}?${u}`
        console.log(u, pathName)
        this.props.history.push({
            //pathname: `/${url}?q=${param}`,
            pathname: pathName,
            state: u
            //search: u
        })
    }

    render() {
        return (
            <div className='search-container'>
                <SearchBar
                    value={this.state.q}
                    handleChange={this.handleChange}
                    handleNewSearch={this.updateSearchBarQuery}
                />
                <SearchOverview />
            </div>
        )
    }
}

export const SearchForm = connect(null, {
    fetchResultsAction,
    resetURLParams
})(withRouter(SearchForm_PreConnect))
