import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaStar, FaCodeBranch, FaExclamationTriangle, FaUser } from 'react-icons/fa'

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

function ReposGrid({ repos }) {
    return (
        <ul className='grid space-around'>
            {repos.map((repo, index) => {
                const {name, owner, html_url, stargazers_count, forks, open_issues} = repo
                const {login, avatar_url} = owner

                return (
                    <li key={html_url} className='repo bg-light'>
                        <h4 className='header-lg center-text'>
                            #{index +1}
                        </h4>
                        <img className='avatar' src={avatar_url} alt={`Avatar for ${login}`} />
                        <h2 className='center-text'>
                            <a className='link' href={html_url}>
                                {login}
                            </a>
                        </h2>
                        <ul className='card-list'>
                            <li>
                                <FaUser color='rgb(255, 191, 116)' size={22} />
                                <a href={`http://github.com/${login}`}>
                                    {login}
                                </a>
                            </li>
                            <li>
                                <FaStar color='rgb(255, 215, 0)' size={22} />
                                {`${stargazers_count.toLocaleString()} stars`}
                            </li>
                            <li>
                                <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                                {`${forks.toLocaleString()} forks`}
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                                {`${open_issues.toLocaleString()} open issues`}
                            </li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
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

                {repos[globalLanguages[selectedLanguageIndex]] && <ReposGrid repos={repos[globalLanguages[selectedLanguageIndex]]} />}
            </React.Fragment>
            
        )
    }
}