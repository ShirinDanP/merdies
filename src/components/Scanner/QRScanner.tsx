import React from "react";
import QrScan from "react-qr-reader";

import Modal from "../Modal";

interface QRScannerProps {
  handleError: (data: any) => void;
  handleScan: (err: any) => void;
  openQrScanner: boolean;
  setOpenQrScanner: (value: boolean) => void;
}

const QRscanner: React.FC<QRScannerProps> = ({
  handleError,
  handleScan,
  openQrScanner,
  setOpenQrScanner,
}): JSX.Element => {
  return (
    <Modal
      shown={openQrScanner}
      close={() => {
        setOpenQrScanner(false);
      }}
      backgroundColor="rgb(0,0,0,0.4)"
    >
      <QrScan delay={300} onError={handleError} onScan={handleScan} />
    </Modal>
  );
};

export default QRscanner;
