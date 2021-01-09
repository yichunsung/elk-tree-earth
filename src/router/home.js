import Home from '../pages/index.js';

const homeRoutes = [
  {
    path: '/',
    exact: true,
    view: () => <Home />
  }
];

export default homeRoutes;
