const fs = require("fs");
const yaml = require("js-yaml");
const xml2js = require("xml2js");
const csv = require("csv-parser");
const path = require("path"); // Hjælper med korrekte filstier

// Funktion til at generere den rigtige sti til filerne
const getFilePath = (filename) => path.join(__dirname, "../data_files", filename);
// Here happens the integration: Resolving file paths dynamically for data files

// Læs TXT-fil
const readTxt = () => fs.readFileSync(getFilePath("data.txt"), "utf8");
// Here happens the integration: Reading TXT file from the resolved path

// Læs JSON-fil
const readJson = () => JSON.parse(fs.readFileSync(getFilePath("data.json"), "utf8"));
// Here happens the integration: Reading and parsing JSON file from the resolved path

// Læs YAML-fil
const readYaml = () => yaml.load(fs.readFileSync(getFilePath("data.yaml"), "utf8"));
// Here happens the integration: Reading and parsing YAML file from the resolved path

// Læs XML-fil (async fordi det bruger en parser)
const readXml = async () => {
    const data = fs.readFileSync(getFilePath("data.xml"), "utf8");
    // Here happens the integration: Reading XML file from the resolved path
    return new Promise((resolve, reject) => {
        xml2js.parseString(data, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// Læs CSV-fil (async)
const readCsv = async () => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(getFilePath("data.csv"))
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (err) => reject(err));
    });
    // Here happens the integration: Reading and parsing CSV file from the resolved path
};

// MAIN: Kør parseren
const main = async () => {
    try {
        console.log("TXT Data:", readTxt());
        console.log("JSON Data:", readJson());
        console.log("YAML Data:", readYaml());
        console.log("XML Data:", await readXml());
        console.log("CSV Data:", await readCsv());
    } catch (err) {
        console.error("Fejl:", err.message);
    }
};

main();
