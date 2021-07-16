import React from 'react';
import classes from './LoginPage.module.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {useState} from 'react';
import {SignDataInterface} from './signDataInterface';
import {login, register} from '../../redux/authSlice';
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
                                    onClick={() => history.push('login')}>Sign in
                            </button>
                            <button className={classNames({[classes.active]: !isLogin})}
                                    onClick={() => history.push('register')}>Sign up
                            </button>
                        </div>
                        {error && <div style={{margin: '0 auto', textAlign: "center", marginTop: '20px', color: 'red'}}>
                            Error: {error}
                        </div>}
                        <form style={{marginTop: '20px'}} onSubmit={(event) => handleSubmit(event)}>
                            <p style={{textAlign: 'center'}}>{isLogin ? 'Log in your account' : 'Create account'}</p>
                            <div style={{marginTop: '10px'}}>
                                <PhoneInput
                                    country={'ru'}
                                    onlyCountries={['ru']}
                                    disableDropdown
                                    countryCodeEditable={false}
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                />
                                <div className=" react-tel-input" style={{marginTop: '10px'}}>
                                    <div className="special-label">Phone</div>
                                    <input className=" form-control" type="password" value={password}
                                           onChange={event => setPassword(event.target.value)}/>
                                    <div className=" flag-dropdown">
                                        <div className="selected-flag" style={{display: 'flex', alignItems: 'center'}}>
                                            <div>🔑</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.submitButtonWrap}>
                                <button className={classes.submitButton} type="submit">{isLogin ? <p>Sign in</p> :
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
