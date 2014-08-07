onmessage = function(event) {
    console.log("Web Worker begin");

    var reader = new FileReaderSync();
    reader.onload = function(){
        try {
            console.log("file is loaded");
            var dataURL = this.result;
            postMessage(window.btoa(dataURL));
        }
        catch (e){
            console.log(e);
        }
    };
    reader.onprogress = function(e){
        if (e.lengthComputable) {
            var percentLoaded = Math.round((e.loaded / e.total) * 100);
            if (percentLoaded < 100) {
                console.log("file loading : "+percentLoaded+"%");
            }
        }
    };
    reader.onerror = function(error){
        console.log("file loading on error");
    };
    reader.onabort = function(e){
        console.log("file loading is aborted");
    };

    var result = reader.readAsBinaryString(event.data);
    postMessage(btoa(result));
};