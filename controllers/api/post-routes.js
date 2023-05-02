const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

//new post
router.post('/', withAuth, async (req, res) => {
    const { author, body } = req.body;
    const post = newPost({
        author,
        body
    });
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json({ message: 'Error saving Post' })
    }
});

//update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: "No post found" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json({ message: 'Error updating post' });

    }
});

//delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
