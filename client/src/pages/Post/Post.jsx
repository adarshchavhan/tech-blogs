import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { format } from 'timeago.js'
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../redux/actions/postActions';
import SidePosts from '../../components/SidePosts/SidePosts';
import './Post.scss'

const Post = () => {
  const [randomPosts, setRandomPosts] = useState([]);

  const { postId } = useParams();
  const { currentPost: post } = useSelector(state => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        dispatch(getPost(postId));
        const { data: randomData } = await axios.get(`/posts/random`);
        setRandomPosts(randomData.posts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPost();
  }, [postId])

  return post && (
    <div className="post__page">
      <div className="container">
        <div className="content">

          <div className="breadcrumb">
            <Link to='/'>Home</Link> » <Link to={`/category/${post.category}`}>{post.category}</Link> » {post.title}
          </div>

          <h1 className="title">{post.title}</h1>

          <span className="info">written by <Link to={`/author/${post.author?.username}`}>{post.author?.name}</Link> | {format(post.createdAt)}</span>

          <div className="img">
            <img src={post.image?.secure_url} alt='img' />
          </div>

          <div className="desc" dangerouslySetInnerHTML={{ __html: post.desc }}></div>

          <div className="share__links">
            <h3>Share 👇</h3>
            <div>
              <Link to='/'>
                <Icon icon="ri:linkedin-fill" />
                <span>LinkedIn</span>
              </Link>

              <Link to='/'>
                <Icon icon="ri:facebook-fill" />
                <span>Facebook</span>
              </Link>

              <Link to='/'>
                <Icon icon="ri:twitter-fill" />
                <span>Twiiter</span>
              </Link>

              <Link to='/'>
                <Icon icon="ri:mail-fill" />
                <span>Email</span>
              </Link>
            </div>
          </div>

          <div className="author__section">
            <div className="img">
              <img src={post.author?.avatar?.secure_url} />
            </div>
            <div className="info">
              <Link to={`/author/${post.author?.username}`} className="author__name">{post.author?.name}</Link>

              <p className='author__desc'>{post.author?.desc}</p>
              {post.author?.social && <div className='author__social'>
                {post.author.social.twitter &&
                  <a href={`https://www.twitter.com/${post.author.social.twitter}`}>
                    <span>
                      <Icon icon="ri:twitter-fill" />
                    </span>
                  </a>}

                {post.author.social.linkedIn && <a href={`https://www.linkedin.com/in/${post.author.social.linkedIn}`}>
                  <span>
                    <Icon icon="ri:linkedin-fill" />
                  </span>
                </a>}

                {post.author.social.instagram &&
                  <a href={`https://www.instagram.com/${post.author.social.instagram}`}>
                    <span>
                      <Icon icon="ri:instagram-fill" />
                    </span>
                  </a>}
              </div>}
            </div>

          </div>
          <h3 className="rheading">Random Posts</h3>
          <div className="random__posts">
            {randomPosts.slice(0, 3).map(rpost => <div className='rpost' key={rpost._id}>
              <div className="img">
                <img src={rpost.image?.secure_url} />
              </div>
              <div className="text">
                <Link className='title' to={`/posts/${rpost._id}`}>{rpost.title}</Link>
                <p className="date">{format(rpost.createdAt)}</p>
              </div>
            </div>)}
          </div>

        </div>
        <SidePosts type='releted' postId={post._id} />

      </div>
    </div>
  )
}

export default Post