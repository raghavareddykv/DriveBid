import CountdownTimer from "@/app/auctions/CountdownTimer";
import CarImage from "@/app/auctions/CarImage";
import { Auction } from "@/types";
import Link from "next/link";
import CurrentBid from "@/app/auctions/CurrentBid";
import { numberWithCommas } from "@/lib/numberWithComma";

type Props = {
  auction: Auction;
};

const AuctionCard = ({ auction }: Props) => {
  return (
    <Link href={`/auctions/details/${auction.id}`}>
      <div className="w-full bg-gray-200 aspect-16/10 rounded-lg overflow-hidden relative border border-gray-200">
        <CarImage imageUrl={auction.imageUrl} />

        <div className="absolute bottom-2 left-2">
          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>

        <div className="absolute top-2 right-2">
          <CurrentBid
            reservePrice={auction.reservePrice}
            amount={auction.currentHighBid}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700">
          {auction.make} {auction.model}
        </h3>
        <p className="font-semibold text-sm bg-gray-200 py-1 px-2 rounded-lg text-gray-700">
          {auction.year}
        </p>
      </div>
    </Link>
  );
};

export default AuctionCard;
