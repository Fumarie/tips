import React from 'react';
import MainTitle from '../../Components/Main/MainTitle';
import QRCard from "../../Components/QRCard";
import classes from './Main.module.css'
import image1 from './images/Frame 17.svg'
import image2 from './images/Frame 18.svg'
import image3 from './images/Cards.svg'
import TextInput from "../../Components/Main/TextInput";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Loader from "../../Components/Loader";


const Main = () => {
    const {user, loading} = useSelector((state: RootState) => state.user)

    if(loading) return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
            <Loader/>
        </div>
    )

    return (
        <div>
            <div className={classes.mainWrap}>
                <div className={classes.ss}>
                    <MainTitle text="Get tips"/>
                    <div className={classes.CardLinkWrap}>
                        <QRCard/>
                        <div className={classes.Link}>
                            <p className={classes.LinkTitle}>Link on payment page</p>
                            <div style={{marginTop: '15px'}}>
                                <TextInput text={`https://eazytips.ml/pay/${user.id}`}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.HowWrap}>
                    <MainTitle text="How to use"/>
                    <ul className={classes.List}>
                        <li className={classes.ListItem}>
                            <div>
                                <p className={classes.ListIndex}>1</p>
                            </div>
                            <div className={classes.ImageTextWrap}>
                                <div className={classes.ImageWrap}>
                                    <img src={image1} alt=""/>
                                </div>
                                <p className={classes.ListText}>Scan proposed QR-code</p>
                            </div>
                        </li>
                        <li className={classes.ListItem}>
                            <div>
                                <p className={classes.ListIndex}>2</p>
                            </div>
                            <div className={classes.ImageTextWrap}>
                                <div className={classes.ImageWrap}>
                                    <img src={image2} alt=""/>
                                </div>
                                <p className={classes.ListText}>Enter the amount of tips and comment</p>
                            </div>
                        </li>
                        <li className={classes.ListItem}>
                            <div>
                                <p className={classes.ListIndex}>3</p>
                            </div>
                            <div className={classes.ImageTextWrap}>
                                <div className={classes.ImageWrap}>
                                    <img src={image3} alt=""/>
                                </div>
                                <p className={classes.ListText}>Follow payment</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Main;
