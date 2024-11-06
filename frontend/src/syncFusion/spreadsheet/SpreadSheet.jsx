import React, { useRef } from 'react'
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet'
import './SpreadSheet.css'
// import { Base64toBlob } from '../../helper/Helper';
// import readXlsxFile from 'read-excel-file'

const SpreadSheet = ({path}) => {
  const spreadsheetRef = useRef(null);


  const onCreated = async (path) => {
    const base64String = await window.electronAPI.readFile(path);
    // console.log('base64String', base64String);
    const fetchUrl = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64String}`;
    let spreadsheet = spreadsheetRef.current;
    // To obtain blob data from base64 string.
    fetch(fetchUrl)
      .then((response) => response.blob())
      .then((fileBlob) => {
        // To convert obtained blob data as a file.
        const fileName = path.substring(path.lastIndexOf('/') + 1);
        let file = new File([fileBlob], fileName);
        spreadsheet.open({ file: file });
      });
  }

  return (
    <div>
    {path && (
      <SpreadsheetComponent 
      openUrl='http://localhost:3001/open' 
      saveUrl='http://localhost:3001/save' 
      ref={spreadsheetRef} 
      created={() => onCreated(path)}
      height='500px'
      width='1200px'
      >
      </SpreadsheetComponent>
    )}
    </div>
  )
}

export default SpreadSheet