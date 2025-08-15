import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isPending } = useCreateMyRestaurant();
  return (
    <ManageRestaurantForm onSave={createRestaurant} isPending={isPending} />
  );
};

export default ManageRestaurantPage;
