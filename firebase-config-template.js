// Firebase Configuration Template
// Copy this and replace the values in index.html (around line 698)

const firebaseConfig = {
    // Get this from: Firebase Console > Project Settings > General > Your apps > Web app
    
    apiKey: "YOUR_API_KEY",
    // Example: "AIzaSyBXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX"
    
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    // Example: "blokus-multiplayer.firebaseapp.com"
    
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    // Example: "https://blokus-multiplayer-default-rtdb.firebaseio.com"
    // IMPORTANT: This must be your Realtime Database URL, not Firestore!
    
    projectId: "YOUR_PROJECT_ID",
    // Example: "blokus-multiplayer"
    
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    // Example: "blokus-multiplayer.appspot.com"
    
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    // Example: "123456789012"
    
    appId: "YOUR_APP_ID"
    // Example: "1:123456789012:web:abcdef123456789abc"
};

// CHECKLIST:
// [ ] Created Firebase project
// [ ] Enabled Realtime Database (NOT Firestore!)
// [ ] Set database rules to test mode
// [ ] Got config from Project Settings
// [ ] Replaced ALL placeholder values above
// [ ] No quotes or commas missing
// [ ] Saved index.html
// [ ] Tested by opening in browser
// [ ] Created room successfully
// [ ] Joined room from another tab/browser
// [ ] Both players can see the game!

// COMMON MISTAKES:
// ❌ Using Firestore URL instead of Realtime Database URL
// ❌ Forgetting to enable Realtime Database
// ❌ Leaving placeholder values like "YOUR_API_KEY"
// ❌ Missing quotes or commas in config object
// ❌ Database rules blocking read/write access

// WHERE TO FIND EACH VALUE:
// 1. Go to: https://console.firebase.google.com/
// 2. Select your project
// 3. Click ⚙️ (Settings) > Project settings
// 4. Scroll to "Your apps" section
// 5. If no web app exists, click </> to create one
// 6. Copy the entire firebaseConfig object shown
