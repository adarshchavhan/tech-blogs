import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../Card/Card';
import './CategoryPosts.scss'

const CategoryPosts = ({ category }) => {
  const [post1, setPost1] = useState({}); 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`/posts/category/${category}`);
        setPosts(data.posts.filter(post => post._id !== data.posts[0]._id));
        setPost1(data.posts[0]);
      } catch (error) {
        console.log(error.response?.data.message)
      }
    }
    fetchPosts();
  }, [])

  return (
    <div className="category__posts">
      <h2 className="heading">{category}</h2>
      <div className="posts">
        {post1 && <Card post={post1}  type='md'/>}
        <div className="posts__wrapper">
          {posts?.map((post) => <Card key={post._id} post={post} type='sm' />)}
        </div>
      </div>
    </div>
  )
}

export default CategoryPosts