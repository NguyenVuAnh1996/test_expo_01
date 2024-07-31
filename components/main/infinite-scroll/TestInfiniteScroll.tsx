import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

interface JokeEntity {
  id: number,
  content: string
}

const limit = 4;

export default function TestInfiniteScroll() {
  const [jokes, setJokes] = useState<JokeEntity[]>([]);
  const [page, setPage] = useState<number>(2);

  const getSomeJokes = useCallback(async (_page: number) => {
    axios.get(`api/Joke?PageSize=${limit}&PageNumber=${_page}`)
      .then(res => {
        console.log('success', JSON.stringify(res.data))
        setJokes(prev => prev.concat(res.data))
      })
      .catch(err => console.log('ERR get some jokes:', JSON.stringify(err)))
  }, [])

  useEffect(() => {
    getSomeJokes(1);
  }, [getSomeJokes])

  const renderItem = useCallback(({ item }: {item: JokeEntity}) =>
    <View key={item.id} style={{
      width: '100%',
      height: 500,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'salmon',
      marginBottom: 20
    }}>
      <Text style={{
        fontSize: 40,
        fontWeight: 'bold'
      }}>{item.id}</Text>
      <Text>{item.content}</Text>
    </View>, [])

  const handleReachEndScreen = () => {
    getSomeJokes(page);
    setPage(prev => prev + 1);
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={jokes}
        renderItem={renderItem}
        onEndReached={handleReachEndScreen}
        // onEndReachedThreshold={0.8}
        style={{flex: 1}}
        // keyExtractor={item => String(item.id)}
      />
    </View>
  )
}