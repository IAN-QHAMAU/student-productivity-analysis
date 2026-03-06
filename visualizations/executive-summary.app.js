const summaryData = {
  title: "Student Productivity & Exam Performance",
  dataset: {
    rows: "5,000",
    cols: "21",
    missing: "0",
  },
  averages: {
    study: "4.54",
    sleep: "7.02",
    screen: "6.98",
    productivity: "37.27",
    exam: "18.80",
    burnout: "45.62",
  },
  focusExamGap: "+23.49",
  burnoutExamGap: "+12.80",
  positiveSignals: [
    { name: "productivity_score", value: 0.886 },
    { name: "focus_index", value: 0.75 },
    { name: "mental_health_score", value: 0.547 },
    { name: "study_hours", value: 0.513 },
  ],
  negativeSignals: [
    { name: "burnout_level", value: -0.408 },
    { name: "upcoming_deadline", value: -0.215 },
    { name: "part_time_job", value: -0.15 },
    { name: "screen_time_hours", value: -0.132 },
  ],
};

const css = `
  :root {
    --bg:        #0b0f1a;
    --surface:   #111624;
    --surface-2: #161c2e;
    --border:    rgba(255,255,255,0.07);
    --border-hi: rgba(255,255,255,0.13);
    --text:      #e8ecf5;
    --muted:     #7a87a4;
    --gold:      #c9a84c;
    --gold-dim:  rgba(201,168,76,0.15);
    --blue:      #4a7fe0;
    --blue-dim:  rgba(74,127,224,0.12);
    --red:       #d06b5a;
    --red-dim:   rgba(208,107,90,0.12);
    --radius:    10px;
    --radius-lg: 16px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.55;
  }

  .wrap {
    max-width: 1140px;
    margin: 0 auto;
    padding: 40px 24px 60px;
    display: grid;
    gap: 16px;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 24px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 28px;
    margin-bottom: 4px;
    animation: fadeUp 0.6s ease both;
  }

  .eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }

  h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    font-weight: 400;
    line-height: 1.15;
    color: var(--text);
    max-width: 22ch;
  }

  h1 em {
    font-style: italic;
    color: var(--gold);
  }

  .header-meta {
    color: var(--muted);
    font-size: 0.88rem;
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--muted); display: inline-block; }

  .header-side {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 18px 22px;
    min-width: 240px;
  }

  .header-side h3 {
    font-size: 0.78rem;
    font-family: 'DM Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
    margin-bottom: 10px;
  }

  .header-side ul {
    list-style: none;
    display: grid;
    gap: 7px;
  }

  .header-side li {
    font-size: 0.84rem;
    color: var(--muted);
    padding-left: 14px;
    position: relative;
  }

  .header-side li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--gold);
    font-size: 0.8rem;
  }

  .kpi-strip {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  .kpi {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 14px;
    transition: border-color 0.2s, transform 0.2s;
    position: relative;
    overflow: hidden;
  }

  .kpi::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .kpi:hover { border-color: var(--border-hi); transform: translateY(-2px); }
  .kpi:hover::after { opacity: 1; }

  .kpi-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .kpi-value {
    font-size: 1.55rem;
    font-weight: 700;
    color: var(--text);
    line-height: 1;
  }

  .section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 24px 22px;
    animation: fadeUp 0.6s 0.2s ease both;
  }

  .section-title {
    font-family: 'DM Mono', monospace;
    font-size: 10.5px;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 18px;
  }

  .perf-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .perf-card {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px;
    transition: border-color 0.2s;
  }

  .perf-card:hover { border-color: var(--border-hi); }

  .perf-card h3 {
    font-size: 0.82rem;
    color: var(--muted);
    font-weight: 500;
    margin-bottom: 10px;
  }

  .big-num {
    font-family: 'DM Serif Display', serif;
    font-size: 2.8rem;
    font-weight: 400;
    line-height: 1;
    color: var(--text);
  }

  .big-num span {
    font-family: 'Outfit', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: var(--muted);
    margin-left: 4px;
  }

  .perf-sub {
    font-size: 0.82rem;
    color: var(--muted);
    margin-top: 6px;
  }

  .signals-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .signal-panel {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px;
  }

  .signal-panel h3 {
    font-size: 0.82rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .badge {
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 999px;
    font-weight: 500;
  }

  .badge-pos { background: var(--blue-dim); color: var(--blue); }
  .badge-neg { background: var(--red-dim); color: var(--red); }

  .corr-rows { display: grid; gap: 12px; }

  .corr-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.83rem;
    margin-bottom: 5px;
    color: var(--text);
  }

  .corr-name { color: var(--muted); }
  .corr-val { font-family: 'DM Mono', monospace; font-weight: 500; font-size: 0.8rem; }
  .corr-val.pos { color: var(--blue); }
  .corr-val.neg { color: var(--red); }

  .bar-track {
    height: 5px;
    border-radius: 999px;
    background: rgba(255,255,255,0.05);
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 1s cubic-bezier(0.4,0,0.2,1);
    width: 0;
  }

  .bar-fill.pos { background: linear-gradient(90deg, #3a6fd1, var(--blue)); }
  .bar-fill.neg { background: linear-gradient(90deg, #b8503f, var(--red)); }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .action-card {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    transition: border-color 0.25s, transform 0.25s;
    position: relative;
    overflow: hidden;
  }

  .action-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 100%;
    background: var(--gold-dim);
    transform: translateY(100%);
    transition: transform 0.3s ease;
    z-index: 0;
  }

  .action-card:hover { border-color: rgba(201,168,76,0.3); transform: translateY(-2px); }
  .action-card:hover::before { transform: translateY(70%); }

  .action-card > * { position: relative; z-index: 1; }

  .action-num {
    font-family: 'DM Serif Display', serif;
    font-size: 2.2rem;
    color: rgba(201,168,76,0.25);
    line-height: 1;
    margin-bottom: 10px;
  }

  .action-card h3 {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text);
  }

  .action-card p {
    font-size: 0.84rem;
    color: var(--muted);
    line-height: 1.55;
  }

  .action-card strong { color: var(--gold); font-weight: 600; }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    border-top: 1px solid var(--border);
    animation: fadeUp 0.6s 0.3s ease both;
  }

  .footer-note {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    color: var(--muted);
  }

  .btns { display: flex; gap: 10px; }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    text-decoration: none;
    border-radius: 8px;
    padding: 9px 16px;
    font-size: 0.83rem;
    font-weight: 600;
    transition: all 0.2s;
    cursor: pointer;
  }

  .btn-primary {
    background: var(--gold);
    color: #0b0f1a;
    border: 1px solid var(--gold);
  }

  .btn-primary:hover { background: #d9b85c; }

  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
  }

  .btn-ghost:hover { border-color: var(--border-hi); color: var(--text); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 900px) {
    .header { grid-template-columns: 1fr; }
    .kpi-strip { grid-template-columns: repeat(3, 1fr); }
    .perf-grid, .action-grid, .signals-grid { grid-template-columns: 1fr; }
    .header-side { min-width: unset; }
    .footer { flex-direction: column; gap: 16px; align-items: flex-start; }
  }

  @media (max-width: 560px) {
    .kpi-strip { grid-template-columns: repeat(2, 1fr); }
    .wrap { padding: 24px 16px 40px; }
  }
`;

