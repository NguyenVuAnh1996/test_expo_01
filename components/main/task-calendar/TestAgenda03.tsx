import { TimelineCalendar, EventItem, MomentConfig } from '@howljs/calendar-kit';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

// https://github.com/vinhnglx/react-native-vietnamese-lunar-calendar

MomentConfig.updateLocale('vi', {
  weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
});

const exampleEvents: EventItem[] = [
  {
    id: '1',
    title: 'Event 1',
    start: '2024-08-06T09:00:05.313Z',
    end: '2024-08-06T12:00:05.313Z',
    color: '#A3C7D6',
  },
  {
    id: '2',
    title: 'Event 2',
    start: '2024-08-06T11:00:05.313Z',
    end: '2024-08-06T14:00:05.313Z',
    color: '#B1AFFF',
  },
  {
    id: '3',
    title: 'Event 3',
    start: '2024-08-06T09:00:05.313Z',
    end: '2024-08-06T19:00:05.313Z',
    color: 'red',
  },
  {
    id: '4',
    title: 'Event 4',
    start: '2024-08-06T11:00:05.313Z',
    end: '2024-08-06T22:00:05.313Z',
    color: 'green',
  },
  {
    id: '5',
    title: 'Event 5',
    start: '2024-08-05T11:00:05.313Z',
    end: '2024-08-07T22:00:05.313Z',
    color: 'pink',
  },
];

const convertIntoCalendarMarkedDate = (events: EventItem[]) => {
  let result: any = {}
  events.forEach(x => {
    result[x.start.slice(0,10)] = { marked: true }
    result[x.end.slice(0,10)] = { marked: true }
  })
  return result
}

type CalendarMode = 'month' | 'week' | 'day' | 'threeDays' | 'workWeek'

const arr: CalendarMode[] = ['month', 'week', 'day', 'threeDays', 'workWeek']

export default function TestAgenda03() {
  const [toggle, setToggle] = useState<CalendarMode>('week');
  return <>
    <View style={{
      width: '100%',
      flexDirection: 'row'
    }}>{arr.map((x: CalendarMode) =>
      <Pressable key={x} style={{
        width: 50,
        height: 50,
        margin: 20,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center'
      }} onPress={() => setToggle(x)}>
        <Text>{x}</Text>
      </Pressable>
    )}</View>
    {toggle === 'month' &&
      <Calendar
        markedDates={convertIntoCalendarMarkedDate(exampleEvents)}
      />
    }
    {toggle !== 'month' &&
      <TimelineCalendar
        locale='vi'
        viewMode={toggle}
        events={exampleEvents}
        theme={{
          todayName: {
            color: 'green'
          },
          todayNumberContainer: {
            backgroundColor: 'green'
          }
        }}
      />
    }
  </>
}