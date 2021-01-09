import About from '../pages/about/about.js';
import Company from '../pages/about/company.js';

const aboutRoutes = [
  {
    path: '/about',
    exact: true,
    view: () => <About />
  },
  {
    path: '/about/company',
    exact: true,
    view: () => <Company />
  }
];

export default aboutRoutes;
