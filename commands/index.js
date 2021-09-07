module.exports = {
    Ping: require('./ping'),
    Pong: require('./pong'),
    Github: require('./github'),
    CurseForge: require('./curseforge'),
    Hi: require('./hi'),
    Rule: require('./rule'),
    Good_Night: require('./good_night'),
    Embed: require('./embed'),

    //Moderation
    Slowmode: require('./moderation/slowmode'),
    Role: require('./moderation/role'),
    Lock: require('./moderation/lock'),
    Unlock: require('./moderation/unlock'),
    Kick: require('./moderation/kick'),
    Mute: require('./moderation/mute'),
    Unmute: require('./moderation/unmute'),
    Ban: require('./moderation/ban'),
    Unban: require('./moderation/unban'),
    Clear: require('./moderation/clear'),

    //Utilities
    Suggest: require('./utilities/suggest'),
    Uptime: require('./utilities/uptime')
  };