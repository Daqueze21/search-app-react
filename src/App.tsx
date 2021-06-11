import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Search from './components/Search/Search';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/Search">
            <Search />
          </Route>
          <Route path="/History">
            <div>History</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
