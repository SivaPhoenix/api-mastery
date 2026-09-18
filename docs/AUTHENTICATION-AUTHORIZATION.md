# Authentication & Authorization

## PayFlow API

This document records the authentication and authorization concepts,
architecture, implementation, API flows, security rules, and tests
implemented in the PayFlow API as part of the API Mastery project.

------------------------------------------------------------------------

## 1. Authentication vs Authorization

Authentication answers:

> **Who are you?**

Authorization answers:

> **What are you allowed to do?**

The PayFlow API separates these responsibilities:

``` text
Client
  ↓
Authentication
  ↓
Identify the user
  ↓
Authorization
  ↓
Check role / permission / resource ownership
  ↓
Controller
  ↓
Service
```

### Authentication

Authentication verifies the identity of the requester.

In PayFlow, the current implementation uses:

-   Email + password for login
-   bcrypt for password hashing
-   JWT access tokens
-   Bearer authentication
-   JWT verification middleware

### Authorization

Authorization determines whether the authenticated user can perform an
action.

PayFlow currently implements:

-   Role-Based Access Control (RBAC)
-   Resource-level authorization
-   Ownership checks
-   Admin override for selected resources
-   BOLA/IDOR protection

Permission-based authorization is the next authorization topic and is
not yet implemented in this document.

------------------------------------------------------------------------

# 2. Authentication Architecture

Current authentication flow:

``` text
POST /api/v1/auth/register
        ↓
Validate request
        ↓
Hash password with bcrypt
        ↓
Create User
        ↓
Return sanitized user
```

Login:

``` text
POST /api/v1/auth/login
        ↓
Validate request
        ↓
Find user by email
        ↓
Compare password with bcrypt
        ↓
Check account status
        ↓
Generate JWT access token
        ↓
Return token + sanitized user
```

Protected request:

``` text
GET /api/v1/auth/me
        ↓
Authorization: Bearer <JWT>
        ↓
authenticate middleware
        ↓
jwt.verify()
        ↓
req.user
        ↓
Controller
```

------------------------------------------------------------------------

# 3. User Model

The current User model contains:

``` javascript
{
    name,
    email,
    passwordHash,
    role,
    status,
    age,
    gender,
    city,
    country,
    phone
}
```

Important authentication-related fields:

``` text
passwordHash
role
status
```

### Role

Current roles:

``` text
customer
admin
```

Default:

``` text
customer
```

The registration API does not accept `role` from the client.

The server assigns:

``` javascript
role: "customer"
```

This prevents a user from registering themselves as an admin.

### Status

Current statuses:

``` text
active
blocked
```

Only active accounts can successfully authenticate.

------------------------------------------------------------------------

# 4. Password Hashing

Passwords must never be stored as plaintext.

Instead:

``` text
Plain password
      ↓
bcrypt
      ↓
passwordHash
      ↓
MongoDB
```

The project uses bcrypt with:

``` javascript
const authConfig = {
    saltRounds: 12
};
```

Password utility:

``` javascript
const bcrypt = require("bcrypt");
const authConfig = require("../config/auth");

const hashPassword = async (password) => {
    return bcrypt.hash(password, authConfig.saltRounds);
};

const comparePassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

module.exports = {
    hashPassword,
    comparePassword
};
```

### Registration

The password is hashed before storing the user:

``` text
password
   ↓
hashPassword()
   ↓
passwordHash
   ↓
User.create()
```

### Login

The supplied password is compared against the stored hash:

``` text
password
   ↓
bcrypt.compare()
   ↓
true / false
```

The original password is never returned by the API.

------------------------------------------------------------------------

# 5. Registration API

## Endpoint

``` http
POST /api/v1/auth/register
```

### Request headers

``` http
Content-Type: application/json
```

### Request body

``` json
{
    "name": "Customer A",
    "email": "customera@example.com",
    "password": "CustomerA@123",
    "age": 25,
    "gender": "male",
    "city": "Chennai",
    "country": "India",
    "phone": "9876543210"
}
```

### Important security rule

The client cannot provide:

``` json
{
    "role": "admin"
}
```

The registration schema intentionally does not accept `role`.

The service assigns:

``` javascript
role: "customer",
status: "active"
```

server-side.

### Registration flow

