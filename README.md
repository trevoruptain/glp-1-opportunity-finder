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