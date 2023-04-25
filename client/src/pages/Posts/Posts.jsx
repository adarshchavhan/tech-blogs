import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Card from '../../components/Card/Card';
import SidePosts from '../../components/SidePosts/SidePosts';
import './Posts.scss'

const Posts = ({ type }) => {
  const [posts, setPosts] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();

  useEffect(() => {
    if (type === 'search') {
      const fetchPosts = async () => {
        try {
          const { data } = await axios.get(`/posts/search?q=${searchParams.get('q')}`);
          setPosts(data.posts);
        } catch (error) {
          console.log(error);
        }
      }
      fetchPosts();
    }
  }, [searchParams.get('q')]);

  useEffect(() => {
    if (type !== 'search') {
      const fetchPosts = async () => {
        try {
          const { data } = await axios.get(`/posts/category/${category}`);
          setPosts(data.posts);
        } catch (error) {
          console.log(error);
        }
      }
      fetchPosts();
    }
  }, [category]);

  return (
    <div className="posts__page">
      <div className="container">
        <div className="content">
          <div className="breadcrumb">
            <Link to='/'>Home</Link> » {type !== 'search' ? category : `You Searched for ${searchParams.get('q')}`}
          </div>
          <div className="heading">
            {type !== 'search' ? <>
              <h1>Category : {category}</h1>
              <p>You can find all the article releted to {category} here👇</p>
            </> : <>
              <h1>Search results for "{searchParams.get('q')}"</h1>
            </>}
          </div>

          <div className="posts">
            {posts?.length > 0 && posts.map(post => <Card key={post._id} post={post} type='lg' />)}
            {posts?.length <= 0 && <p className='empty__msg'>Sorry, but nothing matched your search terms.Please try again with some different keywords.</p>}
          </div>
        </div>
        <SidePosts type='recent' />
      </div>
    </div>
  )
}

export default Posts