import React, {useState} from 'react';
import {navLinks} from '../../SideBarMenu';
import {INavLink} from '../../SideBarMenu/NavLinkInterface';
import {Link} from 'react-router-dom';
import './Hamburger.css'


const BurgerMenu = () => {
    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div>
            <button onClick={() => setOpenMenu(!openMenu)} className="ham">
                {!openMenu && <span className="menuIcon material-icons">
                    menu
                </span>}
                {openMenu &&<span className="xIcon material-icons">
                    close
                </span>}
            </button>
            <ul className={!openMenu ? 'menu' : 'menu showMenu'}>
                {navLinks.map((link: INavLink) => <li key={link.name} onClick={() => setOpenMenu(false)}><Link to={link.path}
                                                                                   className="menuLink">{link.name}</Link></li>)}
            </ul>
       </div>
    );
};

export default BurgerMenu;
