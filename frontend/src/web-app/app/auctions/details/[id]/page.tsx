import { getDetailedViewData } from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import CountdownTimer from "@/app/auctions/CountdownTimer";
import CarImage from "@/app/auctions/CarImage";
import DetailedSpecs from "@/app/auctions/details/[id]/DetailedSpecs";
import EditButton from "@/app/auctions/details/[id]/EditButton";
import { getCurrentUser } from "@/app/actions/authActions";
import DeleteButton from "@/app/auctions/details/[id]/DeleteButton";
import BidList from "@/app/auctions/details/[id]/BidList";

const Details = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const data = await getDetailedViewData(id);

  const user = await getCurrentUser();

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Heading title={`${data.make} ${data.model}`} />
          {user?.username === data.seller && (
            <>
              <EditButton id={data.id} />
              <DeleteButton id={data.id} />
            </>
          )}
        </div>

        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">Time remaining:</h3>
          <CountdownTimer auctionEnd={data.auctionEnd} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="relative w-full bg-gray-200 aspect-16/10 rounded-lg overflow-hidden border border-gray-200">
          <CarImage imageUrl={data.imageUrl} />
        </div>

        <BidList user={user} auction={data} />
      </div>

      <div className="mt-4 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={data} />
      </div>
    </>
  );
};

export default Details;
