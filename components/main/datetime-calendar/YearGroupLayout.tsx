import { Pressable, Text, View } from "react-native";

export const getFirstYearOfGroupFromYear = (year: number) =>
  Math.floor(year / 9) * 9;

export default function YearGroupLayout({
  year,
  handleChooseYear,
  currentFirstYear
}: {
  year: number
  handleChooseYear: (input: number) => void
  currentFirstYear: number
}) {
  let _year = currentFirstYear - 1;
  const yearGroup: number[][] = []
  for (let i = 0; i < 3; i++) {
    let _temp = [];
    for (let j = 0; j < 3; j++) {
      _year++;
      _temp.push(_year);
    }
    yearGroup.push(_temp)
  }

  return (
    <View style={{
      width: '100%'
    }}>{yearGroup.map(x =>
      <View key={x[0]} style={{
        width: '100%',
        flexDirection: 'row'
      }}>{x.map(y =>
        <Pressable key={y} style={{
          flex: 1,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center'
        }} onPress={() => handleChooseYear(y)}>
          <View style={
            y === year
            ? {
              backgroundColor: 'lightgreen',
              borderRadius: 50,
              padding: 10
            }
            : {}
          }>
            <Text>{String(y)}</Text>
          </View>
        </Pressable>
      )}</View>
    )}</View>
  )
}