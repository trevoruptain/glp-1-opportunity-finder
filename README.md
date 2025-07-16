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

# 📈 Workshop 4: Fix Data Parsing Bug

## 🎯 The Challenge

Your users are reporting a confusing data issue:

> "The prevalence estimation step runs successfully and the API is returning data, but the frontend shows 'undefined' for all prevalence values. The backend logs show 200 responses, so the API is working!"

## 🔍 What's Currently Broken

1. Go to http://localhost:3000
2. Search for literature (any molecule)  
3. Click "Estimate Prevalence" - it will show "success" status
4. **BUG**: All prevalence values show "undefined" instead of numbers like "5.8M in US"

## 🛠️ Your Mission

Debug the data flow from backend to frontend and fix the parsing issue.

**Expected behavior:**
- After prevalence estimation, diseases should show real values like "5.8M in US", "850K in US"
- Treatment status should also populate correctly
- Sources should show the correct source arrays

## 💡 Approach

1. **Check the API directly** - Does `http://localhost:8005/estimate-prevalence?disease_name=Alzheimer%27s%20Disease` return data?
2. **Trace the data flow** - Follow from API response → frontend parsing → display
3. **Use AI to debug** - Ask it to compare API response structure with frontend expectations

## ✅ Success Criteria

- [ ] Prevalence values display correctly (not "undefined")
- [ ] Treatment status populates properly  
- [ ] Sources array displays in the table
- [ ] All diseases show real data after prevalence estimation

---

**Stuck?** Check [SOLUTION.md](./SOLUTION.md) for an expert data flow debugging prompt.

**Next:** `git checkout workshop-5-health` 