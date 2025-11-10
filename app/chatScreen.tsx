import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import api from "../api/api";

async function sendMessageToBackend(messageText: string, messages?: any[]) {
  try {
    const payload = messages ? { messages } : { message: messageText };
    const resp = await api.post("api/v1/chat", payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 30000,
    });
    return resp.data?.reply ?? "Desculpe, não obtive resposta do servidor.";
  } catch (err: any) {
    console.error("chatService error:", err?.response?.data ?? err.message);
    return "Erro na conexão com o servidor. Tente novamente mais tarde.";
  }
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Olá! Sou o assistente do Minha Dose — posso te ajudar com vacinas, agendamentos e requisitos para viagens. Em que posso ajudar?",
        createdAt: new Date(),
        user: { _id: 2, name: "MinhaDose Bot" },
      },
    ]);
  }, []);

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      const userMsg = newMessages[0];
      setMessages((previous) => GiftedChat.append(previous, newMessages));

      const history = [
        {
          role: "system",
          content:
            "Você é o assistente da aplicação Minha Dose. Responda em português de forma clara e breve.",
        },
        ...messages
          .slice(-6)
          .reverse()
          .map((m) => ({
            role: m.user._id === 1 ? "user" : "assistant",
            content: m.text,
          })),
        { role: "user", content: userMsg.text },
      ];

      setLoading(true);
      const replyText = await sendMessageToBackend(userMsg.text, history);
      setLoading(false);

      const botMsg: IMessage = {
        _id: Math.random().toString(36).substring(7),
        text: replyText,
        createdAt: new Date(),
        user: { _id: 2, name: "MinhaDose Bot" },
      };

      setMessages((previous) => GiftedChat.append(previous, [botMsg]));
    },
    [messages]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <View style={{ flex: 1 }}>
          {loading && (
            <ActivityIndicator
              style={{ position: "absolute", top: 12, left: 12, zIndex: 10 }}
            />
          )}
          <GiftedChat
            messages={messages}
            onSend={(msgs) => onSend(msgs)}
            user={{ _id: 1, name: "Usuário" }}
            placeholder="Digite sua dúvida sobre vacinas..."
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
