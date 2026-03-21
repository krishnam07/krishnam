const http = require('http');
const { spawn } = require('child_process');

const port = process.env.BACKEND_PORT || '5000';
const healthUrl = `http://localhost:${port}/api/health`;

function requestHealth(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body || '{}');
          resolve({ ok: res.statusCode === 200 && parsed.ok === true, status: res.statusCode });
        } catch {
          resolve({ ok: false, status: res.statusCode });
        }
      });
    });

    req.on('error', () => {
      resolve({ ok: false, status: 0 });
    });

    req.setTimeout(2000, () => {
      req.destroy();
      resolve({ ok: false, status: 0 });
    });
  });
}

async function main() {
  const health = await requestHealth(healthUrl);

  if (health.ok) {
    // Backend is already up; treat as success so register can continue.
    console.log(`Backend already running at ${healthUrl}`);
    process.exit(0);
  }

  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const child = spawn(`${npmCmd} --prefix backend start`, {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      PORT: port,
    },
  });

  child.on('exit', (code) => {
    process.exit(code == null ? 1 : code);
  });
}

main();
