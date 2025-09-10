import type { SearchState } from "@/pages/SearchPage";
import type { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant!");
    }

    return response.json();
  };

  const { data: restaurant, isPending } = useQuery({
    queryKey: ["fetchRestaurant"],
    queryFn: getRestaurantByIdRequest,
    enabled: !!restaurantId,
  });

  return {
    restaurant,
    isPending,
  };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  campus?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${campus}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant!");
    }

    return response.json();
  };

  const {
    data: results,
    isPending,
    error,
  } = useQuery({
    queryKey: ["searchRestaurants", searchState],
    queryFn: createSearchRequest,
    enabled: !!campus,
  });

  return { results, isPending, error };
};
