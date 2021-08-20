import { useEffect, useState } from "react";
import {
  ArticleInfo,
  Articles,
  InventoryResponse,
} from "../services/Inventory/model";
import { RekvisionRowResponse } from "../services/Return/model";
import configureServices from "../services";
import HTTPResponse from "../services/HttpResponse";

interface UseInventoryProps {
  accessToken: string | null;
  sessionId: string;
  articleId: string;
  quantity: number | string;
  requisitionId?: string;
}

interface UseInventoryState {
  articleInfo: ArticleInfo | null;
  searchArticleResult: Articles[];
  response: HTTPResponse<InventoryResponse> | undefined;
  openModal: boolean;
  getArticleInfo: () => void;
  submitInventory: () => void;
  createRowRekvision: (value: boolean, itemId?: string) => void;
  rekvisitionRowResponse?: RekvisionRowResponse;
}

const useInventory = ({
  sessionId,
  accessToken,
  articleId,
  quantity,
  requisitionId,
}: UseInventoryProps): [UseInventoryState] => {
  const [articleInfo, setArticleInfo] = useState<ArticleInfo | null>(null);

  const [searchArticleResult, setSearchArticleResult] = useState<Articles[]>([
    { Id: "" },
  ]);

  const [response, setResponse] = useState<HTTPResponse<InventoryResponse>>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [rekvisitionRowResponse, setRekvisitionRow] =
    useState<RekvisionRowResponse>();

  const getArticle = async (): Promise<void> => {
    const services = await configureServices();
    const { result } = (await services.inventory.getArticle(
      accessToken,
      articleId
    )) as any;
    setSearchArticleResult(result);
  };

  const getArticleInfo = async (): Promise<void> => {
    const services = await configureServices();

    const { result } = (await services.inventory.getArticleInformation(
      sessionId,
      accessToken,
      articleId
    )) as any;
    setOpenModal(true);
    setArticleInfo(result);
  };

  const submitInventory = async (): Promise<void> => {
    const services = await configureServices();
    const inventoryData = {
      SessionId: sessionId,
      ItemId: articleId,
      Quantity: quantity,
    };
    const { result } = (await services.inventory.submitInventory(
      inventoryData,
      accessToken
    )) as any;

    setResponse(result);
    setOpenModal(true);
  };

  const createRowRekvision = async (
    value: boolean,
    itemId?: string
  ): Promise<void> => {
    const services = await configureServices();
    const requestNumber = localStorage.getItem("requisitionNr");

    const rekvisionRowData = {
      SessionId: sessionId,
      ItemId: articleId || itemId,
      Quantity: quantity,
      Inventory: value,
      RequisitionId: requestNumber,
    };
    const response = (await services.returnService.createRekvisionRow(
      rekvisionRowData as any,
      accessToken
    )) as any;
    setOpenModal(true);
    setRekvisitionRow(response.result);
  };

  useEffect((): void => {
    getArticle();
  }, [articleId]);

  return [
    {
      articleInfo,
      searchArticleResult,
      response,
      openModal,
      rekvisitionRowResponse,
      getArticleInfo,
      submitInventory,
      createRowRekvision,
    },
  ];
};

export default useInventory;
