import React, { useState } from 'react';
import {BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import Accueil from '../Accueil/Accueil';
import Qsm from '../Qui-Somme-Nous/QSN';
import './Menu.css'
import FitTrackr from "../../Image/Fittrackr.png";
const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  return (
    <Router>
        <nav className={`navbar navbar-expand-lg flex text-center ${menuOpen ? 'show' : ''} d-flex `}>
          <button className="navbar-toggler bg-light" type="button" onClick={toggleMenu}>
              <span className="navbar-toggler-icon"></span>
          </button>
          <Link class="navbar-brand mx-3" to={"/"}>
            <img src={FitTrackr} alt="Logo" width="200px" class="d-inline-block align-text-top"/>
          </Link>
          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className='navbar-nav mx-auto'>
            <li className='nav-item my-1'>
                <Link className='nav-link text-dark me-2' to="#accueil">Accueil</Link>
            </li>
            <li className='nav-item my-1'>
                <Link className='nav-link text-dark me-2' to="#qsm">Qui Sommes-Nous</Link>
            </li>
            <li className='nav-item my-1'>
                <Link className='nav-link text-dark me-2' to="">Services</Link>
            </li>
            <li className='nav-item my-1'>
                <Link className='nav-link text-dark me-2' to="">Contact</Link>
            </li>
            <li className='nav-item my-1'>
              <Link className='btn btn-dark px-5 text-light me-2' to="/SignIn">SignIn</Link>
            </li>
            <li className='nav-item my-1'>
              <Link className='btn btn-dark px-5 text-light me-2' to="/SignUp">SignUp</Link>
            </li>
          </ul>
        </div>
        </nav>
        <Routes>
            <Route path='/SignIn' element={<SignIn/>}/>
            <Route path='/SignUp' element={<SignUp/>}/>
        </Routes>
        {/* <div id='accueil'><Accueil/></div>
        <div id='qsm'><Qsm/></div> */}
        
        <footer className="bg-dark text-light text-center py-2 mt-5">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} MAFTOUH Omar. All Rights Reserved.</p>
        </div>
      </footer>
    </Router>
  );
};

export default Menu;