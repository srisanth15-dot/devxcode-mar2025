const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { message } = require('statuses');
const app = express();
const PORT = 3000;

// Enable CORS (authenification of frontend)
app.use(cors()); // use {} here when done to give origin(website name, methods and post)
app.use(express.json());

// Load JSON data
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Get (sends data to frontend)
app.get('/api/data', (req, res) => {
    res.json(data);
});

// Post (to get data)
app.post('/api/data', (req, res) => {
    const newdata = req.body;
    const exists = data.some(item => item.id == newdata.id);
    if (exists) {
        return res.json({ message: "duplicate data. cannot add" })
    }
    data.push(newdata);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json({ message: "data successfully added" });
});

// Put (to update data)
app.put('/api/data', (req, res) => {

});

// To start server
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
