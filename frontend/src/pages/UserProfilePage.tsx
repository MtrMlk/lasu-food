import { useGetMyUser, useUpdateMyUSer } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isPending: isGetPending } = useGetMyUser();
  const { updateUser, isPending: isUpdatePending } = useUpdateMyUSer();

  if (isGetPending) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>unable to load user-profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isPending={isUpdatePending}
    />
  );
};

export default UserProfilePage;
