import {createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import moment from 'moment';
import {apiCallBegan} from './api';

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    // eslint-disable-next-line no-unused-vars
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugAssignedToUser: (bugs, action) => {
      const {id: bugId, userId} = action.payload;
      const index = bugs.list.findIndex(bug => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    // command - event
    // addBug - bugAdded
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    // resolveBug (command) - bugResolved (event)
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
  },
});

console.log('SLICE');
console.log(slice);

export const {bugAdded, bugResolved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/bugs';

export const loadBugs = () => (dispatch, getState) => {
  const {lastFetch} = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 10) return;

  // eslint-disable-next-line consistent-return
  return dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      // slice.actions.bugsReceived.type
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    }),
  );
};

export const addBug = bug =>
  apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = id =>
  apiCallBegan({
    // /bugs
    // PATCH /bugs/1
    url: `${url} + '/' + ${id}`,
    method: 'patch',
    data: {resolved: true},
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: `${url} + '/' + ${bugId}`,
    method: 'patch',
    data: {userId},
    onSuccess: bugAssignedToUser.type,
  });

// Selector

// Memoization
// bugs => get unresolved bugs from the cache

export const getBugsByUser = userId =>
  createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId),
  );

export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  // eslint-disable-next-line no-unused-vars
  (bugs, projects) => bugs.list.filter(bug => !bug.resolved),
);
