const fs = require('fs');
const path = require('path');

class DetailedHtmlReporter {
  constructor(globalConfig, options = {}) {
    this.globalConfig = globalConfig;
    this.options = options;
  }

  onRunComplete(_, aggregatedResult) {
    const outputFile = this.options.outputFile || 'coverage/test-report.html';
    const title = this.options.title || 'Jest Detailed Test Report';
    const resolvedOutput = resolveOutputFile(outputFile, this.globalConfig.rootDir);
    const rows = [];

    for (const suite of aggregatedResult.testResults) {
      for (const assertion of suite.testResults) {
        rows.push({
          file: path.relative(process.cwd(), suite.testFilePath),
          title: assertion.fullName,
          status: assertion.status,
          duration: assertion.duration || 0,
          failureMessages: assertion.failureMessages || []
        });
      }
    }

    const summary = {
      suites: aggregatedResult.numTotalTestSuites,
      passedSuites: aggregatedResult.numPassedTestSuites,
      failedSuites: aggregatedResult.numFailedTestSuites,
      tests: aggregatedResult.numTotalTests,
      passed: aggregatedResult.numPassedTests,
      failed: aggregatedResult.numFailedTests,
      pending: aggregatedResult.numPendingTests,
      runtimeSeconds: ((Date.now() - aggregatedResult.startTime) / 1000).toFixed(2)
    };

    fs.mkdirSync(path.dirname(resolvedOutput), { recursive: true });
    fs.writeFileSync(resolvedOutput, renderHtml(title, summary, rows), 'utf8');
  }
}

function resolveOutputFile(outputFile, rootDir) {
  const expanded = outputFile.replace(/^<rootDir>[\\/]/, `${rootDir}${path.sep}`);
  return path.resolve(expanded);
}

function renderHtml(title, summary, rows) {
  const failedRows = rows.filter((row) => row.status === 'failed').length;
  const passRate = summary.tests > 0 ? ((summary.passed / summary.tests) * 100).toFixed(1) : '0.0';

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f7f8fa;
      --panel: #ffffff;
      --text: #17202a;
      --muted: #687381;
      --border: #d9dee5;
      --pass: #1f8a4c;
      --fail: #c53030;
      --pending: #8a6d1f;
      --chip: #eef2f6;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: "Segoe UI", Arial, sans-serif;
      line-height: 1.45;
    }
    header {
      padding: 28px 32px 18px;
      background: var(--panel);
      border-bottom: 1px solid var(--border);
    }
    h1 { margin: 0 0 8px; font-size: 26px; font-weight: 700; }
    .subtitle { color: var(--muted); margin: 0; }
    main { padding: 24px 32px 40px; }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }
    .metric {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
    }
    .metric strong {
      display: block;
      font-size: 24px;
      margin-bottom: 4px;
    }
    .metric span { color: var(--muted); font-size: 13px; }
    .toolbar {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 14px;
    }
    input, select {
      height: 36px;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 0 10px;
      background: var(--panel);
      color: var(--text);
    }
    input { min-width: min(420px, 100%); flex: 1; }
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
    }
    th, td {
      padding: 11px 12px;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
      text-align: left;
      font-size: 14px;
    }
    th {
      background: #f0f3f7;
      font-size: 12px;
      text-transform: uppercase;
      color: var(--muted);
      letter-spacing: .04em;
    }
    tr:last-child td { border-bottom: 0; }
    .status {
      display: inline-flex;
      min-width: 72px;
      justify-content: center;
      border-radius: 999px;
      padding: 4px 8px;
      font-weight: 700;
      font-size: 12px;
      color: #fff;
    }
    .passed { background: var(--pass); }
    .failed { background: var(--fail); }
    .pending, .todo, .skipped, .disabled { background: var(--pending); }
    .file { color: var(--muted); font-family: Consolas, monospace; font-size: 12px; }
    details { margin-top: 8px; }
    pre {
      white-space: pre-wrap;
      overflow-x: auto;
      background: #20242a;
      color: #f2f4f8;
      padding: 12px;
      border-radius: 6px;
      font-size: 12px;
    }
    .empty {
      padding: 24px;
      color: var(--muted);
      text-align: center;
    }
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(title)}</h1>
    <p class="subtitle">Generado el ${escapeHtml(new Date().toLocaleString())}</p>
  </header>
  <main>
    <section class="summary" aria-label="Resumen">
      ${metric('Suites', `${summary.passedSuites}/${summary.suites}`, `${summary.failedSuites} fallidas`)}
      ${metric('Tests', `${summary.passed}/${summary.tests}`, `${summary.failed} fallidos, ${summary.pending} pendientes`)}
      ${metric('Pass rate', `${passRate}%`, `${failedRows} casos con error`)}
      ${metric('Duración', `${summary.runtimeSeconds}s`, 'tiempo total de ejecución')}
    </section>
    <section class="toolbar" aria-label="Filtros">
      <input id="search" type="search" placeholder="Filtrar por nombre o archivo">
      <select id="status">
        <option value="">Todos los estados</option>
        <option value="passed">Pasados</option>
        <option value="failed">Fallidos</option>
        <option value="pending">Pendientes</option>
      </select>
    </section>
    <table>
      <thead>
        <tr>
          <th>Estado</th>
          <th>Prueba</th>
          <th>Archivo</th>
          <th>Duración</th>
        </tr>
      </thead>
      <tbody id="results">
        ${rows.map(renderRow).join('\n')}
      </tbody>
    </table>
    <div id="empty" class="empty" hidden>No hay resultados para ese filtro.</div>
  </main>
  <script>
    const search = document.getElementById('search');
    const status = document.getElementById('status');
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    const empty = document.getElementById('empty');

    function applyFilters() {
      const query = search.value.toLowerCase();
      const selected = status.value;
      let visible = 0;

      for (const row of rows) {
        const matchesText = row.dataset.search.includes(query);
        const matchesStatus = !selected || row.dataset.status === selected;
        const show = matchesText && matchesStatus;
        row.hidden = !show;
        if (show) visible += 1;
      }

      empty.hidden = visible !== 0;
    }

    search.addEventListener('input', applyFilters);
    status.addEventListener('change', applyFilters);
  </script>
</body>
</html>`;
}

function metric(label, value, hint) {
  return `<article class="metric"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)} - ${escapeHtml(hint)}</span></article>`;
}

function renderRow(row) {
  const normalizedStatus = row.status === 'passed' ? 'passed' : row.status === 'failed' ? 'failed' : 'pending';
  const failures = row.failureMessages.length
    ? `<details><summary>Ver error</summary><pre>${escapeHtml(row.failureMessages.join('\n\n'))}</pre></details>`
    : '';
  const search = `${row.title} ${row.file} ${row.status}`.toLowerCase();

  return `<tr data-status="${escapeHtml(normalizedStatus)}" data-search="${escapeHtml(search)}">
    <td><span class="status ${escapeHtml(normalizedStatus)}">${escapeHtml(row.status)}</span></td>
    <td>${escapeHtml(row.title)}${failures}</td>
    <td class="file">${escapeHtml(row.file)}</td>
    <td>${escapeHtml(String(row.duration))} ms</td>
  </tr>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = DetailedHtmlReporter;
