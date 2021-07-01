
const fetch = require('node-fetch');
const express = require('express');
const app = express();

let token = "1620728365:AAE7Ks7MHvc98hnJHYFoQL2oyAEKmtM5m5I"

function sendMessage(token, chat_id, text) {
	return fetch(
		encodeURI(
			`https://api.telegram.org/bot{token}/sendMessage?chat_id=${chat_id}&text=${text}`
		)
	);
}

app.use(express.json());
app.post('/:token', (req, res) => {
	let update = req.body;
	if (update.message.text) {
		if (/\/start/i.exec(update.message.text)) {
		  res.send('done');
			return sendMessage(
				req.params.token,
				update.message.chat.id,
				'pesan diterima. berikan saya token bot anda untuk di clone.'
			);
		}
		let regex = /(?<token>^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$)/;
		if (regex.exec(update.message.text)) {
			let match = regex.exec(update.message.text);
			let token = match.groups.token;
			try {
				fetch(
					`https://api.telegram.org/bot${token}/setWebhook?url=https://TestingClone.butthx.repl.co/${token}`
				);
				res.send('done');
				return sendMessage(
					req.params.token,
					update.message.chat.id,
					'Oke Berhasil'
				);
			} catch (error) {
			  res.send('done');
				return sendMessage(req.params.token, update.message.chat.id, 'Gagal!');
			}
		}
	}
});

app.listen(process.env.PORT || 3000);
