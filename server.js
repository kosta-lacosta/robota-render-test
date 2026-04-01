const express = require('express');
const { testRobotaLogin } = require('./robota');

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

app.post('/sync/robota', async (req, res) => {
  try {
    const secret = req.headers['x-hr-secret'];

    if (process.env.HR_SECRET && secret !== process.env.HR_SECRET) {
      return res.status(403).json({ ok: false, error: 'forbidden' });
    }

    const result = await testRobotaLogin();
    return res.json(result);
  } catch (e) {
    console.error('sync/robota error:', e);
    return res.status(500).json({
      ok: false,
      error: e.message
    });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
