import '../../assets/css/Search.scss'
import React from 'react'
import { fetchResultsAction, resetURLParams } from '../../store/actions'
import { connect } from 'react-redux'
import { SearchBar } from './index'
import { withRouter } from 'react-router-dom'
import { constants } from '../../store/types'
import { URLParamsForUser } from '../../store/statics'

class SearchForm_PreConnect extends React.Component {
    state = {
        params: URLParamsForUser
    }

    componentDidMount = () => {
        // check for url params on mount, add to state
        //let q = new URLSearchParams(this.props.location.search).get('q')

        let locationParams = Object.fromEntries(
            new URLSearchParams(this.props.location.search)
        )

        if (Object.keys(locationParams).length > 0) {
            this.setState(
                (prevState) => ({
                    params: {
                        ...prevState.params,
                        filter: locationParams.filter,
                        q: locationParams.q
                    }
                }),
                () => {
                    console.log(this.state)
                    this.buildSearchParams()
                    this.initializeSearch(this.state.params, 'initialize')
                }
            )
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        console.log(event.target.name)
        const target = event.target
        //const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState(
            (prevState) => ({
                params: {
                    ...prevState.params,
                    [name]: target.value
                }
            }),
            () => {
                console.log('')
            }
        )
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
        console.log(u, pathName)
        this.props.history.push({
            //pathname: `/${url}?q=${param}`,
            pathname: pathName,
            state: u
            //search: u
        })
    }

    buildSearchParams = () => {
        let p = {
            ...this.state.params,
            ...this.props.URLParams
        }

        const paramDisplay = Object.entries(this.state.params).map(([k, v]) => {
            return (
                <span key={k}>
                    {`${k} =>`}
                    <input
                        name={k}
                        className='param-filter'
                        spellCheck='false'
                        autoCapitalize='false'
                        autoCorrect='false'
                        autoComplete='false'
                        type='text'
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
        return paramDisplay
    }

    render() {
        let p = this.buildSearchParams()
        return (
            <div className='search-container'>
                <SearchBar
                    value={this.state.params.q}
                    handleChange={this.handleInputChange}
                    handleNewSearch={this.updateSearchBarQuery}
                />
                <div className='search-controls'>
                    <div className='url-params'>
                        <p>{p}</p>
                    </div>

                    <div className='results-total'>
                        <p>{`Results: ${this.props.total}`}</p>
                    </div>
                </div>
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
