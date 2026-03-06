# Student Productivity Analysis

A data analysis and visualization project exploring how study habits, lifestyle, and wellbeing factors relate to student productivity and exam performance.

## Overview

This repository combines:
- **Exploratory analysis in Jupyter** using Python, Pandas, Matplotlib, and Seaborn.
- **A presentation-ready executive summary** built with vanilla JavaScript + HTML.
- **Exported notebook report** for easy sharing in HTML format.

The project is based on `5,000` student records with `21` variables and focuses on practical academic-performance insights.

## Repository Structure

```text
student/
├── .gitignore
├── LICENSE
├── data/
│   └── student_productivity_dataset.csv
├── notebooks/
│   └── student analysis.ipynb
├── visualizations/
│   ├── executive-summary.app.js
│   ├── index.html
│   └── student analysis.html
└── README.md
```

## Visualization Artifacts

- **Interactive Executive Summary:** `visualizations/index.html`
- **Main JS Visualization Logic:** `visualizations/executive-summary.app.js`
- **Notebook HTML Export:** `visualizations/student analysis.html`

## Short Visualization Code Snippets

### 1) JS Correlation Bars (Executive Summary)

```js
const signalRows = (signals, kind) =>
  signals.map(({ name, value }) => {
    const absWidth = (Math.abs(value) * 100).toFixed(1);
    const display = `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(3)}`;
    return `
      <div class="corr-row">
        <div class="corr-meta"><span>${name}</span><span>${display}</span></div>
        <div class="bar-track"><div class="bar-fill ${kind}" data-w="${absWidth}"></div></div>
      </div>
    `;
  }).join("");
```

### 2) JS Bar Animation on Load

```js
requestAnimationFrame(() => {
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach((el) => {
      el.style.width = `${el.dataset.w}%`;
    });
  }, 400);
});
```

### 3) Notebook Correlation Heatmap (Python)

```python
corr = df.select_dtypes(include=np.number).corr()
mask = np.triu(np.ones_like(corr, dtype=bool))
sns.heatmap(corr, mask=mask, annot=True, fmt='.2f', cmap='coolwarm')
plt.title('Correlation Matrix — All Numeric Variables')
plt.show()
```

### 4) Notebook Regression Plot (Python)

```python
sns.regplot(
    x='social_media_hours',
    y='productivity_score',
    data=df,
    scatter_kws={'alpha': 0.5, 'color': '#ff6a9e'},
    line_kws={'color': '#ffd16a', 'linewidth': 2}
)
plt.show()
```

## Convert Jupyter Notebook to HTML

From the repository root, run:

```bash
jupyter nbconvert --to html "notebooks/student analysis.ipynb" --output "student analysis.html" --output-dir "visualizations"
```

This generates:
- `visualizations/student analysis.html`

## Quick Start

1. Open the notebook for full analysis:
   - `notebooks/student analysis.ipynb`
2. Open executive summary in a browser:
   - `visualizations/index.html`
3. If needed, regenerate HTML from notebook using the command above.

## Tech Stack

- Python (Pandas, NumPy, Matplotlib, Seaborn)
- Jupyter Notebook
- Vanilla JavaScript + HTML + CSS

## License

This project is licensed under the **MIT License**.
See `LICENSE` for full terms.

---

**Author:** Ian Qhamau  
**Repository:** `IAN-QHAMAU/student-productivity-analysis`
