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
  "message": "API is healthy"
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

```text
[x] Project setup
[x] Production folder structure
[x] Environment configuration
[x] MongoDB Atlas connection
[x] Express server
[x] Health endpoint
[x] User model
[x] POST /api/v1/users
[x] Centralized error middleware

[ ] GET /api/v1/users/:id
[ ] GET /api/v1/users
[ ] PUT
[ ] PATCH
[ ] DELETE
[ ] HEAD
[ ] OPTIONS
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
