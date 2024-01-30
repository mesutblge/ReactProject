import { useEffect, useState } from 'react';
import React from 'react';
import Post from '../Post/Post';
import { Container } from '@mui/material';
import './Home.css';

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch('/posts/getAllPosts')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        {postList.map((post) => (
          <Post
            userId={post.userId}
            title={post.title}
            text={post.text}
            userName={post.userName}
          ></Post>
        ))}
      </div>
    );
  }
}

export default Home;