``` text
Request
  ↓
Joi validation
  ↓
Check existing email
  ↓
Hash password
  ↓
Create user
  ↓
Return sanitized user
```

------------------------------------------------------------------------

# 6. Login API

## Endpoint

``` http
POST /api/v1/auth/login
```

### Request

``` http
Content-Type: application/json
```

``` json
{
    "email": "customera@example.com",
    "password": "CustomerA@123"
}
```

### Successful response

``` json
{
    "success": true,
    "data": {
        "accessToken": "<JWT_ACCESS_TOKEN>",
        "user": {
            "id": "6aaba5e395c93e72af9ea3aa",
            "name": "Customer A",
            "email": "customera@example.com",
            "role": "customer",
            "status": "active"
        }
    }
}
```

### Invalid credentials

The API returns the same generic error for a missing user and an
incorrect password:

``` json
{
    "success": false,
    "error": {
        "code": "INVALID_CREDENTIALS",
        "message": "Invalid email or password"
    }
}
```

This avoids exposing whether a specific email address exists.

### Blocked user

If the account is not active:

``` json
{
    "success": false,
    "error": {
        "code": "USER_BLOCKED",
        "message": "User account is not active"
    }
}
```

------------------------------------------------------------------------

# 7. JWT Fundamentals

A JWT has three parts:

``` text
HEADER.PAYLOAD.SIGNATURE
```

Example header:

``` json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

Example payload:

``` json
{
    "sub": "6aaba5e395c93e72af9ea3aa",
    "role": "customer",
    "iat": 1789640086,
    "exp": 1789643686
}
```

### Claims

`sub`

The subject of the token.

In PayFlow:

``` text
sub = User ID
```

`role`

The authenticated user's role.

`iat`

Issued-at timestamp.

`exp`

Expiration timestamp.

### Important

JWT payload data is encoded, not automatically encrypted.

Therefore, do not put secrets, passwords, or sensitive private
information inside the payload.

------------------------------------------------------------------------

# 8. JWT Access Token Generation

Current implementation:

``` javascript
const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user._id.toString(),
            role: user.role
        },
        env.jwtSecret,
        {
            expiresIn: "15m"
        }
    );
};

module.exports = {
    generateAccessToken
};
```

The access token contains:

``` text
sub
role
iat
exp
```

Current access-token lifetime:

``` text
15 minutes
```

------------------------------------------------------------------------

# 9. JWT Decode vs Verify

### Decode

``` javascript
jwt.decode(token);
```

Only reads the token contents.

It does **not** prove that the token is authentic.

### Verify

``` javascript
jwt.verify(token, secret);
```

Verifies the JWT signature and validates token claims such as
expiration.

For authentication, PayFlow uses:

``` javascript
jwt.verify()
```

not merely:

``` javascript
jwt.decode()
```

------------------------------------------------------------------------

# 10. Authentication Middleware

File:

``` text
src/middleware/auth.middleware.js
```

Its responsibility is to authenticate the request.

Current flow:

``` text
Authorization header
       ↓
Check Bearer format
       ↓
Extract token
       ↓
jwt.verify()
       ↓
Create req.user
       ↓
next()
```

The authenticated user context is:

``` javascript
req.user = {
    sub: decoded.sub,
    role: decoded.role
};
```

This context is then available to controllers and services.

------------------------------------------------------------------------

# 11. Authorization Header

Protected endpoints expect:

``` http
Authorization: Bearer <ACCESS_TOKEN>
```

Example:

``` http
GET /api/v1/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
```

### Missing token

Response:

``` http
401 Unauthorized
```

``` json
{
    "success": false,
    "error": {
        "code": "INVALID_TOKEN",
        "message": "Authentication required"
    }
}
```

### Expired or invalid JWT

Response:

``` http
401 Unauthorized
```

``` json
{
    "success": false,
    "error": {
        "code": "INVALID_TOKEN",
        "message": "Invalid or expired access token"
    }
}
```

------------------------------------------------------------------------

# 12. Protected Endpoint Example

``` http
GET /api/v1/auth/me
Authorization: Bearer <ACCESS_TOKEN>
```

After authentication:

``` javascript
req.user = {
    sub: "6aaba5e395c93e72af9ea3aa",
    role: "customer"
};
```

Response:

``` json
{
    "success": true,
    "data": {
        "sub": "6aaba5e395c93e72af9ea3aa",
        "role": "customer"
    }
}
```

------------------------------------------------------------------------

# 13. Authentication Middleware vs Authorization Middleware

These are different responsibilities.

### Authentication

``` text
authenticate
```

asks:

> Is this a valid authenticated user?

### Authorization

``` text
authorize("admin")
```

asks:

> Does this authenticated user have the required role?

Example:

``` javascript
router.get(
    "/",
    authenticate,
    authorize("admin"),
    getUsers
);
```

The request must pass both checks.

``` text
JWT valid?
   ↓
