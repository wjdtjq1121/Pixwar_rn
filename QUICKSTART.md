# Quick Start Guide

## Get Playing in 5 Minutes!

### Step 1: Firebase Setup (3 minutes)

1. **Create Firebase Project**
   - Go to: https://console.firebase.google.com/
   - Click "Add project"
   - Name it (e.g., "blokus-game")
   - Skip Google Analytics
   - Click "Create project"

2. **Enable Realtime Database**
   - Click "Realtime Database" in sidebar
   - Click "Create Database"
   - Choose location
   - Select "Test mode"
   - Click "Enable"

3. **Get Your Config**
   - Click ⚙️ icon → "Project settings"
   - Scroll to "Your apps"
   - Click `</>` web icon
   - Enter app name
   - **Copy the firebaseConfig object**

### Step 2: Update the Code (1 minute)

1. Open `index.html` in a text editor
2. Find line ~698 (search for "YOUR_API_KEY")
3. Paste your Firebase config values

### Step 3: Play! (1 minute)

1. **Player 1:**
   - Open `index.html` in browser
   - Click "Create Room"
   - Share the 6-digit code with your friend

2. **Player 2:**
   - Open same `index.html` in another browser/tab
   - Click "Join Room"
   - Enter the code
   - Click "Join"

3. **Play:**
   - Blue player goes first
   - Select a piece, rotate/flip if needed
   - Click the board to place it
   - First piece must cover your starting corner (★)
   - Take turns until no more moves!

## Rules Reminder

### First Move
- Must cover your starting corner
- Blue: top-left (0,0)
- Red: bottom-right (13,13)

### Other Moves
- Must touch corner-to-corner with your pieces
- Cannot touch edge-to-edge with your pieces
- Can touch opponent's pieces anywhere

### Winning
- Game ends when both players skip
- Score = -1 per unused square
- +15 bonus for using all pieces
- +5 extra if last piece was the tiny 1-square piece
- Highest score wins!

## Keyboard Shortcuts

None yet - all mouse/touch based!

## Tips

1. **First piece**: Use big pieces early to maximize expansion
2. **Corner control**: Create multiple corner options for future moves
3. **Block opponent**: Cover spaces they might use
4. **Small pieces**: Save for tight spaces later
5. **Plan ahead**: Think 2-3 moves in advance

## Troubleshooting

### Can't create room?
→ Check Firebase config is correct

### Can't join room?
→ Verify the 6-digit code is correct

### Game not syncing?
→ Check internet connection

### See detailed help:**
→ Read FIREBASE_SETUP.md

## What's Next?

1. ✅ Play with friends locally
2. 🚀 Deploy to Firebase Hosting (see README.md)
3. 🌐 Share the URL with anyone
4. 🏆 Challenge friends online!

## File Structure

```
multi-blockers/
├── index.html           ← The game (open this!)
├── README.md           ← Full documentation
├── FIREBASE_SETUP.md   ← Detailed Firebase guide
├── CHANGES.md          ← What changed from original
└── QUICKSTART.md       ← This file
```

## Deploy to Web (Optional)

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

Your game: `https://YOUR-PROJECT.web.app`

### Or Just Share Locally
- Put `index.html` on Google Drive / Dropbox
- Share the link
- Anyone can download and play!

---

**Ready to play?** Open `index.html` and click "Create Room"! 🎮
