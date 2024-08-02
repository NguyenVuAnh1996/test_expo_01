export interface RouteDetails {
  link: string,
  displayName: string
}

interface CompoundRoutes {
  [propName: string]: RouteDetails
}

const routes: CompoundRoutes = {
  Home: { link: 'home', displayName: 'Trang chủ' },
  Photos: { link: 'photos', displayName: 'Ảnh' },
  Videos: { link: 'videos', displayName: 'Video' },
  TestForm: { link: 'test-form', displayName: 'Form' },
  TestLocation: { link: 'test-location', displayName: 'GPS' },
  TestDeviceId: { link: 'test-device-id', displayName: 'Device Id' },
  TestLocalAuth: { link: 'test-local-auth', displayName: 'Local authen' },
  InfiniteScroll: { link: 'infinite-scroll', displayName: 'Infinite scroll' },
  TestDate: { link: 'test-date', displayName: 'Test date' },
}

export default routes;