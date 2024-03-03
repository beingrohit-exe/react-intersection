import React, { useState } from 'react'
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';

const ListItem = ({items, onItemVisible}) => {

    const [visibleItems, setVisibleItems] = useState([]);

    const handleIntersection = (id, inView) => {
        if (inView && !visibleItems.includes(id)) {
            console.log("In View", id);
            setVisibleItems((prev)=> [...prev, id]);
        }
    }

    return (
        <PostList>
            {
                items.map((post) => (
                    <PostWrapper 
                        key={post.id}
                        threshold={0.5}
                        onChange={(inView)=> handleIntersection(post.id, inView)}
                    >
                        <Title>
                            {post.title}
                        </Title>
                        <Body>
                            {post.body}
                        </Body>
                    </PostWrapper>
                ))}
        </PostList>
    )
}

const PostList = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height: 70vh;
    overflow-y: auto;
    scrollbar-width: none;
`;

const PostWrapper = styled(InView)`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(to right bottom, #4258ff, #5e71ff);
  border-radius: 20px;
`;

const Title = styled.h4`
    font-size: 22px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
`;

const Body = styled.span`
    font-size: 18px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.6);
`;

export default ListItem