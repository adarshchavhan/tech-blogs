import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../Card/Card';
import './SidePosts.scss'

const SidePosts = ({ type, postId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (type === 'releted') {
          const { data } = await axios.get(`/posts/releted/${postId}`);
          setPosts(data.posts);
        } else {
          const { data } = await axios.get(`/posts/${type}`);
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  }, [type, postId])

  return (
    <div className="sideposts">
      <div className="heading">
        <h2>{type} Posts</h2>
        <hr />
      </div>
      <div className="posts">
        {posts?.filter((post, i) => i < 5).map((post, i) => (
          <Card key={post._id} post={post} type='side' index={type === 'popular' && true} i={i} />
        ))}
      </div>
    </div>
  )
}

export default SidePosts