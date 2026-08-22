# REST API (Representational State Transfer) - Complete Notes

> **Last Updated:** 8 July 2026

---


# What is REST API?

**REST (Representational State Transfer)** is an **architectural style** used to design APIs that allow communication between a client and a server over HTTP.

A REST API typically exchanges data in **JSON** format, although it can also return XML, HTML, images, or other formats.

## Key Points

- Uses HTTP protocol
- Client sends requests
- Server processes requests
- Server returns responses
- Uses URLs (Endpoints)
- Mostly exchanges JSON data
- Maps HTTP methods to CRUD operations

---

# REST vs HTTP

Many beginners confuse REST and HTTP.

| REST | HTTP |
|------|------|
| Architectural style | Communication protocol |
| Defines how APIs should be designed | Transfers data between client and server |
| Uses HTTP | Actually performs the communication |

### Simple Analogy

Imagine ordering food online.

- **REST** = The restaurant's ordering rules
- **HTTP** = The delivery person carrying your order

REST defines **how communication should happen**, while HTTP actually **transfers the data**.

---

# How REST API Works

```
Client
   │
   │ HTTP Request
   ▼
Server (REST API)
   │
   │ Process Request
   ▼
Database
   ▲
   │
Server
   │ HTTP Response (JSON)
   ▼
Client
```

### Flow

1. Client sends an HTTP request.
2. Request reaches the server.
3. Server processes it.
4. Server may communicate with a database.
5. Database returns data.
6. Server sends an HTTP response.
7. Client receives the response.

---

# HTTP Methods

REST APIs mainly use **five HTTP methods**.

| Method | Purpose | CRUD |
|---------|----------|------|
| GET | Retrieve data | Read |                  - Safe, Idempotent, Does not modify data
| POST | Create data | Create |                 - Creates new data, Not Safe, Not Idempotent
| PUT | Replace existing data | Update |        -  Entire object is replaced, Must send complete data, Idempotent
| PATCH | Partially update data | Update |      -  Partial update, Sends only changed fields, Usually smaller request payload, Not always idempotent
| DELETE | Remove data | Delete |               -  Deletes data, Idempotent


# PUT vs PATCH

| PUT | PATCH |
|------|--------|
| Replaces the entire resource | Updates only selected fields |
| Requires complete object | Requires only changed fields |
| Idempotent | Not always idempotent |
| Larger request body | Smaller request body |


# Idempotency

A request is **idempotent** if making it multiple times produces the same final server state as making it once.



# Safe vs Idempotent

| Method | Safe | Idempotent |
|---------|------|------------|
| GET | ✅ | ✅ |
| POST | ❌ | ❌ |
| PUT | ❌ | ✅ |
| PATCH | ❌ | Not Always |
| DELETE | ❌ | ✅ |

---

# Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# Features of REST APIs

## 1. Stateless

Every request contains all required information.

The server does **not** store client session information.

---

## 2. Client-Server Architecture

Client and server are independent.

Benefits:

- Easier maintenance
- Better scalability
- Independent development

---

## 3. Cacheable Responses

Responses can be cached.

Benefits:

- Faster performance
- Reduced server load

---

## 4. Uniform Interface

REST follows standard conventions.

- URLs
- HTTP methods
- Status codes
- JSON

This makes APIs predictable.

---

## 5. Layered System

Requests can pass through:

- Proxy
- Gateway
- Load Balancer
- Authentication Layer

Improves:

- Scalability
- Security
- Performance

---

# Limitations of REST APIs

## 1. Larger Requests

Every request must contain all necessary information.

---

## 2. Not Ideal for Real-Time Applications

REST follows the **Request → Response** model.

Real-time apps usually prefer:

- WebSockets
- Socket.IO

---

## 3. Over-fetching or Under-fetching

Sometimes clients receive:

- More data than needed
- Less data than needed

---

## 4. Versioning Challenges

Maintaining multiple API versions becomes difficult as applications grow.

Example

```
/api/v1/users

/api/v2/users
```


