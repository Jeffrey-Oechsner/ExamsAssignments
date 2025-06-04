const fs = require("fs");
const yaml = require("js-yaml");
const xml2js = require("xml2js");
const csv = require("csv-parser");
const path = require("path"); // Hjælper med korrekte filstier

// Funktion til at generere den rigtige sti til filerne
const getFilePath = (filename) => path.join(__dirname, "../data_files", filename); // integration sker her: dynamisk filstihåndtering, så alle parser-funktioner kan finde de rigtige datafiler

// Læs TXT-fil
const readTxt = () => fs.readFileSync(getFilePath("data.txt"), "utf8"); // integration sker her: læser og integrerer indholdet af tekstfilen i systemet

// Læs JSON-fil
const readJson = () => JSON.parse(fs.readFileSync(getFilePath("data.json"), "utf8")); // integration sker her: læser og parser JSON-filen, så data kan bruges i JavaScript

// Læs YAML-fil
const readYaml = () => yaml.load(fs.readFileSync(getFilePath("data.yaml"), "utf8")); // integration sker her: læser og parser YAML-filen

// Læs XML-fil (async fordi det bruger en parser)
const readXml = async () => {
    const data = fs.readFileSync(getFilePath("data.xml"), "utf8"); // integration sker her: læser XML-filen fra filsystemet
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
        fs.createReadStream(getFilePath("data.csv")) // integration sker her: læser CSV-filen fra filsystemet
            .pipe(csv()) // integration sker her: parser CSV-data til JavaScript-objekter
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (err) => reject(err));
    });
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
