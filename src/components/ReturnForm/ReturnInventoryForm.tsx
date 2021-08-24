import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, createStyles, makeStyles } from "@material-ui/core";

import InventoryComponent from "../InventoryForm/InventoryComponent";
import useInventory from "../../hooks/useInventory";
import useReturn from "../../hooks/useReturn";
import ErrorOrSuccessMsg from "../Error/ErrorOrSuccessMsg";
import useShowModalMessage from "../../hooks/useShowModalMessage";
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

const ReturnInventoryForm: React.FC<InventoryProps> = ({
  accessToken,
  sessionId,
}): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [articleId, setArticleId] = useState<string>("");
  const [quantity, setQuantityValue] = useState<string>("");
  const [onArticleClicked, setOnArticleClicked] = useState<boolean>(false);

  const [{ openModal, rekvisitionRowResponse, createRowRekvision }] =
    useInventory({
      sessionId,
      accessToken,
      articleId,
      quantity: Number(quantity),
    });

  const [{ hamtaRekvisitionsRader, getRekvisionRadResponse }] = useReturn({
    sessionId,
    accessToken,
  });

  const updatededResponse = onArticleClicked
    ? rekvisitionRowResponse
    : getRekvisionRadResponse;

  const [{ isLoading, setIsLoading }] = useShowModalMessage({
    response: updatededResponse,
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

  const onAddButtonClick = (): void => {
    setIsLoading(true);
    setOnArticleClicked(true);
    createRowRekvision(false);
  };

  const onInvOkButton = (): void => {
    setIsLoading(true);
    setOnArticleClicked(true);
    createRowRekvision(true);
  };

  const onDoneButton = (): void => {
    setIsLoading(true);
    setOnArticleClicked(false);
    hamtaRekvisitionsRader();
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
        onClick={onAddButtonClick}
        disabled={disabledButton}
      >
        {t("components.return.buttons.add")}
      </Button>
      <Button
        className={classes.button}
        onClick={onInvOkButton}
        disabled={disabledButton}
      >
        {t("components.return.buttons.inventory")}
      </Button>
      <Button
        className={classes.button}
        onClick={() => onDoneButton()}
        disabled={disabledButton}
      >
        {t("components.return.buttons.done")}
      </Button>
      <Modal
        close={() => console.log()}
        shown={isLoading}
        position="center"
        display="flex"
      >
        <Spinner />
      </Modal>
      {openModal && <ErrorOrSuccessMsg response={updatededResponse} />}
    </div>
  );
};

export default ReturnInventoryForm;
