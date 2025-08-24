"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PluggableList } from "unified";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import SvgIcon from "../../components/Core/SvgIcon";

interface Chat {
  id: string;
  title: string;
}
interface User {
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
  const [chats, setChats] = useState<Chat[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

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
      name: `${data.first_name} ${data.last_name?.charAt(0) || ''}.`,
      avatar: data.profile_picture || "/Group.png",
    }))
    .catch(err => {
      console.error("Profile fetch error:", err);
      setUser({ name: "Guest User", avatar: "/Group.png" });
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

  // Fetch chats from API
  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/chat/convos")
        .then((res) => res.json())
        .then((data) => setChats(data))
        .catch((err) => console.error("Failed to fetch chats:", err));
    }
  }, [isAuthenticated]);


  // ✅ Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

  // Add user message to state
    const newMessage: Message = {id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      // Send message to API
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      // Add model's response
      const modelMessage: Message = {id: Date.now().toString(), role: "model", content: data.reply };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Function to handle sending message
  const handleSend = async () => {
    if (!input.trim()) return; // prevent empty messages

    // Add user message
    // Create user message with unique id
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Clear input
    setInput("");

    // Call API
    try {
      const res = await fetch("/api/chat/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      // Assistant message with id
      const assistantMessage: Message = {
        id: Date.now().toString() + "-model",
        role: "model",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error:", err);
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
      onClick={() => setMessages([])}
      className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-blue-400 text-white font-medium rounded-full hover:bg-blue-700 transition"
    >
       <SvgIcon src="/Icon.svg" size={20} /> New chat
    </button>

  </div>

    {/* Conversation list */}
    <div className="flex-1 overflow-y-auto mt-6 px-3">
      <h2 className="text-sm font-semibold text-gray-800 mb-6 ml-3">
        Your Conversations
      </h2>
      <ul className="space-y-1">
        {chats.map((chat) => (
          <li key={chat.id}>
            <button
              onClick={() => router.push(`/chat/${chat.id}`)}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm rounded-md hover:bg-gray-100 transition"
            >
               <SvgIcon src="/Icon.svg" size={16} />
              <span className="truncate">{chat.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>

      {/* User profile bottom */}
      <div className="mb-8 px-4 py-2 bg-white rounded-full flex items-center justify-between shadow-sm">
      {/* Left: avatar + name */}
      <div className="flex items-center gap-3">
        <img
              src={user?.avatar || "/Group.png"}
              alt="User Avatar"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm font-semibold text-gray-800">
              {user?.name || "Loading..."}
            </span>
      </div>

      {/* Right: logout button */}
      <button
            onClick={handleLogout}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-200 transition"
          >
        <SvgIcon src="/Icon.svg" size={16} />
      </button>
    </div>
</aside>

      {/* Main Content */}
  
<main className="flex-1 flex flex-col ml-60 mr-4 mt-3 mb-8">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-2 fixed top-0 left-60 right-4 bg-white z-10">
          <h2 className="text-xl font-semibold"></h2>
          
          <div className="flex items-center gap-4 bg-white shadow-md px-5 py-2 rounded-full">
                <SvgIcon src="/Icon.svg" size={20} />
               <SvgIcon src="/Icon.svg" size={20} />

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
          {/* Floating avatars */}
          <div className="flex gap-6 mb-14 fixed top-2 left-1/2 transform -translate-x-1/2 z-10">
            {/* Llama */}
            <button className="flex items-center gap-3 px-6 py-2 bg-white rounded-2xl shadow-md hover:shadow-full transition-all">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-200 text-purple-600">
                <span className="text-lg">✨</span>
              </div>
              <span className="font-medium text-gray-800">Llama</span>
            </button>

            {/* Gemini */}
            <button className="flex items-center gap-3 px-6 py-2 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <span className="text-lg">⚡</span>
              </div>
              <span className="font-medium text-gray-800">Gemini</span>
            </button>
          </div>

          {/* Three Columns */}
          {/* Chat messages */}
            <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-10 py-6 space-y-6 mt-28">
              {messages.length === 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full ">
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
                      ) : (// 👇 shows actual conversation when user sends/receives messages
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {/* Show avatar on left for assistant, on right for user */}
                      {msg.role === "model" && (
                        <div className="flex-shrink-0">
                          <img
                            src="/Group.png"
                            alt="Model"
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
                          // ✅ Assistant always starts at same left margin
                          width: "800px",
                          height: "auto",
                          marginLeft: msg.role === "model" ? "0px" : undefined,
                          marginRight: msg.role === "user" ? "0px" : undefined,
                        }}
                      >
                        {/* <p className="text-sm">{msg.content}</p> */}
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm] as PluggableList}
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
              />
              <button 
              onClick={handleSend}
              className="px-3 py-2 bg-blue-600 text-white text-base font-medium rounded-full shadow hover:bg-blue-700">
                Submit
              </button>
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
