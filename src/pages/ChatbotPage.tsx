
import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, User, Bot, Clock, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      content: "Hello! I'm your diabetes management assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I understand you want to know more about managing Type 2 diabetes. Regular monitoring of blood glucose levels is essential, along with a balanced diet and regular exercise.",
        "According to research, maintaining a consistent meal schedule can help manage blood sugar levels throughout the day.",
        "The meal plan I've created for you takes into account your specific nutritional needs to help keep your glucose levels stable.",
        "That's a great question! Foods with a low glycemic index are generally better for maintaining stable blood sugar levels.",
        "I recommend speaking with your healthcare provider before making significant changes to your diet or exercise routine."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: messages.length + 2,
        sender: "bot",
        content: randomResponse,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  // Example suggested questions
  const suggestedQuestions = [
    "What foods should I avoid with Type 2 diabetes?",
    "How can I reduce my blood sugar quickly?",
    "What's a good exercise routine for diabetics?",
    "Can you explain my meal plan?",
    "How often should I check my glucose levels?"
  ];

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <Card className="border-none shadow-lg overflow-hidden h-[75vh] flex flex-col">
          <div className="bg-primary/5 border-b p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Diabetes Management Assistant
            </h2>
            <p className="text-sm text-slate-500">
              Ask me anything about your diet, glucose monitoring, or diabetes management
            </p>
          </div>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className={message.sender === "user" ? "bg-primary/20" : "bg-slate-100"}>
                    {message.sender === "user" ? (
                      <>
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback className="text-primary">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/placeholder.svg" alt="Bot" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  
                  <div 
                    className={`rounded-2xl px-4 py-2.5 text-sm ${
                      message.sender === "user" 
                        ? "bg-primary text-white" 
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    <p>{message.content}</p>
                    <div className={`text-xs mt-1 flex items-center gap-1 ${
                      message.sender === "user" ? "text-primary-50" : "text-slate-500"
                    }`}>
                      <Clock className="h-3 w-3" />
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          
          <div className="p-4 border-t bg-white">
            <h3 className="text-sm font-medium mb-2 text-slate-600">Suggested questions:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-full transition-colors"
                  onClick={() => setInputMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="pl-9 pr-4 py-2.5 h-11"
                />
              </div>
              <Button type="submit" size="icon" className="h-11 w-11 rounded-full">
                <ArrowUp className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ChatbotPage;
