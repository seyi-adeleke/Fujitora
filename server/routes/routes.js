module.exports = (app) => {
    app.get('/', (req, res) => res.send('Hello World!'));

    app.post('/api/v1/shorten', function(req, res){
        //TO_DO
    });

    app.get('/:encoded_id', function(req, res){
        //TO_DO
    });
};