import React, { useRef } from 'react'
import './Word.css'
import { DocumentEditorContainerComponent, Toolbar, Inject } from '@syncfusion/ej2-react-documenteditor';


const Word = ({path}) => {
    console.log('path', path);
    const documentEditorRef = useRef(null);

    const onCreated = async (path) => {
        const base64String = await window.electronAPI.readFile(path);
        // console.log('word-base64String', base64String);
        const fetchUrl = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64String}`;
        let documentEditor = documentEditorRef.current.documentEditor;
        // To obtain blob data from base64 string.
        fetch(fetchUrl)
          .then((response) => response.blob())
          .then((fileBlob) => {
            // To convert obtained blob data as a file.
            const fileName = path.substring(path.lastIndexOf('/') + 1);
            let file = new File([fileBlob], fileName);
            documentEditor.open(file);
          });
      }

  return (
    <div>
        {path && (
        <DocumentEditorContainerComponent 
        ref={documentEditorRef}
        id="container" 
        height='500px' 
        width='1200px'
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        created={() => onCreated(path)}
        >
        <Inject services={[Toolbar]} />
        </DocumentEditorContainerComponent>
        )}
    </div>
  )
}

export default Word