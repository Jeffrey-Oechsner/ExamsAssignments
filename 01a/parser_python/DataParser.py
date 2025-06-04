import json
import yaml
import xml.etree.ElementTree as ET
import csv

def read_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read() # her sker integration: læser og integrerer indholdet af tekstfilen i systemet

def read_json(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file) # her sker integration: læser og parser JSON-filen, så data kan bruges i Python

def read_yaml(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return yaml.safe_load(file) # her sker integration: læser og parser YAML-filen

def read_xml(file_path):
    tree = ET.parse(file_path) # her sker integration: læser og parser XML-filen fra filsystemet
    root = tree.getroot()
    return {child.tag: child.text for child in root}

def read_csv(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        return [row for row in reader] # her sker integration: læser og parser CSV-filen til Python-objekter

if __name__ == "__main__":
    print("TXT Data:", read_txt("../data_files/data.txt"))
    print("JSON Data:", read_json("../data_files/data.json"))
    print("YAML Data:", read_yaml("../data_files/data.yaml"))
    print("XML Data:", read_xml("../data_files/data.xml"))
    print("CSV Data:", read_csv("../data_files/data.csv"))
