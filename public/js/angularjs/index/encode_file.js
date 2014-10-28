onmessage = function(event) {
    console.log("Web Worker begin");

    var reader = new FileReaderSync();

    var result = "";
    var start = 0;
    var range = 4194304;
    var stop = start + range;
    var fileSize = event.data.size;

    // Lis le fichier par portion
    while(true) {
        if (stop >= fileSize)
            stop = fileSize;
        console.log("read chunk of file : start = " + start + " ; stop = " + stop + " ; range : " + range + " ; file size = " + fileSize);
        var subfile = reader.readAsBinaryString(event.data.slice(start, stop));
        result = result + subfile;

        if (stop == fileSize){
            break;
        }
        else{
            start = stop ;
            stop = start + range;
        }
    }

    // Encode le fichier directement en base64 si le fichier n'est pas trop gros !!
//    result = reader.readAsDataURL(event.data);
//    postMessage(result);
    postMessage(btoa(result));
};