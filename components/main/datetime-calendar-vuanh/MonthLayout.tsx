import { Pressable, StyleSheet, Text, View } from "react-native"

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

const daysOfWeek: DayOfWeekInfo[] = [
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
  {
    longName: 'Chủ nhật',
    shortName: 'CN',
    jsVal: 0
  },
]

export default function MonthLayout({
  year,
  month,
  layoutWidth,
  chosenDate,
  setChosenDate
}: {
  year: number,
  month: number,
  layoutWidth: number,
  chosenDate: Date,
  setChosenDate: (input: Date) => void
}) {
  const jsMonth = month;
  const maxDay = year % 4 === 0 && jsMonth === 1
    ? 29
    : months[jsMonth].maxNumOfDays;
  const firstDay_dow = new Date(year, jsMonth, 1).getDay();
  const dayList: number[] = [];

  // left-most col is monday
  const padding_head = firstDay_dow === 0 ? 6 : firstDay_dow - 1;
  for (let i = 0; i < padding_head; i++) {
    dayList.push(i * -1)
  }
  for (let i = 1; i <= maxDay; i++) {
    dayList.push(i)
  }

  const cellWidth = Math.floor(layoutWidth / 7);

  const handleChooseDate = (dateNum: number) => {
    if (dateNum < 1) return;
    setChosenDate(new Date(year, jsMonth, dateNum));
  }

  if (jsMonth < 0 || jsMonth > 11) return <Text>Wrong month input</Text>

  return (
    <View style={{
      width: layoutWidth,
    }}>
      <View style={{
        width: '100%',
        flexDirection: 'row',
      }}>
        {daysOfWeek.map(x =>
          <View key={x.jsVal} style={{
            width: cellWidth,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontWeight: 'bold'
            }}>{x.shortName}</Text>
          </View>
        )}
      </View>
      <View style={{
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}>
        {dayList.map(x =>
          <Pressable key={x} style={{
            width: cellWidth,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
          }} onPress={() => handleChooseDate(x)}>
            <View style={[
              {
                display: x <= 0 ? 'none' : 'flex'
              },
              styles.otherDateContainer,
              year === chosenDate.getFullYear()
                && jsMonth === chosenDate.getMonth()
                && x === chosenDate.getDate()
                ? styles.chosenDateContainer
                : {}
            ]}>
              <Text>{String(x)}</Text>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chosenDateContainer: {
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: 'lightgreen',
    borderColor: 'lightgreen'
  },
  otherDateContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
})