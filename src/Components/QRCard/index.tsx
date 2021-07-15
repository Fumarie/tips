import React from 'react';
import QRCode from "qrcode.react";
import classes from "./QRCard.module.css"
import AddToButton from "./AddToButton";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const QRCard = () => {
    const {user} = useSelector((state: RootState) => state.user)
    return (
        <div className={classes.card}>
            <p className={classes.QRCardTitle}>Your QR code</p>
            <div className={classes.QRCodeWrap}>
                <div className={classes.QRcodeInfo}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <QRCode value={`https://eazytips.ml/pay/${user.id}`}/>
                    </div>
                    <p className={classes.QRCodeNumber}>{user.id}</p>
                    <div style={{marginTop: '17px'}}>
                        <AddToButton type={'google'} />
                    </div>
                    <div style={{marginTop: '25px'}}>
                        <AddToButton type={'apple'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCard;
