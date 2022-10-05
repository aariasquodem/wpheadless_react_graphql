import React from "react";
import { v4 as uuidv4 } from 'uuid';
import {useQuery} from '@apollo/client';
import {CircleLoader} from 'react-spinners';
import {ALL_AUTHORS} from '../../graphql/queries';
import AuthorCard from '../AuthorCard';

const Authors = () => {

  const {data, loading, error} = useQuery(ALL_AUTHORS);

  const paintCards = () => data.users.nodes.map((author, id)=> <AuthorCard author={author} key={uuidv4()}/>);

  if(error) return <h2>{error.message}</h2>

  return <>
          {loading
            ? <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#1a87c7'}  size={100}/></div>
            : <div className="author-container">{paintCards()}</div>
            }
        </>
};

export default Authors;
