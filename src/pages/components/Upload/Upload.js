import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from 'react-bootstrap';
import Header from '../../layout/Header/Header';

import './upload.scss';

const Upload = () => {
  return (
    <div className="Upload">
      <Header />
      <main role="main" className="container">
        <div id="FileUpload">
          <div className="wrapper">
            <div className="upload">
              <p>
                Drag files here or <span className="upload__button">Browse</span>
              </p>
            </div>
            <div className="uploaded uploaded--one">
              <FontAwesomeIcon
                style={{
                  padding: '15px',
                  fontSize: '40px',
                  color: '#0c3214',
                  width: '60px',
                  height: '100%',
                }}
                icon={faFilePdf}
              />

              <div className="file">
                <div className="file__name">
                  <p>lorem_ipsum.pdf</p>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
                <ProgressBar striped variant="success" animated now={100} key={1} />
              </div>
            </div>
            <div className="uploaded uploaded--two">
              <FontAwesomeIcon
                style={{
                  padding: '15px',
                  fontSize: '40px',
                  color: '#0c3214',
                  width: '60px',
                  height: '100%',
                }}
                icon={faFilePdf}
              />
              <div className="file">
                <div className="file__name">
                  <p>dolor_sit.pdf</p>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
                <ProgressBar striped variant="success" animated now={35} key={2} />
              </div>
            </div>
            <div className="uploaded uploaded--three">
              <FontAwesomeIcon
                style={{
                  padding: '15px',
                  fontSize: '40px',
                  color: '#0c3214',
                  width: '60px',
                  height: '100%',
                }}
                icon={faFilePdf}
              />
              <div className="file">
                <div className="file__name">
                  <p>amet_consectetur.pdf</p>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
                <ProgressBar striped variant="success" animated now={60} key={3} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
