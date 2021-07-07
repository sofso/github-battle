import React from 'react'

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All'
        }

        this.selectLanguage = this.selectLanguage.bind(this);
    }

    selectLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage
        });
        console.log(selectedLanguage);
    }

    render() {
        const languages= ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

        return(
            <ul className='flex-center'>
                {languages.map((language, index) => (
                    <li key={index}>
                        <button className='btn-clear nav-link' onClick={() => this.selectLanguage(language)}>{language}</button>
                    </li>
                ))}
            </ul>
        )
    }
}