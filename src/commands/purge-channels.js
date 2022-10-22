const { Command } = require("@sapphire/framework");

class PurgeChannelsCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: "purge-channels",
			aliases: ["purge-channels", "pc"],
			description: "purge the bad channels",
		});
	}

	async messageRun(message) {
		const guild = message.guild;

		// Purge all channels except channel commands is in
		const channels = await guild.channels.fetch();
		channels.delete(message.channel.id);
		let purged = 0;
		const statusMsg = await message.reply(
			`Purging ${channels.size} channels\nProgress: ${purged}/${channels.size}`
		);
		for (const channel of channels) {
			if (channel[1].deletable) await channel[1].delete();
			await statusMsg.edit(
				`Purging ${channels.size} channels\nProgress: ${++purged}/${
					channels.size
				}`
			);
		}
	}
}

module.exports = {
	PurgeChannelsCommand,
};
