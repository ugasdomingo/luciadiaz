//Import tools
import { Router } from "express";
import Post from "../models/Post";

//Define router
const blogRouter = Router();

//Routes
blogRouter.get('/post', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

blogRouter.post('/post', async (req, res) => {
  const { title, category, body } = req.body

  const post = new Post({title, category, body})
  await post.save()

  res.json(post)
});

blogRouter.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
  
    if (!post) return res.status(404).json({message:"Post no encontrado"})
    res.send(post)
  } catch (error) {
    return res.status(500).json({message:"Formato id inválido"})
  }
});

blogRouter.delete('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
  
    if (!post) return res.status(404).json({message:"Post no encontrado"})
    res.send(post)
  } catch (error) {
    return res.status(500).json({message:"Formato id inválido"})
  }
});

blogRouter.put('/post/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if (!updatedPost) return res.status(404).json({message:"Post no encontrado"})
    res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({message:"Formato id inválido"})
  }
});

//Export routes
export default blogRouter