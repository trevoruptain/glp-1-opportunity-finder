# 🔍 Solution: Expert Data Flow Debugging Prompt

If you're stuck, here's how to debug data flow issues with AI:

---

## 🤖 Copy and paste this into Cursor:

```
I have a data parsing bug where API data isn't showing up correctly in my React frontend. Here's the situation:

PROBLEM: Prevalence values show as "undefined" in the frontend, but the API returns data successfully

SYMPTOMS:
- API endpoint returns 200 status and valid JSON data
- Frontend shows "success" state after API call
- All prevalence values display as "undefined" instead of actual numbers
- Same issue with treatment status and sources

API RESPONSE STRUCTURE (I can verify this works):
GET /estimate-prevalence?disease_name=Alzheimer%27s%20Disease
Returns: {
  "prevalence": "5.8M in US",
  "treatmentStatus": "Limited treatment options", 
  "sources": ["PubMed", "ClinicalTrials.gov", "FDA Database"]
}

FRONTEND CODE LOCATION: 
The parsing happens in frontend/app/page.tsx in the handlePrevalence function

WHAT I'VE TRIED:
- Confirmed API returns correct data structure
- API calls succeed (200 status, no network errors)
- Frontend shows success state, so the async/await logic works

DEBUGGING QUESTIONS FOR YOU:
1. Can you trace through the data flow from API response to frontend state?
2. What could cause the response data to be parsed as "undefined"?
3. Are there any property name mismatches between API response and frontend expectations?
4. How can I debug what the frontend is actually receiving from the API?

Please help me identify where the data is getting lost between the successful API call and the display!
```

---

## 🧠 Why This Data Flow Debugging Prompt Works

This follows debugging best practices from the slides:

- **Isolates the problem layer** - API works, frontend parsing fails
- **Provides the working API contract** - gives AI the expected data structure  
- **Shows investigation effort** - what was already verified to work
- **Asks AI to trace the flow** - leverages AI's code analysis strength
- **Focuses on the gap** - between successful API and broken display
- **Requests specific debugging techniques** - how to inspect the actual data 