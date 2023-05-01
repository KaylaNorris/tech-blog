const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

//get all posts

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts, logged_in: req.session.logged_in })
    } catch (err) {
        res.status(500).json(err);
    }
});

//get single post
router.get('post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
    } catch (err) {
        res.status(500).json(err);
    }
        });
    



        //login and sign up routes

        router.get('/login', (req, res) => {
            if (req.session.logged_in) {
                res.redirect('/');
                return;
            }
            res.render('login');
        });

        router.get('/signup', (req, res) => {
            if (req.session.logged_in) {
                res.redirect('/');
                return;
            }

            res.render('signup');
        });

        module.exports = router;

