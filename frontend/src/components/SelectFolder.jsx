import React, { useState, useEffect } from 'react'
import { SvgIcons } from './SvgIcons'
import PdfViewer from '../syncFusion/pdf/PdfViewer'
import SpreadSheet from '../syncFusion/spreadsheet/SpreadSheet'
import Word from '../syncFusion/word/Word'
import Image from '../syncFusion/image/Image'
import VideoViewer from '../syncFusion/video/Video'


const SelectFolder = () => {
  const [currentPath, setCurrentPath] = useState('');
  const [fileTree, setFileTree] = useState([]);
  useEffect(() => {
    // Add event listeners when the component mounts
    window.electronAPI.receive('selected-folder', (folderPath) => {
      setCurrentPath(folderPath);
      updateFileTree(folderPath);
    });

    window.electronAPI.receive('file-tree', (files) => {
      setFileTree(files);
      console.log(files);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      window.electronAPI.removeAllListeners('selected-folder');
      window.electronAPI.removeAllListeners('file-tree');
    };
  }, []);

  const handleSelectFolder = () => {
    window.electronAPI.send('select-folder');
  };

  const handleBack = () => {
    if (currentPath) {
      const parentPath = currentPath.split('/').slice(0, -1).join('/');
      setCurrentPath(parentPath);
      updateFileTree(parentPath);
    }
  };

  const updateFileTree = (path) => {
    window.electronAPI.send('get-file-tree', path);
  };

  const handleFileClick = (file) => {
    if (file.type === 'directory') {
      const newPath = `${currentPath}/${file.name}`;
      setCurrentPath(newPath);
      updateFileTree(newPath);
    }
  };

  const handleFiletype = (file) => {
    if(file.filetype === 'application/pdf'){
      return <PdfViewer path={file.path} />
    }
    else if(file.extension === '.xlsx' || file.extension === '.xls' || file.extension === '.csv'){
      return <SpreadSheet path={file.path} />
    }
    else if(file.extension === '.docx' || file.extension === '.doc' || file.extension === '.txt'){
      return <Word path={file.path} />
    } 
    else if(file.extension === '.mp4' || file.extension === '.mp3'){
      return <VideoViewer path={file.path} />
    }
    else if(file.extension === '.png' || file.extension === '.jpg' || file.extension === '.jpeg'){
      return <Image path={file.path} />
    }
    else{
     return file.name
    }
  }


  

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">File Explorer</h1>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={handleSelectFolder}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Select Folder
        </button>
        <button
          onClick={handleBack}
          className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
      </div>
      <div className="bg-white border border-gray-300 rounded shadow-md p-4">
        <p className="mb-2">Current Path: {currentPath}</p>
        <ul>
          {fileTree.map((file, index) => (
            <li
              key={index}
              onClick={() => handleFileClick(file)}
              className="cursor-pointer hover:bg-gray-100 p-1 flex justify-left items-center gap-2"
            >
              
              {file.type === 'directory' ? SvgIcons.folder() : SvgIcons.file()}
              {handleFiletype(file)}
              <div className='text-sm text-gray-500'>{file.extension}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SelectFolder
