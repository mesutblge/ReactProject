import { useEffect, useState } from 'react';
import React from 'react';
import Post from '../Post/Post';
import { Container } from '@mui/material';
import './Home.css';
import PostForm from '../Post/PostForm';
import { result } from 'lodash';

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([""]);


  const refreshPosts=()=>{
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
  }


  useEffect(() => {
      refreshPosts();
  }, []);

  if (error) {
    return <div>Error</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">

        <PostForm userId={1}
            userName={"test"}
            refreshPosts={refreshPosts}
            />

        {postList.map((post) => (
          <Post
            postId={post.id}
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
