# 💡 Solution: Expert AI Prompt

If you're stuck, here's a well-crafted prompt that follows AI-assisted coding best practices:

---

## 🤖 Copy and paste this into Cursor:

```
I need to implement CSV export functionality for a React component. Here's the context:

GOAL: Replace the alert() in my Export Report button with actual CSV download functionality

CURRENT STATE: 
- I have a button in frontend/components/results-panel.tsx that shows an alert
- The button has access to a `diseases` array prop with this structure:
  interface Disease {
    name: string
    prevalence: string  
    treatmentStatus: string
    priorityScore: number
    sources: string[]
    // ... other fields
  }

REQUIREMENTS:
1. Generate CSV with columns: Disease Name, Prevalence, Treatment Status, Priority Score, Sources (comma-separated)
2. Only include diseases where prevalence !== "" and treatmentStatus !== "" (skip "Pending" states)
3. Download as "glp1-research-results.csv"
4. Handle the sources array by joining with commas

WHAT I'VE TRIED: I looked at the onClick handler but I'm not sure how to generate and download a CSV in React.

SPECIFIC QUESTIONS:
- How do I create a CSV blob and trigger download in the browser?
- Should I use a library or vanilla JavaScript?
- How do I properly escape CSV fields that might contain commas?

Please show me the complete onClick handler implementation, and explain any browser APIs you're using.
```

---

## 🧠 Why This Prompt Works

This follows the "magic words" from the slides:

- **Gives complete context** - explains the goal, current state, and data structure
- **Shows what was tried** - demonstrates effort first
- **Asks specific questions** - guides the AI toward the right approach  
- **Requests explanation** - ensures you understand the solution
- **Treats AI like a teammate** - conversational and collaborative tone 