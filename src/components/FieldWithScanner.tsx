import React, { useState } from "react";
import { mdiQrcodeScan } from "@mdi/js";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import { TextField, Button, makeStyles, createStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import QRscanner from "./QRScanner";

interface FieldWithScannerProps {
  name: string;
  articleId: string | number;
  setValue: (data: string) => void;
  location: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
    name?: string
  ) => void;
  onBlur?: () => void;
  autoComplete?: boolean;
  searchResult?: any[];
  getOptionLabel?: (options: any) => string;
  open?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    objectIdStyle: {
      display: "flex",
      flexDirection: "row",
    },
    qrButton: {
      marginLeft: "15px",
      width: "5%",
      backgroundColor: "#f8f5f1",
      padding: "5px",
      boxShadow: "none",
    },
  })
);

const FieldWithScanner: React.FC<FieldWithScannerProps> = ({
  name,
  articleId,
  location,
  onChange,
  onBlur,
  setValue,
  autoComplete,
  searchResult,
  getOptionLabel,
  open,
}): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openQrScanner, setOpenQrScanner] = useState<boolean>(false);

  const onClickButton = () => {
    setOpenQrScanner(!openQrScanner);
  };
  const handleScan = (data: any) => {
    if (data) {
      setValue(`${data}`);
    }
  };
  const handleError = (err: any) => {
    console.error(err);
  };
  return (
    <>
      <div className={classes.objectIdStyle}>
        {autoComplete ? (
          <Autocomplete
            id={name}
            freeSolo
            inputValue={articleId as any}
            options={searchResult as any}
            getOptionLabel={getOptionLabel}
            style={{ width: '90%' }}
            onInputChange={onChange as any}
            open={open}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t(`components.${location}.fields.${name}`)}
                variant="outlined"
                onBlur={onBlur}
                onChange={onBlur}
                InputLabelProps={{ shrink: true, style: { color: "black" } }}
              />
            )}
          />
        ) : (
          <TextField
            id={name}
            label={t(`components.${location}.fields.${name}`)}
            type="search"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true, style: { color: "black" } }}
            value={articleId}
            onChange={onChange as any}
            onBlur={onBlur}
          />
        )}

        <Button
          variant="contained"
          onClick={() => onClickButton()}
          className={classes.qrButton}
        >
          <Icon
            path={mdiQrcodeScan}
            title="QR Scanner"
            style={{ color: "#387C6D", width: "80%" }}
          />
        </Button>
      </div>
      <QRscanner
        handleError={(err: any) => handleError(err)}
        handleScan={(data: any) => handleScan(data)}
        openQrScanner={openQrScanner}
        setOpenQrScanner={(value: boolean) => setOpenQrScanner(value)}
      />
    </>
  );
};

export default FieldWithScanner;
