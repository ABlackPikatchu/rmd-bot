const emoji = require('../JSON/emoji')
const animatedEmoji = require('../JSON/animated_emoji')
module.exports = {
    messageID: '885805630227640331',
    channelID: '871030810139066383',
    roles: [
        //Ping-able roles
        {id: '883655077187973180', emoji: 'announcement', name: 'Announcements Ping'},
        {id: '883655230569472022', emoji: emoji.jigsaw, name: 'Showcases Fan'},
        {id: '885814710077894698', emoji: 'keep_calm', name: 'Everything Ping'},

        //Misc Roles
        {id: '883782063990394910', emoji: 'animated_test_tubes', name: "Mod Tester"},
        {id: '883789306135728178', emoji: emoji.art, name: "Artist"}
    ],
    DMMessage: true
}