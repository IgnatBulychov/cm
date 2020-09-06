const remote = require('electron').remote
const application = remote.app

var Datastore = require('nedb')
var db = new Datastore({ filename: `${application.getPath('userData')}/items.db`})

export const getItemFromBase = function(code) {
  return new Promise(function(resolve, reject){  
    db.loadDatabase(function (err) { 
      db.findOne({ code: code }, function (err, doc) {
        if (err) {
          reject(err) 
        }      
        if (doc) {
          resolve(doc)
        } else {
          resolve(null)
        }   
      });
    }); 
  })
}
  