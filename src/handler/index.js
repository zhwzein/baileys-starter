const { MessageType } = require('@adiwajshing/baileys')
const { moment, processTime, isUrl, color, getBuffer, formatTime } = require('./../utils')
const { getGroupAdmins, reply, sendText, sendTextMention } = require('./../utils/baileys')

const settings = require('./../data/settings.json')
const language = require('./../data/messages')
const msg = language[settings.language]

// handle messages
module.exports = handler = async (client, message) => {
    try {

        // ignores non-new messages
        if (!message.hasNewMessage) return
        // reparse & retrieve the 0th index message
        message = JSON.parse(JSON.stringify(message)).messages[0]
        // if there is no text or media message
        if (!message.message) return
        // ignore whatsapp stories
        if (message.key && message.key.remoteJid == 'status@broadcast') return
        // ignore any new messages from me
        if (message.key.fromMe) return

        // variables that might be useful
        const botNumber = client.user.jid
        const from = message.key.remoteJid
        const { t } = message
        const type = Object.keys(message.message)[0]
        const phoneNumber = from.replace('@s.whatsapp.net', '')
        const { text, image } = MessageType

        // get a pushname
        const { vname, name, notify } = client.contacts[from]
        const pushname = notify || vname
        // vname is the name of someone who uses a business account

        // message body
        const body = (type === 'conversation' &&
            message.message.conversation !== undefined) ?
            message.message.conversation :
            (type == 'imageMessage' &&
                message.message.imageMessage.caption !== undefined) ?
                message.message.imageMessage.caption :
                (type == 'videoMessage' &&
                    message.message.videoMessage.caption !== undefined) ?
                    message.message.videoMessage.caption :
                    (type == 'extendedTextMessage' &&
                        message.message.extendedTextMessage.text !== undefined) ?
                        message.message.extendedTextMessage.text : ''

        // is this message a command?
        const isCmd = body.startsWith(settings.prefix)
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        // messages arguments
        const arg = body.substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        // is this a message from the group?
        const isGroup = from.endsWith('@g.us')
        // 
        const isMedia = (type === 'imageMessage' || type === 'videoMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const sender = isGroup ? message.participant : from
        // all about groups
        const groupMetadata = isGroup ? await client.groupMetadata(from) : {}
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.id : ''
        const groupMembers = isGroup ? groupMetadata.participants : []
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : []
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender) || false

        // bot admins
        let admins = []
        settings.admin.forEach((adminNumber) => {
            admins.push(adminNumber + '@s.whatsapp.net')
        })
        const isAdmin = admins.includes(from)

        const timeFormatted = color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow')
        // only to display logs :D
        if (!isCmd && !isGroup) {
            return console.log('[RECV]', timeFormatted, 'Message from', color(pushname))
        }
        if (!isCmd && isGroupMsg) {
            return console.log('[RECV]', timeFormatted, 'Message from', color(pushname), 'in', color(name))
        }
        if (isCmd && !isGroupMsg) {
            console.log(color('[EXEC]'), timeFormatted, color(`${command} [${args.length}]`), 'from', color(pushname))
        }
        if (isCmd && isGroupMsg) {
            console.log(color('[EXEC]'), timeFormatted, color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name))
        }

        // greeting (welcome) message
        const { messages } = await client.loadMessages(from, 5)
        if (messages.filter(chat => chat.key.fromMe === false).length === 1) {
            console.log(color('[NEW]', 'purple'), `New contact number (+${phoneNumber})`)

            await client.sendMessage(from, msg.welcome, text, {
                detectLinks: true
            })

            // stops all processes below, xD
            return
        }

        // check if this message is a command
        if (isCmd) {
            // customize your command here, hehe
            switch (command) {
                case 'ping':
                    await client.sendMessage(from, `Pong!!!\nSpeed: ${processTime(t, moment())} second(s)`)
                    break

                case 'about':
                case 'info':
                    let me = client.user,
                        uptime = process.uptime(),
                        content = `Bot Name : ${me.name}\nBot Number : @${me.jid.split('@')[0]}\nPrefix : ${settings.prefix}\nThe bot is active on : ${formatTime(uptime)}`,
                        buffer = await getBuffer(me.imgUrl)

                    await client.sendMessage(to, buffer, image, {
                        caption: content,
                        contextInfo: {
                            mentionedJid: [me.jid]
                        }
                    })
                    break

                case 'help':
                case 'menu':
                    let menu_msg = msg.menu.replace('{pushname}', pushname)

                    await client.sendMessage(from, menu_msg, text, {
                        detectLinks: true
                    })
                    break

                case 'tnc':
                    await client.sendMessage(from, msg.tnc, text)
                    break

                case 'donate':
                case 'donasi':
                    await client.sendMessage(from, msg.donate, text)
                    break

                // ...
                // add your own command here xixi
                // ...

                default:
                    console.log(color('[ERR]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Unregistered Command from', color(pushname))
                    break
            }
        }

    } catch (error) {
        console.log(color('[ERR]', 'red'), error)
    }
}