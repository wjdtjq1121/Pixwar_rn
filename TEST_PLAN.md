# Test Plan - Multiplayer Blokus

## Pre-Testing Setup

### Requirements
- [ ] Firebase project created
- [ ] Realtime Database enabled
- [ ] Firebase config updated in index.html
- [ ] Two browsers or tabs available
- [ ] Internet connection active

## Test Suite

### 1. Lobby Functionality

**Test 1.1: Initial Load**
- [ ] Open index.html in browser
- [ ] Verify lobby screen displays
- [ ] Verify "Create Room" button visible
- [ ] Verify "Join Room" button visible
- [ ] Verify title shows "Multiplayer Blokus"

**Test 1.2: Room Creation**
- [ ] Click "Create Room" button
- [ ] Verify 6-digit room code appears
- [ ] Verify "Waiting for opponent..." message shows
- [ ] Verify "Cancel" button is available
- [ ] Copy the room code

**Test 1.3: Room Joining**
- [ ] Open index.html in second browser/tab
- [ ] Click "Join Room" button
- [ ] Enter the 6-digit code from Test 1.2
- [ ] Click "Join" button
- [ ] Verify game starts in both browsers

**Test 1.4: Invalid Room Code**
- [ ] Click "Join Room"
- [ ] Enter invalid code (e.g., "000000")
- [ ] Click "Join"
- [ ] Verify error message appears
- [ ] Verify can return to lobby

**Test 1.5: Room Cancellation**
- [ ] Click "Create Room"
- [ ] Click "Cancel" button
- [ ] Verify returns to lobby
- [ ] Verify room code cleared

### 2. Game Start

**Test 2.1: Initial Game State**
- [ ] Both players see game board
- [ ] Room code displayed at top
- [ ] Blue player info shows "You"
- [ ] Red player info shows "Opponent" (or vice versa)
- [ ] Blue player's turn indicated
- [ ] Message shows "Your turn" for blue player
- [ ] Message shows "Opponent's turn" for red player

**Test 2.2: Board Setup**
- [ ] Board is 14×14 grid
- [ ] Top-left corner (0,0) marked
- [ ] Bottom-right corner (13,13) marked
- [ ] Blue's starting corner highlighted with ★
- [ ] All cells are white/empty
- [ ] Grid lines visible

**Test 2.3: Pieces Display**
- [ ] Blue player sees 21 pieces
- [ ] Pieces displayed in grid
- [ ] All pieces colored blue
- [ ] Pieces show correct shapes
- [ ] No pieces marked as used
- [ ] Rotate/Flip/Deselect buttons visible

### 3. Gameplay - First Move

**Test 3.1: Blue Player First Move**
- [ ] Select any piece (e.g., 5-square line)
- [ ] Piece highlights with border
- [ ] Hover over board shows preview
- [ ] Preview shows piece shape
- [ ] Valid placement: green outline
- [ ] Invalid placement: red overlay
- [ ] Click starting corner (0,0)
- [ ] Piece must cover starting corner
- [ ] Piece places successfully
- [ ] Used piece grays out
- [ ] Turn switches to red player

**Test 3.2: Turn Synchronization**
- [ ] Verify red player (second browser) sees:
  - Blue piece on board
  - "Your turn" message
  - Red pieces available
  - Blue's piece count updated
- [ ] Verify blue player sees:
  - "Opponent's turn" message
  - Cannot select pieces
  - Waiting message in piece grid

**Test 3.3: Red Player First Move**
- [ ] Switch to red player browser
- [ ] Select a piece
- [ ] Must cover corner (13,13)
- [ ] Place piece successfully
- [ ] Verify blue player sees red's piece
- [ ] Turn switches back to blue

### 4. Gameplay - Subsequent Moves

**Test 4.1: Corner Contact Rule**
- [ ] Select a piece
- [ ] Try to place touching edge (should fail)
- [ ] Try to place touching corner (should succeed)
- [ ] Verify piece must touch corner-to-corner
- [ ] Verify piece cannot touch edge-to-edge

**Test 4.2: Piece Rotation**
- [ ] Select a piece
- [ ] Click "Rotate" button
- [ ] Verify piece rotates 90°
- [ ] Click 4 times to return to original
- [ ] Try placing rotated piece
- [ ] Verify rotation persists on board

**Test 4.3: Piece Flip**
- [ ] Select a piece
- [ ] Click "Flip" button
- [ ] Verify piece mirrors horizontally
- [ ] Click again to flip back
- [ ] Try placing flipped piece
- [ ] Verify flip persists on board

**Test 4.4: Piece Deselection**
- [ ] Select a piece
- [ ] Click "Deselect" button
- [ ] Verify piece deselects
- [ ] Verify preview clears
- [ ] Verify can select different piece

**Test 4.5: Multi-Turn Play**
- [ ] Play 5 complete turns (blue → red → blue → red → blue)
- [ ] Verify each turn:
  - Piece places correctly
  - Turn switches properly
  - Both players stay synced
  - Piece counts update
  - Messages update correctly

### 5. Real-time Synchronization

**Test 5.1: Board State Sync**
- [ ] Place piece in browser 1
- [ ] Verify appears immediately in browser 2
- [ ] No refresh needed
- [ ] Correct position
- [ ] Correct color
- [ ] Correct shape

