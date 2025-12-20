"use server";

import { Auction, Bid, PagedResult } from "@/types";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { FieldValues } from "react-hook-form";

export const getData = async (query: string): Promise<PagedResult<Auction>> => {
  return await fetchWrapper.get(`/search${query}`);
};

export const updateAuctionTest = async (): Promise<{
  status: number;
  message: string;
}> => {
  const data = {
    mileage: Math.floor(Math.random() * 10000) + 1,
  };

  return fetchWrapper.put(
    `/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c`,
    data,
  );
};

export const createAuction = async (data: FieldValues) => {
  return fetchWrapper.post("/auctions", data);
};

export const getDetailedViewData = async (id: string): Promise<Auction> => {
  return fetchWrapper.get(`/auctions/${id}`);
};

export const updateAuction = async (data: FieldValues, id: string) => {
  return fetchWrapper.put(`/auctions/${id}`, data);
};

export const deleteAuction = async (id: string) => {
  return fetchWrapper.del(`/auctions/${id}`);
};

export const getBidsForAuction = async (id: string): Promise<Bid[]> => {
  return fetchWrapper.get(`/bids/${id}`);
};

export const placeBidForAuction = async (auctionId: string, amount: number) => {
  return fetchWrapper.post(`/bids?auctionId=${auctionId}&amount=${amount}`, {});
};
