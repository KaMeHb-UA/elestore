const remote = require('electron').remote,
    API = remote.getGlobal('API');

eval(API.toInit);

function err(e){
    console.error(e);
}
/*
API.getApps({}, (err, apps) => {
    if(!err){
        // do stuff
    } else console.error(err);
});
*/

const rawDownloader = setUpPromise(function(src, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e){
        if (this.status == 200){
            var uInt8Array = new Uint8Array(this.response);
            var i = uInt8Array.length;
            var binaryString = new Array(i);
            while (i--){
                binaryString[i] = String.fromCharCode(uInt8Array[i]);
            }
            var data = binaryString.join('');
            var base64 = window.btoa(data);
            callback(null, base64);
        } else callback(new Error('xhr.status != 200'));
    };
    xhr.send();
});

API.getApps({}).then(apps => {
    apps = new appsDB(...apps);
    var done = 0;
    apps.forEach((app, i) => {
        API.getRating(app).then(rating=>{
            apps[i].rating = rating;
            if(apps.length == ++done){
                apps.sortBy('rating');
                drawApps(apps, 'best')
            }
        }).catch(err)
    })
}).catch(err);

const applyImgToBg = setUpPromise(function(image, element, callback){
    let fullApplied = false;
    rawDownloader(image.thumbnail).then(base64 => {
        if(!fullApplied) element.style.backgroundImage = `url('data:image;base64,${base64}')`;
    }).catch(callback);
    rawDownloader(image.fullSize).then(base64 => {
        fullApplied = true;
        element.style.backgroundImage = `url('data:image;base64,${base64}')`;
        callback(null);
    }).catch(callback);
});

function drawApps(apps, section){
    document.querySelector(`section#${section}`).querySelectorAll('[role="app-container"]').forEach((element, index) => {
        console.log([element, apps[index]]);
        element.querySelector('.bottom-heading').innerHTML = apps[index].displayName || apps[index].name;
        API.getImages(apps[index]).then(images => {
            if(images[0]){
                element.classList.add('loading');
                applyImgToBg(images[0], element).then(()=>{
                    element.classList.remove('loading')
                });
            }
        })
    })
}