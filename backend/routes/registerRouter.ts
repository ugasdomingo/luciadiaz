//Import tools
import { Router } from "express";
import Register from "../models/Register";

//Define router
const registerRouter = Router();

//Routes
registerRouter.get('/register', async (req, res) => {
  const register = await Register.find();
  res.send(register);
});

registerRouter.post('/register', async (req, res) => {
  const { date, description } = req.body

  const register = new Register({date,description})
  await register.save()

  res.json(register)
});

registerRouter.get('/register/:id', async (req, res) => {
  try {
    const register = await Register.findById(req.params.id)
  
    if (!register) return res.status(404).json({message:"register no encontrado"})
    res.send(register)
  } catch (error) {
    return res.status(500).json({message:"Formato id inválido"})
  }
});

registerRouter.delete('/register/:id', async (req, res) => {
  try {
    const register = await Register.findByIdAndDelete(req.params.id)
  
    if (!register) return res.status(404).json({message:"register no encontrado"})
    res.send(register)
  } catch (error) {
    return res.status(500).json({message:"Formato id inválido"})
  }
});

registerRouter.put('/register/:id', async (req, res) => {
  try {
    const updatedRegister = await Register.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if (!updatedRegister) return res.status(404).json({message:"Register no encontrado"})
    res.json(updatedRegister);
  } catch (error) {
    return res.status(500).json({message:"Formato id inválido"})
  }
});

//Export routes
export default registerRouter