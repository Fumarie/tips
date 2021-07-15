import React, {FC} from 'react';
import classes from "../../../Pages/Cards/CardPage.module.css";
import show from "./images/Show.svg";
import visa from "./images/visa.svg";
import {cardInterface} from "../../../redux/cardSlice";


const Card: FC<cardInterface> = (props) => {
    console.log(props)
    return (
        <div className={classes.Card}>
            <div className={classes.CardInner}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p className={classes.CardHeader}>{props.virtual ? 'Virtual' : 'Real'}</p>
                    <button style={{background: "none", marginTop: -20}}><img src={show} alt="show"/></button>
                </div>
                <div className={classes.CardBalance}>{props.virtual ? props.balance +'₽' : <div style={{height: '29px'}}></div>}</div>
                <p className={classes.CardNumber}>{props.number}</p>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p className={classes.CardValidThru}>11/24</p>
                    <img src={visa} alt="visa"/>
                </div>
            </div>
        </div>
    );
};

export default Card;
