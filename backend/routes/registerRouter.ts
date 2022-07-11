//Import tools
import { Router } from "express";

//Define router
const registerRouter = Router();

//Routes
registerRouter.get('/register', (req, res) => {
  res.send('Get all selfRegisters')
});

registerRouter.post('/register', (req, res) => {
  res.send('Create a selfRegister')
});

registerRouter.get('/register/:id', (req, res) => {
  res.send('Get a selfRegister by id')
});

registerRouter.delete('/register/:id', (req, res) => {
  res.send('Delete a selfRegister')
});

registerRouter.put('/register/:id', (req, res) => {
  res.send('Edit a selfRegister')
});

//Export routes
export default registerRouter