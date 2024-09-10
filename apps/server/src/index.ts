import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/apiRoutes';
import apiCheckRoutes from './routes/apiCheckRoutes';
import  cors from "cors";
const app = express();
const port = process.env.PORT?process.env.PORT:3000;


app.use(cors());
app.use(express.json());
app.get('/help',(req:Request,res:Response)=>{
  console.log("help");
  res.status(200).send("help");
})
app.get('/health',(req:Request,res:Response)=>{
  console.log("health");
  res.send("help");
})
app.use('/api', apiRoutes); 
app.use('/api-checks', apiCheckRoutes);


app.use('*',(req:Request,res:Response)=>{
  res.status(404).json({type:"error",message:"not found"});
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
