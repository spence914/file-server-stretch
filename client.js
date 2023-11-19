const net = require('net');
const fs = require('fs');

const HOST = 'localhost';
const PORT = 4815;

const client = net.createConnection({host: HOST, port: PORT}, () => {
});

client.setEncoding('utf-8');

client.on('data', data => {
  console.log(data);
});

process.stdin.on('data', data => {
  client.write(data);
});