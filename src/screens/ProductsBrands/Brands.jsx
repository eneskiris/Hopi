import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBrandsData,
  selectBrandsStatus,
  selectBrandsError,
  getBrandsData,
} from "../../features/brands/brandsSlice";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Brands = () => {
  const navigation = useNavigation();
  const data = useSelector(selectBrandsData);
  const status = useSelector(selectBrandsStatus);
  const error = useSelector(selectBrandsError);
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(getBrandsData());
  }, [dispatch]);

  function handleNavigate(item) {
    // @ts-ignore
    navigation.navigate("Map", { item });
  }
  return (
    <View style={styles.container}>
      {status === "loading" && <Text>Loading...</Text>}
      {status === "failed" && <Text>{error}</Text>}
      {status === "succeeded" && (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <Pressable
              style={styles.list}
              key={index}
              onPress={() => handleNavigate(item)}
            >
              <View style={styles.leftSide}>
                <Text style={styles.brandName}>{item.markaAdi}</Text>
                <Text style={styles.brandLocation}>{item.yerAdi}</Text>
              </View>
              <View style={styles.rightSide}>
                <Feather name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

export default Brands;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFEFE",
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "#F1F1F1",
    borderBottomWidth: 2,
  },
  leftSide: {},
  brandName: {
    fontWeight: "900",
    paddingBottom: 10,
  },
  brandLocation: {
    fontWeight: "300",
  },
  rightSide: {},
});
