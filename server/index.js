const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post('/search', (req, res) => {
  const { query, sites } = req.body;
  if (!query || !Array.isArray(sites)) {
    return res.status(400).json({ detail: 'Missing query or sites' });
  }

  const results = sites.map(site => ({
    title: `Result for "${query}"`,
    url: `${site}/search?q=${encodeURIComponent(query)}`,
    snippet: `Sample result from ${site} for query "${query}".`,
    source: site
  }));

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
