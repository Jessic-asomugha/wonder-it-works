
import { useState, useEffect, useRef } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, User, Bot, Clock, Search, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: number;
  sender: "bot" | "user";
  content: string;
  timestamp: string;
}

// We'll create a Supabase Edge Function to handle the OpenAI API calls
// For now, we'll use this client-side implementation
const ChatbotPage = () => {
  const { user, getUserProfile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      content: "Hello! I'm your diabetes management assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openAIKey, setOpenAIKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<any>(null);
  
  // Fetch user profile data for context
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      try {
        const { data } = await getUserProfile();
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    
    loadUserData();
  }, [user, getUserProfile]);
  
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    // Check if we have an API key
    if (!openAIKey && !showKeyInput) {
      setShowKeyInput(true);
      toast.info("Please enter your OpenAI API key to use the chatbot");
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      // Prepare context about the user
      let userContext = "You are a diabetes management assistant, helping with meal planning and health advice.";
      
      if (userData) {
        userContext += ` The user is ${userData.age || 'unknown age'} years old, has ${userData.diabetes_type || 'Type 2'} diabetes`;
        if (userData.height && userData.weight) {
          userContext += `, height ${userData.height}cm, weight ${userData.weight}kg`;
        }
      }
      
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: userContext },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            { role: 'user', content: inputMessage }
          ],
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const botResponse = data.choices[0].message.content;
      
      // Add bot message
      const botMessage: Message = {
        id: messages.length + 2,
        sender: "bot",
        content: botResponse,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      toast.error("Failed to get response from the AI assistant");
      
      // Add a fallback message
      const fallbackMessage: Message = {
        id: messages.length + 2,
        sender: "bot",
        content: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later, or ask a different question.",
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveApiKey = () => {
    if (!openAIKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    // In a real app, you would store this on the server side or in environment variables
    // For this demo, we're just storing it in state
    toast.success("API key saved successfully");
    setShowKeyInput(false);
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
        {showKeyInput ? (
          <Card className="mb-4">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Enter your OpenAI API Key</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">API Key</label>
                  <Input 
                    type="password"
                    value={openAIKey}
                    onChange={(e) => setOpenAIKey(e.target.value)}
                    placeholder="sk-..."
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Your API key is only stored temporarily in this browser session and is never saved to our database.
                  </p>
                </div>
                <div>
                  <Button onClick={handleSaveApiKey}>Save API Key</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
        
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
                    <p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
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
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="bg-slate-100">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl px-4 py-2.5 text-sm bg-slate-100 text-slate-800 flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
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
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                size="icon" 
                className="h-11 w-11 rounded-full"
                disabled={isLoading || !inputMessage.trim()}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowUp className="h-5 w-5" />
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ChatbotPage;
