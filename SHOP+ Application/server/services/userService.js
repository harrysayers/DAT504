var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//var url = 'mongodb://shop:plus@ds111876.mlab.com:11876/shopplus'
var url = 'mongodb://localhost:27017/data';

class UserService {

    constructor(req, res){
        this.req = req
        this.res = res
    }

    insert(signEmail,signPass, db, callback){
        db.collection('users').insertMany({
            'user' : signEmail,
            'pass' : signPass
        }, function(){
            callback()
        })
    }

    adduser(){
        let self = this;
        let signEmail = this.req.body.signEmail;
        let signPass = this.req.body.signPass;
        try{
            MongoClient.connect(url, function(err, db) {
              assert.equal(null, err);
                self.insert(signEmail,signPass, db, function(){
                    db.close()
                    return self.res.status(200).json({
                        status : 'success'
                    })
                })
            });
        }
        catch(error){
            return self.res.status(500).json({
                status : 'error',
                error : error
            })
        }
    }
}
module.exports = UserService;
