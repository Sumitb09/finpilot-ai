import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";

type Props = {
    tags?: string[] | null;
  };
  
  export default function TagsCard({
    tags,
  }: Props) {
    if (!tags || tags.length === 0) {
      return null;
    }

  return (
    <Card style={styles.card}>
      <Typography variant="h3">
        Tags
      </Typography>

      <View style={styles.wrap}>
        {tags.map((tag) => (
          <View
            key={tag}
            style={styles.chip}
          >
            <Typography>
              {tag}
            </Typography>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },

  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 18,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#ECECEC",
    marginRight: 10,
    marginBottom: 10,
  },
});