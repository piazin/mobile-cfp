import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { BottomSheetComponent } from "./BottomSheet";

export function Input({
  iconName,
  placeholder,
  typeInput,
  date,
  onChangeDate,
  category,
  setCategory,
  categoryModalIsVisible,
  setCategoryModalIsVisible,
}) {
  const [dateView, setDateView] = useState(null);

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      mode: "date",
    });
  };

  useEffect(() => {
    changeDateView(date);
  }, [date]);

  const changeDateView = (date) => {
    if (!date) return;

    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    let formatDate = `${dd}/${mm}/${yyyy}`;

    setDateView(formatDate);
  };

  const data = [
    {
      id: "6368746df08c14f318473b14",
      title: "Car",
      iconName: "car-outline",
    },
  ];

  if (typeInput == "select")
    return (
      <View style={styles.viewInput}>
        <MaterialCommunityIcons
          name={category?.iconName ? category.iconName : iconName}
          color="#ccc"
          size={32}
          style={styles.iconDescription}
        />

        <TouchableOpacity onPress={() => setCategoryModalIsVisible(true)}>
          <Text
            color="white"
            fontWeight="medium"
            fontFamily="body"
            fontSize={16}
            paddingBottom={3}
            marginLeft={2}
          >
            {category ? category?.title : "Selecionar Categoria"}
          </Text>
        </TouchableOpacity>

        <BottomSheetComponent
          data={data}
          categoryModalIsVisible={categoryModalIsVisible}
          setCategoryModalIsVisible={setCategoryModalIsVisible}
          category={category}
          setCategory={setCategory}
        />
      </View>
    );

  return (
    <>
      <View style={styles.viewInput}>
        <MaterialCommunityIcons
          name={iconName}
          color="#ccc"
          size={32}
          style={styles.iconDescription}
        />
        {typeInput == "date" ? (
          <TouchableOpacity
            onPress={() => showDatePicker()}
            style={{ width: "100%" }}
          >
            <Text color="white" fontSize={16} paddingBottom={3} marginLeft={2}>
              {dateView}
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            placeholderTextColor="#ccc"
            placeholder={placeholder}
            style={styles.inputDescription}
            maxLength={32}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewInput: {
    borderBottomColor: "#d2d2d2",
    borderBottomWidth: 1,
    color: "#fff",
    fontSize: 22,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    textAlign: "center",
    marginTop: 42,
    width: 330,
  },
  inputDescription: {
    color: "#fff",
    fontSize: 16,
    paddingBottom: 10,
    width: "100%",
    marginLeft: 6,
  },
  iconDescription: {
    paddingBottom: 10,
  },
});
