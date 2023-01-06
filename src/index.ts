import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));

// This will catch all the routes and return index.html, and React Router will handle serving the correct page
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
