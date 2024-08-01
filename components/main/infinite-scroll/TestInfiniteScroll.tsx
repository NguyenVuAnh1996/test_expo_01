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
  const [noMoreData, setNoMoreData] = useState<boolean>(false);

  const getSomeJokes = useCallback(async (_page: number) => {
    axios.get(`api/Joke?PageSize=${limit}&PageNumber=${_page}`)
      .then(res => {
        let _newData: JokeEntity[] = res.data;
        if (_newData.length > 0) {
          setJokes(prev => prev.concat(_newData))
        } else {
          setNoMoreData(true);
        }
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
    if (!noMoreData) {
      getSomeJokes(page);
      setPage(prev => prev + 1);
    }
  }

  return (
    <View style={{ width: '100%' }}>
      <FlatList
        data={jokes}
        renderItem={renderItem}
        onEndReached={handleReachEndScreen}
        onEndReachedThreshold={1}
        style={{
          width: '100%',
          padding: 10
        }}
        // keyExtractor={item => String(item.id)}
      />
      {!noMoreData && 
      <View style={{ 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
       }}>
        <Text>Đang tải ...</Text>
      </View>
      }
    </View>
  )
}