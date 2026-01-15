# Multiplayer Blokus - 2 Player Online Game

This is a 2-player online multiplayer version of the Blokus board game with Firebase Realtime Database integration.

## Features

- **2-Player Mode**: Blue vs Red (simplified from original 4-player version)
- **14x14 Board**: Smaller board for faster 2-player games (vs 20x20 in original)
- **Room-based Matchmaking**: Create or join games with 6-digit room codes
- **Real-time Synchronization**: All game moves sync instantly via Firebase
- **Turn-based Gameplay**: Players alternate turns
- **Starting Positions**: 
  - Player 1 (Blue) starts at (0,0) - top-left corner
  - Player 2 (Red) starts at (13,13) - bottom-right corner
- **All Original Game Logic**: Same piece shapes, placement rules, and validation

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once created, go to Project Settings (gear icon)

### 2. Enable Firebase Realtime Database

1. In your Firebase project, go to "Realtime Database" in the left menu
2. Click "Create Database"
3. Choose a location close to your users
4. Start in **test mode** for development (make sure to add security rules later!)

### 3. Get Your Firebase Configuration

1. In Project Settings, scroll down to "Your apps"
2. Click the web icon (`</>`) to add a web app
3. Register your app with a nickname
4. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 4. Update the Game Code

1. Open `index.html` in a text editor
2. Find the Firebase configuration section (around line 700)
3. Replace the placeholder values with your actual Firebase config:

```javascript
// FIREBASE CONFIGURATION
// Replace these values with your Firebase project config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",              // Replace with your API key
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 5. Set Up Firebase Security Rules (Important!)

For production, you should add proper security rules. In Firebase Console > Realtime Database > Rules:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt"]
      }
    }
  }
}
```

For better security in production:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": "!data.exists() || data.child('players').child(auth.uid).exists()",
        ".validate": "newData.hasChildren(['gameState', 'players'])",
        "gameState": {
          ".validate": "newData.hasChildren(['board', 'currentPlayerIndex', 'passCount'])"
        }
      }
    }
  }
}
```

### 6. Run the Game

Simply open `index.html` in a web browser. No build process or server needed!

You can also host it:
- **GitHub Pages**: Push to a repo and enable GitHub Pages
- **Firebase Hosting**: Use `firebase deploy`
- **Any static host**: Netlify, Vercel, etc.

## How to Play

### Game Flow

1. **Create a Room**:
   - Player 1 clicks "Create Room"
   - A 6-digit room code is generated
   - Share this code with your opponent
   - Wait for them to join

2. **Join a Room**:
   - Player 2 clicks "Join Room"
   - Enter the 6-digit code
   - Click "Join" to start the game

3. **Gameplay**:
   - Blue player (Player 1) goes first
   - Select a piece from the right panel
   - Rotate/Flip the piece as needed
   - Click on the board to place it
   - First piece must cover your starting corner (★)
   - Subsequent pieces must touch corner-to-corner (not edge-to-edge!)
   - Take turns until no more moves are possible

4. **Winning**:
   - Game ends when both players pass their turn
   - Score = -1 for each square left in unused pieces
   - Bonus: +15 for using all pieces, +5 extra if the last piece was the 1-square piece
   - Highest score wins!

### Controls

- **Rotate**: Rotates the selected piece 90° clockwise
- **Flip**: Mirrors the selected piece horizontally
- **Deselect**: Cancels piece selection
- **Skip Turn**: Pass your turn if you can't place any pieces
- **Leave Game**: Exit the current game

### Game Rules

1. **First Piece**: Must cover your starting corner
2. **Subsequent Pieces**: 
   - Must touch at least one corner of your existing pieces
   - Cannot touch edges of your pieces
   - Can overlap or touch opponent's pieces in any way
3. **Valid Placement**: Shown with green outline
4. **Invalid Placement**: Shown with red overlay

## Technical Details

### Firebase Data Structure

```
rooms/
  {roomCode}/
    host: true
    players/
      0/
        connected: true
        color: "blue"
        name: "Player 1"
      1/
        connected: true
        color: "red"
        name: "Player 2"
    gameState/
      board: [[null, null, ...], ...]  // 14x14 grid
      pieces/
        0: [{shape, used, rotation, flipped}, ...]  // 21 pieces
        1: [{shape, used, rotation, flipped}, ...]  // 21 pieces
      currentPlayerIndex: 0
      passCount: 0
      gameStarted: true
      gameOver: false
    createdAt: 1234567890
```

### Key Differences from Original

| Feature | Original | Multiplayer |
|---------|----------|-------------|
| Players | 4 (Blue, Yellow, Red, Green) | 2 (Blue, Red) |
| Board Size | 20x20 | 14x14 |
| AI | 3 AI players | No AI |
| Starting Corners | All 4 corners | (0,0) and (13,13) |
| Game Mode | Local single-player vs AI | Online 2-player |
| State Management | Local JavaScript | Firebase Realtime Database |

### Browser Compatibility

Works in all modern browsers that support:
- ES6 modules
- Firebase SDK v10.x
- CSS Grid

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Support

Fully responsive with optimized touch controls for mobile devices.

## Troubleshooting

### "Failed to create room" error
- Check that Firebase config is correct
- Verify Realtime Database is enabled
- Check browser console for specific error messages

### "Room not found" error
- Double-check the 6-digit room code
- Room may have expired (host disconnected)
- Try creating a new room

### Game state not syncing
- Check internet connection
- Verify Firebase Realtime Database rules allow read/write
- Check browser console for Firebase errors

### Players can't join
- Make sure room code is exactly 6 digits
- Host must stay connected for room to remain active
- Only 2 players allowed per room

## Development

The code is structured into clear sections:

1. **Firebase Configuration** (lines ~700-750): Initialize Firebase
2. **Room Management** (lines ~800-950): Create/join/leave rooms
3. **Game State Sync** (lines ~950-1050): Real-time synchronization
4. **Piece Management** (lines ~1050-1150): Rotation, flipping, shapes
5. **Rendering** (lines ~1150-1350): Board, pieces, UI updates
6. **Game Logic** (lines ~1350-1450): Placement validation, rules
7. **Preview System** (lines ~1450-1500): Visual feedback

All Firebase operations are clearly commented with `// FIREBASE:` markers.

## Future Enhancements

Possible improvements:
- Player authentication (Firebase Auth)
- Room persistence and reconnection
- Chat functionality
- Spectator mode
- Game replay/history
- Elo rating system
- Custom board sizes
- Tournament brackets

## License

Based on the original Blokus game. This is a fan-made digital implementation for educational purposes.

## Credits

Original Blokus game by Bernard Tavitian
Digital implementation with Firebase multiplayer support
