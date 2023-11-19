const net = require('net');
const fs = require('fs');

const PORT = 4815;
const filePath = './txt_files/';

const server = net.createServer();

server.on('connection', connection => {
  console.log("A client has connected to the server");

  connection.setEncoding('utf-8');

  // Send welcome message to the client
  connection.write('\n Hello and welcome to this simple file server \n Here are the available files \n type the name and extension as shown to receive the file');


  // set a filesystem to grab from
  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.error(err);
      connection.write('Error reading directory');
      return;
    }

    connection.write(JSON.stringify(files));
  });

  // client requests a file by filename
  // server looks for requested files locally and sends back the data

  connection.on('data', data => {
    console.log(`Message from the client: ${data}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});