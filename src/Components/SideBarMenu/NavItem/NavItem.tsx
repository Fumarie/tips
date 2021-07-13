import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {INavLink} from "../NavLinkInterface";
import classes from "./NavItem.module.css"
import classNames from "classnames";

interface NavItemProps extends INavLink{
    link: string
}


const NavItem: FC<NavItemProps> = ({name, path, icon, iconBlack, link}) => {
    const active = path === link
    return (
        <Link to={path} className={classNames(classes.NavItem, {[classes.active]: active})}>
            <span>
                {active ?
                    <img src={iconBlack} alt=""/>
                    :
                    <img src={icon} alt=""/>
                }
                {name}
            </span>
        </Link>
    );
};

export default NavItem;
