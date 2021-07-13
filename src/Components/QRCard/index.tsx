import React from 'react';
import QRCode from "qrcode.react";
import classes from "./QRCard.module.css"
import AddToButton from "./AddToButton";

const QRCard = () => {
    const userId: number = 516345
    return (
        <div className={classes.card}>
            <p className={classes.QRCardTitle}>Your QR code</p>
            <div className={classes.QRCodeWrap}>
                <div className={classes.QRcodeInfo}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <QRCode value={`https://eazytips.com/pay/${userId}`}/>
                    </div>
                    <p className={classes.QRCodeNumber}>{userId}</p>
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
