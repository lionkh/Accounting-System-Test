import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Header from "./layout/Header";

class App extends Component {
  render() {
    return <div className="app">
      <Header/>
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    </div>;
  }
}

export default App;