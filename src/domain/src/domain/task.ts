export type TaskId = {
  readonly kind: "TaskId";
  readonly value: string;
};

export const TeamKey = {
  Marketing: "marketing",
  SideHustle: "side_hustle",
  Development: "development",
} as const;

export type TeamKey = (typeof TeamKey)[keyof typeof TeamKey];

export const TaskStatus = {
  Drafted: "drafted",
  Approved: "approved",
  RevisionRequested: "revision_requested",
  Discarded: "discarded",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export type OfficeTask = {
  readonly id: TaskId;
  readonly team: TeamKey;
  readonly title: string;
  readonly request: string;
  readonly status: TaskStatus;
  readonly assignedAgentIds: readonly string[];
};

export function createTaskId(value: string): TaskId {
  if (value.length === 0) {
    throw new RangeError("TaskId cannot be empty");
  }
  return { kind: "TaskId", value };
}
