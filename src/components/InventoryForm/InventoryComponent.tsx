import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField, createStyles, makeStyles } from "@material-ui/core";
import useInventory from "../../hooks/useInventory";
import { Articles } from "../../services/Inventory/model";

import FieldWithScanner from "../Scanner/FieldWithScanner";

interface InventoryComponentProps {
  sessionId: string;
  accessToken: string | null;
  articleId: string;
  quantity: string;
  onChange: (event: any, value: string) => void;
  onChangeQuantity: () => void;
  setArticleId: React.Dispatch<React.SetStateAction<string>>;
}
const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: "100px",
    },
    smallFields: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },

    smallRightTextField: {
      marginLeft: "11px",
    },
  })
);
const InventoryComponent: React.FC<InventoryComponentProps> = ({
  sessionId,
  accessToken,
  articleId,
  quantity,
  setArticleId,
  onChange,
  onChangeQuantity,
}): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [
    {
      articleInfo,
      searchArticleResult,

      getArticleInfo,
    },
  ] = useInventory({
    sessionId,
    accessToken,
    articleId,
    quantity,
  });

  return (
    <>
      <FieldWithScanner
        name="articleNumber"
        location="inventory"
        onChange={(
          event: React.ChangeEvent<HTMLInputElement>,
          value: string
        ) => {
          onChange(event, value);
        }}
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
        onChange={onChangeQuantity() as any}
        fullWidth
      />
    </>
  );
};

export default InventoryComponent;
