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

# 🐛 Workshop 2: Debug Broken Prioritization

## 🎯 The Challenge

You just got a bug report from QA:

> "The disease prioritization feature is completely broken! All diseases are getting a priority score of 1, regardless of their actual characteristics. This worked yesterday - something must have broken in the backend."

## 🔍 What's Currently Broken

1. Go to http://localhost:3000
2. Search for literature (any molecule)
3. Run prevalence estimation 
4. Click "Prioritize Indications"
5. **BUG**: All diseases show priority score of 1 (should be 30-100 range)

## 🛠️ Your Mission

Find and fix the bug in the prioritization algorithm.

**Expected behavior:**
- Different diseases should get different priority scores (30-100 range)
- Alzheimer's/Parkinson's should score higher (neuro boost)
- Cancer should score highest (oncology boost)
- "Syndrome" diseases should score slightly lower

## 💡 Approach

1. **Reproduce the bug** - Confirm all scores are 1
2. **Use AI to trace the code path** - Ask it to explain the `/prioritize` endpoint
3. **Debug with AI assistance** - Paste the backend code and ask what's wrong

## ✅ Success Criteria

- [ ] Priority scores vary between diseases (not all 1's)
- [ ] Alzheimer's/Parkinson's get higher scores than average
- [ ] Cancer diseases get the highest scores
- [ ] "Syndrome" diseases get slightly lower scores

---

**Stuck?** Check [SOLUTION.md](./SOLUTION.md) for an expert debugging prompt.

**Next:** `git checkout workshop-3-filters` 