# 🔍 Workshop 3: Add Search Filters

## 🎯 The Challenge

Your users are asking for better ways to explore the data:

> "The results table is great, but with so many diseases, I need to filter by prevalence size, treatment status, and priority level. I see filter controls, but they don't seem to work!"

## 🔍 What's Currently Broken

1. Go to http://localhost:3000
2. Search for literature (any molecule)
3. Run prevalence estimation and prioritization
4. **BUG**: Try using the filter dropdowns above the table - they don't filter anything!

## 🛠️ Your Mission

Make the filter controls actually filter the results table.

**Expected behavior:**
- **Prevalence filter**: "High" shows >5M, "Medium" shows 1-5M, "Low" shows <1M
- **Treatment Status filter**: Filter by "No approved therapy", "Limited options", etc.
- **Priority Score filter**: "High" shows 80+, "Medium" shows 60-79, "Low" shows <60
- **Clear Filters button**: Reset all filters to show all results

## 💡 Approach

1. **Study the existing UI** - The filter controls are already there in the results panel
2. **Understand the data flow** - How does the `diseases` prop get displayed in the table?
3. **Use AI to implement filtering** - Ask it to add state management and filter logic

## ✅ Success Criteria

- [ ] Prevalence filter works correctly (by patient count numbers)
- [ ] Treatment status filter works (partial string matching)
- [ ] Priority score filter works (by score ranges)
- [ ] Multiple filters work together (AND logic)
- [ ] Clear filters button resets everything

---

**Stuck?** Check [SOLUTION.md](./SOLUTION.md) for an expert UI building prompt.

**Next:** `git checkout workshop-4-parsing` 