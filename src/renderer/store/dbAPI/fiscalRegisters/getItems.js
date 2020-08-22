const remote = require('electron').remote
const application = remote.app
var Datastore = require('nedb')
var db = new Datastore({ filename: `${application.getPath('userData')}/items.db`, autoload: true })

export const getItems = new Promise(function(resolve, reject){
  db.find({}, function (err, docs) {
    if (docs.length) {
      resolve(docs)
    } else {
      reject(null)
    }   
  });
})
