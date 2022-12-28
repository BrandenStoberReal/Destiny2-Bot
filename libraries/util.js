module.exports.handleError = async function handleError(reply, error) {
	if (typeof error !== 'string') error = util.inspect(error, { depth: 0 });
	const embed = new Discord.EmbedBuilder()
		.setTitle('Something went wrong!')
		.setDescription('\`\`\`js\n' + error + '\n\`\`\`')
		.setColor('#ED4245')
		.setTimestamp()
		.setFooter({ text: 'Skill issue istg' });

	return await reply({ embeds: [embed], ephemeral: true }).catch(() => { });
};