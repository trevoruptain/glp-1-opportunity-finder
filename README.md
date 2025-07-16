# 📊 Workshop 1: Export Report Feature

## 🎯 The Challenge

Your product manager just asked:

> "Hey, can users export their research results as a CSV file? I see there's an Export Report button, but it doesn't work yet."

## 🔍 What's Currently Broken

1. Go to http://localhost:3000
2. Search for literature (pick any molecule) 
3. Click "Export Report" → You'll see an alert saying it's not implemented

## 🛠️ Your Mission

Implement the CSV export functionality so users can download their research results.

**Expected behavior:**
- Download a CSV file named `glp1-research-results.csv`
- Include columns: Disease Name, Prevalence, Treatment Status, Priority Score, Sources
- Only export diseases that have actual data (not "Pending" ones)

## 💡 Approach

1. **Try it yourself first** - Look at the button in `frontend/components/results-panel.tsx`
2. **Use AI assistance** - Paste errors, ask it to explain the code structure
3. **Test thoroughly** - Make sure the CSV downloads and opens correctly

## ✅ Success Criteria

- [ ] CSV file downloads when button is clicked
- [ ] File includes all expected columns  
- [ ] Only exports diseases with actual data
- [ ] File opens correctly in Excel/Google Sheets

---

**Stuck?** Check [SOLUTION.md](./SOLUTION.md) for an expert AI prompt.

**Next:** `git checkout workshop-2-debug` 