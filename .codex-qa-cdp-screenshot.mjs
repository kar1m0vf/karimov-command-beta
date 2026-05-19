import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9433;
const cwd = process.cwd();
const userDataDir = join(cwd, `.chrome-cdp-${port}`);

const chrome = spawn(
  chromePath,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    '--window-size=1440,1100',
    `--user-data-dir=${userDataDir}`,
    'http://localhost:5173/?skipBoot=1'
  ],
  { stdio: 'ignore' }
);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(path) {
  let lastError;
  for (let index = 0; index < 80; index += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}${path}`);
      if (response.ok) return response.json();
    } catch (error) {
      lastError = error;
    }
    await wait(100);
  }
  throw lastError ?? new Error(`CDP endpoint ${path} did not respond`);
}

async function connect(url) {
  const socket = new WebSocket(url);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const payload = JSON.parse(event.data);
    if (!payload.id || !pending.has(payload.id)) return;
    const { resolve, reject } = pending.get(payload.id);
    pending.delete(payload.id);
    if (payload.error) reject(new Error(payload.error.message));
    else resolve(payload.result);
  });

  return {
    send(method, params = {}) {
      const commandId = (id += 1);
      socket.send(JSON.stringify({ id: commandId, method, params }));
      return new Promise((resolve, reject) => pending.set(commandId, { resolve, reject }));
    },
    close() {
      socket.close();
    }
  };
}

async function main() {
  const pages = await getJson('/json');
  const page = pages.find((item) => item.type === 'page');
  if (!page) throw new Error('No debuggable page found');

  const cdp = await connect(page.webSocketDebuggerUrl);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await wait(5500);

  for (const sectionId of ['experiments', 'system']) {
    await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const target = document.getElementById('${sectionId}');
          if (!target) return false;
          if (window.commandLenis) {
            window.commandLenis.scrollTo(target, { immediate: true, offset: -104 });
          } else {
            window.scrollTo({ top: Math.max(0, target.offsetTop - 104), behavior: 'instant' });
          }
          return true;
        })()
      `,
      awaitPromise: true
    });
    await wait(1400);
    const screenshot = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });
    writeFileSync(join(cwd, `qa-cdp-${sectionId}.png`), Buffer.from(screenshot.data, 'base64'));
  }

  cdp.close();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    chrome.kill('SIGTERM');
  });
