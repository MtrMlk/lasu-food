import { useUpdateMyUSer } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isPending } = useUpdateMyUSer();

  return <UserProfileForm onSave={updateUser} isPending={isPending} />;
};

export default UserProfilePage;
