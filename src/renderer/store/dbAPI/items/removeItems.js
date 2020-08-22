export const removeItemsFromBase = function(db, items) {
    return new Promise(function(resolve, reject){

        items.forEach(item => {
            db.remove({ _id: item._id }, {}, function (err, numRemoved) {
            if (err) {
                reject(err)
            } 
            db.persistence.compactDatafile();
            resolve(numRemoved)
            });
          });
    })
}
