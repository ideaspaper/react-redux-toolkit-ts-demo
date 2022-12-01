import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import CounterText from '../../components/CounterText';
import { increment, decrement } from '../../store/slices/counter/counterSlice';
import { RootState } from '../../store';

const CounterPage: React.FC = () => {
  const { value } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  const onClickHandler = (action: string) => {
    action === 'increment' ? dispatch(increment(1)) : dispatch(decrement(1));
  };
  return (
    <>
      <h1>Counter</h1>
      <div>
        <CounterText>{value}</CounterText>
        <Button onClickHandler={() => onClickHandler('increment')}>
          Increment
        </Button>
        <Button onClickHandler={() => onClickHandler('decrement')}>
          Decrement
        </Button>
      </div>
    </>
  );
};

export default CounterPage;
