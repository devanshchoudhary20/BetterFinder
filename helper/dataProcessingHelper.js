const path = require('path');
import { Base64 } from 'js-base64';

export const supportedFileFormat = async (filepath) => {
    const buffer = await fs.promises.readFile(filepath);
    const extension = path.extname(filepath).toLowerCase();
    if (extension === '.pdf') {
        return Base64.encode(buffer);
    } else if (extension === '.xlsx' || extension === '.xls' || extension === '.csv') {
        return buffer;
    }
}


// import React, { useEffect, useState } from 'react'
// import { SpreadsheetComponent, SheetDirective, SheetsDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet'
// import './SpreadSheet.css'
// import { Base64toBlob } from '../../helper/Helper';
// const SpreadSheet = ({path}) => {
//   const [spreadSheetData, setSpreadSheetData] = useState(null)

//   useEffect(() => {
//     const loadSpreadSheet = async () => {
//         try {
//             if (path) {
//                 const base64 = await window.electronAPI.readFile(path);
//                 console.log('base64', base64);
//                 if (base64) {
//                     const blob = Base64toBlob(base64);
//                     console.log('blob', blob);
//                     const file = new File([blob], 'file.xlsx');
//                     console.log('file', file);
//                     setSpreadSheetData(blob);
//                 } else {
//                     console.error('SpreadSheet buffer is empty or undefined');
//                 }
//             }
//         } catch (error) {
//             console.error('Error loading SpreadSheet:', error); 
//         }
//     };

//     loadSpreadSheet();
// }, [path]);
//   const beforeOpen = () => {};
//   return (
//     <div>
//       {path && spreadSheetData && (
//     <SpreadsheetComponent 
//     allowOpen={true}
//     allowSave={true}
//     openUrl = 'https://services.syncfusion.com/react/production/api/spreadsheet/open'
//     saveUrl = 'https://services.syncfusion.com/react/production/api/FileUploader/Save'  
//     width='1200px'
//     height='500px'
//     beforeOpen={beforeOpen}
//     >
//     <SheetsDirective>
//         <SheetDirective>
//             <RangesDirective>
//                 <RangeDirective dataSource={spreadSheetData}>
//                 </RangeDirective>
//             </RangesDirective>
//         </SheetDirective>
//         </SheetsDirective>
//         </SpreadsheetComponent>
        
   
//         // <SpreadsheetComponent allowOpen={true} openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open' beforeOpen={beforeOpen} 
//         // height='500px'
//         // width='1200px'
//         // />
    
//       )}
//     </div>
//   )
// }

// export default SpreadSheet