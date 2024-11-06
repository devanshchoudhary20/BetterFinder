import React, { useRef, useEffect, useState } from 'react';
import './PdfViewer.css';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, Annotation, TextSearch, FormFields, FormDesigner, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9cdnRSQ2lZU0B3Wkc=');

const PdfViewer = ({ path }) => {
    const pdfViewerRef = useRef(null);
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                if (path) {
                    const base64 = await window.electronAPI.readFile(path);
                    // console.log('pdfBuffers', base64);
                    if (base64) {
                        setPdfData(base64);
                    } else {
                        console.error('PDF buffer is empty or undefined');
                    }
                }
            } catch (error) {
                console.error('Error loading PDF:', error);
            }
        };

        loadPdf();
    }, [path]);

    return (
        <div>
            <div className='control-section'>
                {path && pdfData && (
                    <PdfViewerComponent
                        ref={pdfViewerRef}
                        // id="container"
                        documentPath={pdfData}
                        resourceUrl="https://cdn.syncfusion.com/ej2/26.2.11/dist/ej2-pdfviewer-lib"
                        style={{ height: '600px', width: '1200px' }}
                        documentLoad={() => {
                            console.log('Document Loaded');
                        }}
                    >
                        <Inject services={[Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, BookmarkView,
                            ThumbnailView, Print, TextSelection, TextSearch, FormFields, FormDesigner]} />
                    </PdfViewerComponent>
                )}
            </div>
        </div>
    );
};

export default PdfViewer;
