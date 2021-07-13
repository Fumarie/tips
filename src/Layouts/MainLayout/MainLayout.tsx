import React, {FC} from 'react';
import Header from "../../Components/Header";
import SideBarMenu from "../../Components/SideBarMenu";
import classes from './MainLayout.module.css'

interface MainLayoutProps {
    link: string;
}

const MainLayout: FC<MainLayoutProps> = ({children, link}) => {
    return (
        <>
            <Header/>
            <SideBarMenu link={link}/>
            <div className={classes.container}>
                {children}
            </div>
        </>
    );
};

export default MainLayout;
