import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import ProfileActivities from "./ProfileActivities";
import ProfileFollowing from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
  profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
  const { profileStore } = useStore();
  const panes = [
    { menuItem: "About", render: () => <Tab.Pane>About Content</Tab.Pane> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    // { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    { menuItem: "Events", render: () => <ProfileActivities /> },
    { menuItem: "Followers", render: () => <ProfileFollowing /> },
    { menuItem: "Following", render: () => <ProfileFollowing /> },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
    />
  );
};

export default observer(ProfileContent);
