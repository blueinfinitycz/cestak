import {FC,useState} from 'react';

export const Priklad:FC = () => {
    const [count, setCount]= useState<number>(0)
    const onClickPlus = () => setCount((currentValue) => currentValue+1);
    const onClickMinus = () => setCount((currentValue) => currentValue-1);
    return(
        <section>
        <h2 data-testid="priklad-title">TEST</h2>
        <button onClick={onClickPlus}>+</button>
        <button onClick={onClickMinus}>-</button>
        <div data-testid="count">{count}</div>
        </section>
    )
}