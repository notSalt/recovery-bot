const { SapphireClient } = require("@sapphire/framework");
const config = require("../config.json");

const client = new SapphireClient({
	loadMessageCommandListeners: true,
	defaultPrefix: ".",
	intents: ["GUILDS", "GUILD_MESSAGES"],
});

client.login(config.token);
