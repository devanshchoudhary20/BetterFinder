function openInternalFolderDialog() {
    // Create the input element
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true; // Allow folder selection
    input.multiple = true; // Allow multiple file selection

    // Add an event listener to handle file selection
    input.addEventListener('change', (event) => {
        const files = event.target.files;
        console.log('Selected files:');
        
        for (let i = 0; i < files.length; i++) {
            console.log(files[i].name);
        }
    });

    // Trigger the file input click event programmatically
    input.click();
}

// Call the function when needed


if(!window.electronAPI) {
    window.electronAPI = {
        send: (channel, data) => {
        switch(channel){
            case 'select-folder':
                openInternalFolderDialog();
                break;
            default:
                console.log('send: Not implemented')
            }
          console.log(channel, data)
          console.log('send: Not implemented')
        },
        receive: (channel, func) => {
          console.log(channel, func);
          console.log('send: Not implemented')
      
        },
        openFolderDialog: () => {
            console.log('openFolderDialog');
            console.log('send: Not implemented')
        },
        readDirectory: (dirPath) => {
          console.log('readDirectory', dirPath);
          console.log('send: Not implemented')
        },
        removeAllListeners: (channel) => {
          console.log('removeAllListeners', channel);
          console.log('send: Not implemented')
        }
}
}