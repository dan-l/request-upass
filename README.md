# request-upass

* Automate requesting upass for UBC

## Development

[Install NodeJs](https://nodejs.org/en/download/)

Install dependencies  
`npm install`

Run   
`npm start [username] [password]`

## Run on server  

Install additional dependencies for electron
```
apt-get install -y libgtk2.0-0 libgconf-2-4 \
    libasound2 libxtst6 libxss1 libnss3 xvfb
```

Run   
`npm run start:server [username] [password]`

## Third-party Dependencies
See [package.json](package.json#L6)
