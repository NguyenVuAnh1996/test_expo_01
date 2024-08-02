import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import { StyleProp, Text, TextStyle } from "react-native";
import CrudeDatepicker from "./CrudeDatepicker";

export default function CrudeDatepickerRHF<T extends FieldValues>({
  control,
  name,
  displayName = '',
  isLabel = false,
  isRequired = false,
  errors,
  labelStyles,
  errorStyles,
}: {
  control: Control<T>,
  name: Path<T>,
  errors?: FieldErrors<T>,
  displayName?: string,
  isLabel?: boolean,
  isRequired?: boolean,
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
          <CrudeDatepicker 
            current={field.value ? field.value : new Date()}
            onChange={field.onChange}
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