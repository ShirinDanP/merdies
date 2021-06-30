import { useTranslation } from "react-i18next";
import { PageValues } from "../types/types";

interface UsePageValues {
  pageValues: PageValues;
}

const usePageValues = (): [UsePageValues] => {
  const { t } = useTranslation();

  const pageValues: PageValues = {
    falseReport: t("pageValues.falseReport"),
    return: t("pageValues.return"),
    inventory: t("pageValues.inventory"),
  };

  return [{ pageValues }];
};

export default usePageValues;
