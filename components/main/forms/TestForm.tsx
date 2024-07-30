import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";
import TextInputRHF from "./TextInputRHF";
import { useState } from "react";
import RadioBtnGroupRHF from "./RadioBtnGroupRHF";
import CheckboxGroupRHF from "./CheckboxGroupRHF";
import SelectRHF from "./SelectRHF";
import SelectMultiRHF from "./SelectMultiRHF";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePickerLib01RHF from "./DateTimePickerLib01RHF";
import DateTimePickerLib02RHF from "./DateTimePickerLib02RHF";

interface Inputs {
  fullname: string
  gender: number
  subjects: number[]
  province: number | string
  dishes: number[]
  birthday: Date | string
}

const validateName = (name: string) => {
  const regex = /^[A-Za-zÀ-ỹà-ỹ ]+$/g;
  return regex.test(name);
};

export default function TestForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<Inputs>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [result, setResult] = useState<any>();

  const handleCloseModal = () => {
    setModalOpen(false);
    setResult({});
  }
  const onSubmit: SubmitHandler<FieldValues> = data => {
    setResult(data);
    setModalOpen(true);
  }
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInputRHF
        control={control}
        name="fullname"
        errors={errors}
        isRequired
        isLabel
        displayName="Họ và tên"
        extraValidate={value => validateName(value)}
        errMess_extra="Họ và tên không được có ký tự số"
        style={{
          height: 40,
          padding: 10
        }}
      />
      <RadioBtnGroupRHF
        control={control}
        errors={errors}
        name="gender"
        displayName="Giới tính"
        isLabel
        isRequired
        items={[
          { label: 'Nam', value: 0 },
          { label: 'Nữ', value: 1 },
        ]}
      />
      <CheckboxGroupRHF
        control={control}
        errors={errors}
        name="subjects"
        displayName="Môn học"
        isLabel
        isRequired
        items={[
          { label: 'Toán', value: 0 },
          { label: 'Văn', value: 1 },
          { label: 'Sử', value: 2 },
        ]}
      />
      <SelectRHF
        control={control}
        name="province"
        errors={errors}
        placeholder="Chọn tỉnh"
        items={[
          { label: 'Hà Nội', value: 0 },
          { label: 'Đà Nẵng', value: 1 },
          { label: 'TP HCM', value: 2 },
          { label: 'Cần Thơ', value: 3 },
          { label: 'Lâm Đồng', value: 4 },
          { label: 'Đồng Nai', value: 5 },
          { label: 'Bình Thuận', value: 6 },
          { label: 'Ninh Bình', value: 7 },
        ]}
      />
      <SelectMultiRHF
        control={control}
        name="dishes"
        errors={errors}
        isSearchable
        placeholder="Chọn món ăn ưu thích"
        items={[
          { label: 'Cơm gà', value: 0 },
          { label: 'Bún chả', value: 1 },
          { label: 'Bánh ướt', value: 2 },
          { label: 'Vịt quay', value: 3 },
          { label: 'Heo quay', value: 4 },
          { label: 'Pizza', value: 5 },
          { label: 'Phở bò', value: 6 },
          { label: 'Bún cá', value: 7 },
          { label: 'Hủ tiếu', value: 8 },
        ]}
      />
      <DateTimePickerLib01RHF 
        control={control}
        errors={errors}
        name="birthday"
        mode="date"
      />
      {/* <DateTimePickerLib02RHF
        control={control}
        errors={errors}
        name="birthday"
        timePicker
      /> */}
      {/* <DateTimePickerLib03RHF
        control={control}
        errors={errors}
        name="birthday"
      /> */}
      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={handleCloseModal}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          padding: 20
        }}>
          <Pressable
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end'
            }}
            onPress={() => setModalOpen(false)}
          >
            <Text style={{
              color: 'white',
            }}>X</Text>
          </Pressable>
          {Object.entries(result ? result : {}).map(([key, value]) =>
            <Text key={key}
              style={{
                fontSize: 20,
                color: 'black'
              }}
            >{`${key}: ${String(value)}`}</Text>
          )}
        </View>
      </Modal>
    </View>
  )
}