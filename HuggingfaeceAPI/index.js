const express = require('express');
const app = express();

app.use(express.json());

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B",
        {
            headers: {
                Authorization: "Bearer XXX",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();
    return result;
}

app.post("/query", async (req, res) => {
    const data = req.body;
    try {
        const result = await query(data);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000);