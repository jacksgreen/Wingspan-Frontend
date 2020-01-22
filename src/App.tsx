import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar'
import Body from './components/productPage/body'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutPage from './components/aboutPage/about';


const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
              <Body />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
