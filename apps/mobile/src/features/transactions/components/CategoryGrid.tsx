import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useCategories } from "../../categories/hooks/useCategories";

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function CategoryGrid({
  selectedId,
  onSelect,
}: Props) {
  const { data, isPending } = useCategories();

  if (isPending) {
    return (
      <ActivityIndicator
        size="large"
        color="#3B82F6"
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <Pressable
          style={[
            styles.card,
            selectedId === item.id &&
              styles.selected,
          ]}
          onPress={() => onSelect(item.id)}
        >
          <Text style={styles.icon}>
            {item.icon}
          </Text>

          <Text style={styles.name}>
            {item.name}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  card: {
    width: "48%",
    backgroundColor: "#1E293B",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },

  selected: {
    borderColor: "#3B82F6",
  },

  icon: {
    fontSize: 28,
    marginBottom: 8,
  },

  name: {
    color: "white",
    fontWeight: "600",
  },
});