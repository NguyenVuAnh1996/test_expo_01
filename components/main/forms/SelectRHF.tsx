import { useRef, useState } from "react";
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import { Animated, Modal, Pressable, ScrollView, StyleProp, Text, TextInput, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface OptionItem {
  label: string
  value: string | number
}

const SelectDropdown = ({
  value,
  onChange,
  placeholder = '',
  isSearchable,
  items = []
}: {
  value?: string | number
  onChange: (value: string | number) => void
  placeholder?: string
  isSearchable?: boolean
  items: OptionItem[]
}) => {
  const optionHeight = 50;
  const maxOptionsShown = 5;
  const searchBoxHeight = isSearchable ? 55 : 0;
  const modalHeight = (items.length > maxOptionsShown ? maxOptionsShown + 0.5 : items.length) * optionHeight + searchBoxHeight;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const slidingAnimation = useRef(new Animated.Value(modalHeight * -1)).current;
  const [displayedItems, setDisplayedItems] = useState<OptionItem[]>(items);
  const handleChangeSearch = (text: string) => {
    let _input = text.trim().toLocaleLowerCase();
    if (_input === '') {
      setDisplayedItems(items)
    } else {
      setDisplayedItems(items.filter(x =>
        x.label.toLocaleLowerCase().normalize('NFD').includes(_input)
      ))
    }
  }
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
    }).start(() => setModalOpen(false));
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
          height: 40,
          padding: 10
        }} onPress={() => handleOpenModal()}>
          <Text style={{
            color: value !== undefined && value !== null ? 'black': 'grey'
          }}>{
            value !== undefined && value !== null
              ? items.filter(x => x.value === value)[0].label
              : placeholder
          }</Text>
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
                    placeholder="Tìm kiếm ..."
                  />
                </View>
              }
              <ScrollView style={{
                flex: 1
              }}>
                {displayedItems.map(x =>
                  <Pressable key={x.value} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: optionHeight,
                    borderBottomWidth: 0.5,
                  }} onPress={() => {
                    onChange(x.value);
                    handleCloseModal();
                  }}>
                    <Text numberOfLines={1} style={{
                      fontSize: 16,
                    }}>{x.label}</Text>
                  </Pressable>
                )}
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

export default function SelectRHF<T extends FieldValues>({
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
          <SelectDropdown
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