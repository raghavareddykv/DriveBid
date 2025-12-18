"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAuction } from "@/app/actions/auctionActions";
import toast from "react-hot-toast";
import { Button, Spinner } from "flowbite-react";

type Props = {
  id: string;
};

const DeleteButton = ({ id }: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleDelete = () => {
    setLoading(true);
    deleteAuction(id)
      .then((res) => {
        if (res.error) throw res.error;
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.status + " " + err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Button outline color="red" onClick={handleDelete}>
      {loading && <Spinner size="sm" className="mr-3" />}
      Delete auction
    </Button>
  );
};

export default DeleteButton;
