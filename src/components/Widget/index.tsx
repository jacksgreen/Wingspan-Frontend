import React, { useRef, useState } from 'react';
import './style.css';
import { Button } from 'reactstrap';
import Box from '../Box';
import { stringify } from 'querystring';

interface Values {
  carbon: number;
  co2: number;
  gasFrom: number;
  gasAvoided: number;
}
interface Item {
  title: string;
  description: string;
  image: string;
  amount: number | string;
}
const Widget: React.FC = () => {
  const [data, setData] = useState([]);
  const selectRef = useRef<HTMLSelectElement>();
  const inputRef = useRef<HTMLInputElement>();
  const calculate = () => {
    const unit = selectRef.current.value;
    const amount = parseInt(inputRef.current.value);
    if (isNaN(amount) || unit == '') {
      return;
    }
    const values = calculaeAmount(unit, amount);
    const data = getData(values);
    setData(data);
  };
  const calculaeAmount = (unit: string, amount: number): Values => {
    let ratios: Values;
    switch (unit) {
      case 'gasoline':
        ratios = { carbon: 0.012, co2: 1133, gasFrom: 22.1, gasAvoided: 0.378 };
        break;
      case 'kilowatthours':
        ratios = { carbon: 0.0009, co2: 90.2, gasFrom: 1.8, gasAvoided: 0.03 };
        break;
      case 'MCF':
        ratios = { carbon: 0.072, co2: 6997, gasFrom: 136, gasAvoided: 2.3 };
        break;
      case 'therms':
        ratios = { carbon: 0.007, co2: 675, gasFrom: 13.1, gasAvoided: 0.225 };
        break;
      case 'vehicles':
        ratios = { carbon: 6, co2: 590308, gasFrom: 11486, gasAvoided: 197 };
        break;
    }
    ratios.carbon *= amount;
    ratios.co2 *= amount;
    ratios.gasFrom *= amount;
    ratios.gasAvoided *= amount;
    return ratios;
  };
  const getData = (values: Values): Array<Item> => {
    const data = [
      {
        title: 'Carbon sequestered by',
        description: 'acres of U.S. forests in one year',
        image: 'pineforests.gif',
        amount: values.carbon.toFixed(2)
      },
      {
        title: 'CO2 emissions from',
        description: 'number of smartphones charged',
        image: 'mobile-phone.png',
        amount: values.co2.toFixed(2)
      },
      {
        title: 'Gas emissions from',
        description: 'Miles driven by an average passenger vehicle',
        image: 'vehicles.gif',
        amount: values.gasFrom.toFixed(2)
      },
      {
        title: 'Gas emissions avoided by',
        description: 'trash bags of waste recycled instead of landfilled',
        image: 'trash-bag.png',
        amount: values.gasAvoided.toFixed(2)
      }
    ];
    return data;
  };
  return (
    <div className='page-container'>
      <div className='widget-container'>
        <h3 className='widget-title'>Gas Equivalencies Calculator</h3>
        <select ref={selectRef} className='GHG_type'>
          <option value=''>- Select a Unit -</option>
          <option value='gasoline'>Gallons of Gasoline</option>
          <option value='kilowatthours'>Killowatt-hours of Electricity</option>
          <option value='MCF'>MCF of Natural Gas</option>
          <option value='therms'>Therms of Natural Gas</option>
          <option value='vehicles'>Passenger vehicles</option>
        </select>
        <label>
          Amount
          <input ref={inputRef} className='input'></input>
        </label>
        <Button onClick={calculate} color='secondary'>
          Calculate
        </Button>
      </div>
      <div className='results-container'>
        {data.length != 0 &&
          data.map((item, i) => {
            const { amount, description, title, image } = item;
            return (
              <Box
                key={i}
                amount={amount}
                description={description}
                title={title}
                image={image}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Widget;
