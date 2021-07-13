import React, {FC} from 'react';
import classes from './MainTitle.module.css'

interface MainTitleProps {
    text: string
}

const MainTitle: FC<MainTitleProps> = ({text}) => {
    return (
        <div className={classes.MainTitle}>
            {text}
        </div>
    );
};

export default MainTitle;
