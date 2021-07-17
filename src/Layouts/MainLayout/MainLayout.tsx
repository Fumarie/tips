import React, {FC, useEffect} from 'react';
import Header from "../../Components/Header";
import SideBarMenu from "../../Components/SideBarMenu";
import classes from './MainLayout.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../redux/userSlice";
import {RootState} from "../../redux/store";
import Logo from '../../Components/Header/Logo';
import BurgerMenu from "../../Components/Main/BurgerMenu";
import classNames from "classnames";

interface MainLayoutProps {
    link: string;
}

const MainLayout: FC<MainLayoutProps> = ({children, link}) => {
    const dispatch = useDispatch()
    const {id} = useSelector((state: RootState) => state.auth)
    useEffect(() => {
        if(id)
            dispatch(getUser(id))
        // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.container}>
        <Header link={link}/>
            <SideBarMenu link={link}/>
            <div className={classes.mobileHeader}>
                <Logo type='black' />
                <BurgerMenu />
            </div>
            <div className={classNames(classes.wrap, {[classes.wrapActive]: link === 'profile'})}>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
