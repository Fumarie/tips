import React, {FC} from 'react';
import {INavLink} from "./NavLinkInterface";
import NavItem from "./NavItem/NavItem";
import getTipsIcon from "./navIcons/Category.svg"
import getTipsIconBlack from "./navIcons/Category-black.svg"
import dashboardIcon from "./navIcons/Chart.svg"
import dashboardIconBlack from "./navIcons/Chart-black.svg"
import transactionsIcon from "./navIcons/Swap.svg"
import transactionsIconBlack from "./navIcons/Swap-black.svg"
import inviteIcon from "./navIcons/Send.svg"
import inviteIconBlack from "./navIcons/Send-black.svg"
import cardsIcon from "./navIcons/Wallet.svg"
import cardsIconBlack from "./navIcons/Wallet-black.svg"
import aboutIcon from "./navIcons/Info Circle.svg"
import aboutIconBlack from "./navIcons/Info Circle-black.svg"

import classes from "./SideBarMenu.module.css"

export const navLinks: Array<INavLink> = [
    {name: 'Get tips', icon: getTipsIcon, iconBlack: getTipsIconBlack, path: ''},
    {name: 'Cards', icon: cardsIcon, iconBlack: cardsIconBlack, path: 'cards'},
    {name: 'Transactions', icon: transactionsIcon, iconBlack: transactionsIconBlack, path: 'transactions'},
    {name: 'Dashboard', icon: dashboardIcon, iconBlack: dashboardIconBlack, path: 'dashboard'},
    {name: 'Invite friend', icon: inviteIcon, iconBlack: inviteIconBlack, path: 'invite'},
    // {name: 'About', icon: aboutIcon, iconBlack: aboutIconBlack, path: 'about'}
]

interface SideBarMenuProps {
    link: string;
}

const SideBarMenu: FC<SideBarMenuProps> = ({link}) => {
    return (
        <ul className={classes.SideBarItemsList}>
            <li style={{height: '90px'}}><b></b></li>
            {navLinks.map(({name, path, icon, iconBlack}, index) => <NavItem name={name} link={link} path={path} key={index} icon={icon} iconBlack={iconBlack} />)}
        </ul>
    );
};

export default SideBarMenu;
