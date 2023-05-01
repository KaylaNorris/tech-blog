const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments

router.get('/', withAuth, async (req, res) => {
    try { 
        const commentData = await Comment.findAll({
            include: [User],
        });
    
    const comments = commentData.map((comment) =>
    comment.get({ plain: true })
    );

    res.render('comments', {
        comments,
        logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json({ message: 'Error' });
}
});

//post new comment

router.post('/', withAuth, async (req, res) => {
    const { user, content } = req.body;
    const comment = newComment ({
        user,
        content
    });
    try {
        const savedComment = await Comment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json({ message: 'Error saving comment' })
    }
    });

module.exports = router;