const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);

const fontLinks = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
`;

document.head.insertAdjacentHTML("beforeend", fontLinks);

const signalRows = (signals, kind) =>
  signals
    .map(({ name, value }) => {
      const absWidth = (Math.abs(value) * 100).toFixed(1);
      const display = `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(3)}`;
      return `
        <div class="corr-row">
          <div class="corr-meta"><span class="corr-name">${name}</span><span class="corr-val ${kind}">${display}</span></div>
          <div class="bar-track"><div class="bar-fill ${kind}" data-w="${absWidth}"></div></div>
        </div>
      `;
    })
    .join("");

document.body.innerHTML = `
<div class="wrap">
  <header class="header">
    <div>
      <div class="eyebrow">Executive Snapshot — Academic Analytics</div>
      <h1>${summaryData.title} &amp; <em>Executive Summary</em></h1>
      <p class="header-meta">
        <span>${summaryData.dataset.rows} records</span>
        <span class="dot"></span>
        <span>${summaryData.dataset.cols} variables</span>
        <span class="dot"></span>
        <span>${summaryData.dataset.missing} missing values</span>
      </p>
    </div>
    <aside class="header-side">
      <h3>How to navigate</h3>
      <ul>
        <li>Check KPI strip for baseline context</li>
        <li>Read Top Signals for what drives outcomes</li>
        <li>Review Action Focus for key takeaways</li>
        <li>Open full analysis for chart-level detail</li>
      </ul>
    </aside>
  </header>

  <div class="kpi-strip">
    <div class="kpi"><div class="kpi-label">Dataset Rows</div><div class="kpi-value">${summaryData.dataset.rows}</div></div>
    <div class="kpi"><div class="kpi-label">Columns</div><div class="kpi-value">${summaryData.dataset.cols}</div></div>
    <div class="kpi"><div class="kpi-label">Missing Values</div><div class="kpi-value">${summaryData.dataset.missing}</div></div>
    <div class="kpi"><div class="kpi-label">Avg Study Hrs</div><div class="kpi-value">${summaryData.averages.study}</div></div>
    <div class="kpi"><div class="kpi-label">Avg Sleep Hrs</div><div class="kpi-value">${summaryData.averages.sleep}</div></div>
    <div class="kpi"><div class="kpi-label">Avg Screen Time</div><div class="kpi-value">${summaryData.averages.screen}</div></div>
  </div>

  <div class="section">
    <div class="section-title">Performance Overview</div>
    <div class="perf-grid">
      <div class="perf-card">
        <h3>Average Productivity Score</h3>
        <div class="big-num">${summaryData.averages.productivity}<span>pts</span></div>
        <p class="perf-sub">Mean across full cohort</p>
      </div>
      <div class="perf-card">
        <h3>Average Exam Score</h3>
        <div class="big-num">${summaryData.averages.exam}<span>pts</span></div>
        <p class="perf-sub">Primary outcome variable</p>
      </div>
      <div class="perf-card">
        <h3>Average Burnout Level</h3>
        <div class="big-num">${summaryData.averages.burnout}<span>pts</span></div>
        <p class="perf-sub">Moderate-to-high profile</p>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Top Signals — Correlation to Exam Score</div>
    <div class="signals-grid">
      <div class="signal-panel">
        <h3>Positive Drivers <span class="badge badge-pos">↑ Exam Score</span></h3>
        <div class="corr-rows">
          ${signalRows(summaryData.positiveSignals, "pos")}
        </div>
      </div>

      <div class="signal-panel">
        <h3>Negative Drivers <span class="badge badge-neg">↓ Exam Score</span></h3>
        <div class="corr-rows">
          ${signalRows(summaryData.negativeSignals, "neg")}
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Action Focus — Decision-Ready Insights</div>
    <div class="action-grid">
      <div class="action-card">
        <div class="action-num">01</div>
        <h3>The Focus Gap Is Large</h3>
        <p>Students in the top focus quartile score <strong>${summaryData.focusExamGap} exam points</strong> above the bottom quartile.</p>
      </div>

      <div class="action-card">
        <div class="action-num">02</div>
        <h3>Burnout Has Real Cost</h3>
        <p>Low-burnout students outperform high-burnout peers by <strong>${summaryData.burnoutExamGap} exam points</strong>.</p>
      </div>

      <div class="action-card">
        <div class="action-num">03</div>
        <h3>Core Recommendation</h3>
        <p>Frame your presentation around <strong>focus improvement + burnout reduction</strong> as a dual-axis strategy.</p>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="footer-note">Generated from student_productivity_dataset.csv · ${summaryData.dataset.rows} rows · ${summaryData.dataset.cols} variables</div>
    <div class="btns">
      <a class="btn btn-primary" href="student analysis.html">Open Full Analysis</a>
      <a class="btn btn-ghost" href="../data/student_productivity_dataset.csv">Raw Dataset (CSV)</a>
    </div>
  </div>
</div>
`;

requestAnimationFrame(() => {
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach((el) => {
      el.style.width = `${el.dataset.w}%`;
    });
  }, 400);
});
