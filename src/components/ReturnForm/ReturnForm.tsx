import react, { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Button, createStyles, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { navigate } from "@reach/router";

import useReturn from "../../hooks/useReturn";
import FieldWithScanner from "../Scanner/FieldWithScanner";
import {
  WorkOrderNumber,
  RekvisionData,
  Info,
} from "../../services/Return/model";
import ErrorOrSuccessMsg from "../Error/ErrorOrSuccessMsg";
import { ObjectIdData } from "../../services/ErrorReport/model";
import useShowModalMessage from "../../hooks/useShowModalMessage";
import Modal from "../Modal";
import Spinner from "../Spinner";
import useUserName from "../../hooks/useUserName";

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

  const initialValue = {
    sessionsId: sessionId,
    aonr: "",
    objektId: "",
    dim0: "",
    dim1: "",
    dim2: "",
    dim3: "",
    dim4: "",
    ftg: "",
    reqnr: "",
  };
  const [rekvisionData, setRekvisionData] =
    useState<RekvisionData>(initialValue);

  const [
    {
      objectIdInfoResult,
      workOrderNumber,
      kontoInfo,
      ansvarInfo,
      activityInfo,
      kStalle,
      uppFoljn,
      openModal,
      response,
      createRekvision,
    },
  ] = useReturn({
    rekvisionData,
    workNumber: rekvisionData?.aonr,
    accessToken,
    objectId: rekvisionData?.objektId,
    sessionId,
  });

  const [{ isLoading, setIsLoading }] = useShowModalMessage({
    response,
  });
  const [{ clickedOnUser }] = useUserName({});

  const handleInputChange =
    (field: string) => (event: React.FormEvent<HTMLInputElement> | any) => {
      setRekvisionData((prevState) => ({
        ...prevState,
        [field]: event?.target?.value,
      }));
    };

  const onFieldChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
    name: string,
    options?: any
  ): void => {
    const selectedItem =
      options && options.filter((item: any) => item?.Description === value);

    setRekvisionData((prevState) => ({
      ...prevState,
      [name]: selectedItem && selectedItem[0] ? selectedItem[0].Id : value,
    }));
  };

  const onDimentionChange =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement>, value: any) => {
      onFieldChange(event, value?.Id, name) as any;
    };

  const onNextbutton = (): void => {
    setIsLoading(true);
    createRekvision();
  };

  return (
    <form className={classes.root} noValidate>
      {clickedOnUser && (
        <FieldWithScanner
          name="userName"
          location="return"
          articleId={rekvisionData?.username as any}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            value: string
          ) => onFieldChange(event, value, "username")}
          setValue={(data: string) =>
            setRekvisionData((prevState) => ({
              ...prevState,
              sessionsId: sessionId,
              username: data,
            }))
          }
          getOptionLabel={(options: Info) => options.Description}
        />
      )}
      <FieldWithScanner
        name="AONumber"
        location="return"
        articleId={rekvisionData?.aonr}
        onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) =>
          onFieldChange(event, value, "aonr")
        }
        setValue={(data: string) =>
          setRekvisionData((prevState) => ({
            ...prevState,
            sessionsId: sessionId,
            aonr: data,
          }))
        }
        searchResult={workOrderNumber}
        getOptionLabel={(options: WorkOrderNumber) => options.Aonr}
        autoComplete
        open={workOrderNumber.length > 1}
      />
      <FieldWithScanner
        name="objectId"
        location="return"
        articleId={rekvisionData?.objektId}
        onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) =>
          onFieldChange(event, value, "objektId")
        }
        setValue={(data: string) =>
          setRekvisionData((prevState) => ({ ...prevState, objektId: data }))
        }
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

      <Autocomplete
        id="account"
        freeSolo
        options={kontoInfo as any}
        getOptionLabel={(option: Info) => option.Description}
        onChange={onDimentionChange("dim0") as any}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t("components.return.fields.account")}
            variant="outlined"
            value={rekvisionData?.dim0}
            InputLabelProps={{ shrink: true, style: { color: "black" } }}
            fullWidth
          />
        )}
      />

      <FieldWithScanner
        name="title"
        location="return"
        articleId={rekvisionData.dim1}
        onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) =>
          onFieldChange(event, value, "dim1", ansvarInfo)
        }
        setValue={(data: string) =>
          setRekvisionData((prevState) => ({ ...prevState, dim1: data }))
        }
        searchResult={ansvarInfo}
        getOptionLabel={(options: Info) => options.Description}
        autoComplete
      />

      <FieldWithScanner
        name="activity"
        location="return"
        articleId={rekvisionData.dim2}
        onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) =>
          onFieldChange(event, value, "dim2", activityInfo)
        }
        setValue={(data: string) =>
          setRekvisionData((prevState) => ({ ...prevState, dim2: data }))
        }
        searchResult={activityInfo}
        getOptionLabel={(options: Info) => options.Description}
        autoComplete
      />

      <FieldWithScanner
        name="KPlace"
        location="return"
        articleId={rekvisionData.dim3}
        onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) =>
          onFieldChange(event, value, "dim3", kStalle)
        }
        setValue={(data: string) =>
          setRekvisionData((prevState) => ({ ...prevState, dim3: data }))
        }
        searchResult={kStalle}
        getOptionLabel={(options: Info) => options.Description}
        autoComplete
      />

      <Autocomplete
        id="followUp"
        freeSolo
        options={uppFoljn as any}
        onChange={onDimentionChange("dim4") as any}
        getOptionLabel={(option: Info) => option.Description}
        renderInput={(params) => (
          <TextField
            {...params}
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
        )}
      />
      <Button className={classes.button} onClick={() => onNextbutton()}>
        {t("components.return.buttons.next")}
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

export default ReturnForm;
