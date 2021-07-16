import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Button, createStyles, makeStyles } from "@material-ui/core";

import FieldWithScanner from "./FieldWithScanner";
import useInventory from "../hooks/useInventory";
import ErrorOrSuccessMsg from "./ErrorOrSuccessMsg";
import { Articles } from "../services/Inventory/model";

interface InventoryProps {
  sessionId: string;
  accessToken: string | null;
}
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& > *": {
        marginTop: "16px",
        "& .Mui-focused": {
          fontWeight: "bold",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#387C6D",
        },
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
      "&:disabled": {
        backgroundColor: "#6FB7A7",
      },
    },
    smallRightTextField: {
      marginLeft: "11px",
    },
  })
);

const InventoryForm: React.FC<InventoryProps> = ({
  accessToken,
  sessionId,
}): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [articleId, setArticleId] = useState<string>("");
  const [quantity, setQuantityValue] = useState<string>("");

  const [
    {
      articleInfo,
      searchArticleResult,
      response,
      openModal,
      submitInventory,
      getArticleInfo,
    },
  ] = useInventory({
    sessionId,
    accessToken,
    articleId,
    quantity: Number(quantity),
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    setArticleId(value);
  };

  const onChangeQuantity =
    () =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setQuantityValue(event.target.value);
    };

  const onSubmitClick = (): void => {
    submitInventory();
  };

  const disabledButton = !articleId || !quantity;

  return (
    <div className={classes.root}>
      <FieldWithScanner
        name="articleNumber"
        location="inventory"
        onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) =>
          onChange(event, value)
        }
        articleId={articleId}
        setValue={(data: string) => setArticleId(data)}
        onBlur={() => getArticleInfo()}
        searchResult={searchArticleResult}
        open={searchArticleResult.length > 1}
        getOptionLabel={(options: Articles) => options.Id}
        autoComplete
      />

      <TextField
        id="name"
        label={t("components.inventory.fields.name")}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={articleInfo?.Title}
        fullWidth
        disabled
      />
      <div className={classes.smallFields}>
        <TextField
          id="dimension"
          label={t("components.inventory.fields.dimenstion")}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={articleInfo?.Dimension}
          disabled
        />
        <TextField
          id="balance"
          label={t("components.inventory.fields.balance")}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          className={classes.smallRightTextField}
          value={articleInfo?.Balance}
          disabled
        />
      </div>
      <div className={classes.smallFields}>
        <TextField
          id="date"
          label={t("components.inventory.fields.date")}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={articleInfo?.InventoryDate}
          disabled
        />
        <TextField
          id="repairable"
          label={t("components.inventory.fields.repairable")}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          className={classes.smallRightTextField}
          value={articleInfo?.RepairSelected}
          disabled
        />
      </div>
      <div className={classes.smallFields}>
        <TextField
          id="place"
          label={t("components.inventory.fields.place")}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={articleInfo?.StoreLocation}
          disabled
        />
        <TextField
          id="unit"
          label={t("components.inventory.fields.unit")}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          className={classes.smallRightTextField}
          value={articleInfo?.Unit}
          disabled
        />
      </div>
      <TextField
        id="number"
        label={t("components.inventory.fields.number")}
        variant="outlined"
        InputLabelProps={{ shrink: true, style: { color: "black" } }}
        value={quantity}
        onChange={onChangeQuantity()}
        fullWidth
      />
      <Button
        className={classes.button}
        onClick={() => onSubmitClick()}
        disabled={disabledButton}
      >
        {t("components.inventory.button")}
      </Button>
      {openModal && <ErrorOrSuccessMsg response={response} />}
    </div>
  );
};

export default InventoryForm;
