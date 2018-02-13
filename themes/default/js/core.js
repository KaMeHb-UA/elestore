const remote = require('electron').remote,
    API = remote.getGlobal('API');
console.log('API');
console.log(API);
API.getApps({}, (err, apps) => {
    if(!err){
        console.log('apps got!');
        console.log(apps);
    } else console.error(err);
});
console.log(API.getApps({}))
API.getApps({})
    .then(apps => {
        console.log('apps got in promise!');
        console.log(apps)
    })
    .catch(err => {
        console.error(err)
    })