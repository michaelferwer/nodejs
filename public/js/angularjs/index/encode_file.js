onmessage = function(event) {
    console.log("Web Worker begin");

    var file = event.data.file;
    var player = event.data.player;
    var reader = new FileReaderSync();

    var result = "";
    var start = 0;
    var range = 4194304;
    var stop = start + range;
    var fileSize = file.size;

    // Lis le fichier par portion
    while(true) {
        if (stop >= fileSize)
            stop = fileSize;
        console.log("read chunk of file : start = " + start + " ; stop = " + stop + " ; range : " + range + " ; file size = " + fileSize);
        var subfile = reader.readAsArrayBuffer(file.slice(start, stop));
        result = result + subfile;
        console.log(result.length);

        if (stop == fileSize){
            break;
        }
        else{
            start = stop ;
            stop = start + range;
        }
    }

    player.src = "www.youtube.com/watch?v=2kSIL3NU5vs";

    postMessage(btoa(result));
};