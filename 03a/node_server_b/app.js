import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import csv from 'csv-parser';
import { parseString } from 'xml2js';
import axios from 'axios'; // Import axios til at hente data fra FastAPI

const app = express();
const port = 8080;

// Root route
// Return: JSON-objekt med besked (object med key 'message')
app.get('/', (req, res) => {
    res.send({ message: 'Velkommen til Express Data Server' });
});

// Læs TXT
// Return: JSON-objekt med key 'txt' og value som string (hele filens indhold)
app.get('/txt', (req, res) => {
    fs.readFile('data_files/data.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Fejl ved læsning af TXT-fil');
        res.send({ txt: data });
    });
});

// Læs JSON
// Return: JSON-objekt (object parsed fra data.json)
app.get('/json', (req, res) => {
    fs.readFile('data_files/data.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Fejl ved læsning af JSON-fil');
        res.json(JSON.parse(data));
    });
});

// Læs YAML
// Return: JSON-objekt (object parsed fra data.yaml)
app.get('/yaml', (req, res) => {
    fs.readFile('data_files/data.yaml', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Fejl ved læsning af YAML-fil');
        res.json(yaml.load(data));
    });
});

// Læs XML
// Return: JSON-objekt (object parsed fra data.xml, struktur afhænger af xml2js)
// parseString: Parser XML-string til et JavaScript-objekt (converterer XML til JS object)
app.get('/xml', (req, res) => {
    fs.readFile('data_files/data.xml', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Fejl ved læsning af XML-fil');
        parseString(data, (err, result) => {
            if (err) return res.status(500).send('Fejl ved parsing af XML');
            res.json(result);
        });
    });
});

// Læs CSV
// Return: Array af objekter (hver række i CSV som et object med key/value)
// fs.createReadStream: Åbner og streamer filen linje for linje (bruger mindre hukommelse ved store filer)
app.get('/csv', (req, res) => {
    const results = [];
    fs.createReadStream('data_files/data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => res.json(results));
});

// **Hent data fra FastAPI (Server A)**
// Integration point: This endpoint fetches data from the FastAPI server's `/read-json` endpoint using axios.
// Return: JSON-objekt (object fra FastAPI's /read-json endpoint)
app.get('/from-fastapi', async (req, res) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/read-json'); // Skift endpoint hvis nødvendigt
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Fejl ved hentning af data fra FastAPI');
    }
});

app.listen(port, () => {
    console.log(`🚀 Server kører på http://localhost:${port}`);
});
