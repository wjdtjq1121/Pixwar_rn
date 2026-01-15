# Quick Firebase Setup Guide

## Step-by-Step Instructions

### 1. Create Firebase Project (2 minutes)

1. Visit: https://console.firebase.google.com/
2. Click "Add project" or "Create a project"
3. Enter project name (e.g., "blokus-multiplayer")
4. Disable Google Analytics (optional, not needed for this game)
5. Click "Create project"

### 2. Enable Realtime Database (1 minute)

1. In left sidebar, click "Realtime Database"
2. Click "Create Database"
3. Select location (choose closest to your users)
4. Start in **Test Mode** (allows read/write for 30 days)
5. Click "Enable"

### 3. Get Your Configuration (1 minute)

1. Click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon (`</>`)
5. Register app: enter nickname (e.g., "Blokus Web")
6. **Copy the firebaseConfig object**

It looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA...",
  authDomain: "blokus-multiplayer.firebaseapp.com",
  databaseURL: "https://blokus-multiplayer-default-rtdb.firebaseio.com",
  projectId: "blokus-multiplayer",
  storageBucket: "blokus-multiplayer.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### 4. Update index.html (1 minute)

1. Open `/home/kms/etc/multi-blockers/index.html`
2. Find line ~698 (search for "FIREBASE CONFIGURATION")
3. Replace the placeholder config with your actual config:

**BEFORE:**
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

**AFTER:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyA...",  // Your actual API key
    authDomain: "blokus-multiplayer.firebaseapp.com",
    databaseURL: "https://blokus-multiplayer-default-rtdb.firebaseio.com",
    projectId: "blokus-multiplayer",
    storageBucket: "blokus-multiplayer.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

### 5. Test It! (1 minute)

1. Save `index.html`
2. Open it in a web browser (double-click the file)
3. Click "Create Room" - you should see a 6-digit code
4. Open the same file in a different browser/tab
5. Click "Join Room" and enter the code
6. Both players should now see the game board!

**Total setup time: ~5 minutes**

## Troubleshooting

### Error: "Failed to create room"

**Problem:** Firebase config is incorrect or database not enabled

**Solution:**
1. Check that all config values are copied correctly (no quotes missing)
2. Verify Realtime Database is enabled in Firebase Console
3. Check browser console (F12) for specific error message

### Error: "Permission denied"

**Problem:** Database rules are too restrictive

**Solution:**
1. Go to Firebase Console > Realtime Database > Rules
2. Make sure rules allow read/write:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**Note:** This is for development only! Add proper security for production.

### Error: "Room not found"

**Problem:** Room code is incorrect or room expired

**Solution:**
1. Double-check the 6-digit code
2. Make sure the host is still connected
3. Try creating a new room

## Security Rules (For Production)

After testing, update your Firebase Realtime Database rules:

1. Go to Firebase Console > Realtime Database > Rules
2. Replace with these rules:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt"],
        ".validate": "newData.hasChildren(['gameState', 'players'])",
        "gameState": {
          ".validate": "newData.hasChildren(['board', 'currentPlayerIndex', 'passCount'])"
        }
      }
    }
  }
}
```

This allows:
- Anyone to read room data
- Anyone to write to rooms (for quick matchmaking)
- Validates data structure

For better security with authentication, see README.md.

## Hosting Options

### Option 1: Local File (Easiest)
Just double-click `index.html` - works immediately!

### Option 2: Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize hosting
firebase init hosting

# Deploy
firebase deploy --only hosting
```

Your game will be at: `https://YOUR_PROJECT_ID.web.app`

### Option 3: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload `index.html`
3. Go to Settings > Pages
4. Select branch and save
5. Access at: `https://YOUR_USERNAME.github.io/REPO_NAME`

### Option 4: Other Hosts

Works with any static hosting:
- **Netlify**: Drag and drop the folder
- **Vercel**: Deploy with `vercel`
- **Surge**: `surge` in the directory
- **GitHub Gist**: Create a gist with the HTML

## Database Structure

Your Firebase Realtime Database will look like this:

```
blokus-multiplayer-default-rtdb
└── rooms/
    ├── 123456/
    │   ├── host: true
    │   ├── players/
    │   │   ├── 0/
    │   │   │   ├── connected: true
    │   │   │   ├── color: "blue"
    │   │   │   └── name: "Player 1"
    │   │   └── 1/
    │   │       ├── connected: true
    │   │       ├── color: "red"
    │   │       └── name: "Player 2"
    │   ├── gameState/
    │   │   ├── board: [[...]]
    │   │   ├── pieces/
    │   │   ├── currentPlayerIndex: 0
    │   │   ├── passCount: 0
    │   │   ├── gameStarted: true
    │   │   └── gameOver: false
    │   └── createdAt: 1702774800000
    └── 789012/
        └── ...
```

Rooms are automatically deleted when the host disconnects.

## Cost

Firebase Free Tier includes:
- **Realtime Database**: 1 GB storage, 10 GB/month download
- **Hosting**: 10 GB storage, 360 MB/day transfer

This is **more than enough** for this game! A typical game uses:
- Storage: ~5 KB per active room
- Transfer: ~50 KB per game

You can host **thousands of concurrent games** on the free tier.

## Next Steps

1. Complete the setup above
2. Test with a friend
3. Share the hosted URL or room codes
4. Enjoy playing Blokus online!

For questions or issues, check the browser console (F12) for error messages.
