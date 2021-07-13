import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import logo from './Logo.svg'

const Logo: FC = () => {
    return (
        <NavLink style={{display: "flex", alignItems: "center"}} to="/">
            <img src={logo} alt="" />
            <div style={{fontSize: 30, color: '#fff'}}>EAZYTIPS</div>
        </NavLink>
    );
};

export default Logo;
