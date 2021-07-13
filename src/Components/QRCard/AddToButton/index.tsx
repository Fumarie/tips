import React, {FC} from 'react';
import classes from './AddToButton.module.css'
import googleLogo from './images/google.svg'
import appleLogo from './images/apple.svg'

interface AddToButtonProps {
    type: 'google' | 'apple'
}

const AddToButton:FC<AddToButtonProps> = ({type}) => {
        return (
            <button className={classes.button}>
                <p style={{marginRight: '6px'}}>Add to</p>
                {
                    type === 'google' &&
                    <img src={googleLogo} alt="google"/>
                }
                {
                    type === 'apple' &&
                    <img src={appleLogo} alt="apple"/>
                }
                <p>Pay</p>
            </button>
        );

};

export default AddToButton;
