const headers = require("./Headers")
function ErrorResponse(res,message,errorState = 400){
    
    res.writeHead(errorState,headers);
    res.write(JSON.stringify({data:{},message:message}));
    res.end();
}
module.exports(responseTodo)