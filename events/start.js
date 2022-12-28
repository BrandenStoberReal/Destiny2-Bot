module.exports = {
  name: "ready",
  async execute(interaction, client) {
    console.log("Logged into " + client.user.tag + "!");
  },
};
