// Router settings.
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './router/index.js';
import CircleMenu from './components/layouts/circleMenu.js';

function App() {
  return (
    <Router>
      <div className="app">
        <CircleMenu />
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