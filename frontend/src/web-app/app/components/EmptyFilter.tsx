import { useParamsStore } from "@/hooks/useParamsStore";
import Heading from "@/app/components/Heading";
import { Button } from "flowbite-react";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

const EmptyFilter = ({
  title = "No matches for this filter",
  subtitle = "Try changing the filter or search term",
  showReset,
}: Props) => {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-[40vh]">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4">
        {showReset && (
          <Button outline onClick={reset}>
            Remove filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyFilter;
