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