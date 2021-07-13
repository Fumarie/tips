import React from 'react';
import MainTitle from "../../Components/Main/MainTitle";
import TextInput from "../../Components/Main/TextInput";
import {useSelector} from "react-redux";
import {RootState} from '../../redux/store';
import classes from './Profile.module.css'

const Profile = () => {
    const {user} = useSelector((state: RootState) => state.user)
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
