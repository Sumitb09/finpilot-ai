import React, { useMemo } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useCategories } from "../../categories/hooks/useCategories";
import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function CategoryChips({
  selectedId,
  onSelect,
}: Props) {
  const { palette } = useAppTheme();

  const { data = [] } = useCategories();

  const categories = useMemo(() => {
    const unique = new Map();

    data.forEach((item) => {
      if (!unique.has(item.name)) {
        unique.set(item.name, item);
      }
    });

    return [...unique.values()];
  }, [data]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const selected =
          item.id === selectedId;

        return (
          <Pressable
            onPress={() =>
              onSelect(item.id)
            }
            style={styles.wrapper}
          >
            <View
              style={[
                styles.circle,
                {
                  backgroundColor:
                    selected
                      ? palette.primary
                      : palette.card,

                  borderColor:
                    selected
                      ? palette.primary
                      : palette.border,
                },
              ]}
            >
              <Text style={styles.icon}>
                {item.icon}
              </Text>
            </View>

            <Text
              numberOfLines={1}
              style={[
                styles.label,
                {
                  color: selected
                    ? palette.primary
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
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
    paddingRight: 20,
  },

  wrapper: {
    alignItems: "center",
    marginRight: 18,
    width: 72,
  },

  circle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },

  icon: {
    fontSize: 24,
  },

  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});