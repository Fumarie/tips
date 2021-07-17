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
        // eslint-disable-next-line
    }, []);


    const {user, loading} = useSelector((state: RootState) => state.user)

    console.log(user)

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
                {user.name ? <TextInput name={'name'} text={user.name} editable/> : <TextInput text={'Anonymous user'} />}
                <p className={classes.inputHeader}>Fullname</p>
                <TextInput name={'fullName'} text={user.fullName} editable/>
                <p className={classes.inputHeader}>Email</p>
                <TextInput name={'email'} text={user.email} editable/>
                <p className={classes.inputHeader}>Phone number</p>
                <TextInput text={user.phone} />
            </div>
        </div>
    );
};

export default Profile;
