import { describe, expect, it } from "bun:test";
import { agentCharacters, agentsForTeam } from "../src/agents/characters";
import { createTaskVisualPacket, VisualStage } from "../src/domain/taskVisual";
import { TeamKey } from "../src/domain/task";

describe("createTaskVisualPacket", () => {
  it("creates a marketing meeting packet when a marketing request arrives", () => {
    // Given
    const agents = agentsForTeam(TeamKey.Marketing);

    // When
    const packet = createTaskVisualPacket(TeamKey.Marketing, "지식인 답변 5개", agents);

    // Then
    expect(packet.title).toBe("마케팅팀 긴급 브리핑");
    expect(packet.stage).toBe(VisualStage.ApprovalPending);
    expect(packet.meetingLines).toHaveLength(2);
  });

  it("uses every assigned character as a meeting speaker", () => {
    // Given
    const agents = agentCharacters;

    // When
    const packet = createTaskVisualPacket(TeamKey.Development, "봇 상태 카드 개선", agents);

    // Then
    expect(packet.meetingLines.map((line) => line.speaker)).toContain("카이");
  });
});
