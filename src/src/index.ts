import "dotenv/config";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import { agentCharacters, agentsForTeam } from "./agents/characters";
import { loadEnv } from "./config/env";
import { parseOfficeRequest } from "./discord/requestParser";
import { createTaskId } from "./domain/task";

const env = loadEnv(process.env);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const requestCommand = new SlashCommandBuilder()
  .setName("작업요청")
  .setDescription("에이전트 오피스에 작업을 요청합니다")
  .addStringOption((option) =>
    option
      .setName("요청")
      .setDescription("예: [마케팅팀] 지식인 답변 초안 5개 만들어줘")
      .setRequired(true),
  );

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Agent Office online as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand() && interaction.commandName === "작업요청") {
    const rawRequest = interaction.options.getString("요청", true);
    const parsed = parseOfficeRequest(rawRequest);
    const taskId = createTaskId(`task_${Date.now().toString()}`);
    const assignedAgents = agentsForTeam(parsed.team);
    const assignedNames = assignedAgents.map((agent) => `**${agent.name}**: ${agent.role}`).join("\n");
    const firstAgent = assignedAgents[0];
    const message = [
      "## [승인 필요] 새 작업 초안",
      `작업 ID: \`${taskId.value}\``,
      `팀: \`${parsed.team}\``,
      "",
      "### 요청",
      parsed.body,
      "",
      "### 담당 캐릭터",
      assignedNames,
      "",
      `대표 멘트: ${firstAgent?.catchphrase ?? "확인했습니다."}`,
    ].join("\n");

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`approve:${taskId.value}`)
        .setLabel("승인")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`revise:${taskId.value}`)
        .setLabel("수정 요청")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(`discard:${taskId.value}`)
        .setLabel("폐기")
        .setStyle(ButtonStyle.Danger),
    );

    await interaction.reply({ content: message, components: [row] });
    return;
  }

  if (interaction.isButton()) {
    await interaction.reply({ content: `처리됨: ${interaction.customId}`, ephemeral: true });
  }
});

const rest = new REST({ version: "10" }).setToken(env.DISCORD_TOKEN);
await rest.put(Routes.applicationGuildCommands(env.DISCORD_CLIENT_ID, env.DISCORD_GUILD_ID), {
  body: [requestCommand.toJSON()],
});
await client.login(env.DISCORD_TOKEN);

export { agentCharacters, requestCommand };
