import React from 'react';
import Option from './Option';
const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options</h3>
            <button
                className="btn btn--link"
                onClick={props.handleDeleteOptions}>Remove All</button>
        </div>
            {props.options.map((option,index) =>
                <Option
                    key={option}
                    optionText={option}
                    count={index+1}
                    handleDeleteOption={props.handleDeleteOption}
                />
            )}
        {props.options.length === 0 &&
        <p className="widget__message">Kindly add an option to start!</p>}
    </div>
)

export default Options;