const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all posts
router.get('/', withAuth, async (req, res) => {
    try { 
        const postData = await Post.findAll({
            where: { id: req.session.logged_in },
            include: [
                User,
            {
                model: Post
            }],
        });
    
    const posts = postData.map((post) =>
    post.get({ plain: true })
    );

    res.render('posts', {
        posts,
        logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json({ message: 'Error' });
}
});

module.exports = router;