import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useCategories } from "../../categories/hooks/useCategories";
import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  selectedId: string |null;
  onSelect: (id: string) => void;
};

export default function CategoryGrid({
  selectedId,
  onSelect,
}: Props) {
  const { palette } = useAppTheme();

  const { data = [], isPending } =
    useCategories();

  const [search, setSearch] =
    useState("");

  const categories = useMemo(() => {
    const unique = new Map();

    data.forEach((item) => {
      if (!unique.has(item.name)) {
        unique.set(item.name, item);
      }
    });

    return [...unique.values()].filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
  }, [data, search]);

  if (isPending) {
    return (
      <ActivityIndicator
        color={palette.primary}
      />
    );
  }

  return (
    <View>
      <TextInput
        placeholder="🔍 Search category..."
        placeholderTextColor={
          palette.subtext
        }
        value={search}
        onChangeText={setSearch}
        style={[
          styles.search,
          {
            backgroundColor:
              palette.card,
            color: palette.text,
            borderColor:
              palette.border,
          },
        ]}
      />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          styles.list
        }
        renderItem={({ item }) => {
          const selected =
            selectedId === item.id;

          return (
            <Pressable
              onPress={() =>
                onSelect(item.id)
              }
              style={[
                styles.item,
                {
                  backgroundColor:
                    selected
                      ? palette.primary
                      : palette.card,
                },
              ]}
            >
              <View
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor:
                      selected
                        ? "#FFFFFF22"
                        : palette.background,
                  },
                ]}
              >
                <Text
                  style={styles.icon}
                >
                  {item.icon}
                </Text>
              </View>

              <Text
                numberOfLines={1}
                style={[
                  styles.name,
                  {
                    color:
                      selected
                        ? "#FFF"
                        : palette.text,
                  },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    marginBottom: 18,
    fontSize: 16,
  },

  list: {
    paddingRight: 20,
  },

  item: {
    width: 90,
    marginRight: 14,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  icon: {
    fontSize: 22,
  },

  name: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});