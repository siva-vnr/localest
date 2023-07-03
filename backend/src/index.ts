import express from 'express';
import morgan from 'morgan';
import userRoute from './routes/user';

const app = express();
app.use(morgan('dev')); // logger
 
app.get('/', async (req, res) => {
  res.json({ hello: "world!" });
});

app.use('/users', userRoute.registerRoutes())

 
const port = Number(process.env.PORT ?? 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});