YES
   ↓
Role = admin?
   ↓
YES
   ↓
Controller
```

------------------------------------------------------------------------

# 14. Role-Based Access Control (RBAC)

Current PayFlow roles:

``` text
customer
admin
```

RBAC maps users to roles and roles to allowed operations.

Example:

``` text
Admin
  ↓
Can access administrative endpoints

Customer
  ↓
Can access customer-level endpoints
```

Current authorization middleware:

``` javascript
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(
                new ApiError(
                    HTTP_STATUS.UNAUTHORIZED,
                    ERROR_CODES.INVALID_TOKEN,
                    "Authentication required"
                )
            );
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(
                new ApiError(
                    HTTP_STATUS.FORBIDDEN,
                    ERROR_CODES.FORBIDDEN,
                    "You do not have permission to perform this action"
                )
            );
        }

        next();
    };
};
```

------------------------------------------------------------------------

# 15. RBAC Endpoint Example

User listing is protected as an admin-only endpoint:

``` javascript
router.get(
    "/",
    authenticate,
    authorize("admin"),
    getUsers
);
```

### Customer

``` text
Authenticated
    ↓
role = customer
    ↓
authorize("admin")
    ↓
403 Forbidden
```

### Admin

``` text
Authenticated
    ↓
role = admin
    ↓
authorize("admin")
    ↓
200 OK
```

------------------------------------------------------------------------

# 16. 401 vs 403

This distinction is important.

## 401 Unauthorized

The request does not have valid authentication credentials.

Examples:

``` text
No Authorization header
Invalid JWT
Expired JWT
Malformed authentication credentials
```

Meaning:

> The API cannot authenticate you.

## 403 Forbidden

The user is authenticated but is not allowed to perform the operation.

Example:

``` text
Customer attempts admin endpoint
```

Meaning:

> The API knows who you are, but you are not permitted to perform this
> action.

------------------------------------------------------------------------

# 17. Resource-Level Authorization

RBAC alone is not enough.

Suppose:

``` text
Customer A
Customer B
```

Both have:

``` text
role = customer
```

Customer A requests:

``` http
GET /api/v1/orders/<ORDER_B_ID>
```

A role check such as:

``` javascript
authorize("customer")
```

would allow the request because Customer A is a customer.

That is insufficient.

The API must also ask:

> Does this customer own this particular order?

This is resource-level authorization.

------------------------------------------------------------------------

# 18. Ownership Authorization

An Order contains:

``` javascript
{
    userId: "...",
    items: [...],
    totalAmount: ...,
    status: "pending"
}
```

The `userId` establishes the ownership relationship.

For:

``` http
GET /api/v1/orders/:orderId
```

the service checks:

``` javascript
const isAdmin = currentUser.role === "admin";

const isOwner =
    order.userId.toString() === currentUser.sub.toString();

if (!isAdmin && !isOwner) {
    throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_CODES.FORBIDDEN,
        "You do not have permission to access this order"
    );
}
```

Authorization therefore becomes:

``` text
Admin OR Owner
    ↓
Allowed

Neither
    ↓
