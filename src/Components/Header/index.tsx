import React, { FC } from 'react';
import Logo from "./Logo";
import Profile from "./Profile";
import classes from "./Header.module.css"

const Header: FC = () => {
    return (
        <div className={classes.header}>
            <Logo />
            <Profile />
        </div>
    );
};

export default Header;
