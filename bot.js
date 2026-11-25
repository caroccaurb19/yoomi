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
    if (interaction.commandName === "zr") {
    try {
      const cantidad = interaction.options.getInteger("cantidad", true);
      const color = interaction.options.getString("color", true);
      const casco = interaction.options.getString("casco", true);
      const vehiculo = interaction.options.getString("vehiculo", true);
      const armamento = interaction.options.getString("armamento", true);
      const jurisdiccion = interaction.options.getString("jurisdiccion", true);

      const inicio =
        `Entorno ¿Aló ${jurisdiccion}? Se visualizan [${cantidad}] sujetos enmascarados ` +
        `con vestimentas de color [${color}] [${casco}], ` +
        `portando armamento de [${armamento}]`;

      const entornosZR = [
        `**ENTRANDO**\n${inicio}, entrando a una zona roja en [${vehiculo}], ¡Ayuda!`,
        `**RECOLECTANDO**\n${inicio}, recolectando drogas en una zona roja, estos se movilizan en [${vehiculo}], ¡Ayuda!`,
        `**PROCESANDO**\n${inicio}, procesando drogas en una zona roja, estos se movilizan en [${vehiculo}], ¡Ayuda!`,
        `**SALIENDO**\n${inicio}, saliendo de una zona roja, estos se movilizan en [${vehiculo}], ¡Ayuda!`,
      ];

      await interaction.reply({
        content: entornosZR.join("\n\n"),
        allowedMentions: { parse: [] },
      });
    } catch (error) {
      console.error("Error ejecutando /zr:", error);

      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: "Ocurrió un error al generar los entornos de zona roja.",
          ephemeral: true,
        }).catch(console.error);
      }
    }

    return;
  }

    if (interaction.commandName === "secuestro") {
    try {
      const cantidad = interaction.options.getInteger("cantidad", true);
      const oficiales = interaction.options.getInteger("oficiales", true);
      const color = interaction.options.getString("color", true);
      const casco = interaction.options.getString("casco", true);
      const vehiculo = interaction.options.getString("vehiculo", true);
      const armamento = interaction.options.getString("armamento", true);
      const jurisdiccion = interaction.options.getString("jurisdiccion", true);

      const mensaje =
        `**SECUESTRO DE OFICIALES**\n` +
        `Entorno ¿Aló ${jurisdiccion}? Soy Barack Obama. Estaba revisando meticulosamente cada palabra de un discurso ` +
        `politico importante, considerando el impacto de mis palabras en millones de personas en todo el mundo, ` +
        `cuando de repente fui interrumpido por un asesor con una expresion preocupada en su rostro, ` +
        `al acercarme vi a [${cantidad}] sujetos enmascarados ` +
        `vestidos de color [${color}] [${casco}], portando armamento ` +
        `de [${armamento}]. Los cuales estarían secuestrando a [${oficiales}] oficiales, ` +
        `estos se movilizan en un [${vehiculo}], ¡Estos son muy peligrosos por favor asistir rapido al llamado!`;

      await interaction.reply({
        content: mensaje,
        allowedMentions: { parse: [] },
      });
    } catch (error) {
      console.error("Error ejecutando /secuestro-policias:", error);

      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: "Ocurrió un error al generar el entorno.",
          ephemeral: true,
        }).catch(console.error);
      }
    }

    return;
  }
  
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
      `**SECUESTRANDO**\nEntorno ${saludo} Se verían [${cantidad}] sujetos con vestimentas de color [${color}], enmascarados [${casco}], portando armamento de [${armamento}]; al parecer estarían secuestrando civiles para realizar un robo a [${lugar}] y se movilizan en un [${vehiculo}], ¡Ayuda!`,

      `**ROBANDO**\nEntorno ${saludo} Se verían [${cantidad}] sujetos con vestimentas de color [${color}], enmascarados [${casco}], portando armamento de [${armamento}]; al parecer estarían robando [${lugar}] [tendrían ${rehenes} rehenes] y se movilizan en un [${vehiculo}], ¡Ayuda!`,

      `**PINCHANDO**\nEntorno ${saludo} Se verían [${cantidad}] sujetos con vestimentas de color [${color}], enmascarados [${casco}], portando armamento de [${armamento}]; al parecer estarían [PINCHANDO RUEDAS A OFICIALES] y se movilizan en un [${vehiculo}], ¡Ayuda!`,

      `**ABATIENDO**\nEntorno ${saludo} Se verían [${cantidad}] sujetos con vestimentas de color [${color}], enmascarados [${casco}], portando armamento de [${armamento}]; al parecer estarían [ABATIENDO A OFICIALES] y se movilizan en un [${vehiculo}], ¡Ayuda!`,

      `**HUIDA**\nEntorno ${saludo} Se verían [${cantidad}] sujetos con vestimenta color [${color}], enmascarados [${casco}], abordando un [${vehiculo}] y portando [${armamento}], huyendo del lugar tras haber robado [${lugar}] dada la nula presencia policial.`,
    ];

    await interaction.reply({
      content: entornos.join("\n\n"),
      allowedMentions: { parse: [] },
    });
  } catch (error) {
    console.error("Error ejecutando /robos:", error);

    const mensaje = {
      content: "Ocurrió un error al generar los entornos. Revisa los registros del bot.",
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(mensaje).catch(console.error);
    } else {
      await interaction.reply(mensaje).catch(console.error);
    }
  }
});

client.login(process.env.BOT_TOKEN);
