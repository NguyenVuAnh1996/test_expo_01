export const backendHead = 'http://192.168.1.233:5199/';

export interface LinkItem {
  id: number,
  url: string,
  displayName: string
}

export const links: LinkItem[] = [
  { id: 1, url: 'deviceid', displayName: 'Device ID' },
  { id: 2, url: 'form', displayName: 'Form' },
  { id: 3, url: 'localauthen', displayName: 'Local Authen' },
  { id: 4, url: 'location', displayName: 'GPS' },
  { id: 5, url: 'photos', displayName: 'Hình ảnh' },
  { id: 6, url: 'videos', displayName: 'Video' },
  { id: 7, url: 'infinitescroll', displayName: 'Infinite Scroll' },
]