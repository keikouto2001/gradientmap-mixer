async function getArraybuffer_fromCanvas(canvas){
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            let reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.addEventListener('load', () => {
                resolve(reader.result);
            });
        });
    });
}

// test function
function getDrewCanvas(image){
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    
    canvas.getContext('2d').drawImage(image, 0, 0);
    return canvas;
}

/**
 * Return object asigned image files with name keys.
 * @returns Promise<Object{'filename': img, ...}>
 */
async function getAsyncImagesObject(){
    let result = {};
    let source_files = document.getElementById('source-image').files;
    
    if(source_files.length !== 0) {
        for (let i = 0; i < source_files.length; i++) {
            let loaded = await readImageFile(source_files[i]);
            result[source_files[i].name] = loaded;
        }
    }
    return result;
}

function readImageFile(file){
    let reader = new FileReader();
    
    return new Promise((resolve) => {
        reader.readAsDataURL(file);
        
        reader.addEventListener('load', () => {
            let image = new Image();
            image.src = reader.result;
            resolve(image);
        });
    });
}

window.addEventListener('load', () => {
    document.getElementById('output-result').addEventListener('click', saveResultFile);
    document.getElementById('output-img').addEventListener('click', () => {
        getAsyncImagesObject().then((data) => window.loaded_images = data);
    });
});
