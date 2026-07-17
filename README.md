# Agent Office Discord

Anime-style Discord office for AI agent teams.

## MVP

- Discord slash command: `/작업요청`
- Team routing by Korean prefix:
  - `[마케팅팀]`
  - `[부업팀]`
  - `[개발팀]`
- Anime-style character assignments
- Approval card buttons: approve, revise, discard
- Claude-ready character metadata, without model calls yet

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
