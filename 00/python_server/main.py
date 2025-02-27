from fastapi import FastAPI, HTTPException
import json
import csv
import yaml
import xml.etree.ElementTree as ET
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
    file_path = DATA_DIR / "data.json"
    check_file_exists(file_path)
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data


@app.get("/read-csv")
def read_csv_file():
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
    file_path = DATA_DIR / "data.yaml"
    check_file_exists(file_path)
    with open(file_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)
    return data


@app.get("/read-xml")
def read_xml_file():
    file_path = DATA_DIR / "data.xml"
    check_file_exists(file_path)
    tree = ET.parse(file_path)
    root = tree.getroot()

    # Convert XML data to a dictionary
    def xml_to_dict(element):
        return {child.tag: child.text for child in element}

    data = [xml_to_dict(child) for child in root]
    return data
