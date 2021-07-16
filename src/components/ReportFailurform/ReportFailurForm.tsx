import React, { useState, ChangeEvent } from "react";
import { TextField, Button, createStyles, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTranslation } from "react-i18next";
import FieldWithScanner from "../FieldWithScanner";
import useFalseReport from "../../hooks/useFalseReport";
import ErrorOrSuccessMsg from "../ErrorOrSuccessMsg";
import ImageContainer from "./ImageContainer";

import {
  FalseDataWithoutSessionId,
  FalseReportInfo,
  ObjectIdData,
} from "../../services/FalseReport/model";

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

interface ReportFailurProps {
  accessToken: string | null;
  sessionId: string;
}

const ReportFailureForm: React.FC<ReportFailurProps> = ({
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

  const [falseReportData, setFalseReportData] =
    useState<FalseDataWithoutSessionId>(dataInitialValue);

  const [
    {
      objectIdInfoResult,
      departmentList,
      discoveredList,
      symptomList,
      openModal,
      response,
      submitFalseRepost,
    },
  ] = useFalseReport({
    accessToken,
    objectId,
    falseReportData,
    sessionId,
  });

  const handleInputChange =
    (field: string) =>
    (event: React.FormEvent<HTMLInputElement> | any, value: string) => {
      const newValue = value?.slice(0, value.indexOf(" "));
      setFalseReportData((prevState) => ({
        ...prevState,
        [field]: newValue || event?.target?.value,
      }));
    };

  const onObjectIdChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    setObjectId(value);
    setFalseReportData((prevState) => ({ ...prevState, ObjektId: value }));
  };

  const handleChangeImage = (event: any) => {
    const Images = [...images, URL.createObjectURL(event.target.files[0])];
    setImage(Images);
    setFalseReportData((prevState) => ({
      ...prevState,
      Bilaga: Images,
    }));
  };

  const onDeleteImage = (index: any) => {
    const Images = images.filter((image: any, i: any) => i !== index);
    setImage(Images);
    setFalseReportData((prevState) => ({
      ...prevState,
      Bilaga: Images,
    }));
  };

  return (
    <form className={classes.root}>
      <Autocomplete
        id="TillUtfAvd"
        options={departmentList as any}
        getOptionLabel={(options: FalseReportInfo) =>
          `${options.Id} ${options.Description}`
        }
        onInputChange={handleInputChange("TillUtfAvd") as any}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label={t("components.reportFailure.fields.department")}
            variant="outlined"
            placeholder={t("components.reportFailure.fields.fieldsPlaceholder")}
            fullwidth
            InputLabelProps={{ shrink: true, style: { color: "black" } }}
          />
        )}
      />
      <FieldWithScanner
        name="objectId"
        location="reportFailure"
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
        label={t("components.reportFailure.fields.description")}
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={falseReportData?.Beskrivning}
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
        getOptionLabel={(options: FalseReportInfo) =>
          `${options.Id} ${options.Description}`
        }
        onInputChange={handleInputChange("Upptackt") as any}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label={t("components.reportFailure.fields.discovery")}
            variant="outlined"
            fullWidth
            placeholder={t("components.reportFailure.fields.fieldsPlaceholder")}
            InputLabelProps={{ shrink: true, style: { color: "black" } }}
          />
        )}
      />
      <Autocomplete
        id="Symtom"
        options={symptomList as any}
        getOptionLabel={(options: FalseReportInfo) =>
          `${options.Id} ${options.Description}`
        }
        onInputChange={handleInputChange("Symtom") as any}
        renderInput={(params: any) => (
          <TextField
            {...params}
            label={t("components.reportFailure.fields.symptom")}
            variant="outlined"
            placeholder={t("components.reportFailure.fields.fieldsPlaceholder")}
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
      <Button className={classes.button} onClick={submitFalseRepost}>
        {t("components.reportFailure.buttons.submitFailureReport")}
      </Button>
      {openModal && <ErrorOrSuccessMsg response={response} />}
    </form>
  );
};

export default ReportFailureForm;
