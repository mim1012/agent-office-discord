import { TeamKey } from "../domain/task";

export type AgentCharacter = {
  readonly id: string;
  readonly name: string;
  readonly team: TeamKey;
  readonly model: "claude" | "manual";
  readonly role: string;
  readonly animeArchetype: string;
  readonly catchphrase: string;
};

export const agentCharacters = [
  {
    id: "jia",
    name: "지아",
    team: TeamKey.Marketing,
    model: "claude",
    role: "CMO, 전략과 최종 검수",
    animeArchetype: "차분한 학생회장형",
    catchphrase: "전환 관점에서 다시 볼게요.",
  },
  {
    id: "luna",
    name: "루나",
    team: TeamKey.Marketing,
    model: "claude",
    role: "콘텐츠 작가, 블로그와 SNS 초안",
    animeArchetype: "밝은 문예부 에이스",
    catchphrase: "사람이 쓴 것처럼 자연스럽게 다듬을게요.",
  },
  {
    id: "min",
    name: "민",
    team: TeamKey.SideHustle,
    model: "manual",
    role: "수익기회 헌터, 캠페인 탐색",
    animeArchetype: "돈 냄새 맡는 천재 상인",
    catchphrase: "이건 바로 테스트해볼 만합니다.",
  },
  {
    id: "kai",
    name: "카이",
    team: TeamKey.Development,
    model: "claude",
    role: "CTO, 설계와 리뷰",
    animeArchetype: "쿨한 안경 선배",
    catchphrase: "구조적으로 안전한 쪽으로 갑시다.",
  },
  {
    id: "jun",
    name: "준",
    team: TeamKey.Development,
    model: "manual",
    role: "빌더, 구현 담당",
    animeArchetype: "말수 적은 장인 캐릭터",
    catchphrase: "구현 들어갑니다.",
  },
] as const satisfies readonly AgentCharacter[];

export function agentsForTeam(team: TeamKey): readonly AgentCharacter[] {
  return agentCharacters.filter((agent) => agent.team === team);
}
