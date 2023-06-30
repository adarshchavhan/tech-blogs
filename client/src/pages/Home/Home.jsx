import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'
import Card from '../../components/Card/Card';
import CategoryPosts from '../../components/CategoryPosts/CategoryPosts';
import SidePosts from '../../components/SidePosts/SidePosts';
import { Icon } from '@iconify/react';
import './Home.scss'

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { categories } = useSelector(state => state.post);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/posts/recent');
        setPosts(data.posts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response?.data.message)
      }
    }
    fetchPosts();
  }, [])

  return (
    <div className="home__page">
      {
        loading===false ?
      <div className="container">
        <div className="content__wrapper">
        <h2 className="heading">Latest Posts</h2>
                    <div className="latest__posts">
          {posts?.map(post => <Card key={post._id} post={post} type='md' />)}
          </div>
        {categories.map((category, i) => <CategoryPosts key={i} {...{ category }} />)}
        </div>
        <SidePosts type='popular'/>
      </div> :
       <div className='main__loader'></div>
      } 
    </div>
  )
}

export default Home