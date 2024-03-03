import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components';
import Posts from './posts';
import { baseAxios } from './axios';
import ListItem from './listItem';

const App = () => {

  const [posts, setPosts] = useState([]);

  React.useEffect(() => {
      baseAxios.get("/posts/?skip=0&limit=10")
          .then(response => {
              setPosts(response.data.posts);
          }).catch(e => {
              console.error(e);
          })
  }, []);

  const titleStyle = {
    fontSize: '40px',
    letterSpacing: '1px',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center'
  }

  const handleItemVisible = (itemId) => {
    console.log(itemId);
  }

  return (
    <Wrapper>
      <h1 style={titleStyle}>Posts</h1>
      <ListItem items={posts} onItemsVisible={handleItemVisible} />
    </Wrapper>
  )
}

const Wrapper = styled.main`
width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 20px 0;
`;

export default App