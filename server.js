const net = require('net');
const fs = require('fs');

const PORT = 4815;
const directoryPath = './txt_files/';

const server = net.createServer();

server.on('connection', connection => {
  console.log("A client has connected to the server");

  connection.setEncoding('utf-8');

  // Send welcome message to the client
  connection.write('\n Hello and welcome to this simple file server \n Here are the available files \n type the name and extension as shown to receive the file');


  // Send names of all files to client
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      connection.write('Error reading directory');
      return;
    }

    connection.write(JSON.stringify(files));
  });

  // Server receives the string the client sends, appends it to the directory to get the file name
  // reads that files contents out and sends that content to the connection
  connection.on('data', data => {
    const filename = data.toString().trim();
    const filePath = directoryPath + filename;

    fs.readFile(filePath, (err, content) => {
      if (err) {
        connection.write('Error: File not found');
        return;
      }

      connection.write(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});