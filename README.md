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