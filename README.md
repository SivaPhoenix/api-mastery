# API-MASTERY

Production-grade API engineering project built with **Node.js, Express, and MongoDB**, designed as a hands-on implementation of the complete API Mastery roadmap.

## Goal

Build one real-world API system from the ground up and progressively evolve it through:

- HTTP fundamentals
- REST API design
- Node.js architecture
- Validation & error handling
- Authentication & authorization
- API security
- Performance
- Redis & caching
- Database design & concurrency
- Distributed systems
- Reliability
- Idempotency
- Rate limiting
- Observability
- Queues & workers
- Webhooks
- OpenAPI
- Testing
- Microservices & API Gateway
- GraphQL
- gRPC
- Load testing
- Production architecture
- SDE-2 interview preparation

## Project: PayFlow API

A production-oriented commerce and payment API used as the practical project for the entire API Mastery preparation.

### Core Domain

```text
Users
Accounts
Products
Inventory
Orders
Payments
Refunds
Transactions
Webhooks
Notifications
API Keys
Audit Logs
Idempotency
```

## Tech Stack

```text
Node.js
Express.js
MongoDB Atlas
Mongoose
Postman
```

Technologies introduced progressively:

```text
Redis
BullMQ
OpenAPI
Jest
Supertest
Docker
k6
OpenTelemetry
GraphQL
gRPC
Kafka
```

## Production Architecture

```text
src/
│
├── config/
│   ├── database.js
│   └── env.js
│
├── controllers/
├── services/
├── repositories/
├── models/
├── schemas/
├── routes/
├── middleware/
├── validators/
├── utils/
├── constants/
├── app.js
└── server.js
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── postman/
```

### Request Flow

```text
Client / Postman
       ↓
Middleware
       ↓
Router
       ↓
Controller
       ↓
Service
       ↓
Repository
       ↓
Model
       ↓
MongoDB
```

### Response Flow

```text
MongoDB
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
HTTP Response
   ↓
Client
```

## API Mastery Progress

### Phase 1 — HTTP Fundamentals

- HTTP methods
- Request / Response
- Headers
- Body
- Status codes
- HTTP/1.1
- HTTP/2
- HTTP/3

### Phase 2 — REST API Design

- Resources
- URLs
- REST principles
- CRUD
- Pagination
- Filtering
- Sorting
- API versioning

### Phase 3 — Node.js API Engineering

- Express
- Routers
- Controllers
- Services
- Repositories
- Middleware
- Configuration

### Phase 4 — Validation & Errors

- Request validation
- Error handling
- Standard error responses

### Phase 5 — Authentication

- JWT
- Access tokens
- Refresh tokens
- Sessions

### Phase 6 — API Security

- BOLA/IDOR
- Injection
- CORS
- Mass assignment
- Security headers

### Phase 7 — Performance

- N+1 queries
- Database indexes
- Compression
- Connection pooling

### Phase 8 — Redis & Caching

- Cache-aside
- TTL
- Invalidation
- Distributed locks

### Phase 9 — Database & Concurrency

- MongoDB
- Indexes
- Transactions
- Atomic operations
- Optimistic concurrency

### Phase 10 — Distributed Systems

- Saga
- Outbox
- Event-driven architecture

### Phase 11 — Reliability

- Timeouts
- Retries
- Backoff
- Jitter
- Circuit breakers

### Phase 12 — Idempotency

- Idempotency keys
- Duplicate request protection
- Payment retry scenarios

### Phase 13 — Rate Limiting

- Token bucket
- Sliding window
- Redis-backed rate limiting

### Phase 14 — Observability

- Structured logging
- Request IDs
- Metrics
- Distributed tracing

### Phase 15 — Queues & Workers

- Async jobs
- Retries
- Dead-letter queues
- Background workers

### Phase 16 — Webhooks

- Signatures
- HMAC
- Replay protection
- Event deduplication

### Phase 17 — OpenAPI

- API contracts
- Documentation
- Request/response schemas

### Phase 18 — Testing

