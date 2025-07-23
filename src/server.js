import express from 'express';
import pricesRouter from './routes/prices.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve('public')));
app.use('/api', pricesRouter);

app.listen(PORT, () => console.log(`💸 GamePrice API on :${PORT}`));