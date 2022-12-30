const { Command } = require("discom");
const util = require("util");
const brandUtil = require(global.utilLib);

module.exports = new Command({
  name: "reload",
  category: "admin",
  description: "Reloads all commands",
  usage: "reload",
  userId: global.admins,
  onError: async ({ reply }, error) => {
    return brandUtil.handleError(reply, error);
  },
  async run({ client, reply }) {
    for (let command of client.commands) {
      command[1].reload();
    }

    await reply({ content: "Reloaded all commands!" });
  },
});
