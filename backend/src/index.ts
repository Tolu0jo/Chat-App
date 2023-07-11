import express from 'express';
import cors from 'cors'
import logger from 'morgan'
import chatRoute from './routes/chatRoute'

const app = express();

app.use(express.json());
app.use(cors({origin: ['http://127.0.0.1:5173']}))
app.use(logger('dev'));

app.use('/api',  chatRoute)

const port = 4000;

app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})

