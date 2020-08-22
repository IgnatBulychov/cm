export const createItemInBase = function(db, item) {
    return new Promise(function(resolve, reject){
        db.insert(item , function (err, newDoc) { 
            if (err) {
                reject(false)
            }
            db.persistence.compactDatafile();
            resolve(newDoc)  
         });
    })
}
