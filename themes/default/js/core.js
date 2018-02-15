const remote = require('electron').remote,
    API = remote.getGlobal('API');
console.log('API');
console.log(API);
function err(e){
    console.error(e);
}
API.getApps({}, (err, apps) => {
    if(!err){
        console.log('apps got!');
        console.log(apps);
    } else console.error(err);
});
API.getApps({}).then(apps => {
    var done = 0;
    apps.forEach((app, i) => {
        API.getRating(app).then(rating=>{
            apps[i].rating = rating;
            if(apps.length == ++done){
                console.log('before sortBy');
                apps.sortBy('rating');
                console.log('apps:');
                console.log(apps);
            }
        }).catch(err)
    });
}).catch(err)