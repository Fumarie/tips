import React from 'react';
import MainTitle from '../../Components/Main/MainTitle';
import QRCard from "../../Components/QRCard";
import classes from './Main.module.css'
import image1 from './images/Frame 17.svg'
import image2 from './images/Frame 18.svg'
import image3 from './images/Cards.svg'
import TextInput from "../../Components/Main/TextInput";


const Main = () => {
    return (
        <div>
            <MainTitle text="Get tips"/>
            <span style={{marginLeft: '30%'}}>
                <MainTitle text="How to use"/>
            </span>
            <div className={classes.mainWrap}>
                <div style={{width: '40%'}}>
                    <QRCard/>
                    <div className={classes.Link}>
                        <p className={classes.LinkTitle}>Link on payment page</p>
                        <div style={{marginTop: '15px'}}>
                            <TextInput text={'https://eazytips.com/pay/516345'} />
                        </div>
                    </div>
                </div>
                <div>
                    <ul className={classes.List}>
                        <li className={classes.ListItem}>
                            <p className={classes.ListIndex}>1</p>
                            <div className={classes.ImageTextWrap}>
                                <div className={classes.ImageWrap}>
                                    <img src={image1} alt=""/>
                                </div>
                                <p className={classes.ListText}>Scan proposed QR-code</p>
                            </div>
                        </li>
                        <li className={classes.ListItem}>
                            <p className={classes.ListIndex}>2</p>
                            <div className={classes.ImageTextWrap}>
                                <div className={classes.ImageWrap}>
                                    <img src={image2} alt=""/>
                                </div>
                                <p className={classes.ListText}>Enter the amount of tips and comment</p>
                            </div>
                        </li>
                        <li className={classes.ListItem}>
                            <p className={classes.ListIndex}>3</p>
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
