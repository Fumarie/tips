import React from 'react';
import classes from './LoginPage.module.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {useState} from 'react';
import {SignDataInterface} from './signDataInterface';
import {clearError, login, register} from '../../redux/authSlice';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import classNames from 'classnames';
import {RootState} from "../../redux/store";
import Loader from "../../Components/Loader";

const LoginPage = ({match}: any) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const isLogin: boolean = match.path === '/login'
    const {error, loading} = useSelector((state: RootState) => state.auth)

    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const signData: SignDataInterface = {
        phone,
        password
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isLogin)
            dispatch(login(signData))
        else
            dispatch(register(signData))
    }

    const validate = () => {
        return phone.length === 11 && password.length > 0
    }

    const clearErrorHandle = () => {
        dispatch(clearError())
    }

    const goLogin = () => {
        clearErrorHandle()
        history.push('login')
    }

    const goRegister = () => {
        clearErrorHandle()
        history.push('register')
    }

    return (
        <div className={classes.loginContainer}>
            {loading ?
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Loader/>
                </div>
                :
                <>
                    <div className={classes.formWrapper}>
                        <div className={classes.buttonsWrap}>
                            <button className={classNames({[classes.active]: isLogin})}
                                    onClick={goLogin}>Sign in
                            </button>
                            <button className={classNames({[classes.active]: !isLogin})}
                                    onClick={goRegister}>Sign up
                            </button>
                        </div>
                        {error && <div style={{margin: '0 auto', textAlign: "center", marginTop: '20px', color: 'red'}}>
                            Error: {error}
                        </div>}
                        <form style={{marginTop: '20px'}} onSubmit={(event) => handleSubmit(event)}>
                            <p style={{textAlign: 'center'}}>{isLogin ? 'Log in your account' : 'Create account'}</p>
                            <div style={{marginTop: '10px'}}>
                                <PhoneInput
                                    onFocus={clearErrorHandle}
                                    country={'ru'}
                                    onlyCountries={['ru']}
                                    disableDropdown
                                    countryCodeEditable={false}
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                />
                                <div className=" react-tel-input" style={{marginTop: '10px'}}>
                                    <div className="special-label">Phone</div>
                                    <input onFocus={clearErrorHandle} className=" form-control" type="password" value={password}
                                           onChange={event => setPassword(event.target.value)}/>
                                    <div className=" flag-dropdown">
                                        <div className="selected-flag" style={{display: 'flex', alignItems: 'center'}}>
                                            <div>🔑</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.submitButtonWrap}>
                                <button title={'Write correct phone and password'} className={classes.submitButton} type="submit" disabled={!validate()}>{isLogin ? <p>Sign in</p> :
                                    <p>Sign up</p>}</button>
                            </div>
                        </form>
                    </div>
                </>
            }
        </div>
    );
};

export default LoginPage;
