const { createPost, updatePost, deletePost, updateViews, getPost, getRecentPosts, getPopularPosts, getReletedPosts, getRandomPosts, getSearchPosts, getFollowPosts, getUserPosts, getCategories, getCatPosts} = require('../controllers/postController');
const { auth } = require('../middlewares/auth');

const router = require('express').Router();

router.route('/:id').put(auth, updatePost).delete(auth, deletePost);
router.put('/:id/view', updateViews);
router.post('/new', auth, createPost);
router.get('/find/:id', getPost);
router.get('/recent', getRecentPosts);
router.get('/popular', getPopularPosts);
router.get('/releted/:postId', getReletedPosts);
router.get('/random', getRandomPosts);
router.get('/search', getSearchPosts);
router.get('/user/:username', getUserPosts)
router.get('/follow', auth, getFollowPosts);
router.get('/category/:category', getCatPosts)
router.get('/categories', getCategories);

module.exports = router;