- Unit tests
- Integration tests
- E2E tests
- Contract testing

### Phase 19 — API Gateway & Microservices

- API Gateway
- Service boundaries
- Load balancing
- Service-to-service communication

### Phase 20 — GraphQL

- Queries
- Mutations
- Resolvers
- N+1/DataLoader

### Phase 21 — gRPC

- Protobuf
- RPC
- Internal service communication

### Phase 22 — Performance Testing

- k6
- Load testing
- Stress testing
- Bottleneck analysis

### Phase 23 — Production Architecture

- Gateway
- Load balancer
- Redis
- MongoDB
- Queues
- Workers
- Observability

### Phase 24 — System Design

- Scalability
- Availability
- Consistency
- Failure handling
- Capacity planning

### Phase 25 — SDE-2 API Interview Preparation

- API design questions
- System design
- Debugging
- Performance
- Security
- Distributed systems
- Production scenarios

## Initial API

```text
POST    /api/v1/users
GET     /api/v1/users
GET     /api/v1/users/:id
PUT     /api/v1/users/:id
PATCH   /api/v1/users/:id
DELETE  /api/v1/users/:id
HEAD    /api/v1/users/:id
OPTIONS /api/v1/users/:id
```

Every endpoint will be implemented and tested through:

```text
HTTP Method
    ↓
URL
    ↓
Headers
    ↓
JSON Body
    ↓
Router
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
MongoDB
    ↓
Status Code
    ↓
Response Headers
    ↓
JSON Response
    ↓
Postman
```

## Running the Project

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

### Health Check

```http
GET http://localhost:3000/health
```

Expected:

```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2026-09-11T04:30:00.000Z"
}
```

## Implemented Endpoints

### 1. Create User
- **Method**: `POST`
- **URL**: `/api/v1/users`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "passwordHash": "hashed_secret",
  "role": "customer",
  "status": "active",
  "age": 25,
  "gender": "male",
  "city": "Bengaluru",
  "country": "India",
  "phone": "+919876543210"
}
```
- **Response**: `201 Created`
```json
{
  "data": {
    "id": "66e138f75c2e1a3b4c5d6e7f",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "customer",
    "status": "active",
    "createdAt": "2026-09-11T05:00:00.000Z"
  }
}
```

### 2. Get User by ID
- **Method**: `GET`
- **URL**: `/api/v1/users/:id`
- **Response**: `200 OK`
```json
{
  "data": {
    "id": "66e138f75c2e1a3b4c5d6e7f",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "customer",
    "status": "active",
    "createdAt": "2026-09-11T05:00:00.000Z"
  }
}
```

### 3. Update User by ID
- **Method**: `PUT`
- **URL**: `/api/v1/users/:id`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Johnathan Doe",
  "age": 26,
  "city": "Mumbai"
}
```
- **Response**: `200 OK`
```json
{
  "data": {
    "id": "66e138f75c2e1a3b4c5d6e7f",
    "name": "Johnathan Doe",
    "email": "john.doe@example.com",
    "role": "customer",
    "status": "active",
    "createdAt": "2026-09-11T05:00:00.000Z"
  }
}
```

### 4. Delete User by ID
- **Method**: `DELETE`
- **URL**: `/api/v1/users/:id`
- **Response**: `200 OK`
```json
{
  "message": "User deleted successfully"
}
```

### Error Response Format
All errors handled by the centralized error middleware adhere to:
```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User Not found"
  }
}
```

## Environment Variables

Create `.env`:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=
```

Never commit `.env`.

Use `.env.example` for documenting required environment variables.

## API Testing

Postman will be used throughout the project to test:

```text
Request
├── Method
├── URL
├── Headers
└── JSON Body

Response
├── Status Code
├── Headers
└── JSON Body
```

The Postman collection will be maintained inside:

```text
postman/
```

## Current Progress

### Project Setup

```text
[x] Project setup
[x] Production folder structure
[x] Environment configuration
[x] MongoDB Atlas connection
[x] Express server
[x] Health endpoint
[x] Centralized error middleware
```

### User API
```text
[x] User model
    ├── name
    ├── email
    ├── passwordHash
    ├── role
    ├── status
    ├── age
    ├── gender
    ├── city
    ├── country
    └── phone

