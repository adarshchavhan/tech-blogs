import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Card from '../../components/Card/Card';
import SidePosts from '../../components/SidePosts/SidePosts';
import './Profile.scss'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';

const Profile = ({ type }) => {
  const [author, setAuthor] = useState({});
  const [posts, setPosts] = useState([]);
  const {currentUser} = useSelector(state => state.user);
  const { username } = useParams();
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (type === 'user') {
        const { data } = await axios(`/users/${username}`);
        setAuthor(data.user)
      }
        if(type==='me'){
          setAuthor(currentUser);
        }

      const { data } = await axios.get(`/posts/user/${author.username}`);
      setPosts(data.posts)
    }

    fetchData();
  }, [type, username]);

  return author && (
    <div className="profile__page">
      <div className="container">
        <div className="content">
          <div className="breadcrumb">
            <Link to='/'>Home</Link> » Archives for <span>{author?.name}</span>
          </div>
          <h2 className="heading">Author {author?.name}</h2>
          <div className="author__section">
            <div className="img">
              <img src={author?.avatar?.secure_url} />
            </div>
            <div className="info">
              <div className="top">
                <h2 to={`/author/${author?.username}`} className="author__name">{author?.name}</h2>
                {type === 'me' && <Link className='update__btn' to='/me/edit'>Edit</Link>}
              </div>
              <p className='author__desc'>{author?.desc}</p>
              {author?.social && <div className='author__social'>
                {author.social?.twitter &&
                  <a href={`https://www.twitter.com/${author.social.twitter}`}>
                    <span>
                      <Icon icon="ri:twitter-fill" />
                    </span>
                  </a>}

                {author.social?.linkedIn && <a href={`https://www.linkedin.com/in/${author.social.linkedIn}`}>
                  <span>
                    <Icon icon="ri:linkedin-fill" />
                  </span>
                </a>}

                {author.social?.instagram &&
                  <a href={`https://www.instagram.com/${author.social.instagram}`}>
                    <span>
                      <Icon icon="ri:instagram-fill" />
                    </span>
                  </a>}
              </div>}
            </div>

          </div>

          <div className="posts">
            {posts.map(post => <Card type='profile' key={post._id} post={post} isAccount={type === 'me' && true} />)}
          </div>
        </div>
        <SidePosts type='recent' author={author} />
      </div>
    </div>
  )
}

export default Profile