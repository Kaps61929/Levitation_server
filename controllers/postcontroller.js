const Post=require('../model/post')

exports.createpost=async (req,res)=>{
    try{
    const {title,content,author}=req.body;

     const post=new Post({title,content,author});
     await post.save();
     res.status(201).json(post);
    }
    catch(e){
        res.status(500).send('Error creating post');
    }
}

exports.getAllPost=async (req,res)=>{
    try{
    const post=await Post.find().populate('author','name email');
     
     res.status(201).json(post);
    }
    catch(e){
        res.status(500).send('Error retrieving posts');
    }
}

exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
  
    try {
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $set: { title, content } },
        { new: true }
      );
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.json(post);
    } catch (error) {
      res.status(500).send('Error updating post');
    }
  };
  
  exports.deletePost = async (req, res) => {
    const postId = req.params.id;
  
    try {
      const post = await Post.findOneAndDelete({ _id: postId });
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.json(post);
    } catch (error) {
      res.status(500).send('Error deleting post');
    }
  };