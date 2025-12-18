"use client";

import { FieldValues, useForm } from "react-hook-form";
import { Button, Spinner } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/app/components/Input";
import { useEffect } from "react";
import { DateInput } from "@/app/components/DateInput";
import { createAuction, updateAuction } from "@/app/actions/auctionActions";
import toast from "react-hot-toast";
import { Auction } from "@/types";

type Props = {
  auction?: Auction;
};

export const AuctionForm = ({ auction }: Props) => {
  const router = useRouter();

  const pathName = usePathname();

  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus("make");
  }, [setFocus, auction, reset]);

  const onSubmit = async (data: FieldValues) => {
    try {
      let id = "";

      let res;

      if (pathName === "/auctions/create") {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id);
          id = auction.id;
        }
      }

      if (res.error) {
        throw res.error;
      }

      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(error.status + " " + error.message);
    }
  };

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is required" }}
      />

      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is required" }}
      />

      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is required" }}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          type="number"
          control={control}
          rules={{ required: "Year is required" }}
        />

        <Input
          label="Mileage"
          name="mileage"
          type="number"
          control={control}
          rules={{ required: "Mileage is required" }}
        />
      </div>

      {pathName === "/auctions/create" && (
        <>
          <Input
            label="Image URL"
            name="imageUrl"
            control={control}
            rules={{ required: "Image URL is required" }}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve Price (enter 0 if no reserve)"
              name="reservePrice"
              type="number"
              control={control}
              rules={{ required: "Reserve price is required" }}
            />

            <DateInput
              label="Auction end date/time"
              name="auctionEnd"
              control={control}
              showTimeSelect
              dateFormat="dd MMMM yyyy h:mm a"
              rules={{ required: "Auction end date is required" }}
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button outline color="gray" onClick={() => router.push("/")}>
          Cancel
        </Button>

        <Button
          outline
          color="green"
          type="submit"
          disabled={!isValid || !isDirty}
        >
          {isSubmitting && <Spinner size="sm" />}
          Submit
        </Button>
      </div>
    </form>
  );
};
