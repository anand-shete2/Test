import React from "react";
import { Skeleton } from "../ui/skeleton";

const DashboardLoader = () => {
  return (
    <div className="lg:mx-30 [&_[data-slot=skeleton]]:bg-primary/60 mx-10 mt-10 mb-20 flex flex-col space-y-10 md:flex-row md:space-x-20 md:space-y-0">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-64 w-98 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-64 w-98 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
