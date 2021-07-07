import React from 'react'

const globalLanguages= ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

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
        const languages= ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

        return(
            <ul className='flex-center'>
                {globalLanguages.map((language, index) => (
                    <li key={index}>
                        <button
                        className='btn-clear nav-link'
                        style={language === this.state.selectedLanguage ? {color: 'rgb(187, 46, 31)'} : null}
                        onClick={() => this.selectLanguage(index)}>
                            {language}
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
}