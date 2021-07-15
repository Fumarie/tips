import React, {useEffect} from 'react';
import MainTitle from "../../Components/Main/MainTitle";
import Card from "../../Components/Main/Card";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {cardInterface, getCards} from "../../redux/cardSlice";

const Cards = () => {
    const dispatch = useDispatch()
    const {cards} = useSelector((state: RootState) => state.card)
    const {id} = useSelector((state: RootState) => state.auth)
    useEffect(() => {
        if(id) dispatch(getCards(id))
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <MainTitle text={'Cards'}/>
            {cards && cards.map((elem: cardInterface) => <Card key={elem.id} {...elem} />)}
        </div>
    );
};

export default Cards;
