import * as React from 'react';
import { convertBytes } from './helpers';
import moment from 'moment';

export function Main({ captureFile, uploadFile }) {
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
            {/* Create Table*/}
            <table
              className="table-sm table-bordered text-monospace"
              style={{ width: '1000px', maxHeight: '450px' }}
            >
              {/* Set table columns */}
              {/* Mapping rows... */}
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
