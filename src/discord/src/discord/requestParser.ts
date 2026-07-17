import { z } from "zod";
import { TeamKey } from "../domain/task";

export type ParsedOfficeRequest = {
  readonly team: TeamKey;
  readonly body: string;
};

const requestSchema = z.string().min(1);

export function parseOfficeRequest(rawInput: string): ParsedOfficeRequest {
  const input = requestSchema.parse(rawInput).trim();
  const match = /^\[(마케팅팀|부업팀|개발팀)\]\s*(.+)$/s.exec(input);
  if (match === null) {
    return { team: TeamKey.Marketing, body: input };
  }

  const label = match[1];
  const body = match[2];
  switch (label) {
    case "마케팅팀":
      return { team: TeamKey.Marketing, body };
    case "부업팀":
      return { team: TeamKey.SideHustle, body };
    case "개발팀":
      return { team: TeamKey.Development, body };
  }
}
