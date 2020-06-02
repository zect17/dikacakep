const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const axios = require('axios');

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
	if(message.body === 'p') {
		client.sendMessage(message.from, '???');
    }
    if(message.body === 'nyong') {
		client.sendMessage(message.from, '???');
    }
    if(message.body === 'sur') {
		client.sendMessage(message.from, '???');
    }
    if(message.body === 'dika') {
		client.sendMessage(message.from, '???');
    }
    if(message.body === 'dik') {
		client.sendMessage(message.from, '???');
	}
});

client.on('message', async message => {
	if(message.body === '-corona') {
        let getCorona = async () => {
            let response = await axios.get(
              "https://api.teainside.org/corona/?country=Indonesia&fbclid=IwAR0K_-igNyWgi97BAb6e3sHUPTQnyx_HzcElHe_C4NEJHx4wzz29sPUQEKA"
            );
            let corona = response.data;
            return corona; 
          };   
          let getTime = async () => {
            let response = await axios.get(
              "https://api.ipgeolocation.io/timezone?apiKey=9ed5bfa4bdfa4d6a916771bbcd24e4aa&lat=-7.4452823&long=111.03412999999999"
            );
            let time = response.data;
            return time;
          }; 
          let coronaValue = await getCorona(); 
          let timeValue = await getTime();
		client.sendMessage(message.from, `🇲🇨 Status Corona Indonesia 🇲🇨 \n  \n     Positive : ${coronaValue.cmt} (+${coronaValue.new_cmt}) \n     Deaths : ${coronaValue.fst} (+${coronaValue.new_fst}) \n     Recovered : ${coronaValue.sdt} \n \nJangan lupa cuci tangan <3 \nUpdated : ${timeValue.date_time_txt}` );
	}
});



client.initialize();