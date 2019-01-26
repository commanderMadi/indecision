import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './Modal'


class App extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }))
    }
    handleDeleteOption = (optionToDelete) => {
        this.setState(
            (prevState) => (
                { options: prevState.options.filter((option) => optionToDelete !== option) }
            )
        )
    }

    handlePick = () => {
        let randomNumber = Math.floor(Math.random() * this.state.options.length);
        console.log(this.state.selectedOption);
        this.setState(() => ({ selectedOption: this.state.options[randomNumber] }));
    }

    handleAddOption = (option) => {
        if (!option) {
            return "Please enter a value to continue"
        }
        else if (this.state.options.indexOf(option) > -1) {
            return "This value already exists"
        }
        else if (this.state.options.length === 20) {
            return "Maximum limit reached."
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }))
    }

    handleModalClear = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    componentDidMount() {
        try {
            const data = localStorage.getItem('options');
            const parsedData = JSON.parse(data);
            if (parsedData) {
                this.setState(() => ({ options: parsedData }));
            }
        } catch (e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const data = JSON.stringify(this.state.options);
            localStorage.setItem('options', data);
        }
    }


    componentWillUnMount() {
        console.log('Component will unmount!')
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                    <Options
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                    options={this.state.options}
                />
                <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleModalClear={this.handleModalClear}
                />
            </div>
        )
    }
}

export default App;