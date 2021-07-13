import React, { FC } from 'react';
import Logo from "./Logo";
import Profile from "./Profile";

const Header: FC = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 10px 0'}}>
            <Logo />
            <Profile />
        </div>
    );
};

export default Header;
