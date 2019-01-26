class Visibility extends React.Component {
    constructor(props) {
        super(props);
        this.toggleButton = this.toggleButton.bind(this);
        this.state = {
            title: 'Visibility Toggle App',
            clicked: false
        }
    }
    toggleButton() {
        this.setState(prev => {
            return {
                clicked: !prev.clicked
            }
        })
    }
    render() {
        return (
            <div>
               <h1>{this.state.title}</h1>
               <button onClick={this.toggleButton}>{this.state.clicked ? "Hide Details" : "Show Details"}</button>
               {this.state.clicked && <p>Details are now being shown on the page.</p>}
            </div>
        )
    }
}


const appRoot = document.getElementById('app');

ReactDOM.render(<Visibility />, appRoot);



// let buttonClicked = false;

// let toggleData = () => {
//     if(!buttonClicked) {
//         buttonClicked = true;
//     }
//     else {
//         buttonClicked = false;
//     }
//     render();
// }
// let render = () => {
// const template = (
//     <div>
//     <h1>Visibility Toggle</h1>
//     <button onClick={toggleData}>{buttonClicked ? "Hide Details": "Show Details"}</button>
//     {buttonClicked && <p>Here are some details you'd like to see!</p>}
//     </div>
// )
// }
// render();

