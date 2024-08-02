import DateScreen from "./DateScreen"
import DeviceIdScreen from "./DeviceIdScreen"
import FormScreen from "./FormScreen"
import InfiniteScrollScreen from "./InfiniteScrollScreen"
import LocalAuthenScreen from "./LocalAuthenScreen"
import LocationScreen from "./LocationScreen"
import PhotosScreen from "./PhotosScreen"
import routes, { RouteDetails } from "./routes"
import VideosScreen from "./VideosScreen"

const screens: {
  details: RouteDetails,
  component: (props: any) => React.JSX.Element
}[] = [
    { details: routes.Photos, component: PhotosScreen },
    { details: routes.Videos, component: VideosScreen },
    { details: routes.TestForm, component: FormScreen },
    { details: routes.TestLocation, component: LocationScreen },
    { details: routes.TestDeviceId, component: DeviceIdScreen },
    { details: routes.TestLocalAuth, component: LocalAuthenScreen },
    { details: routes.InfiniteScroll, component: InfiniteScrollScreen },
    { details: routes.TestDate, component: DateScreen },
  ];

export default screens;