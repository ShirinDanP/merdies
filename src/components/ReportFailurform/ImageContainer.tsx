import React, { useState } from "react";
import {
  Typography,
  Button,
  makeStyles,
  createStyles,
  CardMedia,
  Card,
} from "@material-ui/core";
import { PhotoCamera, Photo, Delete } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() =>
  createStyles({
    takePhotoButton: {
      width: "100%",
      backgroundColor: "#f8f5f1",
      color: "#387C6D",
      fontWeight: "bold",
      border: "2px solid #387C6D",
      marginTop: "16px",
    },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
    },
    icon: {
      marginRight: "2px",
    },
    card: {
      maxWidth: "33%",
      maxHeight: "200px",
      flex: "1 0 30%",
      margin: "5px",
    },
  })
);

interface ImageContainerProps {
  images: any;
  handleChangeImage: any;
  onDeleteImage: any;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  images,
  handleChangeImage,
  onDeleteImage,
}): JSX.Element => {
  const { t } = useTranslation();
  const classes = useStyles();

  const showMultipleimages =
    images && images.length > 0
      ? images.map((item: any, index: any) => (
          <Card className={classes.card}>
            <CardMedia component="img" image={item} height="170" width="130" />
            <Delete onClick={() => onDeleteImage(index)} />
          </Card>
        ))
      : null;

  return (
    <>
      <Typography>
         {t("components.reportFailure.fields.uploadePictures")}
      </Typography>
      <div className={classes.cardContainer}>{showMultipleimages}</div>
      <input
        type="file"
        accept="image/*"
        id="Bilaga"
        name="Bilaga"
        hidden
        multiple
        onChange={handleChangeImage}
      />
      <label htmlFor="Bilaga">
        <Button className={classes.takePhotoButton} component="span">
          <Photo className={classes.icon} />
          {t("components.reportFailure.buttons.selectFromGallery")}
        </Button>
      </label>
      <input
        id="Bilaga"
        type="file"
        accept="image/*"
        capture="camera"
        name="Bilaga"
        hidden
        multiple
        onChange={handleChangeImage}
      />
      <label htmlFor="Bilaga">
        <Button className={classes.takePhotoButton} component="span">
          <PhotoCamera className={classes.icon} />
          {t("components.reportFailure.buttons.takePicture")}
        </Button>
      </label>
    </>
  );
};

export default ImageContainer;
