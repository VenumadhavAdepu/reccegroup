import React, { useState, ChangeEvent} from 'react'
import { useTrips, TripSet } from '../context/tripDetailsContext'
import { sortByDate } from '../utils/dateUtil'
import { TripItem } from './tripItem'

export const IMAGE_SERVER = "https://cms.inspirato.com/ImageGen.ashx?image=";
export const IMAGE_WIDTH_SIZE = "264";

export const TripDetails = () => {
	const { state } = useTrips()
	const [trips, setTrips] = useState<Array<TripSet>>(sortByDate(state.trips?.tripSet) as unknown as TripSet[])
  const [filteredTrips, setFilteredTrips] = useState<Array<TripSet>>([])
  const [isChecked, setIsChecked] = useState(true)
  const [filterValue, setFilterValue] = useState("")

	const ToggleDates = () => {
    const checkHandler = () => {
      setIsChecked(!isChecked)
      let sortedData: TripSet[]
      if (isChecked) {
        sortedData =
				filteredTrips && filteredTrips.length > 0
            ? sortByDate(filteredTrips, true)
            : sortByDate(trips, true)
      } else {
        sortedData =
          filteredTrips.length > 0
            ? (sortByDate(filteredTrips, false) as unknown as TripSet[])
            : (sortByDate(trips, false) as unknown as TripSet[])
      }
      filteredTrips.length > 0
        ? setFilteredTrips(sortedData)
        : setTrips(sortedData)
    }

		return (
      <div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={isChecked}
            onChange={checkHandler}
          />
          <span className="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Assending Dates
          </span>

          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Desending Dates
          </span>
        </label>
      </div>
    )
	}

	const FilterDropdown = () => {
    const checkHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value
      setFilterValue(value)
      const newArray = trips.filter((el) => el.unitStyleName === value)
      setFilteredTrips(newArray)
    }

    return (
      <div>
        <select
          id="filterBy"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={filterValue}
          onChange={checkHandler}
        >
          <option value="Display All">Display All</option>
          <option value="Mountain">Filter by Mountain</option>
          <option value="Beach">Filter By Beach</option>
          <option value="Lifestyle">Filter by Lifestyle</option>
          <option value="Metropolitan">Filter By Metropolitan </option>
        </select>
      </div>
    )
  }

  return (
		<div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 my-5">
          <div className="sm:col-start-1 sm:col-span-4 xs:col-span-3 text-left">
            <ToggleDates />
          </div>
          <div className="sm:col-end-7 sm:col-span-2 ...">
            {" "}
            <FilterDropdown />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredTrips.length > 1
            ? filteredTrips.map((trip, index) => (
                <React.Fragment key={index}>
                  <TripItem
                    heroImage={`${IMAGE_SERVER}${trip.heroImage}&width=${IMAGE_WIDTH_SIZE}`}
                    unitName={trip.unitName}
                    unitStyleName={trip.unitStyleName}
                    checkInDate={trip.checkInDate}
                  />
                </React.Fragment>
              ))
            : trips &&
              trips.map((trip, index) => (
                <React.Fragment key={index}>
                  <TripItem
                    heroImage={`${IMAGE_SERVER}${trip.heroImage}&width=${IMAGE_WIDTH_SIZE}`}
                    unitName={trip.unitName}
                    unitStyleName={trip.unitStyleName}
                    checkInDate={trip.checkInDate}
                  />
                </React.Fragment>
              ))}
        </div>
      </div>
    </div>
	)
}