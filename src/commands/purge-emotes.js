const { Command } = require("@sapphire/framework");

class PurgeEmojisCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: "purge-emojis",
			aliases: ["purge-emojis", "pe"],
			description: "purge the bad emojis",
		});
	}

	async messageRun(message) {
		const guild = message.guild;

		// Purge all emojis
		const emojis = await guild.emojis.fetch();
		emojis.delete(message.channel.id);
		let purged = 0;
		const statusMsg = await message.reply(
			`Purging ${emojis.size} emojis\nProgress: ${purged}/${emojis.size}`
		);
		for (const emoji of emojis) {
			if (emoji[1].deletable) await emoji[1].delete();
			await statusMsg.edit(
				`Purging ${emojis.size} emojis\nProgress: ${++purged}/${emojis.size}`
			);
		}
	}
}

module.exports = {
	PurgeEmojisCommand,
};
