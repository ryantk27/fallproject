const Database = require('better-sqlite3');
const db = new Database('database.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS phishing_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL UNIQUE
  )
`);

function checkUrl(url) {
  const stmt = db.prepare('SELECT * FROM phishing_links WHERE url = ?');
  return stmt.get(url);
}

function addPhishingUrl(url) {
  const stmt = db.prepare('INSERT OR IGNORE INTO phishing_links (url) VALUES (?)');
  const result = stmt.run(url);
  return result.lastInsertRowid;
}

function getAllPhishingUrls() {
  const stmt = db.prepare('SELECT * FROM phishing_links');
  return stmt.all();
}

module.exports = { checkUrl, addPhishingUrl, getAllPhishingUrls };
