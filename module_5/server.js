import http from 'http';
import { handleUsersRequest } from './users.js';

export const server = http.createServer((req, res) => {
    if (req.url.startsWith('/api/users')) {
        handleUsersRequest(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }
});

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
