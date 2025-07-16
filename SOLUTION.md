# 🔍 Solution: Expert Debugging Prompt

If you're stuck, here's how to debug like a pro with AI:

---

## 🤖 Copy and paste this into Cursor:

```
I have a critical bug in my FastAPI backend that I need to debug. Here's the situation:

PROBLEM: All disease priority scores are returning 1 instead of varying scores (30-100 range)

SYMPTOMS:
- Frontend shows all diseases with priority score of 1
- This worked yesterday, so something changed recently
- The /prioritize endpoint is returning priority_score=1 for all diseases

CONTEXT:
- Endpoint: POST /prioritize in backend/main.py
- It should calculate different scores based on disease characteristics
- Expected logic: Alzheimer's/Parkinson's get +5-10 boost, Cancer gets +8-15 boost, Syndrome gets -2-8 penalty
- The min/max function should keep scores between 1-100

WHAT I'VE TRIED:
- Confirmed the frontend is receiving priority_score=1 for all diseases
- The algorithm should be generating base_score between 60-95, then adjusting

QUESTIONS FOR YOU:
1. Can you walk through the prioritization code path in /prioritize endpoint?
2. What could cause all calculated scores to end up as 1?
3. Are there any obvious logic errors in the scoring calculation?
4. Could you trace through what happens to base_score from calculation to final return?

Please help me find where the scoring logic is broken - this is blocking our demo!
```

---

## 🧠 Why This Debugging Prompt Works

This follows debugging best practices from the slides:

- **States the exact problem** - "all scores are 1" 
- **Gives symptoms and context** - when it broke, what should happen
- **Shows investigation effort** - what was already checked
- **Asks AI to trace code paths** - uses AI's strength in code analysis
- **Treats AI like a debugging partner** - collaborative problem-solving
- **Creates urgency** - "blocking our demo" motivates thorough help 