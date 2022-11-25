import { createContext } from "react";
import { NFTDataType } from "../utils/barricade-js/types";

const FetchedNftsContext = createContext<NFTDataType[]>([]);
