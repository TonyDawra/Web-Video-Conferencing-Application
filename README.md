# Final‑TonyDawra

A **full‑stack meeting & real‑time chat platform** built with:

* **React 18 + TypeScript** — UI, routing and state management
* **CometChat UI Kit v4** — plug‑and‑play voice / video / text chat
* **NestJS 10** — structured, scalable Node.js REST API
* **Prisma 5 + MySQL** — typed ORM and relational database

The repository contains two workspaces:

```
Final-TonyDawra/
 ├─ app/   # React + CometChat front‑end
 └─ api/   # NestJS + Prisma back‑end
```

---

## Features

| Module         | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| **Chat**       | 1‑to‑1 & group messaging, call logs, presence, typing indicators     |
| **Meetings**   | CRUD endpoints for creating & updating meetings                      |
| **Attendance** | Track who joined / left each meeting with timestamps                 |
| **Favorites**  | End‑user ability to bookmark meetings                                |
| **Users**      | User CRUD, authentication scaffold (CometChat handles realtime auth) |

---

## Quick start (local development)

### 1 . Clone & install

```bash
git clone <repo-url>
cd Final-TonyDawra
```

### 2 . Back‑end (NestJS)

```bash
cd api
cp .env.example .env           # or edit .env directly
npm install
npx prisma generate            # create typed client
npx prisma migrate dev         # creates db & runs migrations
npm run start:dev              # http://localhost:3000
```

**.env**

```
DATABASE_URL="mysql://<user>:<password>@localhost:3306/<database>"
```

> The default file points at `root:TonyDawra@localhost:3306/tonyadv`.

### 3 . Front‑end (React)

```bash
cd ../app
npm install
npm start                      # http://localhost:3001
```

Update `src/AppConstants.ts` with your own [CometChat](https://www.cometchat.com/) credentials:

```ts
export const AppConstants = {
  APP_ID : "<YOUR_APP_ID>",
  REGION : "<YOUR_REGION>",
  AUTH_KEY : "<YOUR_AUTH_KEY>",
};
```

### 4 . Open the app

Visit `http://localhost:3001` and log in with any user that exists in CometChat **and** in the `users` table. The front‑end consumes the NestJS API at `http://localhost:3000/api/dev/*`.

---

## Useful scripts

| Location | Command             | Purpose                      |
| -------- | ------------------- | ---------------------------- |
| **api**  | `npm run start:dev` | watch‑mode dev server        |
|          | `npm run build`     | transpile to `dist`          |
|          | `npm run test`      | Jest unit tests              |
| **app**  | `npm start`         | CRA dev server               |
|          | `npm run build`     | production build in `build/` |

---

## REST endpoints

Base path: `http://localhost:3000/api/dev`

```
GET    /attendance/all/attendance
GET    /attendance/attendance/:attendance_id
GET    /attendance/attendance/meeting/:meeting_id
GET    /attendance/attendance/user/:user_id
POST   /attendance/create/attendance
PUT    /attendance/update/attendance
DELETE /attendance/delete/attendance/:attendance_id

GET    /favorite/all/favorite
POST   /favorite/favorite
DELETE /favorite/del/fav

GET    /meeting/all/meetings
GET    /meeting/meeting/:meeting_id
POST   /meeting/create/meeting
PUT    /meeting/update/meeting
DELETE /meeting/delete/meeting/:meeting_id

POST   /meeting_info/create

GET    /users/all/users
GET    /users/user/:user_id
POST   /users/create/user
PUT    /users/update/user
```

*(The paths above are generated automatically from the Nest controllers; update if you rename routes.)*

---

## Production build

1. **API** – `npm run build && node dist/main.js`
2. **App** – `npm run build` and serve the static files (e.g. Nginx).

Configure CORS or place the compiled `build/` folder behind the same domain to avoid cross‑origin issues.

---

## License

MIT — see [`LICENSE`](LICENSE) for details.

---

## Author

**Tony Dawra**

Feel free to open issues or submit PRs 🎉
