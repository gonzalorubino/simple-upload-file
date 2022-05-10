const button = document.getElementById('sendButton');
const preview = document.getElementById('previewImg')
const inputElement = document.getElementById('upload');


button.addEventListener("click", (ev) => {
    uploadToServer(ev);
});

upload.addEventListener("change", (ev) => {
    makePreview(ev);
});

const makePreview = (event) => {
    if (event.target.files && event.target.files[0]) {
        const img = event.target.files[0];

        // <img...> le seteo el SRC como el file uplodeado
        preview.src = URL.createObjectURL(img);
    }
};

const uploadToServer = async (event) => {
    // chequeo si hay un file
    if (inputElement.files[0]) {
        const body = new FormData();
        body.append("file", inputElement.files[0]);
        const response = await fetch("/api/file", {
            method: "POST",
            body
        });
    } else {
        // Tiro que hay error
        alert('Primero elegi un archivo en el input de upload!');
    }
    
};