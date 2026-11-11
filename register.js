import "dotenv/config";
import { REST, Routes, SlashCommandBuilder } from "discord.js";

const command = new SlashCommandBuilder()
  .setName("robos")
  .setDescription("Publica cinco entornos de roleplay")
  .setIntegrationTypes(0, 1)
  .setContexts(0, 1, 2)
  .addIntegerOption(option =>
    option
      .setName("cantidad")
      .setDescription("Cantidad de personas")
      .setMinValue(1)
      .setMaxValue(99)
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName("color")
      .setDescription("Color de la vestimenta")
      .setMaxLength(30)
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName("casco")
      .setDescription("CON/SIN CASCO")
      .setRequired(true)
      .addChoices(
        { name: "Con casco", value: "Con casco" },
        { name: "Sin casco", value: "Sin casco" }
      )
  )
  .addStringOption(option =>
    option
      .setName("lugar")
      .setDescription("Elige el lugar o tipo de incidente")
      .setRequired(true)
      .addChoices(
        { name: "Secuestro Civiles", value: "Secuestro Civiles" },
        { name: "Ammu-Nation", value: "Ammu-Nation" },
        { name: "Recolección Drogas", value: "Recolección Drogas" },
        { name: "Procesado de Drogas", value: "Procesado de Drogas" },
        { name: "Digital Den", value: "Digital Den" },
        { name: "Venta de Drogas", value: "Venta de Drogas" },
        { name: "Venta de Armas", value: "Venta de Armas" },
        { name: "Venta de Cargamento", value: "Venta de Cargamento" },
        { name: "Banco Fleeca", value: "Banco Fleeca" },
        { name: "Joyería", value: "Joyería" },
        { name: "Robo a Yate", value: "Robo a Yate" },
        { name: "Life invader", value: "Life invader" },
        { name: "Banco de Paleto", value: "Banco de Paleto" },
        { name: "Secuestro a LSPD/Sheriff", value: "Secuestro a LSPD/Sheriff" },
        { name: "Asalto a porta aviones", value: "Asalto a porta aviones" },
        { name: "Banco Central", value: "Banco Central" },
        { name: "Laboratorio Humane", value: "Laboratorio Humane" }
      )
  )
  .addStringOption(option =>
    option
      .setName("vehiculo")
      .setDescription("Vehículos y colores, por ejemplo Yugular morado, Roosevelt negro")
      .setMaxLength(100)
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName("armamento")
      .setDescription("Elige el nivel de armamento")
      .setRequired(true)
      .addChoices(
        { name: "Bajo calibre", value: "BAJO CALIBRE" },
        { name: "Medio calibre", value: "MEDIO CALIBRE" },
        { name: "Alto calibre", value: "ALTO CALIBRE" }
      )
  )
  .addStringOption(option =>
    option
      .setName("jurisdiccion")
      .setDescription("Elige la jurisdicción")
      .setRequired(true)
      .addChoices(
        { name: "LSPD", value: "LSPD" },
        { name: "Sheriff", value: "Sheriff" }
      )
  )
  .addIntegerOption(option =>
    option
      .setName("rehenes")
      .setDescription("Cantidad de rehenes; por defecto serán 4")
      .setMinValue(1)
      .setMaxValue(99)
      .setRequired(false)
  );

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

await rest.put(
  Routes.applicationCommands(process.env.APP_ID),
  { body: [command.toJSON()] }
);

console.log("Comando /robos registrado globalmente.");
