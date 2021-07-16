import React, {FC, useEffect} from 'react';
import classes from './PayPage.module.css'
import arrow from './Arrow.svg'
import userAvatar from '../../Images/userAvatar.svg'
import {useDispatch, useSelector} from "react-redux";
import {getUser} from '../../redux/userSlice';
import {RootState} from "../../redux/store";
import {useState} from 'react';
import {clearError, payTips} from "../../redux/transferSlice";
import Loader from '../../Components/Loader';


const PayPage: FC = (props: any) => {
    const dispatch = useDispatch()
    const id = props.match.params.id

    useEffect(() => {
        dispatch(getUser(id))
        // eslint-disable-next-line
    }, []);

    const [commentText, setCommentText] = useState<string>('')
    const commentChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(event.target.value)
    }

    const [amount, setAmount] = useState('50')
    const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value)
    }

    const validateAmount = () => {
        return amount.length > 0
    }

    const {user, loading} = useSelector((state: RootState) => state.user)

    const Pay = () => {
        if (user.id)
            dispatch(payTips({userId: user.id, amount: Number(amount), comment: commentText}))
    }

    const transfer = useSelector((state: RootState) => state.transfer)

    const closeInfoMessage = () => {
        dispatch(clearError())
    }

    if(loading || transfer.loading) return (
        <div className={classes.MainPayWrap}>
            <div className={classes.PayWrap}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Loader />
                </div>
            </div>
        </div>
    )

    if (transfer.success !== null)
        return (
            <div className={classes.MainPayWrap}>
                <div className={classes.PayWrap}>
                    {transfer.success === false ?
                        <div className={classes.infoMessage}>
                            <p>Error: {transfer.error}.</p>
                            <p>Please, try again.</p>
                            <button onClick={closeInfoMessage}>Okay</button>
                        </div> :
                        <div className={classes.infoMessage}>
                            <p>Successfully done</p>
                            <button onClick={closeInfoMessage}>Okay</button>
                        </div>}
                </div>
            </div>
        )

    if(!user.id)
        return (
            <div className={classes.MainPayWrap}>
                <div className={classes.PayWrap}>
                        <div className={classes.infoMessage}>
                            <p>User not found :(</p><p>Check your link</p>
                        </div>
                </div>
            </div>
        )


    return (
        <div className={classes.MainPayWrap}>
                <div className={classes.PayWrap}>
                    <p className={classes.header}>Payment page</p>
                    <div className={classes.title}>You want to pay <img style={{marginLeft: 7, paddingTop: 2}}
                                                                        src={arrow}
                                                                        alt="arrow"/></div>
                    <div className={classes.recipient}>{user.fullName ? user.fullName : 'Anonymous user'}<img
                        src={userAvatar} alt="avatar"/></div>
                    <p className={classes.amountTitle}>Enter amount of tips</p>
                    <div className={classes.amountInputWrap}>
                        <input value={amount} onChange={(event) => amountChangeHandler(event)}
                               className={classes.amountInput} type="number" placeholder="0"/>
                        <p style={{textAlign: 'center'}}>Currency is ₽(Russian rubles)</p>
                        {/*<p className={classes.amountInputLabel}>₽</p>*/}
                    </div>
                    <p className={classes.commentTitle}>Write comment</p>
                    <textarea
                        value={commentText}
                        onChange={(event) => commentChangeHandler(event)}
                        placeholder="Your commendation"
                        className={classes.commentInput}
                        name="textValue"
                    />
                    <button onClick={() => Pay()} className={classes.submitButton}
                            disabled={!validateAmount()}>Pay tips
                    </button>
                </div>
        </div>
    );
};

export default PayPage;

