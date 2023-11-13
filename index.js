const express = require('express');
const cors = require('cors')
const path = require('path')

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'frontend/dist')))

const PORT = process.env.PORT || 3001;

app.get('/api', (req, res) => {
    console.log('requested')
    res.json({ message: "Hello from Express!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));