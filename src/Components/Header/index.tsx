import React, { FC } from 'react';
import Logo from "./Logo";
import Profile from "./Profile";
import classes from "./Header.module.css"
import classNames from "classnames";

interface HeaderProps {
    link?: string
}

const Header: FC<HeaderProps> = ({link}) => {
    return (
        <div className={classNames(classes.header)}>
            <Logo />
                <Profile link={link} />
        </div>
    );
};

export default Header;
