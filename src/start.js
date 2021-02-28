const connectToWhatsApp = require('./connect')
const handler = require('./handler')

// initiating connection
const connect = async () => {
    const client = await connectToWhatsApp()

    client.on('chat-update', async (message) => {
        await handler(client, message)
    })
}

connect()