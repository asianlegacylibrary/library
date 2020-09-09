import React from 'react'
import { fetchResultsAction } from '../../store/actions'
import { connect } from 'react-redux'

class clxSearchBar extends React.Component {
    state = {
        term: ''
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({ term: e.target.value })
    }

    handleNewSearch = (e) => {
        e.preventDefault()
        this.props.fetchResultsAction({ term: this.state.term })
    }

    render() {
        return (
            <input
                className='search-input'
                autoFocus
                type='text'
                value={this.state.term}
                onChange={(e) => this.handleChange(e)}
                onKeyDown={(e) =>
                    e.key === 'Enter' ? this.handleNewSearch(e) : null
                }
            />
        )
    }
}

export const SearchBar = connect(null, { fetchResultsAction })(clxSearchBar)
