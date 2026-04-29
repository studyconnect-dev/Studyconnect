import { useState } from "react";
import { useParams, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Send, ArrowLeft, Calendar, Video, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface Member {
  id: string;
  name: string;
  status: "online" | "offline";
}

const mockMembers: Member[] = [
  { id: "1", name: "Sarah L.", status: "online" },
  { id: "2", name: "Ahmed K.", status: "online" },
  { id: "3", name: "Marie D.", status: "offline" },
];

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Sarah L.",
    content: "Salut tout le monde ! On se retrouve demain à 14h ?",
    timestamp: "10:30",
    isCurrentUser: false,
  },
  {
    id: "2",
    sender: "Ahmed K.",
    content: "Parfait pour moi ! On révise quel chapitre ?",
    timestamp: "10:32",
    isCurrentUser: false,
  },
  {
    id: "3",
    sender: "Vous",
    content: "Je propose qu'on commence par les bases de données relationnelles",
    timestamp: "10:35",
    isCurrentUser: true,
  },
  {
    id: "4",
    sender: "Sarah L.",
    content: "Excellente idée ! J'ai préparé des notes sur les jointures",
    timestamp: "10:36",
    isCurrentUser: false,
  },
];

export function GroupChat() {
  const { groupId } = useParams();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "Vous",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCurrentUser: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 text-primary hover:opacity-80 mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("chat.backToResults")}
        </Link>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]">
          <aside className="lg:w-80 shrink-0 bg-card rounded-lg p-4 sm:p-6 shadow-sm overflow-y-auto max-h-[40vh] lg:max-h-full">
            <h2 className="text-lg sm:text-xl text-foreground mb-2" style={{ fontWeight: 600 }}>
              Projet Data - Team Alpha
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              Groupe de révision Data Science
            </p>

            <div className="mb-4 sm:mb-6">
              <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 600 }}>
                {t("chat.members")} ({mockMembers.length})
              </h3>
              <div className="space-y-2">
                {mockMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm" style={{ fontWeight: 600 }}>
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{member.name}</p>
                    </div>
                    {member.status === "online" && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-xs text-accent">{t("chat.online")}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4 sm:pt-6">
              <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 600 }}>
                {t("chat.planMeeting")}
              </h3>
              <button className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-opacity-80 transition-colors mb-2 text-sm">
                <Video className="w-4 h-4" />
                {t("chat.onlineSession")}
              </button>
              <button className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-opacity-80 transition-colors mb-2 text-sm">
                <MapPin className="w-4 h-4" />
                {t("chat.inPersonMeeting")}
              </button>
              <button className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-opacity-80 transition-colors text-sm">
                <Calendar className="w-4 h-4" />
                {t("chat.addToCalendar")}
              </button>
            </div>
          </aside>

          <div className="flex-1 bg-card rounded-lg shadow-sm flex flex-col min-h-[50vh] lg:min-h-0">
            <div className="border-b border-border p-3 sm:p-4">
              <h3 className="text-sm sm:text-base text-foreground" style={{ fontWeight: 600 }}>
                {t("chat.groupDiscussion")}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[70%] ${message.isCurrentUser ? "items-end" : "items-start"} flex flex-col`}>
                    <p className="text-xs text-muted-foreground mb-1">
                      {message.sender}
                    </p>
                    <div
                      className={`px-3 sm:px-4 py-2 rounded-lg ${
                        message.isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      <p className="text-xs sm:text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="border-t border-border p-3 sm:p-4 flex gap-2 sm:gap-3"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t("chat.typePlaceholder")}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-secondary border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
