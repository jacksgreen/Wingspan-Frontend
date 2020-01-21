import React from 'react';
import './App.css';
import { Button } from 'reactstrap';
import Navbar from './components/navbar/navbar'
import Body from './components/productPage/body'

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar></Navbar>
      <div className="setMarginTop">
        <Body></Body>
        <Button color="danger">Start</Button>
      </div>
    </div>
  );
}

export default App;
