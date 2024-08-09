// import {LocaleConfig} from 'react-native-calendars';
import XDate from 'xdate';

interface MonthInfo {
  longName: string
  shortName: string
  maxNumOfDays: number
}

export const months: MonthInfo[] = [
  {
    longName: 'Tháng 1',
    shortName: 'T1',
    maxNumOfDays: 31,
  }, // 0 jan
  {
    longName: 'Tháng 2',
    shortName: 'T2',
    maxNumOfDays: 28, // nhớ check có phải năm nhuận hay ko
  }, // 1 feb
  {
    longName: 'Tháng 3',
    shortName: 'T3',
    maxNumOfDays: 31,
  }, // 2 mar
  {
    longName: 'Tháng 4',
    shortName: 'T4',
    maxNumOfDays: 30,
  }, // 3 apr
  {
    longName: 'Tháng 5',
    shortName: 'T5',
    maxNumOfDays: 31,
  }, // 4 may
  {
    longName: 'Tháng 6',
    shortName: 'T6',
    maxNumOfDays: 30,
  }, // 5 jun
  {
    longName: 'Tháng 7',
    shortName: 'T7',
    maxNumOfDays: 31,
  }, // 6 jul
  {
    longName: 'Tháng 8',
    shortName: 'T8',
    maxNumOfDays: 31,
  }, // 7 aug
  {
    longName: 'Tháng 9',
    shortName: 'T9',
    maxNumOfDays: 30,
  }, // 8 sep
  {
    longName: 'Tháng 10',
    shortName: 'T10',
    maxNumOfDays: 31,
  }, // 9 oct
  {
    longName: 'Tháng 11',
    shortName: 'T11',
    maxNumOfDays: 30,
  }, // 10 nov
  {
    longName: 'Tháng 12',
    shortName: 'T12',
    maxNumOfDays: 31,
  }, // 11 dec
]

interface DayOfWeekInfo {
  longName: string
  shortName: string
  jsVal: number
}

export const daysOfWeek: DayOfWeekInfo[] = [
  {
    longName: 'Chủ nhật',
    shortName: 'CN',
    jsVal: 0
  },
  {
    longName: 'Thứ 2',
    shortName: 'T2',
    jsVal: 1
  },
  {
    longName: 'Thứ 3',
    shortName: 'T3',
    jsVal: 2
  },
  {
    longName: 'Thứ 4',
    shortName: 'T4',
    jsVal: 3
  },
  {
    longName: 'Thứ 5',
    shortName: 'T5',
    jsVal: 4
  },
  {
    longName: 'Thứ 6',
    shortName: 'T6',
    jsVal: 5
  },
  {
    longName: 'Thứ 7',
    shortName: 'T7',
    jsVal: 6
  },
]

export default function setUpRNCalendars() {
  XDate.locales['vn'] = {
    monthNames: months.map(x => x.longName),
    monthNamesShort: months.map(x => x.shortName),
    dayNames: daysOfWeek.map(x => x.longName),
    dayNamesShort: daysOfWeek.map(x => x.shortName),
  };
  
  XDate.defaultLocale = 'vn';
}