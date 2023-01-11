import * as dotenv from 'dotenv'
import express, { Request, Response} from 'express';
import path from 'path';
import { createTrip, getTrip }  from '../database/mongoose'
import mongoose from 'mongoose'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI || '').then(() => {
    console.log('Connection established!')
}).catch(() => {
    console.log('Connection failed :(')
})

const app = express();

app.use(express.json())

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/get-trip', getTrip)

// This will catch all the routes and return index.html, and React Router will handle serving the correct page
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.post('/create-trip', createTrip)



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
