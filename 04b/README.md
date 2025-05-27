# Folder 04b Overview

This folder contains various projects and documentation related to database integrations and user access management. Below is an explanation of the contents, how the integrations work, and the pros and cons of the implementation.

---

## Contents

### 1. MongoDB Integration
- **Files**:
  - `exposeeMongoDBDocument/MongoDBDocument.txt`
  - `jeg_integrator_på_mongodb_views/`
- **Description**:
  - These files document and demonstrate the integration with MongoDB.
  - Includes user roles and permissions, CRUD operations, and database views.

### 2. PostgreSQL Integration
- **Files**:
  - `Nikolaj_integrator_på_min_PostgreSQL/`
- **Description**:
  - Contains images and views related to PostgreSQL integration.
  - Demonstrates user roles and database interactions.

### 3. User Access Management
- **Files**:
  - `user1/`, `user2/`, `user3/`
- **Description**:
  - Screenshots and documentation of user access levels and operations.
  - Includes examples of login, data insertion, updates, and deletions.

---

## Integration Commands

#### PostgreSQL Integration (Partner's Database)
- **Command**:
  ```bash
  docker run --rm -it postgres psql "postgresql://admin_admin@10.136.137.33:5432/secure_db"
  ```
- **Details**:
  - This command uses Docker to run a temporary PostgreSQL client container.
  - It connects to the PostgreSQL database hosted at `10.136.137.33` on port `5432`.
  - The database name is `secure_db`, and the username is `admin_admin`.

#### MongoDB Integration (Your Database)
- **Command**:
  ```bash
  docker run --rm -it mongo mongosh "mongodb://user1:User1pass@10.136.131.173:27017/granular_acces_db"
  ```
- **Details**:
  - This command uses Docker to run a temporary MongoDB client container.
  - It connects to the MongoDB database hosted at `10.136.131.173` on port `27017`.
  - The database name is `granular_acces_db`, and the username is `user1` with the password `User1pass`.

---

## Integration Points

#### PostgreSQL Integration
- **Location**: `Nikolaj_integrator_på_min_PostgreSQL/`
- **Details**:
  - The integration happens when your partner connects to your PostgreSQL database using the above command.

#### MongoDB Integration
- **Location**: `jeg_integrator_på_mongodb_views/`
- **Details**:
  - The integration happens when you connect to your partner's MongoDB database using the above command.

---

## Pros and Cons

### Pros
1. **Comprehensive Documentation**:
   - Screenshots and text files provide detailed explanations of database interactions.
2. **Role-Based Access Control**:
   - Demonstrates user-specific operations and permissions.

### Cons
1. **Scattered Files**:
   - Documentation and examples are spread across multiple subfolders, making navigation difficult.
2. **Limited Code Examples**:
   - Some integrations lack detailed code snippets, focusing more on screenshots and descriptions.

---

Feel free to explore the subfolders for more details or reach out for further clarification.
