async function ensureConversationTitle(conversationId: number, input: string) {
  // Fetch latest conversation from backend
  const res = await fetch(`/api/chat/conversations/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch conversation");
  }

  const convo = await res.json();

  // Only update title if it’s still "New Chat"
  if (convo.title === "New Chat") {
    const newTitle = input.trim().slice(0, 20);

    const updateRes = await fetch("/api/chat/update_convo_title", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        conversationId,
        newTitle,
      }),
    });

    if (!updateRes.ok) {
      throw new Error("Failed to update title");
    }

    const updatedConvo = await updateRes.json();
    return updatedConvo.title; // return fresh title
  }

  return convo.title; // already has custom title
}
