import '../../assets/css/Search.css'
import React from 'react'
import { fetchResultsAction } from '../../store/actions'
import { connect } from 'react-redux'
import { SearchBar } from './index'
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
                    this.initializeSearch(params)
                })
            } else {
                this.initializeSearch(params)
            }
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({ q: e.target.value })
    }

    initializeSearch = (params) => {
        this.props.fetchResultsAction(params)
        this.handleRouting(params)
    }

    updateSearchBarQuery = () => {
        //e.preventDefault()
        console.log(this.props, this.state)

        // check filters, etc once those components exist

        this.initializeSearch({ q: this.state.q })
        this.handleRouting({ q: this.state.q })
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
            </div>
        )
    }
}

export const SearchForm = connect(null, {
    fetchResultsAction
})(withRouter(SearchForm_PreConnect))
