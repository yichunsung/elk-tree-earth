// Router settings.
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import './assets/style/App.css';
import Homepage from './pages/index.js';
import About from './pages/about/about.js';

function App() {
  return (
    <Router>
      <div className="App">
        <span>
          <Link to="/">Home page</Link>
        </span>
        <br />
        <span>
          <Link to="/about">About page</Link>
        </span>
        <br />
        <header className="App-header">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
          
          <img src='https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/93711501_125439559103384_6089461587830112256_n.png?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_ohc=DYabrVzxmWgAX9FaVB4&_nc_ht=scontent.ftpe7-3.fna&oh=d3eb9c5e7d6d81e42f9436d7e5fb4f44&oe=601E62E4' className="App-logo" alt="logo" />
          <p>
           Hello Elk Tree Earth
          </p>
        </header>
      </div>
    </Router>
  );
}

export default App;
