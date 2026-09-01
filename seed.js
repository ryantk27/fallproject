const fs = require('fs');
const { parse } = require('csv-parse/sync');
const Database = require('better-sqlite3');

const db = new Database('database.db');

// Make sure the table exists (in case this runs before server.js ever has)
db.exec(`
  CREATE TABLE IF NOT EXISTS phishing_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL UNIQUE
  )
`);

// Read the CSV file as raw text
const fileContent = fs.readFileSync('daba/Phishing Urls.csv', 'utf8');

// Parse it into an array of objects, using the header row as keys
const records = parse(fileContent, {
  columns: true,        // treat first row as column names
  skip_empty_lines: true,
  trim: true
});

console.log(`Found ${records.length} rows in the CSV.`);

// Prepare the insert statement once, reuse it for every row (much faster)
const insertStmt = db.prepare('INSERT OR IGNORE INTO phishing_links (url) VALUES (?)');

let inserted = 0;

for (const row of records) {
  const url = row.url; // <-- change 'url' here if your column is named differently

  if (url) {
    const result = insertStmt.run(url.trim());
    if (result.changes > 0) inserted++;
  }
}

console.log(`Inserted ${inserted} new URLs into the database.`);
console.log('Done!');
