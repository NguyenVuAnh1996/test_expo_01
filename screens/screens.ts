import DateScreen from "./DateScreen"
import DeviceIdScreen from "./DeviceIdScreen"
import FormScreen from "./FormScreen"
import InfiniteScrollScreen from "./InfiniteScrollScreen"
import LocalAuthenScreen from "./LocalAuthenScreen"
import LocationScreen from "./LocationScreen"
import LoginScreen from "./LoginScreen"
import NotiScreen from "./NotiScreen"
import PhotosScreen from "./PhotosScreen"
import routes, { RouteDetails } from "./routes"
import UserScreen from "./UserScreen"
import VideosScreen from "./VideosScreen"

const screens: {
  details: RouteDetails,
  component: (props: any) => React.JSX.Element,
  homeExcluded?: boolean
}[] = [
    { details: routes.Photos, component: PhotosScreen },
    { details: routes.Videos, component: VideosScreen },
    { details: routes.TestForm, component: FormScreen },
    { details: routes.TestLocation, component: LocationScreen },
    { details: routes.TestDeviceId, component: DeviceIdScreen },
    { details: routes.TestLocalAuth, component: LocalAuthenScreen },
    { details: routes.InfiniteScroll, component: InfiniteScrollScreen },
    { details: routes.TestDate, component: DateScreen },
    { details: routes.TestNoti, component: NotiScreen },
    { details: routes.TestUser, component: UserScreen, homeExcluded: true },
    { details: routes.Login, component: LoginScreen, homeExcluded: true },
  ];

export default screens;