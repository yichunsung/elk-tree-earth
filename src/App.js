// Router settings.
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './assets/style/App.css';
import routes from './router/index.js';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <main className="app-nav-container">
            <div className="app-nav-left">
              { /* <Link to="/">Home page</Link> */ }
              
            </div>
            <div className="app-nav-right">
              <div className="app-nav-item">
                <Link to="/about">About page</Link>
              </div>
              <div className="app-nav-item">
                <Link to="/about/company">About company page</Link>
              </div>
              <div className="app-nav-item">
                 <Link to="/three">Three.js</Link>
              </div>
            </div>
          </main>
        </nav>
        <section className="app-view">
          <Switch>
            {
              routes.map((route, idx) => (
                <Route 
                  key={ idx } 
                  path={ route.path } 
                  exact={ route.exact }
                  children={ <route.view /> }
                ></Route>
              ))
            }
          </Switch>
        </section>
      </div>
    </Router>
  );
}

export default App;