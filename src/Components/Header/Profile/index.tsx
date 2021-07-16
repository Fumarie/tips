import React, { FC } from 'react';
import Avatar from '../../../Images/userAvatar.svg'
import AvatarWhite from '../../../Images/userAvatar-white.svg'
import classes from './Profile.module.css'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface ProfileProps {
    type?: 'white'
}

const Profile:FC<ProfileProps> = ({type}) => {
    const { user, loading } = useSelector((state: RootState) => state.user)

    return (
        <NavLink className={classes.profile} to={'/profile'}>
            <p>{user.fullName && user.fullName}</p>
            <p>{!user.fullName && loading && 'Loading...'}</p>
            <p>{!user.fullName && !loading && 'Anonymous user'}</p>
            {type === 'white' ?
                <img src={AvatarWhite} alt="Avatar" className={classes.Avatar}/>
                :
                <img src={Avatar} alt="Avatar" className={classes.Avatar}/>
            }
        </NavLink>
    );
};

export default Profile;
