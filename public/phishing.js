const checkForm = document.getElementById('checkForm');
const linkInput = document.getElementById('linkInput');
const result = document.getElementById('result');

const addForm = document.getElementById('addForm');
const addLinkInput = document.getElementById('addLinkInput');
const urlList = document.getElementById('urlList');

checkForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const response = await fetch('/api/phishing/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: linkInput.value })
  });

  const data = await response.json();

  result.textContent = data.message;
  result.style.color = data.isPhishing ? 'red' : 'green';
});

addForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  await fetch('/api/phishing/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: addLinkInput.value })
  });

  addLinkInput.value = '';
  loadUrls();
});

async function loadUrls() {
  const response = await fetch('/api/phishing/all');
  const urls = await response.json();

  urlList.innerHTML = '';
  urls.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry.url;
    urlList.appendChild(li);
  });
}

loadUrls();