import express, { Application } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import { connectToDB } from '../configs/db.config';
import { LooseAuthProp } from '@clerk/clerk-sdk-node';

import 'dotenv/config';

const port = process.env.PORT || 5000;

const app: Application = express();

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

let startTime: Date | null = null;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(function (_, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/', routes());

app.get('/status', async (req, res) => {
  if (startTime) {
    res.json({ code: 200, name: 'TodoFEM API', status: `Running`, startTime: `${startTime.toLocaleString('en-GB')} (Server Time - UTC)` });
  } else {
    res.statusCode = 500;
    res.json({ code: 500, name: 'TodoFEM API', status: `Requires Attention` });
  }
})

app.listen(port, async () => {
  console.log(`\x1b[33m→ Connecting to Database...\x1b[0m`);
  await connectToDB();
  console.log(`\x1b[32m → Connected.\x1b[0m`)
  console.log(`\x1b[32mTodoFEM API listening on port ${port}\x1b[0m`);
  startTime = new Date();
});

export default app;
