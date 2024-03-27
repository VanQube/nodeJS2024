import url from 'url';
import uuidv4 from 'uuid/v4.js';

let users = [];

export const  handleUsersRequest = (req, res) => {
    const method = req.method;
    const requestUrl = url.parse(req.url, true);
    const userId = requestUrl.pathname.split('/')[3];

    if (method === 'POST' && requestUrl.pathname === '/api/users') {
        createUser(req, res);
    } else if (method === 'GET' && requestUrl.pathname === '/api/users') {
        getUsers(req, res);
    } else if (method === 'DELETE' && requestUrl.pathname.startsWith('/api/users/')) {
        deleteUser(req, res, userId);
    } else if (method === 'GET' && requestUrl.pathname.startsWith('/api/users/') && requestUrl.pathname.endsWith('/hobbies')) {
        getUserHobbies(req, res, userId);
    } else if (method === 'PATCH' && requestUrl.pathname.startsWith('/api/users/') && requestUrl.pathname.endsWith('/hobbies')) {
        updateUserHobbies(req, res, userId);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }
}

const createUser = (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const user = JSON.parse(body);
        user.id = uuidv4();
        const links = {
            self: `/api/users/${user.id}`,
            hobbies: `/api/users/${user.id}/hobbies`
        };
        users.push({user, links});
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({data: {user, links}}));
    });
}

const getUsers = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' });
    res.end(JSON.stringify({data: users}));
}

const deleteUser = (req, res, userId) => {
    const index = users.findIndex(user => user.user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: {success: true}, error: null }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: null, error: `User with id ${userId} doesn't exist` }));
    }
}

const getUserHobbies = (req, res, userId) => {
    const user = users.find(user => user.user.id === userId);
    if (user) {
        const links = {
            self: `/api/users/${userId}`,
            hobbies: `/api/users/${userId}/hobbies`
        };
        res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'private, max-age=3600' });
        res.end(JSON.stringify({ data: {hobbies: user.hobbies ?? [], links}, error: null }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: null, error: `User with id ${userId} doesn't exist` }));
    }
}

const updateUserHobbies = (req, res, userId) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const newHobbies = JSON.parse(body).hobbies;

        const user = users.find(user => user.user.id === userId);
        if (user) {
            if (!user.hobbies) {
                user.hobbies = [];
            }

            user.hobbies = Array.from(new Set([...user.hobbies, ...newHobbies]));

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ data: user, error: null }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ data: null, error: `User with id ${userId} doesn't exist` }));
        }
    });
}
