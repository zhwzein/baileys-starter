const { MessageType } = require('@adiwajshing/baileys')
const { text, extendedText } = MessageType

// function to get group admin from participants
const getGroupAdmins = (participants) => {
    admins = []
    for (let participant of participants) {
        participant.isAdmin ? admins.push(participant.jid) : null
    }

    return admins
}

const reply = (client, to, content, quoted) => {
    client.sendMessage(to, content, text, { quoted: quoted })
}

const sendText = (client, to, content) => {
    client.sendMessage(to, content, text)
}

const sendTextMention = (client, to, content, mentionid, quoted) => {
    if (quoted === undefined || quoted !== true) {
        client.sendMessage(to, content, extendedText, { contextInfo: { mentionedJid: mentionid } })
    } else {
        client.sendMessage(to, content, extendedText, { quoted: quoted, contextInfo: { mentionedJid: mentionid } })
    }
}

module.exports = {
    getGroupAdmins,
    reply,
    sendText,
    sendTextMention
}