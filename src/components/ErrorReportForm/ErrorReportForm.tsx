import React, { useState, ChangeEvent } from "react";
import { TextField, Button, createStyles, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTranslation } from "react-i18next";
import FieldWithScanner from "../Scanner/FieldWithScanner";
import useErrorReport from "../../hooks/useErrorReport";
import useShowModalMessage from "../../hooks/useShowModalMessage";
import ErrorOrSuccessMsg from "../Error/ErrorOrSuccessMsg";
import ImageContainer from "./ImageContainer";
import Modal from "../Modal";
import Spinner from "../Spinner";

import {
  ErrorDataWithoutSessionId,
  ErrorReportInfo,
  ObjectIdData,
} from "../../services/ErrorReport/model";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& > *": {
        marginTop: "16px",
        "& .Mui-focused": {
          fontWeight: "bold",
          color: "black",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#387C6D",
        },
        "& input input::placeholder": {
          fontSize: "13px",
        },
      },
    },

    button: {
      marginTop: "32px",
      color: "#FFFFFF",
      width: "100%",
      "&:hover": {
        backgroundColor: "#4ba692",
      },
    },
  })
);

interface ErrorReportProps {
  accessToken: string | null;
  sessionId: string;
}

const ErrorReportForm: React.FC<ErrorReportProps> = ({
  accessToken,
  sessionId,
}): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [objectId, setObjectId] = useState<string>("");
  const [images, setImage] = useState<any>([]);

  const dataInitialValue = {
    TillUtfAvd: "",
    ObjektId: "",
    Beskrivning: "",
    Upptackt: "",
    Symtom: "",
    Bilaga: "",
  };

  const [errorReportData, setErrorReportData] =
    useState<ErrorDataWithoutSessionId>(dataInitialValue);

  const [
    {
      objectIdInfoResult,
      departmentList,
      discoveredList,
      symptomList,
      openModal,
      response,
      submitErrorReport,
    },
  ] = useErrorReport({
    accessToken,
    objectId,
    errorReportData,
    sessionId,
  });
  const [{ isLoading, setIsLoading }] = useShowModalMessage({
    response,
  });

  const handleInputChange =
    (field: string) =>
    (event: React.FormEvent<HTMLInputElement> | any, value: string) => {
      const newValue = value?.slice(0, value.indexOf(" "));
      setErrorReportData((prevState: any) => ({
        ...prevState,
        [field]: newValue || event?.target?.value,
      }));
    };

  const onObjectIdChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    setObjectId(value);
    setErrorReportData((prevState: any) => ({ ...prevState, ObjektId: value }));
  };

  const handleChangeImage = (event: any) => {
    const files = [...event.target.files];
    const uploadedImage = files.map((item: any) => URL.createObjectURL(item));
    const Images = [...images, uploadedImage];
    setImage(Images.flat());
    setErrorReportData((prevState: any) => ({
      ...prevState,
      Bilaga: Images,
    }));
  };

  const onDeleteImage = (index: any) => {
    const Images = images.filter((image: any, i: any) => i !== index);
    setImage(Images);
    setErrorReportData((prevState: any) => ({
      ...prevState,
      Bilaga: Images,
    }));
  };

  const onSubmitClick = () => {
    setIsLoading(true);
    submitErrorReport();
  };
  return (
    <form className={classes.root}>
      <Autocomplete
        id="TillUtfAvd"
        options={departmentList as any}
        getOptionLabel={(options: ErrorReportInfo) =>
          `${options.Id} ${options.Description}`
        }
        onInputChange={handleInputChange("TillUtfAvd") as any}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label={t("components.errorReport.fields.department")}
            variant="outlined"
            placeholder={t("components.errorReport.fields.fieldsPlaceholder")}
            fullwidth
            InputLabelProps={{ shrink: true, style: { color: "black" } }}
          />
        )}
      />
      <FieldWithScanner
        name="objectId"
        location="errorReport"
        articleId={objectId}
        onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) =>
          onObjectIdChange(event, value)
        }
        setValue={(data: string) => setObjectId(data)}
        searchResult={objectIdInfoResult}
        getOptionLabel={(options: ObjectIdData) => options.ObjektId}
        autoComplete
        open={objectIdInfoResult.length > 1}
      />
      <TextField
        id="Beskrivning"
        onChange={handleInputChange("Beskrivning") as any}
        label={t("components.errorReport.fields.description")}
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={errorReportData?.Beskrivning}
        InputLabelProps={{
          shrink: true,
          style: {
            color: "black",
          },
        }}
      />
      <Autocomplete
        id="Upptackt"
        options={discoveredList as any}
        getOptionLabel={(options: ErrorReportInfo) =>
          `${options.Id} ${options.Description}`
        }
        onInputChange={handleInputChange("Upptackt") as any}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label={t("components.errorReport.fields.discovery")}
            variant="outlined"
            fullWidth
            placeholder={t("components.errorReport.fields.fieldsPlaceholder")}
            InputLabelProps={{ shrink: true, style: { color: "black" } }}
          />
        )}
      />
      <Autocomplete
        id="Symtom"
        options={symptomList as any}
        getOptionLabel={(options: ErrorReportInfo) =>
          `${options.Id} ${options.Description}`
        }
        onInputChange={handleInputChange("Symtom") as any}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label={t("components.errorReport.fields.symptom")}
            variant="outlined"
            placeholder={t("components.errorReport.fields.fieldsPlaceholder")}
            fullWidth
            InputLabelProps={{ shrink: true, style: { color: "black" } }}
          />
        )}
      />
      <ImageContainer
        images={images}
        handleChangeImage={handleChangeImage}
        onDeleteImage={onDeleteImage}
      />
      <Button className={classes.button} onClick={onSubmitClick}>
        {t("components.errorReport.buttons.submitFailureReport")}
      </Button>
      <Modal
        close={() => console.log()}
        shown={isLoading}
        position="center"
        display="flex"
      >
        <Spinner />
      </Modal>
      {openModal && <ErrorOrSuccessMsg response={response} />}
    </form>
  );
};

export default ErrorReportForm;
