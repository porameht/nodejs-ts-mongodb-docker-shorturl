import express from "express";
import config from "config";
import routes from "./routes";
import bodyParser from "body-parser";
import db from "./db";


const port = config.get("port");

const app = express();

// parse application/json
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Application in running at http://localhost:${port}`);
  db();
  routes(app);
});
