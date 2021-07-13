import React from 'react';
import Avatar from './userAvatar.svg'
import classes from './Profile.module.css'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const Profile = () => {
    const { user } = useSelector((state: RootState) => state.user)

    return (
        <NavLink className={classes.profile} to={'/profile'}>
            <p>{user.fullName}</p>
            <img src={Avatar} alt="Avatar" className={classes.Avatar}/>
        </NavLink>
    );
};

export default Profile;
