"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PluggableList } from "unified";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import SvgIcon from "../../components/Core/SvgIcon";
import { randomUUID } from "crypto";

interface Conversation{
  id: string;
  title: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  messages: any[];
}

interface User {
  id: number;
  name: string;
  avatar: string;
}
interface Message {
  id: string;
  role: "user" | "model";
  content: string;
}
export default function NewChatPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [currentConversationTitle, setCurrentConversationTitle] = useState<string>("New Chat");
  const [isDraftChat, setIsDraftChat] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  const [conversationCount, setConversationCount] = useState(0);
  const [selectedModel, setSelectedModel] = useState("gemini");
  const [loading, setLoading] = useState(false); // for progress indicator
  const abortControllerRef = useRef<AbortController | null>(null); // for cancelling requests
  const [assistantTyping, setAssistantTyping] = useState(false); // new: for chat placeholder


  const models = [
    {
      id: "gemini",
      name: "Gemini",
      icon: "⚡",
      activeColor: "bg-blue-300 text-black",
      inactiveColor: "bg-blue-100 text-blue-600",
    },
  ];


// Smooth auto-scroll whenever messages change
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
    return () => cancelAnimationFrame(id);
  }, [messages]);

// Check authentication + fetch user
useEffect(() => {
  const token = localStorage.getItem("access_token");
  console.log("Token:", token); // Debugging line
  if (!token) {
    router.push("/signin");
  } else {
    setIsAuthenticated(true);

  fetch("/api/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => setUser({
      id: data.id,
      name: `${data.first_name} ${data.last_name?.charAt(0) || ''}.`,
      avatar: data.profile_picture || "/Group.png",
    }))
    .catch(err => {
      console.error("Profile fetch error:", err);
      setUser({id:12, name: "Guest User", avatar: "/Group.png" });
    });

}
}, [router]);

// ✅ Logout handler
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token"); // in case you're storing refresh tokens too
  setIsAuthenticated(false);
  router.push("/signin");
};

useEffect(() => {
  if (!isAuthenticated) return;
  handleNewConversation();
}, [isAuthenticated]);

// Fetch convos list from API
useEffect(() => {
  if (!isAuthenticated) return;
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("No token found");
    return;
  }

  fetch("/api/chat/convos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data: Conversation[]) => {
      console.log("Fetched convos:", data);
      // Make sure data is an array before setting
      if (Array.isArray(data)) {
        setConversations(data);
      } else {
        console.error("Invalid convos data:", data);
        setConversations([]);
      }
    })
    .catch((err) => console.error("Failed to fetch convos:", err));
}, [isAuthenticated]);

// useEffect(() => {
//   if (!isAuthenticated) return;

//   const initializeConversation = async () => {
//     if (conversations.length === 0) {
//       // No conversations exist, create a new one
//       await handleNewConversation();
//     } else {
//       // Conversations exist, set the last one as active
//       const lastConvo = conversations[conversations.length - 1];
//       setCurrentConversationId(lastConvo.id.toString());
//       setCurrentConversationTitle(lastConvo.title);

//       // Fetch messages for that conversation
//       await fetchMessages(lastConvo.id.toString());
//     }
//   };

//   initializeConversation();
// }, [isAuthenticated, conversations]);


const fetchMessages = async (conversationId: string) => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("Fetching messages with token:", token);
      const res = await fetch(
      `/api/chat/conversations/${conversationId}/messages`, 
      {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    });

      console.log("Messages response:", res);
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();

      const loadedMessages: Message[] = data.map((msg: any, idx: number) => ({
        id: `${conversationId}-${idx}`,
        role: msg.role === "model" ? "model" : "user",
        content: msg.content,
      }));

      setMessages(loadedMessages);
      setCurrentConversationId(conversationId);

    } catch (err) {
      console.error("Error fetching conversation messages:", err);
    }
  };

const handleNewConversation = () => {
  setMessages([]);                  // clear messages
  setCurrentConversationId(null);   // no active convo yet
  setCurrentConversationTitle("New Chat");
  setIsDraftChat(true);    
  setConversationCount(prev => prev + 1);

  // Clear the visible chat container too
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = 0;
  }
};

