import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  type APIEmbedField,
} from "discord.js";
import type { AgentCharacter } from "../agents/characters";
import type { TaskId, TeamKey } from "../domain/task";
import type { TaskVisualPacket } from "../domain/taskVisual";

export type VisualDiscordMessage = {
  readonly embeds: readonly EmbedBuilder[];
  readonly components: readonly ActionRowBuilder<ButtonBuilder>[];
};

export function buildVisualDiscordMessage(input: {
  readonly taskId: TaskId;
  readonly team: TeamKey;
  readonly requestBody: string;
  readonly agents: readonly AgentCharacter[];
  readonly packet: TaskVisualPacket;
}): VisualDiscordMessage {
  const meetingEmbed = new EmbedBuilder()
    .setColor(teamColor(input.team))
    .setTitle(`회의 시작: ${input.packet.title}`)
    .setDescription(input.requestBody)
    .addFields(createMeetingFields(input.packet))
    .setFooter({ text: `Agent Office · ${input.taskId.value}` });

  const statusEmbed = new EmbedBuilder()
    .setColor(0x8b5cf6)
    .setTitle("비즈니스 작업 카드")
    .addFields(
      { name: "상태", value: input.packet.stageLabel, inline: false },
      { name: "담당", value: input.agents.map((agent) => `${agent.name}: ${agent.role}`).join("\n"), inline: false },
      { name: "진행", value: input.packet.progressLines.map((line) => `✓ ${line}`).join("\n"), inline: false },
    );

  return {
    embeds: [meetingEmbed, statusEmbed],
    components: [createApprovalRow(input.taskId)],
  };
}

function createMeetingFields(packet: TaskVisualPacket): readonly APIEmbedField[] {
  return packet.meetingLines.map((line) => ({
    name: `${line.speaker} · ${line.role}`,
    value: `“${line.line}”`,
    inline: false,
  }));
}

function createApprovalRow(taskId: TaskId): ActionRowBuilder<ButtonBuilder> {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`approve:${taskId.value}`)
      .setLabel("승인")
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(`revise:${taskId.value}`)
      .setLabel("수정 요청")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(`meeting:${taskId.value}`)
      .setLabel("회의 다시 열기")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(`discard:${taskId.value}`)
      .setLabel("폐기")
      .setStyle(ButtonStyle.Danger),
  );
}

function teamColor(team: TeamKey): number {
  switch (team) {
    case "marketing":
      return 0xf472b6;
    case "side_hustle":
      return 0xf59e0b;
    case "development":
      return 0x60a5fa;
  }
}
