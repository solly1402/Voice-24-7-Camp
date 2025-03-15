const { Client, GatewayIntentBits } = require('discord.js');

// Configuration
const TOKEN = process.env.TOKEN || 'YOUR_TOKEN_HERE'; // Token from environment variable or hardcoded
const VOICE_CHANNEL_ID = '1339466280138444895'; // Replace with your voice channel ID
let MIC_ENABLED = true; // True to enable mic, False to mute by default
let DEAFEN_ENABLED = false; // True to enable deafen, False to undeafen by default
const RECONNECT_DELAY = 5000; // Delay in milliseconds before attempting to reconnect

// Initialize client with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Function to join the voice channel
async function joinVoiceChannel() {
    try {
        const channel = client.channels.cache.get(VOICE_CHANNEL_ID);
        if (!channel || channel.type !== 'GUILD_VOICE') {
            console.error('Invalid voice channel!');
            return;
        }

        await channel.join().then(connection => {
            console.log(`Joined voice channel: ${channel.name}`);
            connection.setSelfMute(!MIC_ENABLED); // Set mic state
            connection.setSelfDeaf(DEAFEN_ENABLED); // Set deafen state
            console.log(`Microphone: ${MIC_ENABLED ? 'Enabled' : 'Disabled'}`);
            console.log(`Deafen: ${DEAFEN_ENABLED ? 'Enabled' : 'Disabled'}`);

            // Handle disconnection event
            connection.on('disconnect', () => {
                console.log('Disconnected from voice channel, attempting to reconnect...');
                setTimeout(joinVoiceChannel, RECONNECT_DELAY);
            });

            // Handle voice connection errors
            connection.on('error', (error) => {
                console.error('Voice connection error:', error);
                connection.destroy();
                setTimeout(joinVoiceChannel, RECONNECT_DELAY);
            });
        }).catch(err => {
            console.error('Error joining voice channel:', err);
            setTimeout(joinVoiceChannel, RECONNECT_DELAY);
        });
    } catch (error) {
        console.error('Error:', error);
        setTimeout(joinVoiceChannel, RECONNECT_DELAY);
    }
}

// Event when bot is ready
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    await joinVoiceChannel();
});

// Handle shard disconnection events
client.on('shardDisconnect', (event, id) => {
    console.log(`Shard ${id} disconnected, code: ${event.code}. Attempting to reconnect...`);
});

client.on('shardReconnecting', (id) => {
    console.log(`Shard ${id} is reconnecting...`);
});

client.on('shardResume', (id, replayedEvents) => {
    console.log(`Shard ${id} resumed, ${replayedEvents} events replayed`);
    joinVoiceChannel(); // Rejoin voice channel after resuming
});

// Handle commands
client.on('messageCreate', async (message) => {
    if (message.author.id !== client.user.id) return; // Only accept commands from self
    const args = message.content.split(' ');

    if (args[0] === '!togglemic') {
        const voiceConnection = client.voice.adapters.get(message.guild.id);
        if (voiceConnection) {
            MIC_ENABLED = !MIC_ENABLED;
            voiceConnection.setSelfMute(!MIC_ENABLED);
            await message.channel.send(`Microphone has been ${MIC_ENABLED ? 'enabled' : 'disabled'}`);
        } else {
            await message.channel.send('Not currently in a voice channel!');
        }
    }

    if (args[0] === '!toggledeafen') {
        const voiceConnection = client.voice.adapters.get(message.guild.id);
        if (voiceConnection) {
            DEAFEN_ENABLED = !DEAFEN_ENABLED;
            voiceConnection.setSelfDeaf(DEAFEN_ENABLED);
            await message.channel.send(`Deafen has been ${DEAFEN_ENABLED ? 'enabled' : 'disabled'}`);
        } else {
            await message.channel.send('Not currently in a voice channel!');
        }
    }

    if (args[0] === '!leave') {
        const voiceConnection = client.voice.adapters.get(message.guild.id);
        if (voiceConnection) {
            voiceConnection.destroy();
            await message.channel.send('Left the voice channel');
        } else {
            await message.channel.send('Not currently in a voice channel!');
        }
    }
});

// Login function with error handling
async function loginBot() {
    try {
        await client.login(TOKEN);
    } catch (error) {
        console.error('Login error:', error);
        setTimeout(loginBot, RECONNECT_DELAY);
    }
}

loginBot();

// Handle global errors
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});

// Import keep_alive module
require('./keep_alive');
