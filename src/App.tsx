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
import {useDispatch, useSelector} from "react-redux";
import Profile from './Pages/Profile';
import LoginPage from "./Pages/Login/LoginPage";
import {RootState} from './redux/store';
import {setAuth} from './redux/authSlice';
import PayPage from "./Pages/PayPage";
import {getUser} from "./redux/userSlice";
import Loader from "./Components/Loader";

const App: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const storageId = Number(localStorage.getItem('tipsId'))
        console.log(storageId)
        if (storageId) {
            dispatch(setAuth(storageId))
            // dispatch(getUser(storageId))
        } else {
            dispatch(setAuth(0))
        }
        // eslint-disable-next-line
    }, []);

    const {id} = useSelector((state: RootState) => state.auth)

    if (id === null) return (
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '40vh'}}>
            <Loader/>
        </div>
    )

    if (!id) return (
        <div className={styles.App}>
            <div className={styles.AppWrap}>
                <Router>
                    <Switch>
                        <Route path="/login" exact component={LoginPage}/>
                        <Route path="/register" exact component={LoginPage}/>
                        <Route path="/pay/:id" exact component={PayPage}/>
                        <Redirect to="/login"/>
                    </Switch>
                </Router>
            </div>
        </div>
    )

    return (
        <div className={styles.App}>
            <div className={styles.AppWrap}>
                <div style={{display: 'none'}}>{id}</div>
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
                                <Cards/>
                            </MainLayout>
                        </Route>
                        <Route path="/about" exact>
                            <MainLayout link="about">
                                <About/>
                            </MainLayout>
                        </Route>
                        <Route path="/profile" exact>
                            <MainLayout link="profile">
                                <Profile/>
                            </MainLayout>
                        </Route>
                        <Route path="/pay/:id" exact component={PayPage}/>
                        <Redirect to="/"/>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
