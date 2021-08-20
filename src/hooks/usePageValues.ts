import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageValues } from "../types/types";

interface UsePageValues {
  pageValues: PageValues;
}

const usePageValues = (): [UsePageValues] => {
  const { t } = useTranslation();

  const pageValues: PageValues = {
    errorReport: t("pageValues.errorReport"),
    return: t("pageValues.return"),
    inventory: t("pageValues.inventory"),
  };
  useEffect((): void => window.scrollTo(0, 0), [window.location.pathname]);
  return [{ pageValues }];
};

export default usePageValues;
