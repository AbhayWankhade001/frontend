import React, { useRef } from "react";
import html2pdf from "html2pdf.js";


const Download = () => {
 
  const pdfRef = useRef(null);

  const handleInvoiceClick = () => {
    const element = pdfRef.current;
    const opt = {
      margin:       0.5,
      filename:     'invoice.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).toPdf().get('output').then(function (pdf) {
      const base64 = btoa(pdf);
      // Do something with the base64 variable here, like sending it to a server or displaying it on the page
      console.log(base64)
    });
  }

  return (
    <div>
      <button onClick={handleInvoiceClick}>Raise The Invoice</button>
      
      <div ref={pdfRef}>
        <h1>Invoice</h1>
        <p>Invoice content goes here.</p>
      </div>
    </div>
  );
};

export default Download;
