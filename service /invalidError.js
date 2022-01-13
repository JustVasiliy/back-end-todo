module.exports = {
    invalidError: function(res ,code){
        res.statusCode = code;
        res.statusMessage = 'Invalid token'
        res.end(
          JSON.stringify({
            success: false,
            message: "Invalid token",
            
          })
        );
    }
}