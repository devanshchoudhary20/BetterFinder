import React, { useEffect, useRef } from 'react';
import { DocumentEditorContainerComponent, Toolbar, Inject } from '@syncfusion/ej2-react-documenteditor';
import { base64ToBlob } from '../../helper/Helper';

function Wordtest({ base64Data }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (base64Data && editorRef.current) {
      // Convert the base64 string to a Blob (assuming it's a DOCX)
      const mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; // For DOCX
      const fileBlob = base64ToBlob(base64Data, mimeType);

      // Load the Blob into Syncfusion Document Editor
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        editorRef.current.documentEditor.open(result); // Load file as binary string
      };
      reader.readAsArrayBuffer(fileBlob); // Read the Blob as ArrayBuffer
    }
  }, [base64Data]);

  return (
    <DocumentEditorContainerComponent
      id="container"
      ref={editorRef}
      height='500px'
      width='1200px'
      serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
      enableToolbar={true}
    >
      <Inject services={[Toolbar]} />
    </DocumentEditorContainerComponent>
  );
}

export default Wordtest;
