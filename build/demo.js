var watch = require('watch');
var path = require('path');
var fse = require('fs-extra');
var src = path.resolve(__dirname, '../src');
console.log('watch copy start...\r\n');
watch.watchTree(src, function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
        // Finished walking the tree
    } else {
        fse.copy(src, path.resolve(__dirname, '../examples/demo/src/wxa-vue-element'));
        console.log('copy success!\r\n');
    }
})