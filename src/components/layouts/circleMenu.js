import { useState } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import '../../assets/style/circleMenu.css';

const CircleMenu = () => {

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const openMenu = () => {
    isOpenMenu ? setIsOpenMenu(false) : setIsOpenMenu(true);
  }

  return (
    <main>
      <div 
        className={ isOpenMenu ? 'menu active' : 'menu' } 
        style={{ top: isOpenMenu ? '20%' : null, left: isOpenMenu ? '15%' : null }}
      >
        <div className="btn trigger" onClick={ () => { openMenu() } }>
          <span className="line"></span>
        </div>
        <div className="icons">
          <div className="rotater">
            <Link to="/three">
              <div className="btn btn-icon">
                Three
              </div>
            </Link>
          </div>
          <div className="rotater">
            <Link to="/about">
              <div className="btn btn-icon">
                About
              </div>
            </Link>
          </div>
          <div className="rotater">
            <Link to="/about/company">
              <div className="btn btn-icon">
                Company
              </div>
            </Link>
          </div>
          <div className="rotater">
            <div className="btn btn-icon">
              <i className="fa fa-twitter"></i>
            </div>
          </div>
          <div className="rotater">
            <div className="btn btn-icon">
              <i className="fa fa-dribbble"></i>
            </div>
          </div>
          <div className="rotater">
            <div className="btn btn-icon">
              <i className="fa fa-linkedin"></i>
            </div>
          </div>
          <div className="rotater">
            <div className="btn btn-icon">
              <i className="fa fa-github"></i>
            </div>
          </div>
          <div className="rotater">
            <div className="btn btn-icon">
              <i className="fa fa-behance"></i>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CircleMenu;