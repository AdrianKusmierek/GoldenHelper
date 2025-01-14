const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const fs = require("fs");

module.exports = {
    permissions: [PermissionsBitField.Flags.Administrator],
    data: new SlashCommandBuilder()
    .setName("strikes")
    .setDescription("Get the number of strikes a user has")
    .addUserOption(option => option
        .setName("user")
        .setDescription("The user to get the strikes of")
        .setRequired(true)
    ),

    async execute(interaction) {
        const user = interaction.options.getMember("user");
        let content = 0;

        const dataFile = fs.readFileSync("./data/strikes.json", "utf8");
        const data = JSON.parse(dataFile);

        if (!data[user.id]) {
            data[user.id] = {
                strikes: 0
            };

            const sendData = fs.writeFileSync("./data/strikes.json", JSON.stringify(data, null, 2), "utf8");
        } else {
            content = data[user.id].strikes;
        }

        let embed = new EmbedBuilder()
        .setColor('#920dff')
        .setTitle(`Strikes`)
        .setAuthor({name: 'GoldenHelper', iconURL:"https://i.imgur.com/o7MkhhK.png"})
        .setDescription(`These are the strikes of ${user.user.tag}`)
        .addFields(
            { name: 'Total Amount of Strikes', value: `${content}`, inline: false }
        );

        interaction.reply({ embeds: [embed] }); 
    }
}