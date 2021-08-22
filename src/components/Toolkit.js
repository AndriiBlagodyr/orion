import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
// eslint-disable-next-line no-unused-vars
import {loadBugs, addBug, resolveBug} from '../store/bugs';

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
    setTimeout(() => dispatch(resolveBug(2)), 2000);
    dispatch(addBug({descrioption: 'test bugs'}));
  }, []);

  return <main>Toolkit Component</main>;
}
