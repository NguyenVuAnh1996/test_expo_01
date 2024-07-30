import { useRef, useState } from "react"
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form"
import { Animated, FlatList, Modal, Pressable, ScrollView, StyleProp, Text, TextInput, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

interface OptionItem {
  label: string
  value: string | number
}

const primaryColor = '#1677FF';

const MiniCard = ({
  text,
  ...otherProps
}: {
  text: string
  [propName: string]: unknown
}) => (
  <Pressable style={{
    backgroundColor: primaryColor,
    padding: 5,
    flexDirection: 'row',
    gap: 5,
    marginRight: 10,
  }} {...otherProps}>
    <Text style={{
      color: 'white'
    }}>{text}</Text>
    <Text style={{
      transform: [
        { rotateZ: '45deg' }
      ],
      color: 'white',
      fontWeight: 'bold'
    }}>+</Text>
  </Pressable>
)

const ChosenCardsGroupForModal = ({
  chosenCardsHeight,
  modalScrollViewRef,
  values,
  handlePressOption,
  items
}: {
  chosenCardsHeight: number
  modalScrollViewRef: React.RefObject<ScrollView>
  values: (string | number)[]
  handlePressOption: (value: string | number) => void
  items: OptionItem[]
}) => (
  <View style={{
    width: '100%',
    height: chosenCardsHeight,
  }}>
    <ScrollView horizontal style={{
      flex: 1,
      flexDirection: 'row',
      padding: 10,
    }}
      ref={modalScrollViewRef}
      onContentSizeChange={() => {
        if (modalScrollViewRef.current)
          modalScrollViewRef.current.scrollToEnd({ animated: true })
      }}
    >
      {values.map(x =>
        <MiniCard
          key={x}
          text={items.filter(y => y.value === x)[0].label}
          onPress={() => handlePressOption(x)}
        />
      )}
    </ScrollView>
  </View>
)

const OptionsGroup = ({
  displayedItems,
  optionHeight,
  values,
  handlePressOption
}: {
  displayedItems: OptionItem[]
  optionHeight: number
  values: (string | number)[]
  handlePressOption: (value: string | number) => void
}) => {
  const lastItem = displayedItems[displayedItems.length - 1];
  return (
    <ScrollView style={{
      flex: 1
    }}>
      <View style={{
        width: '100%',
        height: 'auto'
      }}>
        {displayedItems.map(x =>
          <Pressable key={x.value} style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: optionHeight - (
              x === lastItem
              ? 0 : 1.5
            ),
            borderBottomWidth:
            x === lastItem
              ? 0 : 0.5
            ,
            marginBottom: 
              x === lastItem
              ? 0 : 1
            ,
            backgroundColor:
              values.includes(x.value)
                ? 'lightgrey'
                : 'white'
          }} onPress={() => handlePressOption(x.value)}>
            <Text numberOfLines={1} style={{
              fontSize: 16,
            }}>{x.label}</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  )
}

const SelectMulti = ({
  value,
  onChange,
  placeholder = '',
  isSearchable,
  items = []
}: {
  value?: (string | number)[]
  onChange: (value: (string | number)[]) => void
  placeholder?: string
  isSearchable?: boolean
  items: OptionItem[]
}) => {
  const optionHeight = 50;
  const maxOptionsShown = 5;
  const searchBoxHeight = isSearchable ? 55 : 0;
  const chosenCardsHeight = value
    ? (value.length > 0 ? 50 : 0)
    : 0;
  const modalHeight =
    (items.length > maxOptionsShown ? maxOptionsShown + 0.5 : items.length) * optionHeight
    + searchBoxHeight + chosenCardsHeight;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const slidingAnimation = useRef(new Animated.Value(modalHeight * -1)).current;
  const [displayedItems, setDisplayedItems] = useState<OptionItem[]>(items);
  const modalScrollViewRef = useRef<ScrollView>(null);
  const [searchedInput, setSearchedInput] = useState<string>('');

  const handleOpenModal = () => {
    setModalOpen(true);
    Animated.timing(slidingAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }
  const handleCloseModal = () => {
    Animated.timing(slidingAnimation, {
      toValue: modalHeight * -1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setModalOpen(false);
      handleChangeSearch('');
    });
  }
  const handlePressOption = (optionValue: string | number) => {
    let _values = value ? value : [];
    if (_values.includes(optionValue)) {
      onChange(_values.filter(x => x !== optionValue));
    } else {
      _values.push(optionValue);
      onChange(_values);
    }
  }
  const handleChangeSearch = (text: string) => {
    setSearchedInput(text);
    let _input = text.trim().toLocaleLowerCase();
    if (_input === '') {
      setDisplayedItems(items)
    } else {
      setDisplayedItems(items.filter(x =>
        x.label.toLocaleLowerCase().normalize('NFD').includes(_input)
      ))
    }
  }
  return (
    <>
      <View style={{
        borderWidth: 1,
        marginBottom: 20
      }}>
        <Pressable style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 40,
          padding: 10
        }} onPress={() => handleOpenModal()}>
          {chosenCardsHeight !== 0
            ? <View style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              rowGap: 7,
            }}>
              {(value ? value : []).map(x =>
                <MiniCard
                  key={x}
                  text={items.filter(y => y.value === x)[0].label}
                  onPress={() => handlePressOption(x)}
                />
              )}
            </View>
            : <Text>{placeholder}</Text>}
          <Text style={{
            transform: [
              { rotateZ: '90deg' }
            ],
            fontWeight: 'bold',
          }}>{`>`}</Text>
        </Pressable>
      </View>
      <Modal
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => handleCloseModal()}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: '#000000a1'
          }}
          activeOpacity={1}
          onPress={() => handleCloseModal()}
        >
          <TouchableWithoutFeedback>
            <Animated.View style={{
              width: '100%',
              height: modalHeight,
              backgroundColor: 'white',
              alignSelf: 'flex-end',
              position: 'absolute',
              bottom: slidingAnimation,
            }}>
              {chosenCardsHeight !== 0 &&
                <ChosenCardsGroupForModal 
                  chosenCardsHeight={chosenCardsHeight}
                  handlePressOption={handlePressOption}
                  items={items}
                  modalScrollViewRef={modalScrollViewRef}
                  values={value ? value : []}
                />
              }
              {isSearchable &&
                <View style={{
                  height: searchBoxHeight,
                  width: '100%',
                  padding: 10
                }}>
                  <TextInput
                    style={{
                      flex: 1,
                      borderWidth: 1
                    }}
                    onChangeText={handleChangeSearch}
                    value={searchedInput}
                    placeholder="Tìm kiếm ..."
                  />
                </View>
              }
              <OptionsGroup 
                displayedItems={displayedItems}
                handlePressOption={handlePressOption}
                optionHeight={optionHeight}
                values={value ? value : []}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

