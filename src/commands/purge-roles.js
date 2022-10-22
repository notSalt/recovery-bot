const { Command } = require("@sapphire/framework");

class PurgeRolesCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: "purge-roles",
			aliases: ["purge-roles", "pr"],
			description: "purge the bad roles",
		});
	}

	async messageRun(message) {
		const guild = message.guild;

		// Purge all roles that match the filter
		const roles = await guild.roles.fetch();
		const toPurge = roles.filter((r) => r.name === "Crashed By JuniperDark"); // Change this to the hacked roles
		let purged = 0;
		const statusMsg = await message.reply(
			`Purging ${toPurge.size} roles\nProgress: ${purged}/${toPurge.size}`
		);
		for (const purging of toPurge) {
			if (purging[1].editable) await purging[1].delete();
			await statusMsg.edit(
				`Purging ${toPurge.size} roles\nProgress: ${++purged}/${toPurge.size}`
			);
		}
	}
}

module.exports = {
	PurgeRolesCommand,
};