// ------------------- Send Message Handler -------------------
const handleSend = async () => {
  if (!input.trim()) return;
  if (showExamples) setShowExamples(false);

  const userMessage = input.trim();
  setInput(""); // clear input immediately

  let conversationId = currentConversationId;

  // -------- Step 1: If no conversation exists, create it first --------
  if (!conversationId) {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("/api/chat/new_convo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: "New Chat", user_id: user?.id }),
      });
      const newConvo = await res.json();

      // Update sidebar immediately
      setConversations(prev => [newConvo, ...prev]);
      setCurrentConversationId(newConvo.id.toString());
      setCurrentConversationTitle(newConvo.title);
      conversationId = newConvo.id.toString();

      // Start messages fresh with user message
      setMessages([{ id: Date.now().toString(), role: "user", content: userMessage }]);

      setIsDraftChat(false); // draft finished

    } catch (err) {
      console.error("Error creating conversation:", err);
      return;
    }
  } else {
    // Existing conversation → append user message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: userMessage }]);
  }

  // -------- Step 2: Optimistically update conversation title --------
  if (currentConversationTitle === "New Chat") {
    const newTitle = userMessage.slice(0, 20);

    // Update header
    setCurrentConversationTitle(newTitle);

    // Update sidebar
    setConversations(prev =>
      prev.map(convo =>
        convo.id.toString() === conversationId ? { ...convo, title: newTitle } : convo
      )
    );

    // Update backend asynchronously
    (async () => {
      try {
        const token = localStorage.getItem("access_token");
        await fetch("/api/chat/update_convo_title", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ conversationId, newTitle }),
        });
      } catch (err) {
        console.error("Failed to update conversation title:", err);
      }
    })();
  }

    // Start loading + setup abort controller
  setLoading(true);
  setAssistantTyping(true);
  const controller = new AbortController();
  abortControllerRef.current = controller;

  // -------- Step 3: Send user message to backend and append reply --------
  try {
    const token = localStorage.getItem("access_token");
    const res = await fetch("/api/chat/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
      message: userMessage,
      conversationId,
      selectedModel: selectedModel,   // <-- send model info
    }),
    signal: controller.signal, // attach signal for aborting 
    });
    const data = await res.json();
    const assistantMessage = { id: Date.now().toString(), role: "model" as const, content: data.reply as string};

    setMessages(prev => [...prev, assistantMessage]);

  } catch (err: any) {
    if (err.name === "AbortError") {
      console.log("Query canceled by user");
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "model", content: "*Query canceled*" }]);
    } else {
      console.error("Error sending message:", err);
    }
  } finally {
    setLoading(false);
    setAssistantTyping(false);
    abortControllerRef.current = null;
  }
};

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      {/* Sidebar */}
<aside className="w-52 bg-gray-200 flex flex-col mt-3 ml-5 mb-8 rounded-lg shadow-lg fixed top-0 left-0 bottom-0 h-screen">
  {/* Logo/Header */}
  <div className="p-4 flex justify-center mt-4">
      <h1 className="text-xl font-bold text-gray-800">eAMR Chat</h1>
    </div>

  {/* New chat + search */}
  <div className="px-4 space-y-3 mt-3">  
    <button
      onClick={handleNewConversation}
      className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-blue-400 text-white font-medium rounded-full hover:bg-blue-700 transition"
    >
       <SvgIcon src="/Icon.svg" size={20} /> New chat
    </button>
    <h2 className="text-sm font-semibold text-gray-800 mb-6 ml-3">
        Your Conversations
      </h2>

  </div>

    {/* Conversation list */}
    <div className="flex-1 overflow-y-auto scroller-hide mt-6 px-3">
      
      <ul className="space-y-1">
        {conversations.map((conv) => (
          <li key={conv.id}>
            <button
              onClick={() => fetchMessages(conv.id)}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm rounded-md hover:bg-gray-100 transition"
            >
              <SvgIcon src="/Icon.svg" size={16} />
              <span className="truncate">{conv.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* User profile bottom */}
    <div className="mb-8 px-4 py-3 ml-2 mr-2 bg-white rounded-lg p-4 flex flex-col justify-between h-28 shadow-sm">
      {/* Top: avatar + name */}
      <div className="flex items-center gap-3">
        <img
          src={user?.avatar || "/Group.png"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-sm font-semibold text-gray-800">
          {user?.name || "Loading..."}
        </span>
      </div>

      {/* Bottom: logout button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 hover:bg-gray-200 transition self-start"
      >
        <SvgIcon src="/Icon.svg" size={16} />
        <span className="text-sm font-medium text-gray-800">Logout</span>
      </button>
    </div>



</aside>

      {/* Main Content */}
  
<main className="flex-1 flex flex-col ml-60 mr-4 mt-3 mb-8">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-2 fixed top-0 left-60 right-4 bg-white z-10">
          <h2 className="text-xl font-semibold"></h2>
          
          <div className="flex items-center gap-4 bg-white shadow-md px-5 py-2 rounded-full">
                {/* <SvgIcon src="/Icon.svg" size={20} />
               <SvgIcon src="/Icon.svg" size={20} /> */}

                {/* User avatar */}
                <img
                  src={user?.avatar || "/Group.png"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover border border-gray-200 cursor-pointer"
                />
              </div>
        </div>

        {/* Center Content */}
        {/* <div className="flex-grow flex flex-col items-center justify-center px-4"> */}
    <div className="flex flex-col">
      <main className="flex-1 flex flex-col min-h-0 items-center justify-between px-3 py-2">
          {/* Floating avatars */}
          <div className="flex gap-6 mb-14 fixed top-2 left-1/2 transform -translate-x-1/2 z-10">
          {models.map((model) => {
            const isActive = selectedModel === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-3 px-6 py-2 rounded-2xl shadow-md transition-all 
                  ${isActive ? "bg-blue-200 text-black shadow-lg scale-220" : "bg-white hover:shadow-lg scale-100"}
                `}
              >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  isActive ? model.activeColor : model.inactiveColor
                }`}
              >
                <span className="text-lg">{model.icon}</span>
            </div>
            <span className="font-medium">{model.name}</span>
          </button>
        );
      })}
    </div>

          {/* Three Columns */}
         {/* Chat messages */}
<div 
  ref={chatContainerRef}
  className="flex-1 overflow-y-auto scroller-hide px-10 py-6 space-y-6 mt-28"
>
  {messages.length === 0 ? (
    showExamples ? (
      // ✅ First-ever load: show Examples/Capabilities/Limitations
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full">
        {/* Examples */}
        <div className="flex flex-col items-center text-center">
          <SvgIcon src="/Icon.svg" size={16} className="mb-3 text-blue-500" />
          <h3 className="text-base font-semibold mb-4">Examples</h3>
          <div className="space-y-3 text-xs w-full">
            <button className="w-full p-3 rounded-lg bg-gray-100 hover:bg-gray-200">
              “Explain AMR resistance in simple terms in the district of Addis.”
            </button>
            <button className="w-full p-3 rounded-lg bg-gray-100 hover:bg-gray-200">
              “Any statistics on the prevalence of E. Coli in Addis Ababa?”
            </button>
            <button className="w-full p-3 rounded-lg bg-gray-100 hover:bg-gray-200">
              “How do I prevent the usage of too many antibiotics?”
            </button>
          </div>
        </div>

        {/* Capabilities */}
        <div className="flex flex-col items-center text-center">
          <SvgIcon src="/Icon.svg" size={16} className="mb-3 text-green-500" />
          <h3 className="text-base font-semibold mb-4">Capabilities</h3>
          <ul className="space-y-3 text-xs text-gray-600">
            <li className="p-3 rounded-lg bg-gray-100">✔️ Provides answers as explanations to the provided query.</li>
            <li className="p-3 rounded-lg bg-gray-100">✔️ Allows user to get statistical data in tabular/image format.</li>
            <li className="p-3 rounded-lg bg-gray-100">✔️ Trained to tailor query to the knowledge scope of the subject.</li>
          </ul>
        </div>

        {/* Limitations */}
        <div className="flex flex-col items-center text-center">
          <SvgIcon src="/Icon.svg" size={16} className="mb-3 text-yellow-500" />
          <h3 className="text-base font-semibold mb-4">Limitations</h3>
          <ul className="space-y-3 text-xs text-gray-600">
            <li className="p-3 rounded-lg bg-gray-100">⚠️ May occasionally generate incorrect information</li>
            <li className="p-3 rounded-lg bg-gray-100">⚠️ May occasionally produce biased content and information</li>
            <li className="p-3 rounded-lg bg-gray-100">⚠️ Limited knowledge to the scope of the study of the eAMR</li>
          </ul>
        </div>
      </div>
    ) : (
      // After first chat, show placeholder instead of examples
      <div className="flex items-center justify-center">
        <div className="text-center text-gray-500">
          <img 
            src="/Logo.svg" 
            alt="Logo" 
            className="mx-auto mb-4 w-24 h-24"
          />
          <p className="text-2xl">Hey there {user?.name} Start a new conversation</p>
        </div>
      </div>
        )
  ) : (
    // Actual chat conversation
    messages.map((msg, idx) => (
      <div
        key={idx}
        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
      >
        {/* Avatar left for model, right for user */}
        {msg.role === "model" && (
          <div className="flex-shrink-0">
             <img 
              src={selectedModel === "llama" ? "/Icon.svg" : "/Group.png"} 
              alt={selectedModel} 
              className="w-8 h-8 rounded-full" 
            />
          </div>
        )}

        <div
          className={`px-4 py-3 rounded-2xl max-w-3xl ${
            msg.role === "user"
              ? "bg-white text-black text-right"
              : "bg-white text-gray-800 text-left"
          }`}
          style={{
            width: "800px",
            height: "auto",
            marginLeft: msg.role === "model" ? "0px" : undefined,
            marginRight: msg.role === "user" ? "0px" : undefined,
          }}
        >
          <div className="prose prose-sm max-w-none">
            {/* <ReactMarkdown remarkPlugins={[remarkGfm] as PluggableList}>
              {String(msg.content ?? "")}
            </ReactMarkdown> */}
            <ReactMarkdown
            remarkPlugins={[remarkGfm] as PluggableList}
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "underline" }}
                />
              ),
            }}
          >
            {String(msg.content ?? "")}
          </ReactMarkdown>
          </div>
        </div>

        {msg.role === "user" && (
          <div className="flex-shrink-0">
            <img
              src={user?.avatar || "/Logo.svg"}
              alt={user?.name || "You"}
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
      </div>
    ))
  )}
   {/* Show "model is typing..." bubble */}
  {assistantTyping && (
    <div className="flex justify-start animate-pulse">
      <div className="flex-shrink-0">
        <img src={selectedModel === "gemini" ? "/Icon.svg" : "/Group.png"} alt="typing" className="w-8 h-8 rounded-full" />
      </div>
      <div className="px-4 py-3 rounded-2xl max-w-3xl bg-gray-100 text-gray-600">
        Typing...                                 
      </div>
    </div>
  )}
  <div ref={endOfMessagesRef} className="h-20" />
