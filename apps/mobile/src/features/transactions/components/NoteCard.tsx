import React from "react";
import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";

type Props = {
  note?: string | null;
};

export default function NoteCard({
  note,
}: Props) {
  if (!note) return null;

  return (
    <Card style={{ marginTop: 20 }}>
      <Typography variant="h3">
        📝 Notes
      </Typography>

      <Typography
        style={{
          marginTop: 14,
        }}
      >
        {note}
      </Typography>
    </Card>
  );
}