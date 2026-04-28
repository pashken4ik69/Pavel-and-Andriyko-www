# Coworking API — вариант 1 (lab-8/var1)

## Установка и запуск

```bash
cd labs/lab-8/var1/back
cp .env.example .env
npm install
npm run migrate
npm run seed
npm run dev
```

По умолчанию сервер: **`http://localhost:3009`** Проверка:

```bash
curl -s http://localhost:3009/health
```

## Учётные записи после сида

| Email               | Пароль     | Роль    |
| ------------------- | ---------- | ------- |
| manager@example.com | manager123 | manager |
| client@example.com  | client123  | client  |
| guest@example.com   | guest123   | guest   |

Регистрация через API создаёт пользователя с ролью **`client`**.

## Миграции и сиды

- **`npm run migrate`** — `sequelize.sync()` (таблицы под модели, без `force: true`).
- **`npm run seed`** — пользователи, зоны, брони, отзывы.

Файл БД: `labs/lab-8/var1/back/database.sqlite` (в `.gitignore`).

## Отличия от варианта 2

- Роли только `guest` | `client` | `manager`; эндпоинтов администрирования пользователей (`GET/PATCH /users` для всех учёток) **нет**.
- CRUD зон (`POST/PUT/DELETE /spaces`) — только **`manager`** (в варианте 2 это делал **admin**).
- Подтверждение броней и модерация отзывов — только **`manager`** (без участия `admin`).

## Основные эндпоинты

| Метод           | Путь                       | Описание                                    |
| --------------- | -------------------------- | ------------------------------------------- |
| GET             | `/health`                  | Проверка                                    |
| POST            | `/auth/register`           | Регистрация → `client`                      |
| POST            | `/auth/login`              | Вход                                        |
| POST            | `/auth/refresh`            | Новый access по `refreshToken`              |
| POST            | `/auth/logout`             | Выход, нужен `Bearer`                       |
| GET             | `/users/me`                | Профиль                                     |
| PATCH           | `/users/me`                | Профиль                                     |
| GET             | `/spaces/popular?limit=3`  | Популярные зоны                             |
| GET             | `/spaces`                  | Каталог (фильтры как в var2)                |
| GET             | `/spaces/:id`              | Зона                                        |
| POST/PUT/DELETE | `/spaces`, `/spaces/:id`   | CRUD зон — **manager**                      |
| GET             | `/bookings`                | **client/guest** — свои; **manager** — все  |
| POST            | `/bookings`                | Бронь — **client** или **manager**          |
| PATCH           | `/bookings/:id/cancel`     | Отмена `pending` — владелец или **manager** |
| PATCH           | `/bookings/:id/status`     | `approved` / `rejected` — **manager**       |
| GET             | `/reviews?spaceId=`        | Публично, без скрытых                       |
| GET             | `/reviews/manage?spaceId=` | Все отзывы — **manager**                    |
| POST            | `/reviews`                 | Отзыв — **client** или **manager**          |
| PATCH           | `/reviews/:id`             | Скрыть отзыв — **manager**                  |
| DELETE          | `/reviews/:id`             | Удалить — **manager**                       |

`Authorization: Bearer <accessToken>`

## Пример

```bash
curl -s -X POST http://localhost:3009/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"client@example.com","password":"client123"}'
```
