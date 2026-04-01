const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('robota render test ok');
});

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'robota-render-test',
    time: new Date().toISOString()
  });
});

app.post('/sync/robota', (req, res) => {
  const secret = req.headers['x-hr-secret'];

  if (process.env.HR_SECRET && secret !== process.env.HR_SECRET) {
    return res.status(403).json({ ok: false, error: 'forbidden' });
  }

  return res.json({
    ok: true,
    message: 'test sync endpoint works',
    body: req.body || null
  });
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});