**Test 5.2: Turn State Sync**
- [ ] Skip turn in browser 1
- [ ] Verify browser 2 shows turn change
- [ ] Verify messages update
- [ ] Verify correct player can move

**Test 5.3: Piece State Sync**
- [ ] Use piece in browser 1
- [ ] Verify piece grays out
- [ ] Verify piece counts update in both browsers
- [ ] Verify cannot reuse same piece

### 6. Game Controls

**Test 6.1: Skip Turn**
- [ ] Click "Skip Turn" button
- [ ] Verify pass count increments
- [ ] Verify turn switches to opponent
- [ ] Verify message updates

**Test 6.2: Double Skip (Game End)**
- [ ] Player 1 skips turn
- [ ] Player 2 skips turn
- [ ] Verify game over modal appears
- [ ] Verify scores calculated
- [ ] Verify winner/loser shown
- [ ] Verify "Back to Lobby" button visible

**Test 6.3: Leave Game**
- [ ] Click "Leave Game" button
- [ ] Verify confirmation dialog appears
- [ ] Click "OK"
- [ ] Verify returns to lobby
- [ ] Verify other player gets notification (optional)

### 7. Edge Cases

**Test 7.1: Simultaneous Moves (Should Prevent)**
- [ ] Both players try to move at same time
- [ ] Verify only current player can place
- [ ] Verify opponent sees waiting message
- [ ] Verify no conflicts

**Test 7.2: Invalid Placements**
- [ ] Try to place outside board
- [ ] Try to place on occupied square
- [ ] Try to place without corner contact (after first move)
- [ ] Try to place with edge contact
- [ ] Verify all show red preview
- [ ] Verify all prevent placement

**Test 7.3: Host Disconnect**
- [ ] Create room (host)
- [ ] Have opponent join
- [ ] Close host browser
- [ ] Verify room deleted
- [ ] Verify opponent gets notification

**Test 7.4: Guest Disconnect**
- [ ] Create room
- [ ] Have opponent join
- [ ] Close opponent browser
- [ ] Verify host can continue
- [ ] Verify can wait for new opponent (optional)

### 8. Mobile Responsiveness

**Test 8.1: Mobile View**
- [ ] Open on mobile device or resize to 400px width
- [ ] Verify lobby fits on screen
- [ ] Verify room code visible
- [ ] Verify buttons accessible
- [ ] Verify input works

**Test 8.2: Mobile Gameplay**
- [ ] Create/join room on mobile
- [ ] Verify board visible
- [ ] Verify pieces scroll
- [ ] Verify touch works for selection
- [ ] Verify touch works for placement
- [ ] Verify controls accessible

**Test 8.3: Mobile Controls**
- [ ] Test rotate button
- [ ] Test flip button
- [ ] Test deselect button
- [ ] Test skip turn button
- [ ] All should work with touch

### 9. Complete Game

**Test 9.1: Full Game Playthrough**
- [ ] Start new game
- [ ] Play until one player runs out of moves
- [ ] Both players skip
- [ ] Verify game ends
- [ ] Verify scores correct
- [ ] Verify winner declared
- [ ] Return to lobby
- [ ] Start new game successfully

**Test 9.2: Score Calculation**
- [ ] Play game to completion
- [ ] Verify score = -(unused squares)
- [ ] If all pieces used: verify +15 bonus
- [ ] If last piece was 1-square: verify +5 bonus
- [ ] Verify higher score wins

### 10. Performance

**Test 10.1: Load Time**
- [ ] Measure initial page load
- [ ] Should be < 2 seconds

**Test 10.2: Sync Latency**
- [ ] Place piece
- [ ] Time until opponent sees it
- [ ] Should be < 500ms

**Test 10.3: Multiple Games**
- [ ] Create 3 different rooms
- [ ] Play simultaneously
- [ ] Verify all work correctly
- [ ] Verify no interference

## Bug Report Template

If any test fails, report using this format:

```
Test: [Test Number and Name]
Expected: [What should happen]
Actual: [What actually happened]
Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Browser: [Chrome/Firefox/Safari/etc.]
OS: [Windows/Mac/Linux/Mobile]
Firebase Config: [Correctly set? Yes/No]
Console Errors: [Any errors from browser console]
```

## Success Criteria

All tests must pass for production readiness:

- [ ] All Lobby tests pass (5/5)
- [ ] All Game Start tests pass (3/3)
- [ ] All First Move tests pass (3/3)
- [ ] All Subsequent Move tests pass (5/5)
- [ ] All Sync tests pass (3/3)
- [ ] All Control tests pass (3/3)
- [ ] All Edge Case tests pass (4/4)
- [ ] All Mobile tests pass (3/3)
- [ ] All Complete Game tests pass (2/2)
- [ ] All Performance tests pass (3/3)

**Total: 34 test cases**

## Automated Testing (Future)

For future automation:
- Unit tests for game logic
- Integration tests for Firebase
- E2E tests for full gameplay
- Performance benchmarking
- Load testing with multiple concurrent games

## Notes

- Test in multiple browsers: Chrome, Firefox, Safari, Edge
- Test on multiple devices: Desktop, tablet, mobile
- Test with different network conditions
- Test with Firebase rules in production mode
- Test with actual users for UX feedback
