// var alertFn = require('./alert');
// alertFn('app');
var btn = document.getElementById('btn');
btn.addEventListener('click', function(){
    requireAsync('css/styles.css');
});
