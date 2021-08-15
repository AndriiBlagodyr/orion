import React, {useState} from 'react';
import styled from 'styled-components';
import {useQuery} from 'urql';

const QUERY = `
query {
  npm {
    package(name: "graphql") {
      name
    }
  }
  devTo {
    articles {
      nodes {
        title
      }
    }
  }
}`;

export default function GraphQL() {
  const [result, reExecuteQuery] = useQuery({query: QUERY});
  console.log(result);
  // const [count, setCount] = useState(0);

  return <main>Hello</main>;
}
