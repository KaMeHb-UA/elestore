const remote = require('electron').remote,
    API = remote.getGlobal('API');

eval(API.toInit);

var UI = {
    rating: {
        starWidth: 17,
        starSpacing: 2,
        calcWidth: rating => {
            return UI.rating.starSpacing +
                Math.floor(rating) * (UI.rating.starWidth + UI.rating.starSpacing * 2) +
                (rating - Math.floor(rating)) * UI.rating.starWidth
        }
    }
};

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
        API.getRating(app).then(rating => {
            apps[i].rating = rating;
            if(apps.length == ++done){
                apps.sortBy('rating');
                drawApps(apps, 'best')
            }
        }).catch(err)
    })
}).catch(err);

API.getApps({categories: ['Games']}).then(apps => {
    apps = new appsDB(...apps);
    var done = 0;
    apps.forEach((app, i) => {
        API.getRating(app).then(rating => {
            apps[i].rating = rating;
            if(apps.length == ++done){
                apps.sortBy('rating');
                drawApps(apps, 'games')
            }
        }).catch(err)
    })
}).catch(err);

API.getApps({categories: ['Internet']}).then(apps => {
    apps = new appsDB(...apps);
    var done = 0;
    apps.forEach((app, i) => {
        API.getRating(app).then(rating => {
            apps[i].rating = rating;
            if(apps.length == ++done){
                apps.sortBy('rating');
                drawApps(apps, 'internet')
            }
        }).catch(err)
    })
}).catch(err);

API.getApps({categories: ['Office']}).then(apps => {
    apps = new appsDB(...apps);
    var done = 0;
    apps.forEach((app, i) => {
        API.getRating(app).then(rating => {
            apps[i].rating = rating;
            if(apps.length == ++done){
                apps.sortBy('rating');
                drawApps(apps, 'office')
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


//********************************From StackOverflow*******************************************//
function guidGenerator() {
    var S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
//*********************************************************************************************//
var uniqueID = {
    generate: () => {
        return uniqueID.last = guidGenerator()
    }
}

function createElement(props = {}){
    props.name = props.name || 'div';
    props.attrs = props.attrs || {};
    props.html = props.html || '';
    var tmp = document.createElement(props.name);
    tmp.innerHTML = props.html;
    for (var i in props.attrs){
        tmp.setAttribute(i, props.attrs[i])
    }
    return tmp
}

function drawApps(apps, section){
    document.querySelector(`section#${section}`).querySelectorAll('[role="app-container"]').forEach((element, index) => {
        (menuItems => {
            var tmp = guidGenerator(), tmp2, btn = createElement({
                name: 'button',
                attrs: {
                    class: 'mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon',
                    id: tmp
                },
                html: '<i class="material-icons">more_vert</i>'
            });
            element.appendChild(btn);
            tmp = createElement({
                name: 'ul',
                attrs: {
                    class: 'mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right',
                    for: tmp
                }
            });
            for (let i in menuItems){
                tmp2 = createElement({
                    name: 'li',
                    html: i
                });
                tmp2.onclick = ()=>{
                    menuItems[i]();
                    btn.click();
                };
                tmp.appendChild(tmp2)
            }
            element.appendChild(tmp)
        })({
            //menu items
            "About": ()=>{},
            "Contact": ()=>{
                console.log('Clicked "Contact" on app')
            },
            "Legal information": ()=>{},
        });
        element.querySelector('.rating').innerHTML = '<div class="stars-bg">✩✩✩✩✩</div><div class="stars-fg" style="color:#a7a7a7;">★★★★★</div>';
        apps[index].drawRating = rating => {
            element.querySelector('.rating > .stars-fg').removeAttribute('style');
            element.querySelector('.rating > .stars-fg').style.width = `${UI.rating.calcWidth(apps[index].rating)}px`;
        }
        if(!apps[index].rating) API.getRating(apps[index]).then(rating => {
            apps[index].drawRating(rating)
        }); else apps[index].drawRating(apps[index].rating);
        element.querySelector('.bottom-heading').innerHTML = `<img class="source-icon" src="${
            apps[index].getSource().icon
        }" title="${
            apps[index].getSource().name
        }">${
            apps[index].displayName || apps[index].name
        }`;
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