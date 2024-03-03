import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { baseAxios } from './axios';

const Posts = ({items, onItemsVisible}) => {

    const containerRef = useRef(null);

    useEffect(()=> {
        const options = {
            root: containerRef.current,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries)=> {
            entries.forEach((entry)=> {
                const visibleItem = entry.target.id;
                const isIntersecting = entry.target.isIntersecting;
                onItemsVisible(visibleItem);
            })
        }, options)

        items.forEach((item)=> {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        })

    }, [items, onItemsVisible])

    return (
        <PostList ref={containerRef}>
            {
                items.map((post) => (
                    <PostWrapper key={post.id} id={post.id}>
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
    height: 100vh;
    overflow-y: auto;
`;

const PostWrapper = styled.div`
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

export default Posts