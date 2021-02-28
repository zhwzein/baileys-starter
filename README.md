# Baileys Starter

The reference for the lightweight whatsapp bot using Baileys with a factored structure

**Code quality**

[![CodeFactor](https://www.codefactor.io/repository/github/sprodev/baileys-starter/badge)](https://www.codefactor.io/repository/github/sprodev/baileys-starter)

## Getting Started

### Requirements

- [NodeJS v14.15.x (and npm)](https://nodejs.org/en/)

### Using Termux?

Run the code below first :P
```
termux-setup-storage
pkg update && pkg upgrade -y
pkg install wget -y
pkg install git -y
pkg install ffmpeg -y
pkg install nodejs -y
```

### Let's do it

1. Clone this repository
   ```
   git clone https://github.com/sProDev/baileys-starter.git
   ```
   
2. Install the dependencies
   ```
   npm i --save
   ```

3. Customize the code according to what you want
4. Enjoy~

### Which must be considered

- Don't give variable names with profanity
- Keep writing code clean
- Use the formatter plugin if you use VSCode
- As much as possible, refactor the code every major change
- Use a neat identity

### The code structure used

```
.
├── LICENSE
├── node_modules
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── connect.js
    ├── data
    │   ├── messages
    │   │   ├── en.json
    │   │   ├── id.json
    │   │   └── index.js
    │   ├── settings.json
    │   └── upload
    ├── handler
    │   └── index.js
    ├── start.js
    └── utils
        ├── baileys.js
        └── index.js
```

- Put any code (if you add a new javascript file) inside the `src` folder
- Group the files that you created
  - Create a new folder if needed (stay inside the `src` folder)
- Use the `utils` folder for utility or helper files
- Use the `handler` folder for anything that handles something
- Place anything static in the `data` folder
  - Place message templates for your bot in the `messages` folder
    - Adjust the placement of the template according to the language
    - Create a new json file if the language you are using does not exist
      - Don't forget to require the json file and export it, in the `index.js` file
  - Place the bot settings in the `settings.json` file
  - Put the files that are fetched from your bot client into the `upload` folder
    - Create a new folder if needed
- Add your own command to the `handler/index.js` file on line 151
- Remove unnecessary code
  - Remove unused declarations
  - Delete the function if it's not called by anyone
- Remove useless dependencies!

## Keep in mind

1. This is not a featured whatsapp bot script
2. Only code references for whatsapp bots that use Baileys, to keep it structured
3. Don't ask for any extra features here!
4. Raise an issue if there is an error in the code I write
5. Pull request if you want to fix errors in my code
6. I'm not a master, I'm just sharing
7. Let's learn together :D
8. Pull request if there is a language error in this `README.md` :P
   - I speak very poorly in English
   - I just want to keep trying to speak English
9. **Keep coding spirit**

## Usage

1. Run the WhatsApp Bot
   ```
   npm run start
   ```

2. After running it (if it's your first time) you need to scan the QR code
3. To stop WhatsApp Bot, please press `Ctrl+C`

## Additional Information

### Thanks to

- [Imperial Owl](https://github.com/YogaSakti/imageToSticker) for inspiration
- [ムハマド・ロイヤニ](https://github.com/MhankBarBar/termux-wabot) for WhatsApp Bot codebase (using Baileys)
- [Adhiraj Singh](https://github.com/adiwajshing/Baileys) for the Baileys library

### Legal

WhatsApp are not allowing user using External Automation<br>
**USE AT YOUR OWN RISK**

## License

Code licensed under [MIT License](https://github.com/sProDev/baileys-starter/blob/main/LICENSE).