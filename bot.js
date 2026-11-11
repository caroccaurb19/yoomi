
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

  try {
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

      `**HUIDA**\n entorno ${saludo} Se verian [${cantidad}] sujetos con vestimenta color [${color}], enmarcarados [${casco}], abordando un [${vehiculo}] portando [${armamento}], huyendo del lugar tras haber robado [${lugar}] dada la nula presencia policial.`
    ];

    // Primer entorno como respuesta inicial
    await interaction.reply({
      content: entornos[0],
      allowedMentions: { parse: [] }
    });

    // Los cuatro restantes como respuestas adicionales
    for (const entorno of entornos.slice(1)) {
      await interaction.followUp({
        content: entorno,
        allowedMentions: { parse: [] }
      });
    }

  } catch (error) {
    console.error("Error ejecutando /robos:", error);

    const mensaje = {
      content: "Ocurrió un error al generar los entornos. Revisa los registros del bot.",
      ephemeral: true
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(mensaje).catch(console.error);
    } else {
      await interaction.reply(mensaje).catch(console.error);
    }
  }
});

client.login(process.env.BOT_TOKEN);