export default function SelectMultiRHF<T extends FieldValues>({
  items,
  placeholder,
  control,
  name,
  displayName = '',
  isLabel = false,
  isRequired = false,
  isSearchable = false,
  errors,
  labelStyles,
  errorStyles
}: {
  items: OptionItem[]
  placeholder: string
  control: Control<T>,
  name: Path<T>,
  errors?: FieldErrors<T>,
  displayName?: string,
  isLabel?: boolean,
  isRequired?: boolean,
  isSearchable?: boolean
  labelStyles?: StyleProp<TextStyle>,
  errorStyles?: StyleProp<TextStyle>,
}) {
  return (
    <>
      {isLabel && <Text style={labelStyles}>{`${displayName}:`}</Text>}
      <Controller
        control={control}
        name={name}
        rules={{ required: isRequired }}
        render={({ field }) =>
          <SelectMulti
            onChange={field.onChange}
            value={field.value}
            placeholder={placeholder}
            items={items}
            isSearchable={isSearchable}
          />
        }
      />
      {errors?.[name] && (
        <Text style={[
          {
            color: 'red',
            marginBottom: 15
          },
          errorStyles
        ]}>
          {errors?.[name]?.type === 'required' && `${displayName} không được để trống!`}
        </Text>
      )}
    </>
  )
}