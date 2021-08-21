import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export default function Toolkit() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'users/userAdded', payload: {name: 'Andrii'}});
    dispatch({type: 'users/userAdded', payload: {name: 'John Dou'}});
    dispatch({type: 'error', payload: {message: 'An error occured'}});
  }, []);

  return <main>Toolkit Component</main>;
}
