export const addFiscalRegisterToBase = function(db, settings) {
    return new Promise(function(resolve, reject){
        db.insert({ model: 'Атол', serial: 123129873912873, settings: settings } , function (err, newDoc) {
            if (err) {
                reject(false)
            }
            db.persistence.compactDatafile();
            resolve(newDoc)  
        });
    })
}
