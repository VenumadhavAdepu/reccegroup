import React from "react";
import { TripSet } from "../context/tripDetailsContext";
import { convertDate } from "../utils/dateUtil";

export const TripItem: React.FC<TripSet> = ({
  heroImage,
  unitName,
  unitStyleName,
  checkInDate,
}) => {
  return (
    <div className="group min-h-60">
      <div className="aspect-h-1  aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={heroImage}
          alt={unitName}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">Unit name - {unitName}</h3>
      <h3 className="mt-4 text-sm text-gray-700">
        Unit Style name - {unitStyleName}
      </h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        Check-in Date: {convertDate(checkInDate)}
      </p>
    </div>
  );
};

export default TripItem;