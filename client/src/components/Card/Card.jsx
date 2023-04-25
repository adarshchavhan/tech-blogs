import { format } from 'timeago.js'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import EditPost from '../EditPost/EditPost';
import './Card.scss'
import { useState } from 'react';
import { clearError, deletePost } from '../../redux/actions/postActions';

const Card = ({ type, post, index = false, i = 0, isAccount = false }) => {
  const { title, image, author, createdAt } = post;

  const [showEditPost, setShowEditPost] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditPost = () => {
    setShowEditPost(!showEditPost);
  }

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure u want to delete this post')) {
      dispatch(deletePost(post._id)).then((res) => {
        if (res.type === 'deletePostSuccess') {
          toast.success(res.payload);
          dispatch(clearError());
          navigate('/');
        } else if (res.type === 'deletePostFailure') {
          toast.error(res.payload);
        }
      })
    }
  }


  return post && (
    <div className={`post__card ${type}`}>
      <div className="image">
        {index && <div className='label'>{i + 1}</div>}
        <img loading='lazy' src={image?.secure_url} />
      </div>
      <div className='text'>
        <Link to={`/posts/${post._id}`} className="title">{title}</Link>
        <div className="info" style={{ justifyContent: isAccount && 'space-between' }}>
          {(type === 'sm' || type === 'md' || type === 'lg') && <>by <Link to={`/author/${author?.username}`}>{author?.name}</Link> |</>} {format(createdAt)}
          {isAccount && <div className='btn__wrapper'>
            <button onClick={handleEditPost}><Icon icon="material-symbols:edit-outline" /></button>
            | <button onClick={handleDeletePost}><Icon icon="material-symbols:delete-outline" /></button>
          </div>}
        </div>

        {type === 'lg' &&
          <div className="social__links">
            <div className="links__wrapper">
              <Link to='/'><Icon icon="ri:facebook-fill" /></Link>
              <Link to='/'><Icon icon="ri:twitter-fill" /></Link>
              <Link to='/'><Icon icon="ri:pinterest-fill" /></Link>
              <Link to='/'><Icon icon="ri:mail-fill" /></Link>
            </div>
          </div>
        }
      </div>
      {showEditPost && <EditPost {...{ handleEditPost, postId: post._id }} />}
    </div>
  )
}

export default Card