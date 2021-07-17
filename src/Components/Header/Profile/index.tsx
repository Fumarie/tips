import React, { FC } from 'react';
import Avatar from '../../../Images/userAvatar.svg'
import AvatarWhite from '../../../Images/userAvatar-white.svg'
import classes from './Profile.module.css'
import { NavLink, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../../redux/store';
import classNames from "classnames";
import logoutIcon from "./Logout.svg"
import { clearAuth } from '../../../redux/authSlice';
import { clearUser } from '../../../redux/userSlice';

interface ProfileProps {
    type?: 'white'
    link?: string
}

const Profile:FC<ProfileProps> = ({type, link}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { user, loading } = useSelector((state: RootState) => state.user)

    const logoutHandler = () => {
        history.push('/login')
        dispatch(clearAuth())
        dispatch(clearUser())
        // localStorage.removeItem('tipsId')
    }

    return (
        <div className={classNames(classes.profile, {[classes.profileActive]: link === 'profile'})} onClick={() => history.push('/profile')}>
            <p>{user.fullName && user.fullName}</p>
            <p>{!user.fullName && loading && 'Loading...'}</p>
            <p>{!user.fullName && !loading && 'Anonymous user'}</p>
            {type === 'white' ?
                <img src={AvatarWhite} alt="Avatar" className={classes.Avatar}/>
                :
                <img src={Avatar} alt="Avatar" className={classNames(classes.Avatar, {[classes.AvatarActive]: link === 'profile'})}/>
            }
            {link === 'profile' && <button className={classes.Logout} style={{backgroundColor: 'white'}} onClick={logoutHandler}><img src={logoutIcon} alt="logout"/></button>}
        </div>
    );
};

export default Profile;