403 Forbidden
```

------------------------------------------------------------------------

# 19. BOLA / IDOR

## BOLA

**Broken Object Level Authorization**

occurs when an API exposes an object identifier but fails to verify
whether the authenticated user is authorized to access that object.

IDOR is commonly used to describe insecure direct access to objects
through user-controlled identifiers.

Example:

``` http
GET /api/v1/orders/ORDER_A
```

Customer A is allowed to access Order A.

But Customer A changes the identifier:

``` http
GET /api/v1/orders/ORDER_B
```

where Order B belongs to Customer B.

If the API returns Order B without checking ownership, it has a broken
object-level authorization vulnerability.

------------------------------------------------------------------------

# 20. BOLA Protection for Order Retrieval

Request:

``` http
GET /api/v1/orders/ORDER_B
Authorization: Bearer <CUSTOMER_A_TOKEN>
```

Service determines:

``` text
Order B userId = Customer B
JWT sub        = Customer A
role           = customer
```

Therefore:

``` text
isOwner = false
isAdmin = false
```

Response:

``` http
403 Forbidden
```

Example:

``` json
{
    "success": false,
    "error": {
        "code": "FORBIDDEN",
        "message": "You do not have permission to view this order"
    }
}
```

The exact message may vary, but the authorization result is:

``` text
403 FORBIDDEN
```

------------------------------------------------------------------------

# 21. Admin Resource Access

Admins are allowed to access orders belonging to other customers in the
current PayFlow implementation.

Example:

``` text
Admin JWT
    ↓
role = admin

Requested Order
    ↓
belongs to Customer B

isAdmin = true
    ↓
200 OK
```

This demonstrates that resource authorization can combine:

``` text
Role
+
Resource ownership
```

------------------------------------------------------------------------

# 22. BOLA Protection for User Order Collections

PayFlow also exposes:

``` http
GET /api/v1/users/:userId/orders
```

This endpoint has a different ownership relationship.

The requested resource is the collection of orders belonging to the
specified user.

Therefore the service compares:

``` javascript
const isOwner =
    userId.toString() === currentUser.sub.toString();

const isAdmin =
    currentUser.role === "admin";
```

Authorization rule:

``` text
Admin OR requested userId == authenticated user ID
    ↓
Allowed

Otherwise
    ↓
403 Forbidden
```

------------------------------------------------------------------------

# 23. Why `order.userId` and `userId` Are Different Checks

For:

``` http
GET /orders/:orderId
```

the service first retrieves an order:

``` javascript
const order = await orderRepository.findById(orderId);
```

Therefore ownership is checked using:

``` javascript
order.userId
```

For:

``` http
GET /users/:userId/orders
```

the requested resource is already identified by `userId`.

Therefore ownership is checked using:

``` javascript
userId
```

against:

``` javascript
currentUser.sub
```

The rule is the same conceptually:

``` text
Authenticated user
        +
Requested resource
        +
Authorization relationship
```

------------------------------------------------------------------------

# 24. Secure Request Flow

Current protected order request:

``` text
Client
  ↓
GET /api/v1/orders/:orderId
  ↓
authenticate
  ↓
JWT verification
  ↓
req.user
  ↓
Controller
  ↓
Order Service
  ↓
Find order
  ↓
Check:
    admin?
       OR
    owner?
  ↓
 ┌───────────────┐
 │               │
YES             NO
 │               │
200             403
```

------------------------------------------------------------------------

# 25. Validation vs Authorization

These are also different concepts.

Validation asks:

> Is the supplied data structurally valid?

Example:

``` text
userId = "abc"
```

can produce:

``` text
400 Bad Request
```

Authorization asks:

> Is this authenticated user allowed to access this resource?

Example:

``` text
userId = valid Customer B ID
JWT user = Customer A
```

The ID is valid, but access is not permitted:

``` text
403 Forbidden
```

Therefore:

``` text
Validation
    ↓
"Is the input valid?"

Authorization
    ↓
