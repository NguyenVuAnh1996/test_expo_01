import TestLunar from "@/components/main/datetime-calendar-vuanh/TestLunar";
import TestAgenda from "@/components/main/task-calendar/TestAgenda";
import TestAgenda03 from "@/components/main/task-calendar/TestAgenda03";
import TestAgenda04 from "@/components/main/task-calendar/TestAgenda04";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const ToggleBtn = ({
  num,
  setNum
}: {
  num: number
  setNum: (input: number) => void
}) => (
  <Pressable style={{
    width: 50,
    height: 50,
    margin: 20,
    backgroundColor: 'salmon',
    justifyContent: 'center',
    alignItems: 'center'
  }} onPress={() => setNum(num)}>
    <Text>{num}</Text>
  </Pressable>
)

export default function DateScreen() {
  const [toggle, setToggle] = useState<number>(1);
  return (
    <>
    <TestLunar />
    <Text style={{
      fontSize: 30,
      fontWeight: 'bold'
    }}>{`Bạn đang ở dạng số: ${toggle}`}</Text>
    <View style={{
      width: '100%',
      flexDirection: 'row'
    }}>
      {[1,3,4].map(x => 
        <ToggleBtn 
          key={x}
          num={x}
          setNum={setToggle}
        />
      )}
    </View>
    {toggle === 1 && <TestAgenda />}
    {toggle === 3 && <TestAgenda03 />}
    {toggle === 4 && <TestAgenda04 />}
    </>
  )
}