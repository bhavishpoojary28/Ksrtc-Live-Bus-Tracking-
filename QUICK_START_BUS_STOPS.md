# Quick Start: Add Dakshina Kannada Bus Stops

## 🚀 Run This Command

Open PowerShell/Terminal in the backend folder and run:

```powershell
cd backend
npm run seed:dk
```

**OR**

```powershell
cd backend
node seeds/runDKSeed.js
```

## ✅ What This Does

Adds **36+ government bus stops** to your database including:

### 🏙️ Cities Covered:
- **Mangalore** (10 stops including KSRTC Central, State Bank, Pumpwell, etc.)
- **Bantwal** (Bus Stand + BC Road)
- **Puttur** (Bus Stand + Uppinangady)
- **Belthangady** (Bus Stand)
- **Dharmasthala** (Bus Stand)
- **Ujire** (Bus Stand)
- **Sullia** (Bus Stand)
- **Subrahmanya** (Bus Stand)
- **Vittal** (Bus Stand)
- **Moodbidri** (Bus Stand)
- **Ullal, Thokkottu, Mulki, Kateel, Bajpe** and more!

## 📋 Requirements

1. MongoDB should be running
2. Backend `.env` file should have `MONGODB_URI` configured
3. You must be in the `backend` folder when running the command

## 🎯 After Running

Once completed, you'll see these bus stops:

1. **In the Bus Stops Finder page** - Search for any city like "Mangalore"
2. **In city dropdowns** - All cities will appear in autocomplete
3. **On the map** - Bus stops will show with markers

## 📊 Expected Output

```
🚀 Running Dakshina Kannada Bus Stops Seeder...
🌱 Starting Dakshina Kannada Bus Stops seeding...
✅ Connected to MongoDB
🗑️  Removing old bus stops for cities: Mangalore, Bantwal, Puttur...
🗑️  Deleted 0 old bus stops
✅ Added: KSRTC Bus Stand Mangalore (Central) (Mangalore)
✅ Added: State Bank Bus Stop (Mangalore)
...
📊 Seeding Summary:
✅ Successfully inserted: 36 bus stops
⏭️  Skipped duplicates: 0 bus stops
📍 Total unique cities: 25
🌟 Dakshina Kannada bus stops seeding completed!
```

## ❓ Troubleshooting

### "Cannot find module"
Make sure you're in the `backend` folder:
```powershell
cd C:\Users\bhavi\OneDrive\Desktop\ALI\ksrtc-tracking-app\backend
```

### "MongoDB connection failed"
1. Check if MongoDB is running: `mongod --version`
2. Check your `.env` file has correct `MONGODB_URI`
3. Default: `mongodb://localhost:27017/ksrtc-tracking`

### "Duplicate key error"
The bus stops are already in the database. The script will handle this automatically.

## 🔄 Re-running the Script

You can run the script multiple times safely. It will:
- Delete old bus stops for these cities
- Add fresh data
- Skip duplicates automatically

## 📝 Verify Data

After running, check your database:

```javascript
// In MongoDB shell or Compass
db.busstops.find({ city: "Mangalore" }).count()
// Should return 10

db.busstops.distinct("city").sort()
// Should show all 25+ cities
```

## 🎉 That's It!

Your app now has comprehensive bus stop data for Dakshina Kannada district!

---
**Need help?** Check `DAKSHINA_KANNADA_BUS_STOPS.md` for detailed information.

