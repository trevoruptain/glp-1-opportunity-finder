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

# ⚡ Workshop 5: Add Health Check

## 🎯 The Challenge

Your DevOps team is asking for better monitoring:

> "We need a health check endpoint to monitor if the GLP-1 app is running properly. Can you add a `/health` endpoint that verifies the backend is working? Also, a monitoring script would be helpful for our alerts."

## 🔍 What's Missing

1. No `/health` endpoint to check backend status
2. No way to verify if all dependencies are working
3. No monitoring script for operational alerts

## 🛠️ Your Mission

Add health monitoring to the backend and create a monitoring script.

**Required features:**
- **`/health` endpoint** that returns JSON status about the backend
- **Dependency checks** - verify API endpoints are working
- **Response time tracking** - how fast is the API responding?
- **Monitoring script** - automated health checking that could run in CI/CD

## 💡 Approach

1. **Add health endpoint** - Start with basic "alive" status in FastAPI
2. **Expand with checks** - Test that key endpoints return data
3. **Create monitoring script** - Automate the health checking
4. **Use AI for enhancement** - Ask it to add more sophisticated monitoring

## ✅ Success Criteria

- [ ] `GET /health` endpoint exists and returns JSON status
- [ ] Health check verifies key endpoints (literature-search, prioritize)
- [ ] Response includes timing/performance data
- [ ] Monitoring script can run health checks automatically
- [ ] Script returns proper exit codes for CI/CD integration

---

**Stuck?** Check [SOLUTION.md](./SOLUTION.md) for an expert automation prompt.

**Congratulations!** You've completed all 5 workshops! 🎉 