# Claude 자동화 지침

**새 세션을 시작할 때 이 파일을 먼저 읽으세요.**

## 자동 수행 작업

### 1. Firebase Database 규칙 배포 (중요!)
`database.rules.json` 파일을 수정할 때마다 **반드시** 다음 명령어 실행:
```bash
firebase deploy --only database
```
- **이유**: 로컬 파일만 수정해서는 실제 Firebase 서버에 적용되지 않음
- **확인**: 배포 후 `✔ database: rules released successfully` 메시지 확인
- **검증**: https://console.firebase.google.com/u/0/project/pixwar-baf7e/database/pixwar-baf7e-default-rtdb/rules 에서 규칙 적용 확인

### 2. 파일 수정 시 자동 Git 작업
모든 파일 수정 후 다음을 자동으로 수행:
```bash
git add .
git commit -m "설명적인 커밋 메시지"
git push
```

### 3. Version 업데이트
파일 수정 시 `index.html`의 version을 자동으로 증가:
- **위치**: index.html 639번, 747번 라인
- **현재 버전**: v1.8.1
- **형식**: `v{major}.{minor}.{patch}`
- **규칙**:
  - 작은 수정/버그 픽스: patch 증가 (v1.5.0 → v1.5.1)
  - 새로운 기능 추가: minor 증가 (v1.5.0 → v1.6.0)
  - 대규모 변경: major 증가 (v1.5.0 → v2.0.0)

### 4. 업데이트할 version 라인
```html
<!-- 라인 639 -->
<span class="version-badge" style="position: absolute; top: 0; right: 0;">v3.0.4</span>

<!-- 라인 747 -->
<span class="version-badge">v3.0.4</span>
```

## 워크플로우 예시

### 일반 파일 수정 시:
1. 사용자가 파일 수정 요청
2. 파일 수정 수행
3. version 자동 증가 (index.html 두 곳)
4. git add .
5. git commit -m "설명적인 메시지"
6. git push

### Firebase 규칙 수정 시:
1. `database.rules.json` 수정
2. **`firebase deploy --only database` 실행** ← 필수!
3. 배포 성공 메시지 확인
4. version 자동 증가 (index.html 두 곳)
5. git add .
6. git commit -m "설명적인 메시지"
7. git push

## 주의사항
- 모든 수정은 version 업데이트를 포함
- commit 메시지는 변경 내용을 명확히 설명
- push 전 commit 성공 여부 확인
- **Firebase 규칙 수정 시 반드시 배포 명령어 실행!**
