import React, {useEffect} from 'react';
import MainTitle from "../../Components/Main/MainTitle";
import Card from "../../Components/Main/Card";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {cardInterface, clearCards, getCards} from "../../redux/cardSlice";
import Loader from "../../Components/Loader";

const Cards = () => {
    const dispatch = useDispatch()
    const {cards, loading} = useSelector((state: RootState) => state.card)
    const {id} = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if(id) dispatch(getCards(id))
        return () => {dispatch(clearCards())}
        // eslint-disable-next-line
    }, []);

    if(loading) return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
            <Loader/>
        </div>
    )

    return (
        <div>
            <MainTitle text={'Cards'}/>
            {cards && cards.map((elem: cardInterface) => <Card key={elem.id} {...elem} />)}
        </div>
    );
};

export default Cards;
