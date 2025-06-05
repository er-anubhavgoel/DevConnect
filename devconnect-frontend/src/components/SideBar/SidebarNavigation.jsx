import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  AddCircle as AddCircleIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  List as ListIcon,
  Groups as GroupsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

export const navigationMenu = [
  {
    title: "Home",
    icon: <HomeIcon fontSize="small" />,
    path: "/",
  },
  {
    title: "Reels",
    icon: <ExploreIcon fontSize="small" />,
    path: "/reels",
  },
  {
    title: "Create Reels",
    icon: <AddCircleIcon fontSize="small" />,
    path: "/create-reels",
  },
  {
    title: "Notifications",
    icon: <NotificationsIcon fontSize="small" />,
    path: "/",
  },
  {
    title: "Message",
    icon: <MessageIcon fontSize="small" />,
    path: "/message",
  },
  {
    title: "Communities",
    icon: <GroupsIcon fontSize="small" />,
    path: "/",
  },
  {
    title: "Profile",
    icon: <PersonIcon fontSize="small" />,
    path: "/profile",
  },
];
