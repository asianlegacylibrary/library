import '../../assets/css/Search.scss'
import { Button, Input } from '@material-ui/core'
import React from 'react'
import { fetchResultsAction, resetURLParams } from '../../store/actions'
import { connect } from 'react-redux'
//import { SearchBar } from './index'
import { withRouter } from 'react-router-dom'
import { constants } from '../../store/types'
import { URLParamsForUser, URLParamsPlaceholders } from '../../store/statics'

class SearchForm_PreConnect extends React.Component {
    state = {
        params: URLParamsForUser,
        placeholders: URLParamsPlaceholders,
        baseUrl: ''
    }

    componentDidMount = () => {
        // check for url params on mount, add to state
        //let q = new URLSearchParams(this.props.location.search).get('q')

        let locationParams = Object.fromEntries(
            new URLSearchParams(this.props.location.search)
        )

        if (typeof window !== 'undefined') {
            this.setState({
                baseUrl: `${window.location.protocol}//${window.location.host}`
            })
        }

        if (Object.keys(locationParams).length > 0) {
            this.setState(
                (prevState) => ({
                    params: {
                        ...prevState.params,
                        filter: locationParams.filter,
                        search_fields: locationParams.search_fields,
                        q: locationParams.q,
                        page_size: locationParams.page_size,
                        page: locationParams.page,
                        highlights: locationParams.highlights,
                        class: locationParams.class
                    }
                }),
                () => {
                    this.buildSearchParams()
                    this.initializeSearch(this.state.params, 'initialize')
                }
            )
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        const target = event.target
        const name = target.name

        this.setState((prevState) => ({
            params: {
                ...prevState.params,
                [name]: target.value
            }
        }))
    }

    initializeSearch = (params, paramAction) => {
        this.props.fetchResultsAction(params, paramAction)
        this.handleRouting(params)
    }

    updateSearchBarQuery = () => {
        this.initializeSearch(this.state.params, 'reset')
    }

    handleRouting = (params) => {
        let u = new URLSearchParams(params).toString()
        //let pathName = `/${constants.searchUrlBase}${this.props.location.search}`
        let pathName = `/${constants.searchUrlBase}?${u}`

        this.props.history.push({
            //pathname: `/${url}?q=${param}`,
            pathname: pathName,
            state: u
            //search: u
        })
    }

    buildSearchParams = () => {
        return Object.keys(this.state.params).map((k) => {
            // don't return Q, that's the search bar
            if (k === 'q') return null
            return (
                <span key={k}>
                    <label htmlFor={k}>{`${this.state.placeholders[
                        k
                    ].name.toUpperCase()}: `}</label>
                    <input
                        name={k}
                        className='param-filter'
                        spellCheck='false'
                        autoCapitalize='false'
                        autoCorrect='false'
                        autoComplete='false'
                        type='text'
                        placeholder={this.state.placeholders[k].value}
                        value={this.state.params[k]}
                        onChange={(e) => this.handleInputChange(e)}
                        onKeyDown={(e) =>
                            e.key === 'Enter'
                                ? this.updateSearchBarQuery(e)
                                : null
                        }
                    />
                </span>
            )
        })
    }

    render() {
        let p = this.buildSearchParams()
        let resultsReceived = this.props.total > 0 ? true : false
        return (
            <div className='search-container'>
                <div className='search-bar'>
                    <Input
                        name='q'
                        className='MuiInput-root'
                        spellCheck='false'
                        autoCapitalize='false'
                        autoCorrect='false'
                        autoComplete='false'
                        autoFocus
                        type='text'
                        value={this.state.params.q}
                        onChange={(e) => this.handleInputChange(e)}
                        onKeyDown={(e) =>
                            e.key === 'Enter'
                                ? this.updateSearchBarQuery(e)
                                : null
                        }
                    />
                </div>
                <div className='search-controls'>
                    <div
                        className={`results-total ${
                            resultsReceived ? 'more-than-zero' : ''
                        }`}
                    >{`Results: ${this.props.total}`}</div>

                    <div className='url-params'>
                        <p>{p}</p>
                    </div>
                </div>
                <Button
                    variant='outlined'
                    color='primary'
                    disableElevation
                    className='btn-copy'
                    onClick={() => {
                        navigator.clipboard.writeText(
                            `${this.state.baseUrl}${this.props.location.pathname}`
                        )
                    }}
                >
                    COPY SEARCH URL
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    total: state.elasticsearch.results.data.total.value,
    URLParams: state.URLParams
})

export const SearchForm = connect(mapStateToProps, {
    fetchResultsAction,
    resetURLParams
})(withRouter(SearchForm_PreConnect))
