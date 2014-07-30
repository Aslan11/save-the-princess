var express = require('express'),
    app = express();

/*	Routes
---------------------------------------------------------------------- */
app.use(express.static(__dirname + '/dist'));
app.get('*', function(req, res){
	res.sendfile('dist/index.html');
});

app.listen(3500);
console.log('Magic happens on port 3500');