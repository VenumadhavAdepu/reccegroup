import axios from "axios";
import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	ReactNode,
} from "react";

const API_URL = "http://localhost:4000/api";

export interface TripSet {
	heroImage: string;
	unitName: string;
	unitStyleName: string;
	checkInDate: Date;
}

export interface Trips {
	tripSet: TripSet[]
}

interface TripState {
	trips: Trips
}

const initialState: TripState = {
	trips: {
		tripSet: [{
			heroImage: "",
			unitName: "",
			unitStyleName: "",
			checkInDate: new Date()
		}]
	}
}

type getTripActions =
	| { type: "INITIAL_STATE" }
	| { type: "GET_TRIP_DETAILS"; payload: Trips };

interface TripsContextType {
	state: TripState;
	dispatch: React.Dispatch<getTripActions>;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const useTrips = (): TripsContextType => {
	const context = useContext(TripsContext);
	if (!context) {
		throw new Error("useTrips must be used within a TripsProvider");
	}
	return context;
};

export const tripReducer = (state: TripState, action: getTripActions) => {
	switch (action.type) {
		case "INITIAL_STATE":
			return state;
		case "GET_TRIP_DETAILS":
			return { ...state, trips: action.payload };
		default:
			throw new Error("Unknown action type");
	}
};

interface TripsProviderProps {
	children: ReactNode;
}

export const TripsProvider: React.FC<TripsProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(tripReducer, initialState)

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get(API_URL)
				const data = response.data as Trips
				dispatch({ type: "GET_TRIP_DETAILS", payload: data })
			} catch (error) {
				console.error("Failed to fetch trips:", error)
			}
		};
		getData();
	}, []);

	return (
		<TripsContext.Provider value={{ state, dispatch }}>
			{children}
		</TripsContext.Provider>
	);
};