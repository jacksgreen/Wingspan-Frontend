import React from 'react';
import './App.css';
import { Button } from 'reactstrap';
import NavBar2 from './components/NavBar2'
import Navbar from './components/navbar/navbar'
import Body from './components/productPage/body'

const App: React.FC = () => {
  return (
    <div className="app-container">
      <NavBar2 />
      <Navbar></Navbar>
      <div className="setMarginTop">
        <Body></Body>
      </div>
    </div>
  );
}

export default App;
