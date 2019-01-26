class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        }
    }

    componentDidMount() {
        try {
            const data = localStorage.getItem('options');
            const parsedData = JSON.parse(data);
            if(parsedData) {
                this.setState(() => ({options: parsedData}));
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

    
    componentWillMount() {
        console.log('Component will unmount!')
    }
    
    
    handleDeleteOptions() {
        this.setState(()=>({options: []}))
    }
    handleDeleteOption(optionToDelete) {
        this.setState(
            (prevState) => (
                {options: prevState.options.filter((option) => optionToDelete !== option)}
            )
        )
    }
    
    handlePick() {
        let randomNumber = Math.floor(Math.random() * this.state.options.length);
        console.log(this.state.options)
        alert(this.state.options[randomNumber]);
    }

    handleAddOption(option) {
        if(!option) {
            return "Please enter a value to continue"
        }
        else if(this.state.options.indexOf(option) > -1) {
            return "This value already exists"
        }
        else if(this.state.options.length === 20) {
            return "Maximum limit reached."
        }
        this.setState((prevState)=>({options: prevState.options.concat(option)}))
    }
    
    render() {
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action 
                hasOptions={this.state.options.length > 0}
                handlePick = {this.handlePick}
                />
                <Options
                handleDeleteOptions = {this.handleDeleteOptions}
                handleDeleteOption = {this.handleDeleteOption}
                options = {this.state.options} 
                />
                <AddOption handleAddOption = {this.handleAddOption} />
            </div>
        )
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    )
}

Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => {
    return (
        <div>
            <button
            onClick = {props.handlePick}
            disabled= {!props.hasOptions}
            >
            What should I do
            </button>
        </div>
    )
}

const Options = (props) => {
    return (
        <div>
            <button onClick = {props.handleDeleteOptions}>Remove All</button>
            {props.options.map(option => 
                <Option 
                key={option}
                optionText={option}
                handleDeleteOption = {props.handleDeleteOption}
                />
                )}
            {props.options.length === 0 && <p>Kindly add an option to start!</p>}
        </div>
    )
}

const Option = (props) => {
    return (
        <div>
            <p>{props.optionText}</p>
            <button 
            onClick={(e)=>{
                e.preventDefault()
                props.handleDeleteOption(props.optionText)
            }}
            >
            remove
            </button>
        </div>
    )
}


class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();
        console.log(e.target.elements)
        const option = e.target.elements.option.value.trim().toLowerCase();
        const error = this.props.handleAddOption(option);
        this.setState(()=>({error}));
        if (!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));