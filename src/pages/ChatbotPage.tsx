
import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";

// Mock chatbot responses - in a real app, this would connect to an AI API
const mockResponses = {
  greetings: [
    "Hello! How can I assist you with your meal planning today?",
    "Hi there! I'm here to help with nutrition advice and diabetes management.",
    "Welcome! I can answer questions about recipes, nutrition, or diabetes management."
  ],
  mealPlanning: [
    "For meal planning, I recommend focusing on balanced meals with lean proteins, healthy fats, and complex carbohydrates.",
    "Creating a weekly meal plan can help maintain consistent blood sugar levels. Would you like some template examples?",
    "Regular meal times are important for diabetes management. Try to eat at the same times every day."
  ],
  nutrition: [
    "Fiber-rich foods like vegetables, beans, and whole grains can help manage blood sugar levels.",
    "Monitoring carbohydrate intake is important. Focus on complex carbs from whole food sources.",
    "Protein helps you feel full and doesn't raise blood sugar. Good sources include fish, chicken, and plant-based options like legumes."
  ],
  default: [
    "I'm not sure I understand. Could you rephrase your question?",
    "That's a good question. Let me help you find more information about that.",
    "I'm here to help with nutrition and diabetes management. Could you provide more details about what you're looking for?"
  ]
};

// Helper function to determine response category based on user input
const getCategoryFromInput = (input: string): keyof typeof mockResponses => {
  input = input.toLowerCase();
  if (input.includes("hi") || input.includes("hello") || input.includes("hey") || input.includes("greet")) {
    return "greetings";
  } else if (input.includes("meal") || input.includes("plan") || input.includes("schedule")) {
    return "mealPlanning";
  } else if (input.includes("nutrition") || input.includes("food") || input.includes("eat") || input.includes("diet")) {
    return "nutrition";
  } else {
    return "default";
  }
};

// Helper function to select a random response from the appropriate category
const getResponse = (category: keyof typeof mockResponses): string => {
  const responses = mockResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
};

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatbotPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your Diabetic Chef assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response with a small delay
    setTimeout(() => {
      const category = getCategoryFromInput(userMessage.content);
      const responseContent = getResponse(category);

      const botResponse: Message = {
        id: messages.length + 2,
        content: responseContent,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Nutrition Assistant</h1>

        <Card className="overflow-hidden">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="text-primary flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Diabetic Chef Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user" 
                        ? "bg-primary text-white" 
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {message.content}
                    <div className={`text-xs mt-1 ${message.sender === "user" ? "text-primary-foreground/70" : "text-slate-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                placeholder="Type your question here..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 bg-slate-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Suggested Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="justify-start text-sm h-auto py-2"
              onClick={() => {
                setInput("What meals are best for managing blood sugar?");
                handleSendMessage();
              }}
            >
              What meals are best for managing blood sugar?
            </Button>
            <Button 
              variant="outline" 
              className="justify-start text-sm h-auto py-2"
              onClick={() => {
                setInput("How much protein should I eat daily?");
                handleSendMessage();
              }}
            >
              How much protein should I eat daily?
            </Button>
            <Button 
              variant="outline" 
              className="justify-start text-sm h-auto py-2"
              onClick={() => {
                setInput("Can you suggest a low-carb breakfast?");
                handleSendMessage();
              }}
            >
              Can you suggest a low-carb breakfast?
            </Button>
            <Button 
              variant="outline" 
              className="justify-start text-sm h-auto py-2"
              onClick={() => {
                setInput("What fruits are best for diabetics?");
                handleSendMessage();
              }}
            >
              What fruits are best for diabetics?
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatbotPage;
