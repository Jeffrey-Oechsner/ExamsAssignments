# 01a - Data Parsing Servers - Part I

This project demonstrates how to parse various data formats (TXT, JSON, YAML, XML, and CSV) using both Node.js and Python. The goal is to showcase the ability to handle multiple data formats and provide a unified way to read and process them.

## Project Structure

```
01a/
├── data_files/       # Contains sample data files in different formats
│   ├── data.csv
│   ├── data.json
│   ├── data.txt
│   ├── data.xml
│   └── data.yaml
├── parser_node/      # Node.js implementation of the data parser
│   ├── DataParser.js
│   ├── package.json
├── parser_python/    # Python implementation of the data parser
│   ├── DataParser.py
```

## How It Works

### Node.js Parser (`parser_node/DataParser.js`)

1. **File Reading**: The script uses Node.js modules (`fs`, `path`) to read files from the `data_files` directory.
2. **Data Parsing**:
   - TXT: Reads the file as plain text.
   - JSON: Parses the file using `JSON.parse`.
   - YAML: Uses the `js-yaml` library to parse YAML files.
   - XML: Uses the `xml2js` library to parse XML files asynchronously.
   - CSV: Uses the `csv-parser` library to parse CSV files asynchronously.
3. **Integration**: The `getFilePath` function ensures that all file paths are correctly resolved relative to the `data_files` directory.
4. **Execution**: The `main` function reads and logs the parsed data for each file format.

### Python Parser (`parser_python/DataParser.py`)

1. **File Reading**: The script uses Python's built-in libraries (`json`, `csv`, `xml.etree.ElementTree`) and third-party libraries (`yaml`) to read files from the `data_files` directory.
2. **Data Parsing**:
   - TXT: Reads the file as plain text.
   - JSON: Parses the file using the `json` module.
   - YAML: Uses the `yaml` library to parse YAML files.
   - XML: Uses `xml.etree.ElementTree` to parse XML files.
   - CSV: Uses the `csv` module to parse CSV files.
3. **Integration**: The file paths are hardcoded relative to the `data_files` directory.
4. **Execution**: The script logs the parsed data for each file format when run.

## Integration Points

- **Node.js**: Integration happens in the `getFilePath` function, which dynamically resolves file paths for the `data_files` directory.
- **Python**: Integration is achieved through hardcoded relative paths in the `if __name__ == "__main__"` block.

## Pros and Cons

### Pros
- **Multi-Language Support**: Demonstrates the ability to parse data using both Node.js and Python.
- **Comprehensive Parsing**: Supports multiple data formats (TXT, JSON, YAML, XML, CSV).
- **Modular Design**: Each parser is self-contained and easy to extend.

### Cons
- **Hardcoded Paths**: The Python implementation uses hardcoded relative paths, which may break if the directory structure changes.
- **Error Handling**: Limited error handling in both implementations; parsing errors may crash the program.
- **Asynchronous Complexity**: The Node.js implementation uses asynchronous functions for XML and CSV parsing, which may complicate debugging.

## How to Run

### Node.js
1. Navigate to the `parser_node` directory:
   ```powershell
   cd parser_node
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Run the parser:
   ```powershell
   node DataParser.js
   ```

### Python
1. Navigate to the `parser_python` directory:
   ```powershell
   cd parser_python
   ```
2. Install dependencies:
   ```powershell
   pip install pyyaml
   ```
3. Run the parser:
   ```powershell
   python DataParser.py
   ```

## Future Improvements
- Add robust error handling for all parsers.
- Use configuration files to manage file paths dynamically.
- Implement unit tests to validate parsing logic.
- Provide a unified interface to switch between Node.js and Python parsers.
