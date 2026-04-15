# DM'S

This is a simple and minimal web chatting app built with Expressjs as the backend framework and React on the frontend. It basically allows users to sign up or login, choose a profile picture and send messages to other users. It only includes core features like sending messages and changing profile picture for easy identification.

# Usage

`git clone https://github.com/miachis/dms.git`

Change directory to the backend to start the servers

`cd src/backend`

After cloning/downloading the repo, run the following command to install dependencies

`npm install`

Then create a .env file and fill in the following

```
DATABASE_URL=
ACCESS_TOKEN_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE=

```

Then start the first server

`npm run dev`

Then, the second server which is a web socket

`npm run wss`

After those servers are running, run the following 👇

`cd ../frontend`

Install dependencies

`npm install`

Then start the frontend application

`npm run dev`

Then open a browser and visit

`http://localhost/3000`
