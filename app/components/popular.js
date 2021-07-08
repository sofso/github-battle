import React from 'react'
import PropTypes from 'prop-types'

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
    selected: PropTypes.bool.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All'
        }

        this.selectLanguage = this.selectLanguage.bind(this);
    }

    selectLanguage(index) {
        this.setState({
            selectedLanguage : globalLanguages[index]
        });
    }

    render() {
        const { selectedLanguage } = this.state

        return (
            <React.Fragment>
                <LanguagesNav selected={selectedLanguage} onUpdateLanguage={this.selectLanguage} />
            </React.Fragment>
            
        )
    }
}