var http =require("http");
http.createServer(function(req,res){
    res.writeHead({
        "content-type":"text/plain"
    });
    res.end("hallo mohamed");
    
}).listen(3000);


