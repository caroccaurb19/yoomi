import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, bot => {
  console.log(`Conectado como ${bot.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "robos") return;

  const cantidad = interaction.options.getInteger("cantidad", true);
  const color = interaction.options.getString("color", true);
  const casco = interaction.options.getString("casco", true);
  const lugar = interaction.options.getString("lugar", true);
  const vehiculo = interaction.options.getString("vehiculo", true);
  const armamento = interaction.options.getString("armamento", true);
  const jurisdiccion = interaction.options.getString("jurisdiccion", true);
  const rehenes = interaction.options.getInteger("rehenes") ?? 4;

  const saludo = `¿Aló ${jurisdiccion}?`;

  const entornos = [
    `**SECUESTRANDO**\n entorno ${saludo} Se verian [${cantidad}] sujetos con vestimentas de color [${color}], enmarcarados [${casco}], portando armamento de [${armamento}], al parecer estarían secuestrando civiles para realizar un robo a [${lugar}] y se movilizan en un [${vehiculo}], ¡Ayuda!`,

    `**ROBANDO**\n entorno ${saludo} Se verian [${cantidad}] sujetos con vestimentas de color [${color}], enmarcarados [${casco}], portando armamento de [${armamento}], al parecer estarían robando [${lugar}] [tendrían ${rehenes} rehenes] y se movilizan en un [${vehiculo}], ¡Ayuda!`,

    `**PINCHANDO**\n entorno ${saludo} Se verian [${cantidad}] sujetos con vestimentas de color [${color}], enmarcarados [${casco}], portando armamento de [${armamento}], al parecer estarían [PINCHANDO RUEDAS A OFICIALES] y se movilizan en un [${vehiculo}], ¡Ayuda!`,

    `**ABATIENDO**\n entorno ${saludo} Se verian [${cantidad}] sujetos con vestimentas de color [${color}], enmarcarados [${casco}], portando armamento de [${armamento}], al parecer estarían [ABATIENDO A OFICIALES] y se movilizan en un [${vehiculo}], ¡Ayuda!`,

    `**HUIDA**\n entorno ${saludo} Se verian [${cantidad}] sujetos con vestimenta color [${color}], enmarcarados [${casco}], abordando un [${vehiculo}] portando [${armamento}], huyendo del lugar tras haber robado [${lugar}] dada la nula presencia policial.`,
  ];

  await interaction.reply(entornos.join("\n\n"));
});

client.login(process.env.BOT_TOKEN);