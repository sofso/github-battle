import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

const globalLanguages= ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

function LanguagesNav({selected, onUpdateLanguage}) {
    return(
        <ul className='flex-center'>
            {globalLanguages.map((language, index) => (
                <li key={index}>
                    <button
                    className='btn-clear nav-link'
                    style={language === selected ? {color: 'rgb(187, 46, 31)'} : null}
                    onClick={() => onUpdateLanguage(index)}>
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguageIndex: 0,
            repos: {},
            error: null
        }

        this.selectLanguage = this.selectLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    componentDidMount() {
        this.selectLanguage(this.state.selectedLanguageIndex)
    }

    selectLanguage(index) {
        this.setState({
            selectedLanguageIndex : index,
            error: null
        });

        if(!this.state.repos[globalLanguages[index]]) {
            fetchPopularRepos(globalLanguages[index])
            .then((data) => {
                this.setState(({ repos }) => ({
                    repos: {
                        ...repos,
                        [globalLanguages[index]]: data
                    }
                }))
            })
            .catch((error) => {
                console.warn('Error fetching repos: ', error)
                
                this.setState({
                    error: 'There was an error fetching the repositories.'
                })
            })
        }
    }

    isLoading() {
        const {selectedLanguageIndex, repos, error} = this.state

        return !repos[globalLanguages[selectedLanguageIndex]] && error === null
    }

    render() {
        const { selectedLanguageIndex, repos, error } = this.state

        return (
            <React.Fragment>
                <LanguagesNav selected={globalLanguages[selectedLanguageIndex]} onUpdateLanguage={this.selectLanguage} />

                {this.isLoading() && <p>LOADING...</p>}

                {error && <p>{error}</p>}

                {repos[globalLanguages[selectedLanguageIndex]] && <pre>{JSON.stringify(repos[globalLanguages[selectedLanguageIndex]], null, 2)}</pre>}
            </React.Fragment>
            
        )
    }
}