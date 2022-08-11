import React, {useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import {userContext} from './context/userContext';
import Main from './components/Main';
import Header from './components/Header';
import './styles/styles.scss';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://gatsby.local/graphql'
  })
});

function App() {

  const [logged, setLogged] = useState(false);

  const userObj = {
    logged,
    setLogged
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ApolloProvider client={client}>
          <userContext.Provider value={userObj}>
            <Header/>
            <Main/>
          </userContext.Provider>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
