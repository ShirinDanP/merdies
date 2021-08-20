import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  createStyles,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { RequisitionList } from "../../services/Return/model";
import useInventory from "../../hooks/useInventory";
import ErrorOrSuccessMsg from "../Error/ErrorOrSuccessMsg";
import useShowModalMessage from "../../hooks/useShowModalMessage";
import useReturn from "../../hooks/useReturn";

import Modal from "../Modal";
import Spinner from "../Spinner";

interface RequisitionListProps {
  requisitionLists: RequisitionList[];
  sessionId: string;
  accessToken: string | null;
}

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginBottom: "24px",
    },
    container: {
      margin: "24px 0 24px 0",
    },
    deleteIcon: {
      color: "#387C6D",
      border: "#387C6D solid 2px",
      borderRadius: "5px",
      "&:hover": {
        color: "#4ba692",
        border: "#4ba692 solid 2px",
      },
    },
    listContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      margin: "15px 0 15px 0",
    },
    itemId: {
      color: "#4178E3",
    },
  })
);
const RequisitionsList: React.FC<RequisitionListProps> = ({
  requisitionLists,
  sessionId,
  accessToken,
}): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [articleId, setArticleId] = useState<string>("");
  const [updatedData, setUpdatedData] = useState(requisitionLists);
  const [{ openModal, rekvisitionRowResponse, createRowRekvision }] =
    useInventory({
      sessionId,
      accessToken,
      articleId,
      quantity: 0,
    });
  const [{ isLoading, setIsLoading }] = useShowModalMessage({
    response: rekvisitionRowResponse,
  });
  const [{ hamtaRekvisitionsRader }] = useReturn({
    sessionId,
    accessToken,
  });
  const onDeleteButtonClick = (itemId: string, index: any): void => {
    const updatedData = requisitionLists.filter(
      (item: RequisitionList, i: any) => i !== index
    );
    setIsLoading(true);
    localStorage.setItem("RequisitionList", JSON.stringify(updatedData));
    setArticleId(itemId);
    setUpdatedData(updatedData);
    createRowRekvision(false, itemId);
  };

  useEffect((): void => {
    hamtaRekvisitionsRader();
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h6" className={classes.title}>
        <Box fontWeight="fontWeightBold" m={1}>
          {requisitionLists?.length > 1
            ? `${requisitionLists?.length} ${t(
                "components.rekvisition.rekvisionListDescriptionForManyArticle"
              )}`
            : `${requisitionLists?.length} ${t(
                "components.rekvisition.rekvisionListDescriptionForOneArticle"
              )}`}
        </Box>
      </Typography>
      {requisitionLists?.map((item: RequisitionList, index: any) => (
        <div className={classes.listContainer}>
          <Typography className={classes.itemId}>{`${item.ItemId}`}</Typography>
          <Typography>{`${item.Title} ${item.Quantity}`}</Typography>
          <DeleteForeverIcon
            onClick={() => onDeleteButtonClick(item.ItemId, index)}
            className={classes.deleteIcon}
          />
        </div>
      ))}
      <Modal
        close={() => console.log()}
        shown={isLoading}
        position="center"
        display="flex"
      >
        <Spinner />
      </Modal>
      {openModal && <ErrorOrSuccessMsg response={rekvisitionRowResponse} />}
    </div>
  );
};

export default RequisitionsList;
