import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Application works is here!');
});

app.listen(5000, () => {
  console.log('Application started on port 5000!');
});
