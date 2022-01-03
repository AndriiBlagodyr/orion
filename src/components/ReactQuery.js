import React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';

export default function ReactQuery() {
  const queryInfo = useQuery('pokemon', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return axios.get('https://pokeapi.co/api/v2/pokemon').then(res => res.data.results);
  });
  console.log('queryInfo');
  console.log(queryInfo);
  return queryInfo.isLoading ? (
    'Loading...'
  ) : (
    <div>
      {queryInfo.data.map(result => {
        return <div key={result.name}>{result.name}</div>;
      })}
    </div>
  );
}
