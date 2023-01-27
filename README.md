# message-board

## vue + express + sqlite

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Compile and Minify for Production

```sh
pnpm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint
```

## Todo
- [x] API (express)
  - [x] JWT
  - [ ] Comment api
    - [x] Post comment
    - [x] Get single comment
    - [x] Delete comment
    - [x] Get comments in row range
    - [x] Edit comment
    - [ ] Reply comment
  - [x] SQLite (sequelize)
- [ ] Front-end (vue)
  - [x] Pagination
  - [ ] Edit button
  - [ ] Website design
  - [ ] Reply comment
- [ ] ~~Pen test~~
