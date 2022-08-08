**URL Shortener backend**

  1.0 Setup application

  1.1 Initialize project `yarn init`

  1.2 Initialize TypeScript

- `npx typescript --init`
- `yarn add express cors body-parser config mongoose yup nanoid`
- `yarn add @types/express @types/cors @types/body-parser @types/config @types/mongoose @types/yup @types/nanoid @types/node typescript ts-node -D`

  1.3 Create required files

- `nodemon.json` file

  1.4 Setup nodemon

- `"dev":"nodemon --config nodemon.json src/app.ts"`

  1.5 Install required packages

- create folder src `mkdir src`
- create file app.ts `touch src/app.ts`

  1.6 Setup config

- create config folder `mkdir config`
- create config file `touch config/default.ts`
- import to file app.ts

  ```
  import config from "config";
  const port = config.get("port")
  ```

  2.0 Add create route

- create folder routes `mkdir routes`
- create index.ts file `touch routes/index.ts`

  2.1 Add model

- create folder models `mkdir models`
- create file shortUrl.model.ts `touch models/shortUrl.model.ts`

  2.2 Add route

- import routes form `import routes from "./routes";`

  2.3 Add controller

- create folder controller in src `mkdir controller`
- create function `createShortUrl` get the destination then create route in `index.ts` test by postman
- test post method `app.post("/api/url", createShortUrl);` fould error can't read property destination undifined fix by add bodyparser `app.use(bodyParser.json());` as middleware within file `app.ts` because postman we're sending json
- create file `db.ts` at root for implement `function db` and call function `db();` within `app.ts`

  2.4 Add handle redirect

- create function handleRedirect in `shortUrl.controller.ts`
- add route `app.get("/:shortId", handleRedirect);` in file `index.ts`

  2.5 Add middleware

- create folder middleware `mkdir middleware`
- create file `validateResouce.ts` for implement to handle error show status 401 while use body (destinati is valid)
- create folder schemas `mkdir schemas` and create file `createShortUrl.schema` then implement add in index.ts `app.post("/api/url", validateResourse(createShortUrlSchema), createShortUrl);` test by postman send destinati will response status 401

  3.0 Add analytics for get all data count user click or calling /:shortId

- create file `analytics.model.ts` and implement function Analytics

  3.1 Create analytics model

- create function analytics within controller `getAnalytics`

  3.2 Add to route

  - add route within file index.ts `app.get("/api/analytics", getAnalytics);`

  4.0 Containerize with Docker

  4.1 Add Dockerfile

- create dockerfile by command `touch Dockerfile` and configuration new image from node 12 alpine
- add script `"build":"tsc"` in file`package.json`
- open `"outDir": "./build",` in tsconfig.json

  4.2 Add docker-compose

- create docker-compose.yml by command `touch docker-compose.yml`
