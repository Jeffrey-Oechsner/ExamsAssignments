import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import csv from 'csv-parser';
import { parseString } from 'xml2js';
import axios from 'axios'; // Import axios til at hente data fra FastAPI

const app = express();
const port = 8080;

// Root route
app.get('/', (req, res) => {
    res.send({ message: 'Velkommen til Express Data Server' });
});

// 📌 Læs TXT
app.get('/txt', (req, res) => {
    fs.readFile('data_files/data.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Fejl ved læsning af TXT-fil');
        res.send({ txt: data });
    });
});

// 📌 Læs JSON
app.get('/json', (req, res) => {
    fs.readFile('data_files/data.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Fejl ved læsning af JSON-fil');
        res.json(JSON.parse(data));
    });
});

// 📌 Læs YAML
app.get('/yaml', (req, res) => {
    fs.readFile('data_files/data.yaml', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Fejl ved læsning af YAML-fil');
        res.json(yaml.load(data));
    });
});

// 📌 Læs XML
app.get('/xml', (req, res) => {
    fs.readFile('data_files/data.xml', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Fejl ved læsning af XML-fil');
        parseString(data, (err, result) => {
            if (err) return res.status(500).send('Fejl ved parsing af XML');
            res.json(result);
        });
    });
});

// 📌 Læs CSV
app.get('/csv', (req, res) => {
    const results = [];
    fs.createReadStream('data_files/data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => res.json(results));
});

// 📌 **Hent data fra FastAPI (Server A)**
// Integration point: This endpoint fetches data from the FastAPI server's `/read-json` endpoint using axios.
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
