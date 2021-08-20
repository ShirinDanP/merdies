import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, createStyles, makeStyles } from "@material-ui/core";

import InventoryComponent from "./InventoryComponent";
import useInventory from "../../hooks/useInventory";
import useShowModalMessage from "../../hooks/useShowModalMessage";
import ErrorOrSuccessMsg from "../Error/ErrorOrSuccessMsg";
import Modal from "../Modal";
import Spinner from "../Spinner";

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

  const [{ response, openModal, submitInventory }] = useInventory({
    sessionId,
    accessToken,
    articleId,
    quantity: Number(quantity),
  });
  const [{ isLoading, setIsLoading }] = useShowModalMessage({
    response,
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
    setIsLoading(true);
    submitInventory();
  };

  const disabledButton = !articleId || !quantity;

  return (
    <div className={classes.root}>
      <InventoryComponent
        sessionId={sessionId}
        accessToken={accessToken}
        onChange={onChange}
        onChangeQuantity={onChangeQuantity}
        articleId={articleId}
        quantity={quantity}
        setArticleId={setArticleId}
      />
      <Button
        className={classes.button}
        onClick={() => onSubmitClick()}
        disabled={disabledButton}
      >
        {t("components.inventory.button")}
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
    </div>
  );
};

export default InventoryForm;