"Is this user allowed?"
```

------------------------------------------------------------------------

# 26. Controller vs Service Responsibilities

The controller handles HTTP concerns:

``` text
req.params
req.body
req.headers
HTTP status
HTTP response
```

The service handles business and authorization rules:

``` text
ownership
admin override
business rules
resource access
```

Example:

``` javascript
const order = await orderService.getOrderById(
    orderId,
    req.user
);
```

The controller passes the authenticated identity to the service.

The service decides whether the resource can be accessed.

------------------------------------------------------------------------

# 27. Current Authorization Test Matrix

The following scenarios were tested during implementation.

  Scenario                                     Expected   Result
  ------------------------------------------ ---------- --------
  No token → order                                  401     Pass
  Customer A → own order                            200     Pass
  Customer A → Customer B order                     403     Pass
  Admin → Customer B order                          200     Pass
  No token → user orders                            401     Pass
  Customer A → own user order collection            200     Pass
  Customer A → Customer B order collection          403     Pass
  Customer B → own order collection                 200     Pass
  Admin → Customer B order collection               200     Pass

------------------------------------------------------------------------

# 28. Security Principles Learned

## Never trust user-controlled IDs

An ID being syntactically valid does not mean the requester is
authorized to use it.

``` text
Valid ID ≠ Authorized access
```

## Never rely only on frontend authorization

The backend must enforce authorization.

The frontend can hide buttons, but the API must reject unauthorized
requests.

## Authentication is not authorization

A valid JWT only establishes identity.

It does not automatically grant access to every resource.

## Role checks are not enough

This is unsafe for object access:

``` javascript
authorize("customer")
```

by itself.

You also need resource-level authorization when resources belong to
users.

## Do not allow privilege escalation during registration

Never trust:

``` json
{
    "role": "admin"
}
```

from an ordinary registration request.

Assign privileged roles server-side.

------------------------------------------------------------------------

# 29. Current Authentication & Authorization Components

``` text
src/
├── config/
│   └── auth.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── authorize.middleware.js
│   └── validate.middleware.js
│
├── services/
│   ├── auth.service.js
│   └── order.service.js
│
├── repositories/
│   └── auth.repository.js
│
├── utils/
│   ├── password.js
│   ├── jwt.js
│   └── api-error.js
│
├── constants/
│   ├── http-status.js
│   └── error-codes.js
│
└── schemas/
    └── auth.schema.js
```

------------------------------------------------------------------------

# 30. Current Authentication Endpoints

``` text
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

Planned authentication work from the roadmap includes:

``` text
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

Refresh-token rotation/revocation and more advanced OAuth/OIDC topics
will be introduced later.

------------------------------------------------------------------------

# 31. Current Authorization Levels

PayFlow currently has three conceptual authorization layers:

``` text
Layer 1 — Authentication
    ↓
Valid JWT?

Layer 2 — Role Authorization
    ↓
Does the user have the required role?

Layer 3 — Resource Authorization
    ↓
Can this user access this specific resource?
```

Example:

``` text
GET /orders/123

Authentication
    ↓
JWT valid

Role
    ↓
customer/admin

Resource
    ↓
owner/admin

Final decision
    ↓
200 or 403
```

------------------------------------------------------------------------

# 32. Next Authorization Topic

The next step is **permission-based authorization**.

Instead of relying only on:

``` text
admin
customer
```

the API will introduce permissions such as:

``` text
users.read
users.write
orders.read
orders.create
orders.cancel
orders.refund
```

The authorization model will evolve toward:

``` text
User
  ↓
Role
  ↓
Permissions
  ↓
Endpoint
  ↓
Resource authorization
```

This will allow more granular authorization than simple role checks.

------------------------------------------------------------------------

# 33. Interview Summary

For an SDE-2 interview, be able to explain:

### Authentication

> Authentication verifies the identity of the requester. In PayFlow,
> credentials are verified with bcrypt and a short-lived JWT access
> token is issued.

### Authorization

> Authorization determines whether an authenticated user is allowed to
> perform a particular operation.

### RBAC

> RBAC assigns permissions at a role level, such as customer or admin.

### Resource-level authorization

> Resource authorization checks the relationship between the
> authenticated user and the specific resource being requested.

### BOLA

> BOLA occurs when an API fails to enforce object-level authorization on
> user-controlled resource identifiers.

### 401 vs 403

``` text
401 → authentication missing/invalid
403 → authenticated but not permitted
```

### Core security rule

``` text
Authenticated identity
        +
Requested resource
        +
Authorization relationship
        =
Correct access decision
```

------------------------------------------------------------------------

## Status

``` text
Authentication
    ✓ Registration
    ✓ Password hashing
    ✓ Login
    ✓ JWT generation
    ✓ JWT verification
    ✓ Authentication middleware
    ✓ Protected endpoint
    ✓ Invalid/expired token handling

Authorization
    ✓ RBAC
    ✓ Admin-only endpoint
    ✓ Ownership authorization
    ✓ Resource-level authorization
    ✓ BOLA/IDOR protection
    ✓ User-order collection authorization
    ⏳ Permission-based authorization
    ⏳ Advanced OAuth/OIDC
    ⏳ Refresh token rotation/revocation
```
