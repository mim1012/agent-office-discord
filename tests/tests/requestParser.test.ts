import { describe, expect, it } from "bun:test";
import { parseOfficeRequest } from "../src/discord/requestParser";
import { TeamKey } from "../src/domain/task";

describe("parseOfficeRequest", () => {
  it("returns marketing team when Korean marketing label is provided", () => {
    // Given
    const rawInput = "[마케팅팀] 지식인 답변 5개 초안";

    // When
    const parsed = parseOfficeRequest(rawInput);

    // Then
    expect(parsed).toEqual({ team: TeamKey.Marketing, body: "지식인 답변 5개 초안" });
  });

  it("returns development team when Korean development label is provided", () => {
    // Given
    const rawInput = "[개발팀] 승인 카드 버튼 구현";

    // When
    const parsed = parseOfficeRequest(rawInput);

    // Then
    expect(parsed).toEqual({ team: TeamKey.Development, body: "승인 카드 버튼 구현" });
  });

  it("defaults to marketing team when label is omitted", () => {
    // Given
    const rawInput = "블로그 글 초안 만들어줘";

    // When
    const parsed = parseOfficeRequest(rawInput);

    // Then
    expect(parsed).toEqual({ team: TeamKey.Marketing, body: "블로그 글 초안 만들어줘" });
  });
});
