
import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import './FileUpload.css';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file || !fileName) return;

    const storageRef = ref(storage, `files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (error) => console.error(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            onFileUpload({ name: fileName, url: downloadURL });
            setFileName('');
            setFile(null);
            setProgress(0);
          });
      }
    );
  };

  return (
    <div className="file-upload">
      <input 
        type="text" 
        placeholder="Enter file name" 
        value={fileName} 
        onChange={(e) => setFileName(e.target.value)} 
      />
      <input 
        type="file" 
        onChange={handleFileChange} 
      />
      <button onClick={handleUpload}>Upload</button>
      <h3>Upload Progress: {progress}%</h3>
    </div>
  );
};

export default FileUpload;
