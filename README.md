# Agent Office Discord

Anime-style Discord office for AI agent teams.

## MVP

- Discord slash command: `/작업요청`
- Team routing by Korean prefix:
  - `[마케팅팀]`
  - `[부업팀]`
  - `[개발팀]`
- Anime-style character assignments
- Business-style meeting visualization
- Approval card buttons: approve, revise, reopen meeting, discard
- Claude-ready character metadata, without model calls yet

## Visual Workflow

```text
User request
  ↓
Character meeting starts
  ↓
Business task card appears
  ↓
Approval buttons wait for owner decision
```

Example Discord flow:

```text
회의 시작: 마케팅팀 긴급 브리핑

지아 · CMO, 전략과 최종 검수
“목표를 전환 관점으로 정리하겠습니다.”

루나 · 콘텐츠 작가
“초안은 자연스럽고 사람 말투에 가깝게 잡겠습니다.”

비즈니스 작업 카드
상태: 회의 완료 → 초안 대기 → 검수 대기 → 승인 대기
진행: 목표 정리 완료, 담당 캐릭터 배정 완료, 승인 카드 생성 완료

[승인] [수정 요청] [회의 다시 열기] [폐기]
```

## Setup

```bash
pnpm install
cp .env.example .env
# Fill DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID
bun run dev
```

## Example

```text
/작업요청 요청:[마케팅팀] 이사 견적 지식인 답변 5개 초안 만들어줘
```

## Characters

- 지아: CMO, 전략과 최종 검수
- 루나: 콘텐츠 작가
- 민: 수익기회 헌터
- 카이: CTO, 설계와 리뷰
- 준: 빌더, 구현 담당
