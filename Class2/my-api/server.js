const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.end("Welcome to my API");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

const fs = require('fs').promises;
const path = require('path');
const DATA_FILE = path.join(__dirname, 'data', 'data.json');

const readData = async () => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeData = async (data) => {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

app.get('/data', async (req, res) => {
    const data = await readData();
    res.json(data);
});

app.post('/data', async (req, res) => {
    const newData = req.body;
    const data = await readData();
    const newID = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
    const newItem = { id: newID, ...newData };
    data.push(newItem);
    await writeData(data);
    res.json({ message: 'write data success', data: newItem });
});

app.put('/data/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const updateData = req.body;
    const data = await readData();
    const index = data.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Không tìm thấy dữ liệu" });
    }
    data[index] = { ...data[index], ...updateData };
    await writeData(data);
    res.json({
        message: "Cập nhật thành công", data: data[index]
    });
});

app.delete('/data/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await readData();
    const newData = data.filter(item => item.id !== id);

    if (data.length === newData.length) {
        return res.status(404).json({ message: "Không tìm thấy dữ liệu " });
    }
    await writeData(newData);
    res.json({ message: "Xóa thành công" });
});

