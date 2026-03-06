# 📊 Student Productivity Analysis

A clean, insight-focused analysis project that explores how study habits, wellness, and lifestyle patterns influence student productivity and exam performance.

If you are new to this repository, start with **How to Run** and then open the notebook and executive summary in that order.

## ✨ What This Project Delivers

- **Notebook-driven EDA** with Python, Pandas, NumPy, Matplotlib, and Seaborn.
- **Executive-style web summary** built with vanilla JavaScript + HTML/CSS.
- **Shareable HTML report** exported from Jupyter for presentation and review.
- **Data scale:** 5,000 records, 21 variables, 0 missing values in the analysis snapshot.

## 🎯 Key Insight Flow

The analysis is designed to communicate in this order:
1. **Baseline metrics** (study, sleep, productivity, exam outcomes)
2. **Correlation patterns** (what moves with performance)
3. **Relationship charts** (trend direction and effect size)
4. **Actionable summary** (focus + burnout as practical levers)

## 🧩 Visualization Highlights

### 1) Correlation Bars (Web Summary)

```js
const signalRows = (signals, kind) =>
  signals.map(({ name, value }) => {
    const absWidth = (Math.abs(value) * 100).toFixed(1);
    const display = `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(3)}`;
    return `<div class="bar-fill ${kind}" data-w="${absWidth}"></div>`;
  }).join("");
```

### 2) Bar Animation on Load

```js
requestAnimationFrame(() => {
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach((el) => {
      el.style.width = `${el.dataset.w}%`;
    });
  }, 400);
});
```

### 3) Correlation Heatmap (Notebook)

```python
corr = df.select_dtypes(include=np.number).corr()
mask = np.triu(np.ones_like(corr, dtype=bool))
sns.heatmap(corr, mask=mask, annot=True, fmt='.2f', cmap='coolwarm')
plt.title('Correlation Matrix — All Numeric Variables')
plt.show()
```

### 4) Regression Plot (Notebook)

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

## 🗂️ Project Structure

```text
student/
├── data/
│   └── student_productivity_dataset.csv
├── notebooks/
│   └── student analysis.ipynb
├── visualizations/
│   ├── executive-summary.app.js
│   ├── index.html
│   └── student analysis.html
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 How to Run

1. Open the notebook for full analysis:
   - `notebooks/student analysis.ipynb`
2. Open the executive summary in your browser:
   - `visualizations/index.html`
3. Review the exported HTML report:
   - `visualizations/student analysis.html`

## 🧭 Quick Guide

- Open `notebooks/student analysis.ipynb` first to understand the full workflow.
- Use `visualizations/index.html` for the short executive version.
- Use `visualizations/student analysis.html` when sharing results with non-technical readers.
- Check the code snippets above to quickly see how key visuals were built.

## 🔄 Convert Notebook to HTML

Run this from the repository root:

```bash
jupyter nbconvert --to html "notebooks/student analysis.ipynb" --output "student analysis.html" --output-dir "visualizations"
```

## ⚙️ Tech Stack

- Python (Pandas, NumPy, Matplotlib, Seaborn)
- Jupyter Notebook
- Vanilla JavaScript, HTML, CSS

## 📄 License

This project is licensed under the **MIT License**.  
See `LICENSE` for full terms.

## 💡 Tips & Practical Takeaways

- **Main finding:** Higher focus and productivity are strongly associated with better exam outcomes.
- **Risk signal:** Higher burnout and heavy social-media time are linked to lower performance.
- **How to curb this:**
  - set daily focused study blocks (e.g., 50 min focus + 10 min break)
  - limit social-media usage during study windows
  - protect consistent sleep routines to support mental health and retention
  - monitor burnout weekly and reduce overload before exam periods
- **Presentation tip:** Framed recommendations around two levers: **increase focus** and **reduce burnout**.

---

**Author:** Ian Qhamau  
**Repository:** `IAN-QHAMAU/student-productivity-analysis`

