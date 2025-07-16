# 🛠️ Solution: Expert Automation & Tooling Prompt

If you're stuck, here's how to build monitoring tools with AI:

---

## 🤖 Copy and paste this into Cursor:

```
I need to add health check monitoring to my FastAPI backend for operational observability. Here's what I need:

GOAL: Add comprehensive health monitoring for a FastAPI app

REQUIREMENTS:
1. New endpoint: GET /health that returns JSON status
2. Basic health info: API status, timestamp, version
3. Dependency checks: Test that key endpoints (/literature-search, /prioritize) work  
4. Performance metrics: Response times, basic timing data
5. Monitoring script: Automate health checks for CI/CD integration

CURRENT STATE:
- FastAPI backend in backend/main.py with existing endpoints
- App runs on port 8005
- Need to add monitoring without disrupting existing functionality

SPECIFIC IMPLEMENTATION NEEDS:
1. Health endpoint structure - what should the JSON response look like?
2. How to test other endpoints from within the health check?
3. How to measure response times and include performance data?
4. Python script that can call /health and validate responses
5. Proper exit codes (0 for healthy, 1 for unhealthy) for CI/CD

AUTOMATION REQUIREMENTS:
- Script should be runnable as: python health_check.py
- Should test multiple health aspects and report detailed status
- Could be enhanced for alerts, logging, or monitoring systems

QUESTIONS FOR YOU:
1. What's a good structure for the /health endpoint JSON response?
2. How can I test my own API endpoints from within the health check?
3. What's the best way to build a monitoring script that DevOps teams love?
4. How can I make this easily extensible for more complex health checks?

Please help me build both the endpoint and the monitoring script following DevOps best practices!
```

---

## 🧠 Why This Automation Prompt Works

This follows automation best practices from the slides:

- **Clear operational goal** - health monitoring for production use
- **Specific technical requirements** - endpoint + script + CI/CD integration
- **Considers the users** - DevOps teams have specific needs
- **Asks for best practices** - not just code, but good patterns
- **Plans for extensibility** - how to build it right for future growth
- **Focuses on the complete solution** - endpoint + tooling + integration 