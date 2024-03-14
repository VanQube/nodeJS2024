import csv from "csvtojson";
import fs from "fs";

const csvFilePath = 'csv/nodejs-hw1-ex1.csv';
const txtFilePath = 'csv/text.txt';

const writeStream = fs.createWriteStream(txtFilePath);

const convertCSVtoJSON = () => {
    csv()
        .fromFile(csvFilePath)
        .subscribe((jsonObj) => {
            const { Book, Author, Price } = jsonObj;
            const line = JSON.stringify({ Book, Author, Price}) + '\n';
            writeStream.write(line, (error) => {
                if (error) {
                    console.log('Error writing to this file:', error);
                }
            });
        })
        .on('done', (error) => {
            if (error) {
                console.log('Error reading CSV file:', error);
            } else {
                console.log('CSV to JSON conversion completed successfully.');
            }

            writeStream.end();
        })
};

convertCSVtoJSON();