import '../../assets/css/Search.scss'
import { Button, Input } from '@material-ui/core'
import React from 'react'
import {
    fetchResultsAction,
    resetURLParams,
    pageUp,
    pageDown
} from '../../store/actions'
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

    handlePrev = () => {
        console.log('prev')
        let { page, page_size } = this.props.URLParams
        if (parseInt(page) * parseInt(page_size) - parseInt(page_size) >= 0) {
            this.props.pageDown()
            // search with offset
        } else {
            //this.props.setOffsets(this.props.searchTypeDisplay, 0)
        }
    }

    handleNext = () => {
        console.log('next')
        let { page, page_size } = this.props.URLParams
        let newPage = parseInt(page)
        if (this.props.total > parseInt(page) * parseInt(page_size)) {
            this.props.pageUp()
            //search with offset
        } else {
            //this.props.setOffsets(this.props.searchTypeDisplay, 0)
        }
        console.log('next', page, newPage)
    }

    buildSearchParams = () => {
        return Object.keys(this.state.params).map((k) => {
            //return Object.keys(this.props.URLParams).map((k) => {
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
                        //value={this.props.URLParams[k]}
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
                {/* <Button
                        className="waves-effect waves-light btn wide"
                        disabled={this.props.results.isFetching}
                        onClick={(e) => this.handleNewSearch(e)}
                    >
                        {this.props.results.isFetching ? 'Searching' : `Search`}
                    </Button> */}
                <div className='result-pagination'>
                    <Button
                        className='waves-effect waves-light btn'
                        disabled={false}
                        onClick={this.handlePrev}
                    >
                        PREV
                    </Button>

                    <Button
                        className='waves-effect waves-light btn'
                        disabled={false}
                        onClick={this.handleNext}
                    >
                        NEXT
                    </Button>
                </div>
                {/* <div
                        className="result-pagination-msg"
                        dangerouslySetInnerHTML={{
                            __html: paginationMsg,
                        }}
                    /> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    total: state.elasticsearch.results.data.total.value,
    offset: state.elasticsearch.results.offset,
    URLParams: state.URLParams
})

export const SearchForm = connect(mapStateToProps, {
    fetchResultsAction,
    resetURLParams,
    pageUp,
    pageDown
})(withRouter(SearchForm_PreConnect))
