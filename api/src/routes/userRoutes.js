const { myProfile, updateProfile, updatePassword, delateProfile, getUser, followUser } = require('../controllers/userController');
const { auth } = require('../middlewares/auth');

const router = require('express').Router();

router.route('/me')
    .get(auth, myProfile)
    .put(auth, updateProfile)
    .delete(auth, delateProfile);

router.put('/password', auth, updatePassword);

router.get('/:username', getUser);
router.put('/:username/follow', auth, followUser);

module.exports = router;