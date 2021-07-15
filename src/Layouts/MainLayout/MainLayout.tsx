import React, {FC, useEffect} from 'react';
import Header from "../../Components/Header";
import SideBarMenu from "../../Components/SideBarMenu";
import classes from './MainLayout.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../redux/userSlice";
import {RootState} from "../../redux/store";

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
        <Header/>
            <SideBarMenu link={link}/>
            <div className={classes.wrap}>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
