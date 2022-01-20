import React from 'react';
import * as Scroll from 'react-scroll';

function NavTab() {

  const Link = Scroll.Link;

  return (
        <nav>
          <ul className="nav-tab__links">
            <li className="nav-tab__link-container">
              <Link to = "about-project" className="nav-tab__link"smooth={true} offset={50} duration={1000} delay={100}>О проекте</Link>
            </li>
            <li className="nav-tab__link-container">
              <Link to = "technologies" className="nav-tab__link" smooth={true} offset={50} duration={1000} delay={100}>Технологии</Link>
            </li>
            <li className="nav-tab__link-container">
              <Link to = "about-student" className="nav-tab__link" smooth={true} offset={50} duration={1000} delay={100}>Студент</Link>
            </li>
          </ul>
        </nav>
  );
}
export default NavTab;
