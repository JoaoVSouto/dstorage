import * as React from 'react';
import { convertBytes } from './helpers';
import moment from 'moment';

export function Main({ files, fileCount, captureFile, uploadFile }) {
  const [fileDescription, setFileDescription] = React.useState('');

  function handleFormSubmit(e) {
    e.preventDefault();
    uploadFile(fileDescription);
    setFileDescription('');
  }

  return (
    <div className="container-fluid mt-5 text-center">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: '1024px' }}
        >
          <div className="content">
            <p>&nbsp;</p>

            <div
              className="card mb-3 mx-auto bg-dark"
              style={{ maxWidth: '512px' }}
            >
              <h2 className="text-white text-monospace bg-dark">
                <strong>
                  <ins>Share file</ins>
                </strong>
              </h2>

              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control text-monospace"
                    placeholder="File description"
                    required
                    value={fileDescription}
                    onChange={e => setFileDescription(e.target.value)}
                  />
                </div>
                <input
                  type="file"
                  onChange={captureFile}
                  className="form-control-file text-monospace"
                  required
                />
                <button type="submit" className="btn-primary btn-block">
                  <strong>Upload!</strong>
                </button>
              </form>
            </div>

            <p>&nbsp;</p>

            <p className="text-monospace text-left mb-1">
              File count: {fileCount}
            </p>

            <table
              className="table-sm table-bordered text-monospace"
              style={{ width: '1000px', maxHeight: '450px' }}
            >
              <thead style={{ fontSize: '15px' }}>
                <tr className="bg-dark text-white">
                  <th scope="col" style={{ width: '10px' }}>
                    id
                  </th>
                  <th scope="col" style={{ width: '200px' }}>
                    name
                  </th>
                  <th scope="col" style={{ width: '230px' }}>
                    description
                  </th>
                  <th scope="col" style={{ width: '120px' }}>
                    type
                  </th>
                  <th scope="col" style={{ width: '90px' }}>
                    size
                  </th>
                  <th scope="col" style={{ width: '90px' }}>
                    date
                  </th>
                  <th scope="col" style={{ width: '120px' }}>
                    uploader/view
                  </th>
                  <th scope="col" style={{ width: '120px' }}>
                    hash/view/get
                  </th>
                </tr>
              </thead>

              <tbody>
                {files.map(file => (
                  <tr key={file.fileId}>
                    <td>{file.fileId}</td>
                    <td>{file.fileName}</td>
                    <td>{file.fileDescription}</td>
                    <td>{file.fileType}</td>
                    <td>{convertBytes(file.fileSize)}</td>
                    <td>
                      {moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}
                    </td>
                    <td>
                      <a
                        href={`https://etherscan.io/address/${file.uploader}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {file.uploader.substring(0, 10)}...
                      </a>
                    </td>
                    <td>
                      <a
                        href={`https://ipfs.infura.io/ipfs/${file.fileHash}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {file.fileHash.substring(0, 10)}...
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
