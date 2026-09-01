const phishingModel = require('../models/phishingModel');

function checkUrl(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const match = phishingModel.checkUrl(url);

  if (match) {
    res.json({ url, isPhishing: true, message: '⚠️ This link IS in our phishing database.' });
  } else {
    res.json({ url, isPhishing: false, message: '✅ This link was NOT found in our phishing database.' });
  }
}

function addUrl(req, res) {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  const id = phishingModel.addPhishingUrl(url);
  res.json({ id, url });
}

function getAllUrls(req, res) {
  const urls = phishingModel.getAllPhishingUrls();
  res.json(urls);
}

module.exports = { checkUrl, addUrl, getAllUrls };
