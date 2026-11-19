# 🔍 Admin Dashboard Testing Checklist

## Before Testing

✅ **Backend Running:** `npm start` in backend folder
✅ **Frontend Running:** `start-server.ps1`
✅ **Logged in as Admin:** admin@disasteralert.com / admin123

---

## 🧪 Features to Test

### 1. ✅ Create New Alert Button
**Expected:** Opens modal form
**Steps:**
1. Click "Create New Alert" button
2. Fill all fields:
   - Type: Earthquake
   - Severity: critical
   - Location: San Francisco, USA
   - Magnitude: 6.5
   - Description: Strong earthquake detected
   - Affected: 500K
   - Coordinates: 37.7749, -122.4194
3. Click "Create Alert"

**Success:** Alert appears in list and shows success message
**Failure:** Check browser console (F12) for errors

---

### 2. ✅ Send Notification Button
**Expected:** Shows notification dialog
**Current Status:** Working (shows alert dialog)

---

### 3. ✅ Export Report Button
**Expected:** Downloads JSON report file
**Current Status:** Working (downloads report)

---

### 4. ✅ Refresh Data Button
**Expected:** Reloads all data from database
**Current Status:** Working (refreshes alerts and stats)

---

### 5. ✅ View Alert Details
**Expected:** Shows alert information
**Steps:**
1. Find an alert in the list
2. Click the eye icon (👁️)

**Success:** Shows alert popup with details

---

### 6. ✅ Edit Alert
**Expected:** Opens form with alert data
**Steps:**
1. Find an alert
2. Click edit icon (✏️)

**Current:** Opens blank form (needs improvement)

---

### 7. ✅ Delete Alert
**Expected:** Removes alert from database
**Steps:**
1. Find an alert
2. Click delete icon (🗑️)
3. Confirm deletion

**Success:** Alert removed from list

---

### 8. ✅ Dashboard Statistics
**Expected:** Shows real numbers from database
**Check:**
- Active Alerts count
- Critical Alerts count
- Total Users
- Affected People

**Status:** Should update from API automatically

---

### 9. ✅ Alert Map
**Expected:** Shows markers for all alerts
**Check:** Map displays with colored markers

---

### 10. ✅ Recent Activity
**Expected:** Shows system activity
**Current:** Hardcoded sample data (needs API endpoint)

---

## 🐛 Known Issues & Fixes

### Issue 1: Create Alert Form Not Working
**Problem:** Form validation errors
**Console Check:** Open F12 → Console, try creating alert
**Fix:** Check that all form fields have `name` attributes

### Issue 2: Stats Not Updating
**Problem:** Shows hardcoded numbers
**Fix:** Ensure admin.js calls `/api/stats` on load

### Issue 3: Admin Not Seeing New Alerts
**Problem:** List doesn't update
**Fix:** Click "Refresh Data" button or reload page

---

## 🔧 Quick Fixes

### If "Create Alert" Shows Validation Error:

**Open browser console (F12) and check:**
```javascript
// What data is being sent?
// Look for: "📤 Sending alert data:"
```

**Common Issues:**
- ❌ Form fields empty → Fill all required fields
- ❌ Invalid disaster type → Select from dropdown
- ❌ Not logged in as admin → Check localStorage.dasToken
- ❌ Backend not running → Start backend server

---

### If Stats Show 0 or Wrong Numbers:

**Check:**
1. Backend running? Visit http://localhost:5000/api/stats
2. Database has data? Visit http://localhost:5000/api/alerts
3. Console errors? Open F12 → Console

---

### If Map Doesn't Show Markers:

**Check:**
1. Alerts have coordinates in database
2. Map initialized? Look for "✅ Admin map initialized" in console
3. Leaflet loaded? Check for 404 errors

---

## 📋 Testing Script

Run this in browser console (F12) to check everything:

```javascript
// Check Authentication
console.log('🔑 Token:', localStorage.getItem('dasToken') ? 'Present' : 'Missing');
console.log('👤 User:', JSON.parse(localStorage.getItem('dasUser') || '{}'));

// Check API Connection
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(d => console.log('🏥 Backend Health:', d))
  .catch(e => console.error('❌ Backend Error:', e));

// Check Alerts
fetch('http://localhost:5000/api/alerts')
  .then(r => r.json())
  .then(d => console.log('📊 Total Alerts:', d.count))
  .catch(e => console.error('❌ Alerts Error:', e));

// Check Form Elements
console.log('📝 Create Form:', document.getElementById('createAlertForm') ? 'Found' : 'Missing');
console.log('📝 Form Inputs:', {
  type: document.querySelector('[name="type"]') ? 'Found' : 'Missing',
  severity: document.querySelector('[name="severity"]') ? 'Found' : 'Missing',
  location: document.querySelector('[name="location"]') ? 'Found' : 'Missing',
  description: document.querySelector('[name="description"]') ? 'Found' : 'Missing'
});
```

---

## ✅ Expected Console Output

When everything works, you should see:
```
🛡️ Admin Dashboard Ready
💡 Shortcuts: Ctrl+N (New Alert), Escape (Close)
✅ Admin map initialized
✅ Admin Dashboard Initialized
```

When creating an alert:
```
📤 Sending alert data: {type: "Earthquake", level: "critical", ...}
📥 Response: {success: true, data: {...}}
```

---

## 🆘 Emergency Troubleshooting

### Nothing Works At All:
1. Restart backend: `Ctrl+C` then `npm start`
2. Restart frontend: `Ctrl+C` then `start-server.ps1`
3. Clear browser cache: `Ctrl+Shift+Delete`
4. Re-login as admin

### Backend Connection Failed:
```powershell
# Check if backend is running
netstat -ano | findstr :5000

# If not running:
cd backend
npm start
```

### Frontend Not Loading:
```powershell
# Check if frontend is running
netstat -ano | findstr :8082

# If not running:
powershell -ExecutionPolicy Bypass -File start-server.ps1
```

---

## 📞 Final Check Command

**Run in PowerShell:**
```powershell
# Check all services
echo "=== Backend Status ==="
(curl http://localhost:5000/api/health).StatusCode

echo "`n=== Frontend Status ==="
(curl http://localhost:8082).StatusCode

echo "`n=== MongoDB Status ==="
# MongoDB is internal to backend
```

---

## ✨ Success Criteria

✅ Can login as admin
✅ Dashboard loads with real data
✅ Can create new alert
✅ New alert appears immediately
✅ Can view alert details
✅ Can delete alerts
✅ Stats update correctly
✅ Map shows markers
✅ No console errors

---

**If any test fails, check browser console (F12) and backend terminal for error messages!**
