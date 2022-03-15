const headers = require("./Headers")
function ErrorResponse(res,data,message){   
    res.writeHead(200,headers);
    res.write(JSON.stringify({data:data,message:message}));
    res.end();
}
module.exports =ErrorResponse;