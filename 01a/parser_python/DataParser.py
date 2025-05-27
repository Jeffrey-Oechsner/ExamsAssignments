import json
import yaml
import xml.etree.ElementTree as ET
import csv

def read_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()
    # Here happens the integration: Reading TXT file from the provided path

def read_json(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)
    # Here happens the integration: Reading and parsing JSON file from the provided path

def read_yaml(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return yaml.safe_load(file)
    # Here happens the integration: Reading and parsing YAML file from the provided path

def read_xml(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()
    return {child.tag: child.text for child in root}
    # Here happens the integration: Reading and parsing XML file from the provided path

def read_csv(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        return [row for row in reader]
    # Here happens the integration: Reading and parsing CSV file from the provided path

if __name__ == "__main__":
    print("TXT Data:", read_txt("../data_files/data.txt"))
    print("JSON Data:", read_json("../data_files/data.json"))
    print("YAML Data:", read_yaml("../data_files/data.yaml"))
    print("XML Data:", read_xml("../data_files/data.xml"))
    print("CSV Data:", read_csv("../data_files/data.csv"))
