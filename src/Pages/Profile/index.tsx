import React, {useEffect} from 'react';
import MainTitle from "../../Components/Main/MainTitle";
import TextInput from "../../Components/Main/TextInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../../redux/store';
import classes from './Profile.module.css'
import Loader from "../../Components/Loader";
import {getUser} from "../../redux/userSlice";

const Profile = () => {
    const dispatch = useDispatch()
    const {id} = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if(id)
            dispatch(getUser(id))
    }, []);


    const {user, loading} = useSelector((state: RootState) => state.user)

    if(loading) return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
            <Loader/>
        </div>
    )

    return (
        <div style={{height: '100%'}}>
            <MainTitle text={'Profile'}/>
            <p className={classes.maintitleundertext}>Customise your profile</p>
            <div className={classes.inputsWraper}>
                <p className={classes.inputHeader}>The name that your guest sees</p>
                <TextInput text={user.name}/>
                <p className={classes.inputHeader}>Fullname</p>
                <TextInput text={user.fullName}/>
                <p className={classes.inputHeader}>Email</p>
                <TextInput text={user.email}/>
                <p className={classes.inputHeader}>Phone number</p>
                <TextInput text={user.phone}/>
            </div>
        </div>
    );
};

export default Profile;
