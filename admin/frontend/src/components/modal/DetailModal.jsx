import React, { useState, useEffect } from 'react';
import { Modal, Button, Panel } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const DetailModal = ({ open, onClose, data, columnsConfig }) => {

  useEffect(() => {

  }, []);

  if (!data) return null;

  console.log(data);
  
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Подробная информация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Panel bordered>
          {Object.keys(data).map((key) => {
            const columnConfig = columnsConfig.find((config) => config.key === key);
            if (columnConfig && key !== 'actions') {
              return (
                <React.Fragment key={key}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <strong>{columnConfig.label}: </strong>
                    <span>
                      {typeof data[key] === 'boolean' ? (data[key] ? 'Да' : 'Нет') : data[key]}
                    </span>
                  </div>
                </React.Fragment>
              );
            }
            return null;
          })}
          </Panel>
        </Modal.Body>
        <Modal.Footer>
              <Button appearance="primary" onClick={onClose} style={{ marginLeft: '10px' }}>Закрыть</Button>
        </Modal.Footer>

      </Modal>
    </>
  );
};

export default DetailModal;
