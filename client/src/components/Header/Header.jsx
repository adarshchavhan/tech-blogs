import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import './Header.scss'
import { logout } from '../../redux/actions/userActions'

const Header = () => {
  const [searchStr, setSearchStr] = useState('');
  const [show, setShow] = useState({
    profile: false,
    cat: false
  });

  const { categories } = useSelector(state => state.post);
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowProfile = () => {
    setShow(prev => ({ ...show, profile: !prev.profile }))
  }

  const handleShowCat = () => {
    setShow(prev => ({ ...show, cat: !prev.cat }))
  }

  const handleLogout = async () => {
    handleShowProfile();
    dispatch(logout());
  }

  const handleSearch = async (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (searchStr.length > 1) {
        navigate(`/search?q=${searchStr}`);
      }
    }
  }

  return <header className="header">
    {(show.profile || show.cat) && <div className='backdrop' onClick={() => {
      setShow({
        profile: false,
        cat: false
      })
    }}></div>}

    <div className="container">

      <div className="header__left">
        <button className={`cat__button ${show.cat ? 'show' : ''}`} onClick={handleShowCat}>
          <Icon icon="radix-icons:hamburger-menu" fontSize={24} />
        </button>
        <Link to='/' className='logo'>Tech.</Link>
      </div>

      <div className="header__right">

        <div className={`category__menu ${show.cat ? 'show' : ''}`}>
          <Link to='/' onClick={handleShowCat}>Home</Link>
          {categories.map((cat, i) =>
            <Link key={i} onClick={handleShowCat} to={`/category/${cat}`}>{cat}</Link>
          )}
        </div>

        <div className="nav">
          <div className="search">
            <div className="box">
              <input type="text" placeholder='Search..' value={searchStr} onChange={e => setSearchStr(e.target.value)} onKeyDown={handleSearch} />
              {searchStr !== '' && <button className='clear__btn'><Icon icon="ic:baseline-clear" /></button>}
              {searchStr === '' && <button>
                <Icon icon="majesticons:search-line" />
              </button>}
            </div>
            <button className='search__icon'>
              <Icon icon="majesticons:search-line" />
            </button>
          </div>

          <div className="profile">
            <button className='profile__btn' onClick={handleShowProfile}>
              <Icon icon="fa6-solid:user-large" />
            </button>

            <div className={`profile__menu ${show.profile ? 'show' : ''}`}>
              {currentUser ? <>
                <Link to='/me' onClick={handleShowProfile}>Profile</Link>
                <Link to='/add/new' onClick={handleShowProfile}>Add Post</Link>
                <button onClick={handleLogout}>Logout</button>
              </> : <>
                <Link to='/login' onClick={handleShowProfile}>Login</Link>
                <Link to='/signup' onClick={handleShowProfile}>Signup</Link>
              </>}
            </div>
          </div>

        </div>

      </div>

    </div>
  </header>
}

export default Header