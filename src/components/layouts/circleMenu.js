import '../../assets/style/circleMenu.css';
import { useState } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

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
        <Router>
        <div className="icons">
          <div className="rotater">
            <div className="btn btn-icon">
              <Link to="/three"><i className="fa fa-codepen"></i></Link>
            </div>
          </div>
          <div className="rotater">
            <div className="btn btn-icon">
              <i className="fa fa-facebook"></i>
            </div>
          </div>
          <div className="rotater">
            <div className="btn btn-icon">
              <i className="fa fa-google-plus"></i>
            </div>
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
        </Router>
      </div>
    </main>
  )
}

export default CircleMenu;