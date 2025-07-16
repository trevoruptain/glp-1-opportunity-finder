# 🎨 Solution: Expert UI Building Prompt

If you're stuck, here's how to build interactive UI with AI:

---

## 🤖 Copy and paste this into Cursor:

```
I need to implement filtering functionality for a React data table. Here's the context:

GOAL: Make the existing filter dropdown controls actually filter the table results

CURRENT STATE:
- I have filter dropdowns in frontend/components/results-panel.tsx that are just static HTML
- There are 3 filters: Prevalence, Treatment Status, and Priority Score
- The table displays a `diseases` array with this structure:
  interface Disease {
    name: string
    prevalence: string    // e.g. "5.8M in US", "850K in US", "3-5% prevalence"
    treatmentStatus: string  // e.g. "No approved therapy", "Limited treatment options" 
    priorityScore: number    // 0-100 range
    // ... other fields
  }

FILTERING REQUIREMENTS:
1. Prevalence: Parse numbers from prevalence strings and filter by size ranges
   - "High" = >5M patients, "Medium" = 1-5M, "Low" = <1M
   - Handle formats like "5.8M in US", "850K in US", need to extract the number part
2. Treatment Status: Filter by exact or partial string matches
3. Priority Score: Filter by score ranges (High 80+, Medium 60-79, Low <60)
4. Multiple filters should work together (AND logic)
5. Clear Filters button should reset all

WHAT I'VE TRIED: I can see the filter HTML exists but there's no state management or filtering logic.

SPECIFIC QUESTIONS:
1. How should I manage the filter state (useState for each filter)?
2. How do I parse prevalence strings to extract numeric values for comparison?
3. What's the best way to filter the diseases array and pass filtered results to the table?
4. How do I wire up the onChange handlers for the select elements?

Please help me implement the complete filtering system with state management and filter logic.
```

---

## 🧠 Why This UI Building Prompt Works

This follows UI development best practices from the slides:

- **Clearly defines the end goal** - working filter functionality
- **Shows the existing structure** - AI can build on what's there
- **Provides data types** - helps AI understand the data model
- **Breaks down complex requirements** - each filter type explained
- **Asks specific technical questions** - guides AI toward the right patterns
- **Requests complete implementation** - not just snippets but full solution 