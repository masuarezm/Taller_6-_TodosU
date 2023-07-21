import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.ts/index.js';

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
