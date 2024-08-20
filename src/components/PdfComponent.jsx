
import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";

function PdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    console.log(pdfFile);
  }, [pdfFile]);

  return (
    <div className="flex flex-col items-center justify-center shadow-md rounded-lg p-4 w-full max-w-2xl mx-auto">
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="mb-4 w-full"
            width={window.innerWidth > 768 ? 600 : window.innerWidth - 40}
          />
        ))}
      </Document>
    </div>
  );
}

export default PdfComp;
