## Errin-NEOXR-BOT (BETA)

> An implementation of [@neoxr/wb](https://www.npmjs.com/package/@neoxr/wb) which has been optimized to be lightweigth.

### Important

> To use [@neoxr/wb >= v1.17.20](https://www.npmjs.com/package/@neoxr/wb) you must add the following components [Open Commit](https://github.com/neoxr/neoxr-bot/commit/26790679dea49494c25106edbaffc5ae9cb716ec)

**Additional Features :**

**Creator / Bot** : [Reine](https://wa.me/6283832155266) / [Chatbot Errin](https://wa.me/6283893900755)

### Requirements

- [x] NodeJS >= 14
- [x] FFMPEG
- [x] Server vCPU/RAM 1/2GB (Min)

### Configuration

There are 2 configuration files namely ```.env``` and ```config.json```, adjust them before installing.

```Javascript
{
   "owner": "6283832155266",
   "owner_name": "Reine",
   "database": "Lucemia",
   "limit": 15,
   "ram_limit": "900mb",
   "max_upload": 50,
   "max_upload_free": 10,
   "cooldown": 3,
   "timer": 180000,
   "timeout": 1800000,
   "blocks": ["994", "91", "92"],
   "evaluate_chars":  ["=>", "~>", "<", ">", "$"],
   "pairing": {
      "state": false,
      "number": 6283893900755
   }
}
```

```.env
### ApiKey : https://api.neoxr.my.id
API_ENDPOINT = 'https://api.neoxr.my.id/api'
API_KEY = 'your_apikey'

### Database : https://www.mongodb.com/
DATABASE_URL = ''

### Timezone (Important)
TZ = 'Asia/Jakarta'
```

**Notes** :
+ ```ram_limit``` : ram usage limit, for example you have a server with 1gb of ram set before the maximum capacity is 900mb.

+ ```API_KEY``` : some of the features in this script use apikey, especially the downloader feature, to get an apiKey you can get it on the [Neoxr Api's](https://api.neoxr.my.id) with prices that vary according to your needs.

+ ```DATABASE_URL``` : can be filled with mongo and postgresql URLs to use localdb just leave it blank and the data will be saved to the .json file.

### Run on Clovyr

Clovyr is a free cloud compute with vscode based for running bot with specifications of 2 CPU and 4GB RAM (idk storage size)

<p align="center"><img align="center" width="100%" src="https://telegra.ph/file/879907dac646d1cb4c017.png" /></p>

with vscode it will be very easy to do recode and debugging scripts

<p align="center"><img align="center" width="100%" src="https://telegra.ph/file/7e33c1e83a872f4f8d363.png" /></p>

**Notes** :
+ ```CLOVYR_APP``` : This is declare with the URL of your Clovyr application

> Specifically for the 2 configurations below, you must carry out an inspect element using a computer to get cookies and keep-alive links

+ ```CLOVYR_URL``` : keep-alive link

+ ```CLOVYR_COOKIE``` : cookie from clovyr

### Pairing Code

Connecting account without qr scan but using pairing code.

<p align="center"><img align="center" width="100%" src="https://telegra.ph/file/290abc12a3aefe23bc71b.jpg" /></p>

```Javascript
{
   "pairing": {
      "state": true, // "true" if you want to use the pairing code
      "number": 62xxxx // start number with country code
   }
}
```

### Installation & Run

Make sure the configuration and server meet the requirements so that there are no problems during installation or when this bot is running, type this on your console :

```
$ yarn
$ node .
```

or want to use pm2

```
$ yarn
$ npm i -g pm2
$ pm2 start index.js && pm2 save && pm2 logs
```

### Command Plugin

**Command Plugin** is a plugin that will run using the command.

```Javascript
exports.run = {
   usage: ['mediafire'],
   hidden: ['mf'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      text,
      isPrefix,
      command,
      env,
      Scraper,
      Func
   }) => {
      try {
         // do something
      } catch (e) {
         console.log(e)
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   restrict: true,
   cache: true,
   location: __filename
}
```

#### Up Side Options :

+ ```usage``` : main command that will automatically appear in the menu list, use of usage can be in the form of arrays and strings.

+ ```hidden``` : commands that are hidden from the menu list, suitable for command aliases or hidden features.

+ ```use``` : this parameter is optionally used when the plugin / feature requires input such as link, query, amount, etc.

+ ```category``` : categories for each plugin that the command will be arranged by category when the menu is displayed.

+ ```m``` : parameters that contain chat object.

+ ```client``` : parameter which contains several messaging functions from [@neoxr/wb](https://www.npmjs.com/package/@neoxr/wb) and default functions from [Baileys](https://github.com/WhiskeySockets/Baileys).

+ ```args``` : nput given after command in the form of an array is usually found in downloader feature which uses links such as ig, youtube, fb, etc. Parsing based on index. (Example: args[1], args[2], args[3], ....)

+ ```text``` : input that is given after command in the form of a string is usually found in search features that use queries/keywords such as lyrics, chords, yts, etc.

+ ```isPrefix``` : prefix used, if noprefix mode is active this parameter will be blank (it's no problem).

+ ```command``` : commands used can be used in an if else or switch case conditional when creating 1 plugin with several commands in it.

+ ```env``` : parameters that contain the configuration from the config.json file.

+ ```Scraper``` : parameter containing some of the scraper functions of [@neoxr/wb](https://www.npmjs.com/package/@neoxr/wb) module.

+ ```Func``` : parameter containing some of the utilites functions of [@neoxr/wb](https://www.npmjs.com/package/@neoxr/wb) module.

#### Down Side Options

+ ```error``` : not very useful :v

+ ```limit``` : limit the use of features with limits, to set the number of limits give integer data and for default is boolean true for 1.

+ ```premium``` : to create special features for premium users.

+ ```restrict``` : limit input, restricted input is in the form of badwords in db.setting.toxic.

+ ```cache``` : option to auto update when done recode.

+ ```__filename``` : file path for auto update

**Other** :
```Javascript
cmd.async(m, { client, args, text, isPrefix: prefix, prefixes, command, groupMetadata, participants, users, chats, groupSet, setting, isOwner, isAdmin, isBotAdmin, plugins, blockList, env, ctx, Func, Scraper })
```

### Event Plugin

**Event Plugin** is a plugin that runs automatically without using the command.

```Javascript
exports.run = {
   async: async (m, {
      client,
      body,
      prefixes
   }) => {
      try {
         // do something
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}
```

+ ```body``` : chat in the form of text or emoticons, this plugin is usually used for auto response or group protectors such as anti-links, anti-toxic etc.

+ ```prefixes``` : parameter which contains all prefixes in the form of an array, to use them parse based on index. (Example: prefixes[0]).

**Other** :
```Javascript
event.async(m, { client, body, prefixes, groupMetadata, participants, users, chats, groupSet, setting, isOwner, isAdmin, isBotAdmin, plugins, blockList, env, ctx, Func, Scraper })
```

Others please learn by yourself from other plugins.

Check this repository regularly to get updates because the progress base is not 100% yet, if you find an error, please make an issue. Thanks.