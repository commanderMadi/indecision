// main template data

let app = {
    title: 'Indecision App',
    subtitle: 'Let the computer choose for you!',
    options: []
}
const onFormSubmit = (e) => {
    e.preventDefault();
    const addbtn = document.getElementById('add-option');
    const limitSign = document.getElementById('limit-sign');
    const option = e.target.elements.option.value;

    if(option && app.options.length < 5) {
        app.options.push(option);
        e.target.elements.option.value = '';
        if(app.options.length === 5) {
        addbtn.disabled = true;
    }
    }
    render();

}

const removeOptions = () => {
    app.options.length = 0;
    render();
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    alert("The computer chose " + app.options[randomNum] + " !")
}

const appRoot = document.getElementById('app');

let render = () => {
    let template =
    (<div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p id="options-text">
        {app.options && app.options.length > 0 ? "Here are your options": "No Options"}
        </p>
        <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
        <button onClick={removeOptions}>Remove All</button>
        <ol>
            {
                app.options.map(option => <li key={option}>{option}</li>)
            }
        </ol>
        <form onSubmit={onFormSubmit}>
            <input type="text" name="option"/>
            <button id="add-option">Add Option</button>
            {app.options.length === 5 && <span style={{marginLeft: 10 + 'px'}} id="limit-sign">Maximum limit reached!</span>}
        </form>
    </div>
    );
    ReactDOM.render(template, appRoot);
}

render();
