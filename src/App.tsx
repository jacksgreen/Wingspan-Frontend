import React from 'react';
import './App.css';
import { Button } from 'reactstrap';
import NavBar2 from './components/NavBar2'
import AndroidIcon from '@material-ui/icons/Android';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <NavBar2 />
    </div>
  );
}

export default App;
