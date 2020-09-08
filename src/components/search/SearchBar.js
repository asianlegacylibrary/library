import React from 'react'

export class SearchBar extends React.Component {
    state = {
        term: ''
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({ term: e.target.value })
    }

    handleNewSearch = (e) => {
        e.preventDefault()
        this.updateSearchDefinitionAndFetch()
    }

    updateSearchDefinitionAndFetch = () => {
        this.setState({ searchDefinition: this.state.term }, () => {
            this.props.fetchResults(this.state.searchDefinition)
        })
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
