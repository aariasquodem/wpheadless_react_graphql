import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import {userContext} from './context/userContext';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import {auth, db} from './firebase';
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
  const [loggedUserName, setLoggedUserName] = useState('');
  const [loggedUid, setLoggedUid] = useState('');

  useEffect(() => {
      onAuthStateChanged(auth, user => {
        if (user) {
          const uid = user.uid;
          const getUser = async () => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            setLoggedUid(uid);
            setLoggedUserName(docSnap._document.data.value.mapValue.fields.username.stringValue);
          };
          getUser();
          setLogged(true);
        } else {
          setLogged(false);
        }
      });
}, []);

  const userObj = {
    logged,
    setLogged,
    loggedUserName,
    setLoggedUserName,
    loggedUid,
    setLoggedUid
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
