import type { AgentCharacter } from "../agents/characters";
import { TeamKey } from "./task";

export const VisualStage = {
  Briefing: "briefing",
  Drafting: "drafting",
  Reviewing: "reviewing",
  ApprovalPending: "approval_pending",
  Done: "done",
} as const;

export type VisualStage = (typeof VisualStage)[keyof typeof VisualStage];

export type MeetingLine = {
  readonly speaker: string;
  readonly role: string;
  readonly line: string;
};

export type TaskVisualPacket = {
  readonly title: string;
  readonly stage: VisualStage;
  readonly stageLabel: string;
  readonly progressLines: readonly string[];
  readonly meetingLines: readonly MeetingLine[];
};

export function createTaskVisualPacket(
  team: TeamKey,
  requestBody: string,
  agents: readonly AgentCharacter[],
): TaskVisualPacket {
  return {
    title: createVisualTitle(team),
    stage: VisualStage.ApprovalPending,
    stageLabel: "회의 완료 → 초안 대기 → 검수 대기 → 승인 대기",
    progressLines: ["목표 정리 완료", "담당 캐릭터 배정 완료", "승인 카드 생성 완료"],
    meetingLines: agents.map((agent) => ({
      speaker: agent.name,
      role: agent.role,
      line: createCharacterLine(agent.id, requestBody),
    })),
  };
}

function createVisualTitle(team: TeamKey): string {
  switch (team) {
    case TeamKey.Marketing:
      return "마케팅팀 긴급 브리핑";
    case TeamKey.SideHustle:
      return "부업팀 수익화 작전 회의";
    case TeamKey.Development:
      return "개발팀 구현 스탠드업";
  }
}

function createCharacterLine(agentId: string, requestBody: string): string {
  switch (agentId) {
    case "jia":
      return `목표를 전환 관점으로 정리하겠습니다. 요청: ${requestBody}`;
    case "luna":
      return "초안은 자연스럽고 사람 말투에 가깝게 잡겠습니다.";
    case "min":
      return "수익화 포인트와 테스트 가능성을 같이 보겠습니다.";
    case "kai":
      return "구조와 권한 경계를 먼저 확인하겠습니다.";
    case "jun":
      return "구현 단위로 쪼개서 바로 실행 가능한 형태로 만들겠습니다.";
    default:
      return "담당 범위 확인했습니다.";
  }
}
