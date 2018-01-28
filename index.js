const http = require("http");
const port = process.env.PORT || 1337;

const handler = (req, res) => {
    console.log('Server recieved request. ');
    res.end('Hello World! from vs code and github!');
};

const server = http.createServer(handler);

server.listen(port, err => {
    if (err){
        console.log(err);
    }
    else {
        console.log('Server listening on port: ${port}');
    }
});
