import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const Video = ({ path }) => {
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        const getBase64 = async (path) => {
            try {
                // Read the file as a base64 string from the Electron API
                const base64String = await window.electronAPI.readFile(path);
                // Create a data URL for the video
                const fetchUrl = `data:video/mp4;base64,${base64String}`;
                setVideoUrl(fetchUrl);
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
            {videoUrl ? (
                <ReactPlayer 
                    url={videoUrl} 
                    controls 
                    width="100%" 
                    height="100%" 
                />
            ) : (
                <p>Loading video...</p>
            )}
        </div>
    );
};

export default Video;
