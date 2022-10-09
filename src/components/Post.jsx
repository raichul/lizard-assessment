import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
      }, []);

    const fetchPosts = () => {
        axios
          .get('/api/posts')
          .then((res) => {
            console.log(res);
            setPosts(res.data.posts);
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
      <div>
        <h1>Posts</h1>

        <div className='item-container'>
            {posts.map((post) => (
            <div className='card' key={post.id}>
                <img src={post.author.avatar} alt='' />
                <h3>{post.author.name}</h3>
                <p>{post.title}</p>
                <p>{post.summary}</p>
                {post.categories.map((category) => (
                    <li>{category.name}</li>
                ))}
                <p><i>{post.publishDate}</i></p>
            </div>
            ))}
        </div>
      </div>
    );
  };
  export default Post;