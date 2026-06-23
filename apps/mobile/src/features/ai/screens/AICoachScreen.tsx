import React, { useState, useRef, useEffect, } from "react";
import { FlatList, StyleSheet, KeyboardAvoidingView, Platform, Pressable,} from "react-native";
import Screen from "../../../components/ui/Screen"; 
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import TypingIndicator from "../components/TypingIndicator";
import SuggestedQuestions from "../components/SuggestedQuestions";  
import { useDashboard } from "../../dashboard/hooks/useDashboard";
import { useChat } from "../hooks/useChat";
import Typography from "../../../components/ui/Typography";
import { router } from "expo-router";
import Button from "../../../components/ui/Button";
  
export default function AICoachScreen() {
  const listRef = useRef<FlatList>(null); 
  const [input, setInput] = useState("");
  const { transactions, profile,} = useDashboard();
  const { messages,loading, streamingMessage, sendMessage, clearChat, } = useChat( transactions, profile?.monthly_budget ?? 0);
    
  useEffect(() => {
    listRef.current?.scrollToEnd({
      animated: true,
    });
  }, [messages]);
  
  async function handleSend(
    text: string
  ) {
    if (!text.trim()) return; 
      await sendMessage(text); 
      setInput("");
    }
  
  return (
    <Screen scroll={false}>
      <KeyboardAvoidingView
          style={styles.container}
          behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
          }
      >
        <Pressable
          onPress={clearChat}
          style={{
            alignSelf: "flex-end",
            marginBottom: 12,
          }}
        >
          <Typography>
            🗑️ Clear Chat
          </Typography>
        </Pressable>
        <Button
          title="📄 Monthly AI Report"
          onPress={() =>
          router.push("/(protected)/report")
          }
        />
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <SuggestedQuestions   
              onSelect={loading ? () => {} : handleSend}    
            />   
          }
          
          renderItem={({ item }) => (
            <ChatBubble
              text={item.content}
              isUser={item.role === "user"}
              createdAt={item.createdAt}
            />
          )}
          contentContainerStyle={styles.listContent}
          style={styles.list}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
        {streamingMessage !== "" && (
          <ChatBubble
            text={streamingMessage}
            isUser={false}
          />
          )
        }

        {loading &&
          streamingMessage === "" && ( 
          <TypingIndicator />
          )
        }

        <ChatInput
          value={input}
          onChangeText={setInput}
          onSend={() => handleSend(input)}
        />
      </KeyboardAvoidingView>
    </Screen>
    );
  }
  
  const styles = StyleSheet.create({
    list: {
      flex: 1,
    },
  
    listContent: {
      paddingVertical: 20,
      paddingBottom: 20,
      flexGrow: 1,
    },

    container: {
        flex: 1,
      },
  });