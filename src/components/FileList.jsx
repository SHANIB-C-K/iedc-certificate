
import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import './FileList.css';

const FileList = () => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    const storageRef = ref(storage, 'files/');
    const result = await listAll(storageRef);
    const files = await Promise.all(result.items.map(async (itemRef) => {
      const downloadURL = await getDownloadURL(itemRef);
      return { name: itemRef.name, url: downloadURL };
    }));
    setFileList(files);
  };

  const handleDelete = async (fileName) => {
    if (window.confirm(`Are you sure you want to delete ${fileName}?`)) {
      const fileRef = ref(storage, `files/${fileName}`);
      try {
        await deleteObject(fileRef);
        setFileList(fileList.filter(file => file.name !== fileName));
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  return (
    <div className="file-list">
      <h2>Uploaded Files</h2>
      <ul>
        {fileList.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
            <button onClick={() => handleDelete(file.name)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
