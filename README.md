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