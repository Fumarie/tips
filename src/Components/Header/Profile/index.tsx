import React from 'react';
import Avatar from '../../../Images/userAvatar.svg'
import classes from './Profile.module.css'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const Profile = () => {
    const { user, loading } = useSelector((state: RootState) => state.user)

    return (
        <NavLink className={classes.profile} to={'/profile'}>
            <p>{user.fullName && user.fullName}</p>
            <p>{!user.fullName && loading && 'Loading...'}</p>
            <p>{!user.fullName && !loading && 'Anonymous user'}</p>
            <img src={Avatar} alt="Avatar" className={classes.Avatar}/>
        </NavLink>
    );
};

export default Profile;
