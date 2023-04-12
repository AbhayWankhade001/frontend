import html2pdf from 'html2pdf.js';
import { S3 } from 'aws-sdk';

const config = {
  bucketName: "clinginvoice",
  region: "ap-southeast-2",
  accessKeyId: 'AKIA3ACAYLO767NEPMHM',
  secretAccessKey: '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',

};

const UploadInvoice = () => {
  const handleRaise = () => {
    const input = document.getElementById("pdf-element");
    const pdfOptions = {
      margin: 0,
      filename: "my-document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: "window.devicePixelRatio",
      jsPDF: { unit: "mm", format: "a4" },
    };
    html2pdf().set(pdfOptions).from(input).toBlob((pdfBlob) => {
      const s3 = new S3(config);
      const fileName = 'my-document.pdf';
      const uploadConfig = {
        ContentType: 'application/pdf',
        Key: fileName,
        Body: pdfBlob,
        ACL: 'public-read',
      };
      s3.upload(uploadConfig, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('PDF uploaded to S3 successfully');
        }
      });
    });
  };

  return (
    <>
      <div id="pdf-element">
        // Your component content goes here
      </div>
      <button onClick={handleRaise}>Generate PDF</button>
    </>
  );
};

export default UploadInvoice;
