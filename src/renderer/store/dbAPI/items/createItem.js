const remote = require('electron').remote
const application = remote.app

var Datastore = require('nedb')
var db = new Datastore({ filename: `${application.getPath('userData')}/items.db`})

export const createItemInBase = function(item) {    
    return new Promise(function(resolve, reject){
        db.loadDatabase(function (err) { 
            db.insert(item , function (err, newDoc) { 
                if (err) {
                    reject(false)
                }
                resolve(newDoc)  
            });
        });  
    })
}
