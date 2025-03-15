# Discord Self-Bot Voice

![Discord Logo](https://img.shields.io/badge/Discord-Self--Bot--Voice-blue)

A simple and stable Discord self-bot to hang out in voice channels with mic and deafen controls.

## 🚀 What is this?

This is a Discord self-bot built with Node.js that:
- Automatically joins a specified voice channel.
- Allows you to toggle the microphone and deafen status with commands.
- Stays online reliably, even on free hosting like Render.com, with a built-in keep-alive server.

> **Note:** Self-bots violate Discord's Terms of Service. Use at your own risk!

## 🌟 Features

- **Voice Channel Hangout:** Joins and stays in a voice channel automatically.
- **Mic Control:** Toggle your mic on/off with `!togglemic`.
- **Deafen Control:** Toggle deafen on/off with `!toggledeafen`.
- **Leave Command:** Exit the voice channel with `!leave`.
- **Stability:** Auto-reconnects if disconnected, perfect for long-term use.
- **Render.com Support:** Includes a keep-alive server to prevent shutdown on Render.com.

## 🛠️ Setup Guide

Follow these steps to get your self-bot running in minutes!

### 1. Prerequisites

- **Node.js:** Installed locally or use Render.com (no install needed).
- **Discord Account Token:** You’ll need your account token (not a bot token).
- **Voice Channel ID:** The ID of the voice channel you want to join.

### 2. Get Your Token

1. Log into Discord in your browser.
2. Press `Ctrl+Shift+I` (or `F12`) to open Developer Tools.
3. Go to the Network tab, refresh the page, and filter for any request (e.g., messages).
4. Check the Request Headers > Find Authorization. Copy the value (that’s your token).

> **Warning:** Keep your token private! Never share it publicly.

### 3. Set Up on Render.com

#### Create a Project:

1. Go to Render.com and click "New Web Service".
2. Choose "Node.js" and name your project (e.g., discord-selfbot-voice).

#### Add Files:

1. Copy the contents of `index.js` and `keep_alive.js` from this project into new files with the same names.

#### Install Dependencies:

In the Render.com shell, run:
```sh
npm install discord.js express
```

#### Configure the Bot:

1. Open `index.js` and replace `VOICE_CHANNEL_ID` with your voice channel ID:
   - Enable Developer Mode in Discord (Settings > Appearance).
   - Right-click the voice channel > "Copy ID".
2. Add your token:
   - Go to the "Environment" tab.
   - Add a new environment variable: Key = `TOKEN`, Value = your Discord account token.

#### Run the Bot:

Click the "Deploy" button. You’ll see logs in the console.

### 4. Keep It Running (Render.com)

Render.com stops idle projects, so use this trick:
1. After running, note the URL in the web preview (e.g., `https://<project-name>.onrender.com`).
2. Go to UptimeRobot:
   - Sign up and create a new HTTP(s) monitor.
   - Set the URL to your Render.com URL and check every 5 minutes.
3. The `keep_alive.js` server will respond to pings, keeping your bot online!

## 🎮 Commands

| Command       | Description                  |
|---------------|------------------------------|
| `!togglemic`  | Turn your mic on or off      |
| `!toggledeafen` | Turn deafen on or off       |
| `!leave`      | Leave the voice channel      |

> **Tip:** Send these commands in any text channel the bot can see (it only responds to your own messages).

## ⚙️ Customization

- **Mic/Deafen Default:** Edit `MIC_ENABLED` or `DEAFEN_ENABLED` in `index.js` (true = on, false = off).
- **Reconnect Delay:** Change `RECONNECT_DELAY` (in milliseconds) if you want faster/slower reconnection attempts.

## ⚠️ Important Notes

- **Risk:** Using a self-bot can get your Discord account banned. Use a secondary account if possible.
- **Limitations:** This bot only controls Discord’s mic/deafen settings, not your actual hardware.
- **Support:** Stuck? Ask for help in the comments or wherever you found this code!

## 📜 License

This project is open-source under the MIT License. Feel free to modify and share!

Happy hanging out in voice channels! 🎤🔊

Made with 💜 by **Solly**

## How to Add to Your Project

1. Create a file named `README.md` in your Replit project or local directory.
2. Paste the content above into the file.
3. If using Replit, this file will automatically display in the "Files" tab and render beautifully.

This file is designed to be:
- **Attractive:** Uses emojis, tables, and clear formatting.
- **Easy to Understand:** Step-by-step instructions with simple, non-technical language.
- **Helpful:** Includes all necessary information for beginners to follow along.

If you want to add personal information (name, contact) or make any edits, feel free to do so!
