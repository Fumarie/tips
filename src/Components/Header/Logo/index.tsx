import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import logo from './Logo.svg'
import blackLogo from './blackIcon.svg'

interface LogoProps {
    type?: 'black'
}

const Logo: FC<LogoProps> = ({type}) => {
    return (
        <NavLink style={{display: "flex", alignItems: "center"}} to="/">
            {type === 'black' ?
                <>
                    <img style={{width: 34, height: 34}} src={blackLogo} alt=""/>
                    <div style={{fontSize: 30, color: '#000'}}>EAZYTIPS</div>
                </>
                :
                <>
                    <img src={logo} alt=""/>
                    <div style={{fontSize: 30, color: '#fff'}}>EAZYTIPS</div>
                </>
            }
        </NavLink>
    );
};

export default Logo;
