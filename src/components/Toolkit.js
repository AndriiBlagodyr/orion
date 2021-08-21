import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../store/api';
import {loadBugs} from '../store/bugs';

export default function Toolkit() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'users/userAdded', payload: {name: 'Andrii'}});
    dispatch({type: 'users/userAdded', payload: {name: 'John Dou'}});
    dispatch({type: 'error', payload: {message: 'An error occured'}});

    // dispatch(
    //   actions.apiCallBegan({
    //     url: '/bugs',
    //     // default
    //     method: 'GET',
    //     onSuccess: 'bugs/bugsReceived',
    //     onError: 'api/callFailed',
    //   }),
    // );
    dispatch(loadBugs());
  }, []);

  return <main>Toolkit Component</main>;
}