[x] POST /api/v1/users
    └── Create User

[x] GET /api/v1/users/:id
    └── Get User by ID

[x] GET /api/v1/users
    ├── Filtering
    ├── Multiple filters
    ├── Comparison operators
    ├── Sorting
    ├── Default deterministic sorting
    ├── Pagination
    ├── Pagination metadata
    ├── Pagination validation
    ├── Maximum limit validation
    ├── Page boundary validation
    └── Search

[x] PUT /api/v1/users/:id
    └── Full update

[x] PATCH /api/v1/users/:id
    └── Partial update

[x] DELETE /api/v1/users/:id
    └── Delete User

[x] HEAD /api/v1/users/:id
    └── Resource existence check

[x] OPTIONS /api/v1/users/:id
    └── Supported HTTP methods
```

### Product API
```text
[x] Product model
    ├── name
    ├── description
    ├── SKU
    ├── price
    ├── currency
    ├── stock
    ├── category
    └── status

[x] POST /api/v1/products
    └── Create Product

[x] POST /api/v1/products/bulk
    └── Bulk Product Creation

[x] GET /api/v1/products
    └── List Products

[x] GET /api/v1/products/:productId
    └── Get Product by ID

[x] PUT /api/v1/products/:productId
    └── Update Product

[x] DELETE /api/v1/products/:productId
    └── Delete Product

[x] Product ID validation
[x] Duplicate SKU handling
[x] Product validation errors
[x] Centralized Product error handling

```

### Order API
```text
[x] Order model
    ├── orderNumber
    ├── userId
    ├── items
    ├── totalAmount
    ├── currency
    └── status

[x] Order Item model
    ├── productId
    ├── quantity
    └── price snapshot

[x] POST /api/v1/orders
    ├── User existence validation
    ├── Empty items validation
    ├── Product ID validation
    ├── Product existence validation
    ├── Product status validation
    ├── Stock validation
    ├── Multiple product support
    ├── Order total calculation
    └── Business order number generation

[x] GET /api/v1/orders/:orderId
    ├── Existing order
    ├── Invalid Order ID validation
    └── Order Not Found handling

[x] GET /api/v1/users/:userId/orders
    ├── Get orders by user
    ├── User ID validation
    └── User Not Found handling

[x] Inactive Product handling
[x] Insufficient Stock handling
[x] Empty Items handling
[x] Invalid Product ID handling
[x] Multiple Products handling
[x] Order price snapshot
[x] Business Order Number
```

### Validation & Error Handling
```text
[x] Centralized error middleware
[x] HTTP status + application error code separation
[x] MongoDB duplicate key handling
[x] Mongoose validation error handling
[x] Resource Not Found errors
[x] Invalid ObjectId handling
[x] Business rule errors
[ ] Request validation middleware
[ ] Request schema validation
[ ] Query parameter schema validation
[ ] Body schema validation
[ ] Reusable validation architecture
[ ] Custom API Error class
```

### API Testing

```text
[x] Manual API testing
[x] Positive test cases
[x] Negative test cases
[x] Invalid ObjectId testing
[x] Resource Not Found testing
[x] Business validation testing
[ ] Automated unit tests
[ ] Automated integration tests
[ ] Automated E2E tests
```

## Learning Principle

This project is not intended to be just a CRUD application.

Every feature will be used to answer:

> **Why is this required in a production API?**

For every concept, we will study:

```text
What?
Why?
How?
Where?
Trade-offs?
Failure scenarios?
Production considerations?
SDE-2 interview questions?
```

## Learning Flow

```text
BUILD
  ↓
TEST
  ↓
UNDERSTAND
  ↓
IMPROVE
  ↓
SCALE
  ↓
DESIGN
  ↓
INTERVIEW
```

**API-MASTERY → Build → Test → Understand → Scale → Design → SDE-2**
