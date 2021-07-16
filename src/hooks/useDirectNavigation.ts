import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";

interface UseDirectNavigationAction {
  navigateToPages: () => void;
  onClickNavigationButton: (value: string) => void;
}
interface UseNavigationState {
  pageContext: string;
}

const useDirectNavigation = (): [
  UseNavigationState,
  UseDirectNavigationAction
] => {
  const { t } = useTranslation();
  const [pageContext, setPageContext] = useState<string>("");

  const navigateToPages = (): void => {
    const translatedPageContext = pageContext
      ? t(`pageUrls.${pageContext}`)
      : pageContext;
    navigate(`${translatedPageContext}`);
  };

  const onClickNavigationButton = (value: string): void => {
    setPageContext(value);
    navigateToPages();
  };

  useEffect((): void => {
    navigateToPages();
    setPageContext(pageContext);
  }, [pageContext]);

  return [{ pageContext }, { navigateToPages, onClickNavigationButton }];
};

export default useDirectNavigation;
