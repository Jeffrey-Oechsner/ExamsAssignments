# Data Parsing Server Assignment - Part III

## Overview
This assignment involves creating two servers:
1. **Node.js Server (node_server_b)**
2. **Python Server (python_server_a)**

Both servers are designed to read and parse various data file formats (JSON, CSV, XML, YAML, and TXT) and provide endpoints to serve this data. Additionally, the servers integrate with each other to fetch data from one another.

---

## Features

### Node.js Server (`node_server_b`)
- **Framework**: Express.js
- **Endpoints**:
  - `/` - Root route with a welcome message.
  - `/txt` - Reads and serves data from `data.txt`.
  - `/json` - Reads and serves data from `data.json`.
  - `/yaml` - Reads and serves data from `data.yaml`.
  - `/xml` - Reads and serves data from `data.xml`.
  - `/csv` - Reads and serves data from `data.csv`.
  - `/from-fastapi` - Fetches data from the FastAPI server (Python).
- **Integration**: Uses `axios` to fetch data from the FastAPI server at the `/from-fastapi` endpoint.

### Python Server (`python_server_a`)
- **Framework**: FastAPI
- **Endpoints**:
  - `/` - Root route with a welcome message.
  - `/read-json` - Reads and serves data from `data.json`.
  - `/read-csv` - Reads and serves data from `data.csv`.
  - `/read-yaml` - Reads and serves data from `data.yaml`.
  - `/read-xml` - Reads and serves data from `data.xml`.
  - `/read-txt` - Reads and serves data from `data.txt`.
  - `/from-node` - Fetches data from the Node.js server.
- **Integration**: Uses `requests` to fetch data from the Node.js server at the `/from-node` endpoint.

---

## Integration Points

### Node.js Server
- **Integration Code**:
  ```javascript
  app.get('/from-fastapi', async (req, res) => {
      try {
          const response = await axios.get('http://127.0.0.1:8000/read-json');
          res.json(response.data);
      } catch (error) {
          res.status(500).send('Fejl ved hentning af data fra FastAPI');
      }
  });
  ```
- **Description**: The `/from-fastapi` endpoint fetches JSON data from the FastAPI server's `/read-json` endpoint using `axios`.

### Python Server
- **Integration Code**:
  ```python
  @app.get("/from-node")
  def get_from_node():
      try:
          response = requests.get("http://127.0.0.1:8080/json")
          return response.json()
      except Exception as e:
          return {"error": str(e)}
  ```
- **Description**: The `/from-node` endpoint fetches JSON data from the Node.js server's `/json` endpoint using the `requests` library.

---

## Pros and Cons

### Pros
1. **Modularity**: Each server is responsible for specific tasks, making the system modular and easier to maintain.
2. **Multi-format Support**: Both servers can handle multiple data formats (JSON, CSV, XML, YAML, TXT).
3. **Cross-Server Communication**: Demonstrates integration between two different server technologies (Node.js and Python).
4. **Scalability**: The architecture allows for easy addition of new endpoints or data formats.

### Cons
1. **Dependency on Both Servers**: If one server is down, the integration endpoints will fail.
2. **Performance Overhead**: Cross-server communication introduces latency.
3. **Error Handling**: Limited error handling for failed requests between servers.
4. **Hardcoded URLs**: The integration relies on hardcoded URLs, which may cause issues in different environments.

---

## File Structure
```
03a/
├── node_server_b/
│   ├── app.js
│   ├── package.json
│   └── data_files/
│       ├── data.csv
│       ├── data.json
│       ├── data.txt
│       ├── data.xml
│       └── data.yaml
├── python_server_a/
│   ├── main.py
│   ├── pyproject.toml
│   └── data_files/
│       ├── data.csv
│       ├── data.json
│       ├── data.txt
│       ├── data.xml
│       └── data.yaml
```

---

## How to Run

### Node.js Server
1. Navigate to the `node_server_b` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node app.js
   ```

### Python Server
1. Navigate to the `python_server_a` directory.
2. Install dependencies:
   ```bash
   poetry install
   ```
3. Start the server:
   ```bash
   poetry run uvicorn main:app --reload
   ```

---

## Testing the Integration
1. Start both servers.
2. Test the `/from-fastapi` endpoint on the Node.js server by visiting `http://127.0.0.1:8080/from-fastapi`.
3. Test the `/from-node` endpoint on the Python server by visiting `http://127.0.0.1:8000/from-node`.

---

## Suggestions for Improvement
1. **Dynamic Configuration**: Use environment variables for server URLs to avoid hardcoding.
2. **Enhanced Error Handling**: Implement detailed error messages and retry mechanisms for failed requests.
3. **Asynchronous Processing**: Use asynchronous libraries in Python (e.g., `httpx`) for better performance.
4. **Unit Tests**: Add tests to validate the functionality of each endpoint.

---

## Conclusion
This assignment demonstrates the ability to:
- Parse and serve data in multiple formats.
- Integrate two different server technologies.
- Highlight the strengths and limitations of cross-server communication.

By addressing the cons and implementing the suggested improvements, the system can be made more robust and production-ready.
