import React from 'react';
import './style.css'


interface Props {
    title: string,
    description: string,
    image: string,
    amount: number,
}
const Box: React.FC<Props> = (props) => {
    const { amount, title, description, image } = props;
    return (
        <div className="box-container">
            <div className="box-title">{title}</div>
            <div className="box">
                <div className="box-img">
                    <img className="img-size" src={window.location.origin + `/img/${image}`}></img>
                </div>
                <div className="box-data">
                    <div>{description}</div>
                    <div className="box-result">{amount}</div>
                </div>
            </div>
        </div>
    );
};

export default Box;