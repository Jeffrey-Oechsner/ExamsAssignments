import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import csv from 'csv-parser';
import { parseString } from 'xml2js';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send({data: 'Root route'});
    });

app.get('/', (req, res) => {
        res.send({ txt: data });
    });

// Læs TXT
app.get('/txt', (req, res) => {
    fs.readFile('data_files/data.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Fejl ved læsning af TXT-fil');
        res.send({ txt: data });
    });
});

// Læs JSON
app.get('/json', (req, res) => {
    fs.readFile('data_files/data.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Fejl ved læsning af JSON-fil');
        res.json(JSON.parse(data));
    });
});

// Læs YAML
app.get('/yaml', (req, res) => {
    fs.readFile('data_files/data.yaml', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Fejl ved læsning af YAML-fil');
        res.json(yaml.load(data));
    });
});

// Læs XML
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
app.get('/csv', (req, res) => {
    const results = [];
    fs.createReadStream('data_files/data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => res.json(results));
});

app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
});
