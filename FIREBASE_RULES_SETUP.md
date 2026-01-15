# Firebase Realtime Database 보안 규칙 적용 가이드

## 🚨 현재 상태: 위험!

현재 Firebase Console의 규칙:
```json
{
  "rules": {
    ".read": true,
    ".write": true,
    "rooms": {
      ".indexOn": ["createdAt"]
    }
  }
}
```

**문제점**: 누구나 전체 데이터베이스를 읽고 쓸 수 있습니다!

## ✅ 해결 방법: 안전한 규칙 적용

### 1단계: Firebase Console 접속
1. https://console.firebase.google.com/u/0/project/pixwar-baf7e/database/pixwar-baf7e-default-rtdb/rules 접속
2. "규칙" 탭 클릭

### 2단계: 안전한 규칙 복사
아래 규칙을 **전체 복사**하세요:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt", "currentPlayers"],

        "players": {
          "$playerId": {
            "name": {
              ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 50"
            },
            "color": {
              ".validate": "newData.isString() && (newData.val() == 'blue' || newData.val() == 'yellow' || newData.val() == 'red' || newData.val() == 'green')"
            },
            "connected": {
              ".validate": "newData.isBoolean()"
            },
            "ready": {
              ".validate": "newData.isBoolean()"
            },
            "isAI": {
              ".validate": "newData.isBoolean()"
            },
            "disconnectedAt": {
              ".validate": "newData.isNumber() && newData.val() >= 0"
            },
            "reconnecting": {
              ".validate": "newData.isBoolean()"
            },
            "lastHeartbeat": {
              ".validate": "newData.isNumber() && newData.val() >= 0"
            }
          }
        },

        "gameState": {
          "currentPlayerIndex": {
            ".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 3"
          },
          "passCount": {
            ".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 100"
          },
          "gameStarted": {
            ".validate": "newData.isBoolean()"
          },
          "gameOver": {
            ".validate": "newData.isBoolean()"
          },
          "turnStartTime": {
            ".validate": "newData.isNumber() && newData.val() >= 0"
          },
          "pausedTime": {
            ".validate": "newData.isNumber() && newData.val() >= 0"
          },
          "isPaused": {
            ".validate": "newData.isBoolean()"
          }
        },

        "createdAt": {
          ".validate": "newData.isNumber() && newData.val() >= 0 && (!data.exists() || data.val() == newData.val())"
        },

        "currentPlayers": {
          ".validate": "newData.isNumber() && newData.val() >= 1 && newData.val() <= 4"
        },

        "maxPlayers": {
          ".validate": "newData.isNumber() && (newData.val() == 2 || newData.val() == 3 || newData.val() == 4)"
        },

        "host": {
          ".validate": "newData.isBoolean()"
        }
      }
    }
  }
}
```

### 3단계: Firebase Console에 붙여넣기
1. Firebase Console의 규칙 편집기에서 **기존 내용 전체 삭제**
2. 위에서 복사한 규칙 **붙여넣기**
3. **"게시" 버튼 클릭**

### 4단계: 테스트
1. 게임을 실행하여 정상 작동하는지 확인
2. 방 생성, 참가, 게임 플레이가 모두 정상 작동해야 함

---

## 🛡️ 이 규칙의 보안 기능

### 1. **데이터 구조 제한**
- `rooms/$roomId` 경로에만 읽기/쓰기 허용
- 다른 경로는 접근 불가

### 2. **데이터 타입 검증**
- 플레이어 이름: 문자열, 1-50자
- 색상: blue, yellow, red, green만 허용
- 플레이어 수: 1-4명만 허용
- 모든 숫자 값: 음수 불가

### 3. **불변 데이터 보호**
- `createdAt`: 한번 생성되면 수정 불가

### 4. **성능 최적화**
- `createdAt`, `currentPlayers`에 인덱스 추가

---

## ⚠️ 주의사항

### 현재 규칙의 한계
이 규칙은 **익명 사용자**를 지원하기 위해 모든 사용자가 방을 읽고 쓸 수 있습니다.

### 더 강력한 보안이 필요하다면
Firebase Authentication을 추가하고 다음과 같이 수정:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": "auth != null",
        ".write": "auth != null && (!data.exists() || data.child('players').child(auth.uid).exists())"
      }
    }
  }
}
```

하지만 이 경우 앱에서 Firebase Authentication 로그인을 구현해야 합니다.

---

## ✅ 확인 사항

규칙 적용 후 다음을 확인하세요:

- [ ] Firebase Console에서 규칙이 정상 게시됨
- [ ] 게임 방 생성 가능
- [ ] 게임 방 참가 가능
- [ ] 플레이어 연결 상태 동기화됨
- [ ] 게임 플레이 정상 작동

문제가 발생하면 브라우저 콘솔(F12)에서 에러 메시지를 확인하세요.
