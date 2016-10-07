var AdmZip = require('adm-zip');

function zip(files, zipName) {
    // creating archives
    var zip = new AdmZip();

    console.log(files);
    // add local file
    files.foreach(function (file) {
        zip.addLocalFile(file);
    });

    // or write everything to disk
    zip.writeZip(zipName);
};

