import { EventEmitter } from "./task_1.js";
import fetch from "node-fetch";

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.on('data', (data) => console.log('Received data:', data));
    this.on('error', (error) => console.log('Error occurred:', error));
    try {
        this.emit('begin');
        const start = Date.now();
        const result = await asyncFunc(...args);
        const end = Date.now();
        this.emit('data', result);
        this.emit('end', end - start);
    }
    catch(error) {
        this.emit('error', error);
    }
  }
}

const fetchFromUrl = async (url, cb) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return await response.json();
};

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));

withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/1");

console.log(withTime.rawListeners("end"));
