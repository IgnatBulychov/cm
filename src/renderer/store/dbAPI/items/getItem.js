
export const getItemFromBase = function(db, code) {
    return new Promise(function(resolve, reject){
      console.group('----' + code)
      db.find({ ean13: code }, function (err, docs) {
        if (err) {
          reject(err) 
        } 
        if (docs.length) {
          resolve(docs[0])
        } else {
          resolve(null)
        }   
      });
    })
  }
  