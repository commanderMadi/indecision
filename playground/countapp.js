class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.addOne = this.addOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
        this.resetAll = this.resetAll.bind(this);
        this.state = {
            count: 0,
            error: false,
            errorMsg: 'Minimum amount is zero. Cannot go below this.'
        }
    }

    componentDidMount() {
        try {
            const savedData = localStorage.getItem('count');
            const count = parseInt(savedData, 10);
            console.log(count)
            if(!isNaN(count)) {
                console.log('ran')
                this.setState(() => ({count}));
            }
        } catch (e) {
            return;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.count !== this.state.count) {
            localStorage.setItem('count', this.state.count);
        }
    }
    
    addOne() {
        this.setState(prev => {return {count: prev.count + 1, error: false}});
    }
    minusOne() {
        if(!(this.state.count === 0)) {
            this.setState(prev => {return {count: prev.count - 1}});
        }
        else if(this.state.count === 0) {
            this.setState(()=> {return {error: true}})

        }
    }
    resetAll() {
        this.setState(() => {return {count: 1}});
    }
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                {this.state.error &&<p>{this.state.errorMsg}</p>}
                <button onClick={this.addOne}>+1</button>
                <button onClick={this.minusOne}>-1</button>
                <button onClick={this.resetAll}>reset</button>
            </div>
        )
    }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
