# GLP-1 Opportunity Finder

A research tool for exploring non-diabetes indications for GLP-1 drugs.

## 🚀 Quick Start

1. **Make sure you have Docker installed**
2. **Run the app**:
   ```bash
   docker-compose up --build
   ```
3. **Open your browser**: 
   - Frontend: http://localhost:3000
   - API docs: http://localhost:8005/docs

4. **Stop the app**: Press `Ctrl+C` or run `docker-compose down`

## 🎯 Workshop Challenges

This app is designed for hands-on AI-assisted coding practice. Pick a challenge and start coding:

### Available Workshops:

1. **📊 Export Report Feature** - Build a CSV download feature
   ```bash
   git checkout workshop-1-export
   ```

2. **🐛 Debug Broken Prioritization** - Fix the scoring algorithm  
   ```bash
   git checkout workshop-2-debug
   ```

3. **🔍 Add Search Filters** - Build filtering UI components
   ```bash
   git checkout workshop-3-filters
   ```

4. **📈 Fix Data Parsing Bug** - Debug the data pipeline
   ```bash
   git checkout workshop-4-parsing
   ```

5. **⚡ Add Health Check** - Build monitoring tools
   ```bash
   git checkout workshop-5-health
   ```

### How It Works:
1. **Pick a workshop branch** (see above)
2. **Read the challenge README** in that branch
3. **Try fixing it yourself first**
4. **Use AI assistance** with the provided example prompts
5. **Check the solution** when you're done

## 💡 AI Coding Tips

- Paste errors directly into your AI assistant
- Ask it to explain unfamiliar code
- Let it write tests and debug scripts
- Treat it like a pair programming partner

---

**Get ready to feel the power of AI-assisted coding! 🤖✨**

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