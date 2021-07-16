import react, { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Button, createStyles, makeStyles } from "@material-ui/core";

import useReturn from "../hooks/useReturn";
import FieldWithScanner from "./FieldWithScanner";
import { WorkOrderNumber, RekvisionData, Info } from "../services/Return/model";
import { ObjectIdData } from "../services/FalseReport/model";

interface ReturnProps {
  accessToken: string | null;
  sessionId: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& > *": {
        marginTop: "10px",
      },
    },
    container: {
      marginTop: "100px",
    },
    smallFields: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
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
const ReturnForm: React.FC<ReturnProps> = ({
  sessionId,
  accessToken,
}): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [workNumber, setWorkNumber] = useState<string>("");

  const initialValue = {
    sessionsId: "",
    aonr: "",
    objektId: "",
    dim0: "",
    dim1: "",
    dmi2: "",
    dim3: "",
    dim4: "",
    ftg: "",
    reqnr: "",
  };
  const [rekvisionData, setRekvisionData] =
    useState<RekvisionData>(initialValue);

  const [objectId, setObjectId] = useState<string>("");

  const [
    {
      objectIdInfoResult,
      workOrderNumber,
      kontoInfo,
      ansvarInfo,
      activityInfo,
      kStalle,
      uppFoljn,
      createRekvision,
    },
  ] = useReturn({ rekvisionData, workNumber, accessToken, objectId });

  const handleInputChange =
    (field: string) =>
    (event: React.FormEvent<HTMLInputElement> | any, value: string) => {
      const newValue = value?.slice(0, value.indexOf(" "));
      setRekvisionData((prevState) => ({
        ...prevState,
        [field]: newValue || event?.target?.value,
      }));
    };

  const onObjectIdChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    setObjectId(value);
    setRekvisionData((prevState) => ({ ...prevState, ObjektId: value }));
  };

  console.log("shirin", rekvisionData);
  return (
    <form className={classes.root} noValidate>
      <FieldWithScanner
        name="AONumber"
        location="return"
        articleId={workNumber}
        onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) =>
          onObjectIdChange(event, value)
        }
        setValue={(data: string) => setWorkNumber(data)}
        searchResult={workOrderNumber}
        getOptionLabel={(options: WorkOrderNumber) => options.Aonr}
        autoComplete
      />
      <FieldWithScanner
        name="objectId"
        location="return"
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
        id="company"
        label={t("components.return.fields.company")}
        onChange={handleInputChange("ftg") as any}
        variant="outlined"
        InputLabelProps={{ shrink: true, style: { color: "black" } }}
        value={rekvisionData?.ftg}
        fullWidth
      />

      <TextField
        id="account"
        label={t("components.return.fields.account")}
        variant="outlined"
        onChange={handleInputChange("dim0") as any}
        value={rekvisionData?.dim0}
        InputLabelProps={{ shrink: true, style: { color: "black" } }}
        fullWidth
      />

      <FieldWithScanner
        name="title"
        location="return"
        articleId={rekvisionData.dim1}
        onChange={handleInputChange("dim1")}
        setValue={(data: string) => console.log("data", data)}
        searchResult={ansvarInfo}
        getOptionLabel={(options: Info) => options.Id}
        autoComplete
      />

      <FieldWithScanner
        name="activity"
        location="return"
        articleId={rekvisionData.dmi2}
        onChange={handleInputChange("dmi2")}
        setValue={(data: string) => console.log("data", data)}
        searchResult={activityInfo}
        getOptionLabel={(options: Info) => options.Id}
        autoComplete
      />

      <FieldWithScanner
        name="KPlace"
        location="return"
        articleId={rekvisionData.dim3}
        onChange={handleInputChange("dim3")}
        setValue={(data: string) => console.log("data", data)}
        searchResult={kStalle}
        getOptionLabel={(options: Info) => options.Id}
        autoComplete
      />

      <TextField
        id="followUp"
        onChange={handleInputChange("dim4") as any}
        label={t("components.return.fields.followUp")}
        variant="outlined"
        fullWidth
        value={rekvisionData?.dim4}
        InputLabelProps={{
          shrink: true,
          style: {
            color: "black",
          },
        }}
      />
      <Button className={classes.button} onClick={createRekvision}>
        {t("components.return.buttons.next")}
      </Button>
    </form>
  );
};

export default ReturnForm;
