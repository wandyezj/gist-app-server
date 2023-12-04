import * as http from "http";

const server = http.createServer((request, response) => {
    const url = request.url;
    const test = process.env["TEST"];
    const method = request.method;
    const origin = request.headers.origin;

    // bounce back response
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(`Hello World!
${url}
${method}
${origin}
${test || ""}
`);
    response.end();
});

const port = process.env.PORT || 8080;

server.listen(port);
