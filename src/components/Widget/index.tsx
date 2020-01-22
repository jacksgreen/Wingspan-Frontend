import React, { useRef } from 'react';
import './style.css'
import { Button } from 'reactstrap'

const Widget: React.FC = () => {
    const selectRef = useRef<HTMLSelectElement>()
    const inputRef = useRef<HTMLInputElement>()
    const calculate = () => {
        const unit = selectRef.current.value;
        const amount = parseInt(inputRef.current.value);
        if (isNaN(amount) || unit == '') {
            return;
        }
        window.open(`https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator?unit=${unit}&amount=${amount}`)
    }
    return (
        <div className="page-container">
            <div className="widget-container">
                <h3 className="widget-title">Gas Equivalencies Calculator</h3>
                <select ref={selectRef} className="GHG_type">
                    <option value="">- Select a Unit -</option>
                    <option value="gasoline">Gallons of Gasoline</option>
                    <option value="kilowatthours">Killowatt-hours of Electricity</option>
                    <option value="MCF">MCF of Natural Gas</option>
                    <option value="therms">Therms of Natural Gas</option>
                    <option value="vehicles">Passenger vehicles</option>
                </select>
                <label>Amount
            <input ref={inputRef} className="input"></input>
                </label>
                <Button onClick={calculate} color="secondary">Calculate</Button>
            </div>
            <div className="results-container">
                <div className="box">
                    <div className="box-img"></div>
                    <div className="box-data">
                        <div>acres of U.S. forests in one year</div>
                        <div className="box-result">100</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Widget;