</div>

        

        {/* Input Area */}
          <div className="fixed bottom-6 left-72 right-24 bg-white p-1">
            <div className="flex items-center gap-3 w-full">
              <input
                type="text"
                placeholder="Ask a question..."
                className="flex-grow px-3 py-4 text-sm bg-gray-200 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={loading} // optional: disable input while loading
            />
              {/* <button 
              onClick={handleSend}
              className="px-3 py-2 bg-blue-600 text-white text-base font-medium rounded-full shadow hover:bg-blue-700">
                Submit
              </button> */}
             <button
              onClick={handleSend}
              className="px-3 py-2 bg-blue-600 text-white text-base font-medium rounded-full shadow hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={loading} // disable while loading
            >
              Submit
            </button>

            {loading && (
              <button
                onClick={() => abortControllerRef.current?.abort()}
                className="px-3 py-2 bg-red-500 text-white text-base font-medium rounded-full shadow hover:bg-red-600"
              >
                Cancel
              </button>
            )}
            </div>
          </div>

          </main>

          {/* Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-gray-500">
              {/* Left: copyright */}
              <span>© 2025 eAMR Connect. All Rights Reserved.</span>

              {/* Right: links */}
              <div className="flex gap-6">
                <a href="#" className="hover:text-gray-800 transition">Home</a>
                <a href="#" className="hover:text-gray-800 transition">License</a>
                <a href="#" className="hover:text-gray-800 transition">Terms of Use</a>
                <a href="#" className="hover:text-gray-800 transition">Privacy Policy</a>
              </div>
            </div>
          </div>
          </div>
      </main>
    </div>
  );
}
