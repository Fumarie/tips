import React, {useEffect} from 'react';
import styles from './App.module.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import MainLayout from './Layouts/MainLayout/MainLayout';
import Index from "./Pages/Main";
import Dashboard from "./Pages/Dashboard";
import Transactions from "./Pages/Transactions";
import Invite from "./Pages/Invite";
import Cards from "./Pages/Cards";
import About from "./Pages/About";
import {useDispatch} from "react-redux";
import { getUser } from './redux/userSlice';
import Profile from './Pages/Profile';

const App: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(30))
    }, []);

    return (
        <div className={styles.App}>
            <div className={styles.container}>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <MainLayout link="">
                                <Index/>
                            </MainLayout>
                        </Route>
                        <Route path="/dashboard" exact>
                            <MainLayout link="dashboard">
                                <Dashboard/>
                            </MainLayout>
                        </Route>
                        <Route path="/transactions" exact>
                            <MainLayout link="transactions">
                                <Transactions/>
                            </MainLayout>
                        </Route>
                        <Route path="/invite" exact>
                            <MainLayout link="invite">
                                <Invite/>
                            </MainLayout>
                        </Route>
                        <Route path="/cards" exact>
                            <MainLayout link="cards">
                                <Cards />
                            </MainLayout>
                        </Route>
                        <Route path="/about" exact>
                            <MainLayout link="about">
                                <About />
                            </MainLayout>
                        </Route>
                        <Route path="/profile" exact>
                            <MainLayout link="profile">
                                <Profile />
                            </MainLayout>
                        </Route>
                        <Redirect to="/"/>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
