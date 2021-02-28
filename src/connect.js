const { WAConnection, ReconnectMode } = require('@adiwajshing/baileys')
const qrcode = require('qrcode-terminal')
const Table = require('cli-table')
const figlet = require('figlet')
const path = require('path')
const fs = require('fs')

const { color, isEmpty } = require('./utils')
const table = new Table()
const session_file = path.join(__dirname + '/../session.json')

module.exports = connectToWhatsApp = async () => {
    // banner
    figlet('baileys', (err, data) => {
        if (!err) console.log(data)

        console.log(color('[DEV]'), 'sProDev', '\n')
    })

    // initialize whatsapp connection
    const client = new WAConnection()
    client.autoReconnect = ReconnectMode.onConnectionLost
    // hide all built-in logs
    client.logger.level = 'silent'

    // this is a protected property as of now
    setInterval(() => {
        client.sendAdminTest()
    }, 10000) // poll every 10s

    let loop = 0
    // hide the built-in QR Code
    client.removeAllListeners('qr')
    client.on('qr', qr => {
        if (!isEmpty(qr)) {
            if (loop !== 0) console.log(`\n`)
            loop++

            qrcode.generate(qr, {
                small: true
            })
            console.log(color('[CLIENT]'), 'Authenticate to continue!')
        }
    })

    // save credentials whenever updated
    client.on('credentials-updated', () => {
        // get all the auth info we need to restore this session
        const authInfo = client.base64EncodedAuthInfo()
        fs.writeFileSync(session_file, JSON.stringify(authInfo, null, `\t`))
    })
    fs.existsSync(session_file) && client.loadAuthInfo(session_file)

    // please uncomment the following line to proxy the connection
    // some random proxy i got off of: https://proxyscrape.com/free-proxy-list
    //client.connectOptions.agent = ProxyAgent('http://1.0.180.120:8080')

    await client.connect({ timeoutMs: 30 * 1000 })
    console.log(color('[CLIENT]'), 'Client Started!')

    // create table for device details (only for decoration)
    table.push(
        { 'WA Version': client.user.phone.wa_version },
        { 'OS Version': client.user.phone.os_version },
        { 'Device': client.user.phone.device_manufacturer },
        { 'Model': client.user.phone.device_model },
        { 'OS Build Number': client.user.phone.os_build_number }
    )
    console.log(table.toString(), '\n')

    // 
    return client
}