import { useState, useEffect, useRef } from "react";

import { ChatMessage } from "../types/chat";
import { askGemini } from "../services/ai.service";
import {
  getMessages,
  saveMessage,
  clearConversation,
} from "../services/chat.service";

import { Transaction } from "../../transactions/types/transaction";

type SendMessage = (message: string) => Promise<void>;

function generateId() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 11)}`;
}

export function useChat(
  transactions: Transaction[],
  monthlyBudget: number
) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: "assistant",
      content:
        "👋 Hi! I'm FinPilot AI. Ask me anything about your finances.",
      createdAt: new Date().toISOString(),
    },
  ]);

  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const [loading, setLoading] = useState(false);

  const [streamingMessage, setStreamingMessage] =
    useState("");

  useEffect(() => {
    async function loadConversation() {
      try {
        const history = await getMessages();

        if (history.length > 0) {
          setMessages(history);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadConversation();
  }, []);

  const sendMessage: SendMessage = async (
    text
  ) => {
    if (!text.trim()) return;

    if (loading) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedMessages = [
      ...messagesRef.current,
      userMessage,
    ];

    setMessages(updatedMessages);

    setLoading(true);

    setStreamingMessage("");

    try {
      await saveMessage(
        "user",
        userMessage.content
      );

      const reply =
        await askGemini({
            prompt: text,
            history: updatedMessages
            .slice(-8)
            .map((message) => ({
              role: message.role,
              content: message.content,
            })),
            transactions,
            monthlyBudget,
        });

      if (!reply.trim()) {
        throw new Error(
          "Empty Gemini response"
        );
      }

      await saveMessage(
        "assistant",
        reply
      );

      for (
        let i = 0;
        i < reply.length;
        i++
      ) {
        await new Promise((resolve) =>
          setTimeout(resolve, 8)
        );

        setStreamingMessage(
          reply.slice(0, i + 1)
        );
      }

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: reply,
        createdAt:
          new Date().toISOString(),
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);

      setStreamingMessage("");
    } catch (error) {
      console.error(error);

      const errorMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content:
          "⚠️ Sorry, I couldn't generate a response.",
        createdAt:
          new Date().toISOString(),
      };

      setMessages((previous) => [
        ...previous,
        errorMessage,
      ]);

      setStreamingMessage("");
    } finally {
      setLoading(false);
    }
  };

  async function clearChat() {
    try {
      await clearConversation();

      setStreamingMessage("");

      setMessages([
        {
          id: generateId(),
          role: "assistant",
          content:
            "👋 Hi! I'm FinPilot AI. Ask me anything about your finances.",
          createdAt:
            new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    messages,
    loading,
    streamingMessage,
    sendMessage,
    clearChat,
  };
}