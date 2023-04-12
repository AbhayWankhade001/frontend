import React, { useState } from 'react';

function Storage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      const endpointUrl = 'https://4o48d4qxt4.execute-api.ap-southeast-2.amazonaws.com/dev';
      const s3BucketName = 'clinginvoice';
      const s3Key = selectedFile.name;
      const url = `${endpointUrl}/${s3BucketName}/${s3Key}`;

      const headers = {
        'Content-Type': selectedFile.type,
      };

      const response = await fetch(url, {
        method: 'PUT',
        body: selectedFile,
        headers,
        mode: 'cors'
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed:', response.statusText);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default Storage;
