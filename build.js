const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacements = {
  '__FIREBASE_API_KEY__':            process.env.FIREBASE_API_KEY,
  '__FIREBASE_AUTH_DOMAIN__':        process.env.FIREBASE_AUTH_DOMAIN,
  '__FIREBASE_PROJECT_ID__':         process.env.FIREBASE_PROJECT_ID,
  '__FIREBASE_STORAGE_BUCKET__':     process.env.FIREBASE_STORAGE_BUCKET,
  '__FIREBASE_MESSAGING_SENDER_ID__':process.env.FIREBASE_MESSAGING_SENDER_ID,
  '__FIREBASE_APP_ID__':             process.env.FIREBASE_APP_ID,
  '__GEMINI_API_KEY__':              process.env.GEMINI_API_KEY,
};

for (const [token, value] of Object.entries(replacements)) {
  html = html.replaceAll(token, JSON.stringify(value || ''));
}

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('Build complete → dist/index.html');    