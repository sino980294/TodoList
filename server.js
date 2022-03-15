const http = require('http');
const {v4:uuidv4} = require('uuid');
const responseTodo = require('./TodoResponse');
const ErrorResponse = require('./ErrorResponse');
const headers = require("./Headers")
let data = [];
const server = http.createServer(requestListener)
let body = '';
const requestListener = (req,res)=>{
    req.on('data',chunk=>{
        body += chunk;
    })
    req.on('end',()=>{
        if(req.url === '/Todo' && req.method === 'GET'){
            responseTodo(res,data,"成功取得列表");
        }else if(req.url === '/Todo' && req.method === 'DELETE'){
            data.length = 0;
            responseTodo(res,data,"刪除成功");
        }else if(req.url.startWith('/Todo/') && req.method === 'DELETE'){
            try{
                const id = req.url.split('/').pop();
                const index = data.findIndex(x=>x.id === id);
                if(index !== -1){
                    data.splice(index,1);
                    responseTodo(res,data,"刪除成功");
                }else{
                    ErrorResponse(res,"找不到該Todo");
                }
            }catch{
                ErrorResponse(res,"找不到該Todo");
            }          
        }else if(req.url.startWith('/Todo/') && req.method === 'POST'){
            try{               
                const title = JSON.parse(body).title;
                if(title == undefined){
                    data.push({title:title,id:uuidv4()}) ;
                    responseTodo(res,data,"新增成功");
                }else{
                    ErrorResponse(res,"填寫格式錯誤");
                }
            }catch{
                ErrorResponse(res,"填寫格式錯誤");
            }    
        }else if(req.url.startWith('/Todo/') && req.method === 'PATCH'){
            try{               
                const title = JSON.parse(body).title;
                const id = req.url.split('/').pop();
                const index = data.findIndex(x=>x.id === id);
                if(title == undefined || index === -1){
                    data[id].title = title;
                    responseTodo(res,data,"修改成功");
                }else{
                    ErrorResponse(res,"填寫格式錯誤或找不到該Todo");
                }
            }catch{
                ErrorResponse(res,"填寫格式錯誤");
            }    
        }else if(req.method === 'OPTION'){
            res.writeHead(200,headers);
            res.end();
        }else{
            ErrorResponse(res,"無此路由請重新輸入路徑",404);
        }



    })
}
server.listen(3005);