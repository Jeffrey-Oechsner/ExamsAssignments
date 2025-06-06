from fastapi import FastAPI, HTTPException
import json
import csv
import yaml
import xml.etree.ElementTree as ET
import requests
from pathlib import Path

app = FastAPI()

# Base path for data files
DATA_DIR = Path("./data_files")


# Utility function to check if file exists
def check_file_exists(file_path):
    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"File {file_path.name} not found")


@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Data Reader!"}


@app.get("/read-json")
def read_json_file():
    # Return: dict (Python dictionary)
    file_path = DATA_DIR / "data.json"
    check_file_exists(file_path)
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data


@app.get("/read-csv")
def read_csv_file():
    # Return: list af dicts (liste af Python dictionaries)
    file_path = DATA_DIR / "data.csv"
    check_file_exists(file_path)
    data = []
    with open(file_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            data.append(row)
    return data


@app.get("/read-yaml")
def read_yaml_file():
    # Return: dict (Python dictionary)
    file_path = DATA_DIR / "data.yaml"
    check_file_exists(file_path)
    with open(file_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)
    return data


@app.get("/read-xml")
def read_xml_file():
    # Return: list af dicts (liste af Python dictionaries)
    file_path = DATA_DIR / "data.xml"
    check_file_exists(file_path)
    tree = ET.parse(file_path)
    root = tree.getroot()

    def xml_to_dict(element):
        return {child.tag: child.text for child in element}

    data = [xml_to_dict(child) for child in root]
    return data


# Route til at læse en TXT-fil
@app.get("/read-txt")
def read_txt_file():
    # Return: dict med key 'txt' og value som string
    file_path = DATA_DIR / "data.txt"
    check_file_exists(file_path)
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    return {"txt": content}


# Hent data fra `node_server_b`
# her sker integration - fordi denne route bruger requests til at hente data fra Node.js-serverens /json-endpoint og returnerer det til klienten
@app.get("/from-node") # her sker integration
def get_from_node():
    # Return: dict (Python dictionary) – med nøgler og værdier fra Node.js-serveren
    try:
        response = requests.get("http://127.0.0.1:8080/json")
        return response.json()
    except Exception as e:
        return {"error": str(e)}

