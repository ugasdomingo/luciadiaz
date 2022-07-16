//Import tools
import { Router } from "express";
import { userAuth } from "../middleware/userAuth";
import Register from "../models/Register";

//Define router
const registerRouter = Router();

//Routes
registerRouter.get('/register',userAuth , async (req: any, res: any) => {
  try {
    const register = await Register.find({uid: req.uid}).lean();
    return res.json({ register });
    
  } catch (error: any) {
    return res.status(500).json({message: error.message})
  }
});

registerRouter.post('/register',userAuth , async (req: any, res: any) => {
  try {
    const { date, description } = req.body

    const register = new Register({date,description, uid: req.uid})
    await register.save()

    res.json({register})
    
  } catch (error: any) {
    return res.status(500).json({message: error.message})
  }
});

registerRouter.get('/register/:id',userAuth , async (req: any, res: any) => {
  try {
    const register = await Register.findById(req.params.id);
  
    if (!register) 
      return res.status(404).json({message:"register no encontrado"})
    ;

    if (!register?.uid.equals(req.uid))
      return res.status(401).json({message:"No tiene autorizacion"})
    ;

    res.send({register});

  } catch (error: any) {
    return res.status(500).json({message: error.message});
  }
});

registerRouter.delete('/register/:id',userAuth , async (req: any, res: any) => {
  try {
    const register = await Register.findById(req.params.id)
  
    if (!register) 
      return res.status(404).json({message:"register no encontrado"})
    ;

    if (!register?.uid.equals(req.uid))
      return res.status(401).json({message:"No tiene autorizacion"})
    ;

    await register.remove();

    res.send({register});

  } catch (error: any) {
    return res.status(500).json({message: error.message})
  }
});

registerRouter.put('/register/:id',userAuth , async (req: any, res: any) => {
  try {
    const register = await Register.findById(req.params.id)

    if (!register) 
      return res.status(404).json({message:"Registro no encontrado"})
    ;
    
    if (!register?.uid.equals(req.uid))
      return res.status(401).json({message:"No tiene autorizacion"})
    ;
    
    const updatedRegister = await Register
      .findByIdAndUpdate(req.params.id, req.body, {new: true})
    ;
    res.json({updatedRegister});

  } catch (error: any) {
    return res.status(500).json({message: error.message})
  }
});

//Export routes
export default registerRouter