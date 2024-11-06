import React ,{useState, useEffect} from 'react'

const Image = ({path}) => {
  const [imageUrl, setImageUrl] = useState(null);
  console.log('path', path);
  useEffect(() => {
      const getBase64 = async (path) => {
          try {
              // Read the file as a base64 string from the Electron API
              const base64String = await window.electronAPI.readFile(path);
              // Create a data URL for the image
              const fetchUrl = `data:image/png;base64,${base64String}`;
              setImageUrl(fetchUrl);
          } catch (error) {
              console.error('Error loading video:', error);
          }
      };

      if (path) {
          getBase64(path);
      }
  }, [path]);

  return (
    <div>
      <img src={imageUrl} alt="" />
    </div>
  )
}

export default Image