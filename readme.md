# rs world pinging tool

Disclamer:
We take no responsibility for the useage of this tool, it is likely possible to get yourself IP and/or account banned using it. Set your settings to resonable numbers and don't spam jagex's servers.

requires:

- node
- npm

install:

- open root dir (the file this readme is in)
- run `npm install --production`
- wait a few seconds

useage:

- open root dir
- run `node ./build/index.js`
- wait a few seconds

the default settings should work but you can also use command line args to change rs-ping's behavior:  
`node ./build/index.js [# of worlds to output] [show progress] [delay pings] [repeating]`  
[# of worlds to output] - number (default 5)  
[show progress] - true / false - (default false)  
[delay pings] - number (miliseconds) - (default 20)  
[repeating] - number (miliseconds) - set to zero to disable (default 0)
