import React, {FC} from 'react';
import classes from "../../../Pages/Main/Main.module.css";

interface TextInputProps {
    text: string | null
}

const TextInput:FC<TextInputProps> = ({text}) => {
    return (
        <input className={classes.input} type="text" readOnly={true}
               value={text ? text : 'No data yet'}/>
    );
};

export default TextInput;
