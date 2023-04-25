import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from './redux/actions/postActions';
import { clearError, loadUser } from './redux/actions/userActions';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home/Home';
import Posts from './pages/Posts/Posts';
import Profile from './pages/Profile/Profile';
import Post from './pages/Post/Post';
import ScrollToTop from './utils/ScrollToTop';
import NoPage from './pages/NoPage/NoPage';
import AddPost from './pages/AddPost/AddPost';
import EditProfile from './pages/EditProfile/EditProfile';
import { Toaster, toast } from 'react-hot-toast';


const App = () => {
  const { message, currentUser } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(clearError());
  }, []);

  useEffect(() => {
    if (message) {
      toast.success(message)
      dispatch(clearError());
    }
  }, [message]);

  useEffect(()=>{
    if(currentUser){
      dispatch(loadUser());
    }
  },[dispatch])

  return <Router>
    <ScrollToTop />
    <Header />
      <div className="routes">
      <Routes>
      <Route path='/add/new' element={currentUser ? <AddPost /> : <Login />} />
      <Route path='/me/edit' element={currentUser ? <EditProfile /> : <Login />} />
      <Route path='/me' element={currentUser ? <Profile type='me' /> : <Login />} />
      <Route exact path='/' element={<Home />} />
      <Route path='/posts/:postId' element={<Post />} />
      <Route path='/category/:category' element={<Posts />} />
      <Route path='/search' element={<Posts type='search' />} />
      <Route path='/author/:username' element={<Profile type='user' />} />
      <Route path='/signup' element={currentUser ? <Navigate to='/' /> : <Signup />} />
      <Route path='/login' element={currentUser ? <Navigate to='/' /> : <Login />} />
      <Route path='*' element={<NoPage />} />
    </Routes>
      </div>
    <Footer />
    <Toaster />
  </Router>
}

export default App