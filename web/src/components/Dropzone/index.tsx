import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import './styles.css';
import { FiUpload } from 'react-icons/fi';

interface DropzoneProps {
  onUploadFile: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onUploadFile }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const onDrop = useCallback(
    (acceptedFile) => {
      const file = acceptedFile[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      onUploadFile(file);
    },
    [onUploadFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Thumbnail" />
      ) : (
        <p>
          <FiUpload />
          Image do estabelecimento
        </p>
      )}
    </div>
  );
};

export default Dropzone;
