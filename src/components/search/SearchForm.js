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
        this.handleUrlParams(this.props.location.search)
    }

    handleUrlParams = (params) => {
        let locationParams = Object.fromEntries(new URLSearchParams(params))

        if (typeof window !== 'undefined') {
            this.setState({
                baseUrl: `${window.location.protocol}//${window.location.host}`
            })
        }

        if (Object.keys(locationParams).length > 0) {
            console.log()
            this.setState(
                (prevState) => ({
                    params: {
                        ...prevState.params,
                        filter: locationParams.filter,
                        search_fields: locationParams.search_fields,
                        q: locationParams.q,
                        page_size: isNaN(parseInt(locationParams.page_size))
                            ? constants.elasticDefaultResultSize
                            : parseInt(locationParams.page_size),
                        page:
                            locationParams.page === '' ||
                            isNaN(parseInt(locationParams.page))
                                ? 1
                                : parseInt(locationParams.page),
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
        console.log('update search bar?')
        this.initializeSearch(this.state.params, 'reset')
    }

    handleRouting = (params) => {
        let u = new URLSearchParams(params).toString()
        //let pathName = `/${constants.searchUrlBase}${this.props.location.search}`
        let pathName = `/${constants.searchUrlBase}?${u}`

        this.props.history.push({
            //pathname: `/${url}?q=${param}`,
            pathname: pathName,
            state: u,
            from: this.props.location.pathname
            //search: u
        })
    }

    handlePrev = (e) => {
        e.preventDefault()

        let { page } = this.props.URLParams
        if (parseInt(page) > 1) {
            this.setState(
                (prevState) => ({
                    params: {
                        ...prevState.params,
                        page: parseInt(prevState.params.page) - 1
                    }
                }),
                () => {
                    console.log(this.state.params.page)
                    this.initializeSearch(this.state.params, 'initialize')
                }
            )
        }
        e.stopPropagation()
    }

    handleNext = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let { page, page_size } = this.state.params
        if (this.props.total > parseInt(page) * parseInt(page_size)) {
            this.setState(
                (prevState) => ({
                    params: {
                        ...prevState.params,
                        page: parseInt(prevState.params.page) + 1
                    }
                }),
                () => {
                    this.initializeSearch(this.state.params, 'initialize')
                }
            )
        }
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

    getPaginationMsg = () => {
        let total = this.props.total
        let { page, page_size } = this.state.params

        let pageRecord = parseInt(page) * parseInt(page_size)
        let endRecord = pageRecord < total ? pageRecord : total
        let startRecord = pageRecord - parseInt(page_size) + 1

        let msg =
            total > 0
                ? `Showing <span className="boldy">${startRecord} to ${endRecord} </span> of ${total}`
                : `&nbsp;`

        return msg
    }

    render() {
        const { params } = this.state
        const { total } = this.props

        let p = this.buildSearchParams()
        let resultsReceived = total > 0 ? true : false

        //let paginationMsg = this.getPaginationMsg()

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
                        value={params.q}
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
                    >{`Results: ${total}`}</div>

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
                        variant='outlined'
                        color='primary'
                        className='waves-effect waves-light btn'
                        disabled={params.page <= 1}
                        onClick={this.handlePrev}
                    >
                        PREV
                    </Button>

                    <Button
                        variant='outlined'
                        color='primary'
                        className='waves-effect waves-light btn'
                        disabled={
                            total <
                            parseInt(params.page) * parseInt(params.page_size)
                        }
                        onClick={(e) => this.handleNext(e)}
                    >
                        NEXT
                    </Button>
                </div>
                <div
                    className='result-pagination-msg'
                    dangerouslySetInnerHTML={{
                        __html: this.getPaginationMsg()
                    }}
                />
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
