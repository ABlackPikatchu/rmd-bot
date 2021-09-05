module.exports = {
    name: 'rule',
    description: 'Rules!',
    execute(msg, args) {
        if (args == 3)
        msg.reply(
            "**3. No Advertising** \n" +
            " > Includes DM Advertising. We do not allow advertising here of any kind unless done in 🎉︱self-promotion!"
        );
    }
};
