import React, { useState, useEffect, useRef } from 'react';

const MOCK_API_URL = 'https://6a2c1f2a3e2b60ab038f7f8e.mockapi.io/Menu';
const TG_BOT_TOKEN = '8748920850:AAELc92e93YypCmpm2B6szjBcJN4ufRYkg0';
const TG_CHAT_ID = '8551504472';
const ADMIN_PASSWORD = 'umarov2025';

const globalStyles = `
  * { box-sizing: border-box; }
  body { 
    margin: 0; 
    padding: 0; 
    font-family: 'Inter', system-ui, -apple-system, sans-serif; 
    background-color: #0a0a0f; 
    color: #ffffff; 
    overflow-x: hidden; 
  }

  .screen-center { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; width: 100vw; padding: 1rem; position: relative; overflow: hidden; }
  .glass-panel { background: rgba(255,255,255,0.05); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3); padding: 2rem; width: 100%; max-width: 28rem; }
  .text-center { text-align: center; }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes glitch { 
    0% { transform: translate(0) } 
    20% { transform: translate(-2px, 2px) } 
    40% { transform: translate(-2px, -2px) } 
    60% { transform: translate(2px, 2px) } 
    80% { transform: translate(2px, -2px) } 
    100% { transform: translate(0) } 
  }

  .animate-fade-in { animation: fadeIn 0.5s ease forwards; }
  .animate-slide-up { animation: slideUp 0.4s ease forwards; }

  .spinner { width: 2.5rem; height: 2.5rem; border: 4px solid #a855f7; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }

  .ban-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(127, 29, 29, 0.1); pointer-events: none; }
  .ban-panel { max-width: 32rem; border-color: rgba(239, 68, 68, 0.3); box-shadow: 0 0 50px rgba(239,68,68,0.2); z-index: 10; margin: 0 1rem; }
  .ban-icon { font-size: 3.75rem; margin-bottom: 1.5rem; }
  .ban-title { font-size: 2.25rem; font-weight: bold; margin-bottom: 1rem; text-shadow: 2px 0 #ef4444, -2px 0 #3b82f6; animation: glitch 2s infinite; }
  @media(min-width: 768px){ .ban-title { font-size: 2.25rem; } }
  .ban-subtitle { color: #f87171; font-family: monospace; font-size: 1.125rem; margin-bottom: 2rem; letter-spacing: 0.1em; text-transform: uppercase; }
  .ban-box { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 0.5rem; padding: 1rem; }
  .ban-box p { color: #d1d5db; margin: 0; }

  .title-gradient { font-size: 1.875rem; font-weight: bold; background: linear-gradient(to right, #c084fc, #ec4899); -webkit-background-clip: text; color: transparent; margin: 0 0 0.5rem 0; }
  .subtitle { color: #9ca3af; margin: 0 0 2rem 0; }
  .neon-input { width: 100%; padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 1.125rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-bottom: 1.5rem; transition: all 0.3s ease; }
  .neon-input:focus { outline: none; border-color: #8b5cf6; box-shadow: 0 0 15px rgba(139,92,246,0.3); }
  .btn-primary { width: 100%; padding: 1rem; border-radius: 0.75rem; font-weight: bold; font-size: 1.125rem; transition: all 0.3s; border: none; cursor: pointer; background: linear-gradient(to right, #9333ea, #db2777); color: white; }
  .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 0 20px rgba(139,92,246,0.4); }
  .btn-primary:disabled { background: #1f2937; color: #6b7280; cursor: not-allowed; }

  .avatar-container { display: flex; gap: 1.5rem; margin-bottom: 2.5rem; justify-content: center; }
  .avatar-card { cursor: pointer; transition: all 0.3s; padding: 2rem; border-radius: 1rem; border: 2px solid #374151; background: #1a1a24; display: flex; flex-direction: column; align-items: center; gap: 1rem; opacity: 0.8; }
  .avatar-card:hover { border-color: #6b7280; transform: scale(1.05); opacity: 1; }
  .avatar-card.selected-man { border-color: transparent; background: linear-gradient(to bottom right, #3b82f6, #06b6d4); box-shadow: 0 0 30px rgba(255,255,255,0.2); transform: scale(1.05); opacity: 1; }
  .avatar-card.selected-girl { border-color: transparent; background: linear-gradient(to bottom right, #ec4899, #f43f5e); box-shadow: 0 0 30px rgba(255,255,255,0.2); transform: scale(1.05); opacity: 1; }
  .avatar-icon { font-size: 4.5rem; }
  .avatar-label { font-size: 1.25rem; font-weight: bold; }
  .btn-light { padding: 1rem 3rem; border-radius: 0.75rem; font-weight: bold; font-size: 1.125rem; border: none; cursor: pointer; background: #fff; color: #000; transition: all 0.3s; }
  .btn-light:hover:not(:disabled) { background: #e5e7eb; box-shadow: 0 0 20px rgba(255,255,255,0.3); }
  .btn-light:disabled { background: #1f2937; color: #6b7280; cursor: not-allowed; }
  .highlight-text { color: #c084fc; font-weight: bold; }

  .chat-layout { display: flex; flex-direction: column; height: 100vh; width: 100%; max-width: 56rem; margin: 0 auto; border-left: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1); background: #0f0f15; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); position: relative; }
  .chat-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); z-index: 10; background: rgba(255,255,255,0.05); backdrop-filter: blur(16px); }
  .header-info { display: flex; align-items: center; gap: 0.75rem; }
  .status-dot { width: 0.75rem; height: 0.75rem; background-color: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; animation: pulse 2s infinite; }
  .header-title { font-weight: bold; font-size: 1.125rem; margin: 0; }
  .header-subtitle { font-size: 0.75rem; color: #9ca3af; margin: 0; }
  .icon-btn { background: none; border: none; color: #4b5563; cursor: pointer; padding: 0.5rem; transition: color 0.3s; }
  .icon-btn:hover { color: #9ca3af; }
  .chat-messages { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; z-index: 0; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }

  .loading-text { display: flex; justify-content: center; align-items: center; height: 100%; color: #6b7280; }
  .msg-row { display: flex; width: 100%; }
  .msg-row.me { justify-content: flex-end; }
  .msg-row.other { justify-content: flex-start; }
  .msg-wrap { display: flex; gap: 0.75rem; max-width: 85%; position: relative; }
  @media (min-width: 768px) { .msg-wrap { max-width: 70%; } }
  .msg-row.me .msg-wrap { flex-direction: row-reverse; }
  .msg-avatar { font-size: 1.875rem; flex-shrink: 0; margin-top: 0.25rem; }
  .msg-bubble { padding: 1rem; display: flex; flex-direction: column; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
  .msg-self { background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 1.125rem 1.125rem 0.25rem 1.125rem; color: white; }
  .msg-other { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 1.125rem 1.125rem 1.125rem 0.25rem; color: #f3f4f6; }
  .msg-nick { font-size: 0.75rem; font-weight: bold; color: #c084fc; margin-bottom: 0.25rem; }
  .msg-text { font-size: 0.875rem; white-space: pre-wrap; word-break: break-word; margin: 0; }
  @media (min-width: 768px) { .msg-text { font-size: 1rem; } }
  .msg-time { font-size: 0.625rem; opacity: 0.6; text-align: right; margin-top: 0.5rem; display: inline-block; }

  .msg-actions { display: none; position: absolute; right: 100%; top: 50%; transform: translateY(-50%); margin-right: 0.5rem; background: rgba(0,0,0,0.6); padding: 0.25rem 0.5rem; border-radius: 0.5rem; gap: 0.5rem; white-space: nowrap; backdrop-filter: blur(4px); }
  .msg-row.me:hover .msg-actions { display: flex; }
  .action-btn { background: none; border: none; font-size: 1rem; cursor: pointer; opacity: 0.6; transition: opacity 0.2s; padding: 0; }
  .action-btn:hover { opacity: 1; }
  .edit-area { display: flex; flex-direction: column; gap: 0.5rem; width: 100%; min-width: 200px; }
  .edit-input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid #8b5cf6; color: white; padding: 0.5rem; border-radius: 0.5rem; font-family: inherit; font-size: 0.875rem; resize: vertical; }
  .edit-input:focus { outline: none; box-shadow: 0 0 10px rgba(139,92,246,0.3); }
  .edit-controls { display: flex; justify-content: flex-end; gap: 0.5rem; }
  .edit-save, .edit-cancel { padding: 0.25rem 0.75rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: bold; cursor: pointer; border: none; }
  .edit-save { background: #8b5cf6; color: white; }
  .edit-save:hover { background: #7c3aed; }
  .edit-cancel { background: #374151; color: white; }
  .edit-cancel:hover { background: #4b5563; }

  .owner-row { display: flex; width: 100%; justify-content: center; margin: 1.5rem 0; z-index: 10; position: relative; }
  .owner-wrap { width: 100%; max-width: 90%; padding: 2px; border-radius: 1rem; background: linear-gradient(to right, #facc15, #fcd34d, #eab308); box-shadow: 0 0 20px rgba(250,204,21,0.4); }
  @media (min-width: 768px) { .owner-wrap { max-width: 32rem; } }
  .owner-inner { background: rgba(18, 18, 26, 0.95); backdrop-filter: blur(12px); padding: 1rem; border-radius: 1rem; display: flex; align-items: flex-start; gap: 1rem; border: 1px solid rgba(234, 179, 8, 0.2); }
  @media (min-width: 768px) { .owner-inner { padding: 1.25rem; } }
  .owner-icon { font-size: 2.25rem; flex-shrink: 0; filter: drop-shadow(0 0 15px rgba(250,204,21,0.8)); animation: pulse 2s infinite; }
  .owner-content { flex: 1; }
  .owner-title { background: linear-gradient(to right, #fde047, #eab308); -webkit-background-clip: text; color: transparent; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.6875rem; margin: 0 0 0.25rem 0; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1)); }
  @media (min-width: 768px) { .owner-title { font-size: 0.75rem; } }
  .owner-text { color: white; font-size: 0.875rem; font-weight: 600; line-height: 1.6; margin: 0; filter: drop-shadow(0 4px 3px rgba(0,0,0,0.07)); }
  @media (min-width: 768px) { .owner-text { font-size: 1rem; } }
  .owner-time { color: rgba(234, 179, 8, 0.6); font-size: 0.625rem; text-align: right; margin-top: 0.5rem; font-family: monospace; }

  .chat-input-area { padding: 1rem; background: rgba(255,255,255,0.05); backdrop-filter: blur(16px); border-top: 1px solid rgba(255,255,255,0.1); z-index: 10; position: relative; }
  .input-form { display: flex; gap: 0.5rem; }
  .chat-input { flex: 1; padding: 0.75rem 1rem; border-radius: 0.75rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: white; font-size: 0.875rem; transition: all 0.3s; }
  @media (min-width: 768px) { .chat-input { font-size: 1rem; } }
  .chat-input:focus { outline: none; border-color: #8b5cf6; box-shadow: 0 0 15px rgba(139,92,246,0.3); }
  .send-btn { padding: 0 1.5rem; border-radius: 0.75rem; background: linear-gradient(to right, #9333ea, #db2777); font-weight: bold; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: opacity 0.3s; }
  .send-btn:hover:not(:disabled) { opacity: 0.9; }
  .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .send-icon { width: 1.25rem; height: 1.25rem; color: white; transform: rotate(90deg); }

  .admin-layout { height: 100vh; width: 100%; background: #0a0a0f; color: white; overflow-y: auto; padding: 1rem; }
  @media (min-width: 768px) { .admin-layout { padding: 2rem; } }
  .admin-container { max-width: 72rem; margin: 0 auto; }
  .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #1f2937; }
  .admin-title { font-size: 1.875rem; font-weight: bold; background: linear-gradient(to right, #ef4444, #a855f7); -webkit-background-clip: text; color: transparent; margin: 0; }
  .btn-exit { padding: 0.5rem 1rem; background: #1f2937; border-radius: 0.5rem; color: white; border: none; cursor: pointer; }
  .btn-exit:hover { background: #374151; }
  .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem; }
  @media (min-width: 768px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
  .stat-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(16px); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid rgba(255,255,255,0.1); border-top-width: 4px; border-top-style: solid; }
  .stat-card.purple { border-top-color: #a855f7; }
  .stat-card.blue { border-top-color: #3b82f6; }
  .stat-card.red { border-top-color: #ef4444; }
  .stat-label { color: #9ca3af; font-size: 0.875rem; margin: 0; }
  .stat-value { font-size: 1.875rem; font-weight: bold; margin: 0.5rem 0 0 0; }
  .section-title { font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; color: #fff; }
  .section-title.red { color: #f87171; }
  .ban-list { background: rgba(255,255,255,0.05); border-radius: 0.75rem; overflow: hidden; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.1); }
  .ban-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #1f2937; }
  .ban-item:last-child { border-bottom: none; }
  .ban-ip { font-family: monospace; color: #d1d5db; }
  .btn-unban { font-size: 0.875rem; background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.75rem; border-radius: 0.25rem; border: none; cursor: pointer; }
  .btn-unban:hover { background: rgba(16, 185, 129, 0.3); }
  .table-wrapper { background: rgba(255,255,255,0.05); border-radius: 0.75rem; overflow-x: auto; border: 1px solid rgba(255,255,255,0.1); }
  .admin-table { width: 100%; text-align: left; border-collapse: collapse; }
  .admin-table th { padding: 1rem; color: #9ca3af; font-weight: 500; background: rgba(255,255,255,0.05); }
  .admin-table td { padding: 1rem; border-top: 1px solid rgba(255,255,255,0.05); }
  .admin-table tr:hover td { background: rgba(255,255,255,0.05); }
  .user-cell { display: flex; align-items: center; gap: 0.75rem; }
  .user-avatar { font-size: 1.5rem; }
  .user-nick { font-weight: bold; }
  .ip-cell { font-family: monospace; font-size: 0.875rem; color: #9ca3af; }
  .msg-badge { background: rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; display: inline-block; }
  .date-cell { font-size: 0.875rem; color: #6b7280; }
  .action-btns { display: flex; gap: 0.5rem; justify-content: flex-end; }
  .btn-delete { background: rgba(249, 115, 22, 0.2); color: #fb923c; padding: 0.25rem 0.75rem; border-radius: 0.25rem; font-size: 0.875rem; border: none; cursor: pointer; }
  .btn-delete:hover { background: rgba(249, 115, 22, 0.3); }
  .btn-ban { background: rgba(239, 68, 68, 0.2); color: #f87171; padding: 0.25rem 0.75rem; border-radius: 0.25rem; font-size: 0.875rem; border: none; cursor: pointer; }
  .btn-ban:hover { background: rgba(239, 68, 68, 0.3); }
  .btn-spam { background: rgba(234, 179, 8, 0.2); color: #eab308; padding: 0.25rem 0.75rem; border-radius: 0.25rem; font-size: 0.875rem; border: none; cursor: pointer; }
  .btn-spam:hover { background: rgba(234, 179, 8, 0.3); }

  .toast-notification { position: fixed; top: 1rem; left: 50%; transform: translateX(-50%); background: rgba(239, 68, 68, 0.95); color: white; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: bold; z-index: 99999; box-shadow: 0 4px 20px rgba(239, 68, 68, 0.5); backdrop-filter: blur(8px); white-space: nowrap; pointer-events: none; border: 1px solid rgba(255, 255, 255, 0.2); }
  @keyframes slideDownToast { from { top: -5rem; opacity: 0; } to { top: 1rem; opacity: 1; } }
  .animate-slide-down { animation: slideDownToast 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

  .hidden-md { display: none; }
  @media (min-width: 768px) { .hidden-md { display: table-cell; } }
  .hidden-sm { display: none; }
  @media (min-width: 640px) { .hidden-sm { display: table-cell; } }
`;

const sendTelegramMessage = async (text) => {
  try {
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'HTML' })
    });
  } catch (error) {
    console.error(error);
  }
};

const getIP = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch {
    return `unknown_${Math.floor(Math.random() * 100000)}`;
  }
};

const BanScreen = () => (
  <div className="screen-center bg-black">
    <div className="ban-overlay" />
    <div className="glass-panel ban-panel animate-fade-in">
      <div className="ban-icon">🚫</div>
      <h1 className="ban-title">
        Siz Ban Yegansiz
      </h1>
      <p className="ban-subtitle">
        "Umarov shuni hohladi"
      </p>
      <div className="ban-box">
        <p>IP manzilingiz bloklangan.</p>
      </div>
    </div>
  </div>
);

const NicknameInput = ({ onNext }) => {
  const [nick, setNick] = useState(localStorage.getItem('draft_nick') || '');

  useEffect(() => {
    localStorage.setItem('draft_nick', nick);
  }, [nick]);

  const handleContinue = () => {
    if (nick.trim()) {
      localStorage.removeItem('draft_nick');
      onNext(nick.trim());
    }
  };

  return (
    <div className="screen-center">
      <div className="glass-panel animate-slide-up text-center">
        <div className="mb-8">
          <h2 className="title-gradient">Xush Kelibsiz</h2>
          <p className="subtitle">Chatga kirish uchun o'zingizni tanishtiring</p>
        </div>
        <input
          type="text"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          placeholder="Taxallusingizni kiriting..."
          className="neon-input"
          maxLength={20}
        />
        <button
          onClick={handleContinue}
          disabled={!nick.trim()}
          className="btn-primary"
        >
          Davom etish
        </button>
      </div>
    </div>
  );
};

const AvatarSelect = ({ nick, onComplete }) => {
  const [selected, setSelected] = useState(null);

  const avatars = [
    { id: 'man', icon: '🧑', label: 'Man' },
    { id: 'girl', icon: '👩', label: 'Girl' }
  ];

  return (
    <div className="screen-center">
      <div className="text-center mb-8 animate-fade-in">
        <h2>Avatarni tanlang</h2>
        <p className="subtitle">Salom, <span className="highlight-text">{nick}</span>!</p>
      </div>
      
      <div className="avatar-container animate-slide-up">
        {avatars.map((av) => (
          <div
            key={av.id}
            onClick={() => setSelected(av.id)}
            className={`avatar-card ${selected === av.id ? "selected-" + av.id : ""}`}
          >
            <span className="avatar-icon">{av.icon}</span>
            <span className="avatar-label">{av.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => selected && onComplete(selected)}
        disabled={!selected}
        className="btn-light animate-fade-in"
      >
        Tasdiqlash
      </button>
    </div>
  );
};

const Chat = ({ user, onAdminClick }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(localStorage.getItem('draft_message') || '');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const lastTgSync = useRef(0);
  
  const isBannedIP = JSON.parse(localStorage.getItem('ip_blacklist') || '[]').includes(user.ip);
  const isSpammedUser = JSON.parse(localStorage.getItem('user_blacklist') || '[]').some(u => u.id === user.id);
  const isRestricted = isBannedIP || isSpammedUser;

  useEffect(() => {
    localStorage.setItem('draft_message', input);
  }, [input]);

  const updateTg = async (allData) => {
    try {
      const sysRec = allData.find(item => item.isSystem);
      const actualMsgs = allData.filter(item => !item.isSystem);
      const chatHistoryText = "💬 <b>Real-time Chat Kuzatuv:</b>\n\n" + 
        actualMsgs.slice(-50).map(m => 
          m.isOwner ? `👑 <b>OWNER:</b> ${m.message}` : `<b>${m.nickname}:</b> ${m.message}`
        ).join("\n");

      if (sysRec && sysRec.tgMessageId) {
        const editRes = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TG_CHAT_ID, message_id: sysRec.tgMessageId, text: chatHistoryText, parse_mode: 'HTML' })
        });
        const editData = await editRes.json();
        if (!editData.ok) {
          const sendRes = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TG_CHAT_ID, text: chatHistoryText, parse_mode: 'HTML' })
          });
          const sendData = await sendRes.json();
          if (sendData.ok) {
            await fetch(`${MOCK_API_URL}/${sysRec.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...sysRec, tgMessageId: sendData.result.message_id })
            });
          }
        }
      } else {
        const sendRes = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TG_CHAT_ID, text: chatHistoryText, parse_mode: 'HTML' })
        });
        const sendData = await sendRes.json();
        if (sendData.ok) {
          await fetch(MOCK_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isSystem: true, tgMessageId: sendData.result.message_id })
          });
        }
      }
    } catch (e) { console.error(e); }
  };

  const syncTelegramWithMockAPI = async (currentMsgs) => {
    try {
      const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/getUpdates`);
      const tgData = await res.json();
      
      if (tgData.ok && tgData.result.length > 0) {
        for (let item of tgData.result) {
          if (item.message && !item.message.from.is_bot && item.message.chat.id.toString() === TG_CHAT_ID) {
            const tgMsgId = item.message.message_id;
            const text = item.message.text;
            const updateId = item.update_id;
            
            if (text && !currentMsgs.some(m => m.tgMsgId === tgMsgId)) {
              await fetch(MOCK_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  nickname: "👑 OWNER",
                  avatar: "owner",
                  message: text,
                  timestamp: new Date().toISOString(),
                  userId: "owner_tg",
                  ip: "telegram",
                  isOwner: true,
                  tgMsgId: tgMsgId
                })
              });
              
              await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/getUpdates?offset=${updateId + 1}`);
              
              const updatedRes = await fetch(MOCK_API_URL);
              const updatedData = await updatedRes.json();
              setMessages(updatedData.filter(msg => !msg.isSystem));
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(MOCK_API_URL);
      const data = await res.json();
      setMessages(data.filter(msg => !msg.isSystem));
      setLoading(false);

      if (Date.now() - lastTgSync.current > 5000) {
        lastTgSync.current = Date.now();
        syncTelegramWithMockAPI(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const deleteMsg = async (id) => {
    if (!window.confirm("Xabarni o'chirasizmi?")) return;
    try {
      await fetch(`${MOCK_API_URL}/${id}`, { method: 'DELETE' });
      const res = await fetch(MOCK_API_URL);
      const allData = await res.json();
      setMessages(allData.filter(msg => !msg.isSystem));
      updateTg(allData);
    } catch (err) { console.error(err); }
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      const msgToUpdate = messages.find(m => m.id === id);
      if (!msgToUpdate) return;
      await fetch(`${MOCK_API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...msgToUpdate, message: editText.trim() })
      });
      setEditingId(null);
      setEditText('');
      const res = await fetch(MOCK_API_URL);
      const allData = await res.json();
      setMessages(allData.filter(msg => !msg.isSystem));
      updateTg(allData);
    } catch (err) { console.error(err); }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isRestricted) return;

    const newMessage = {
      nickname: user.nick,
      avatar: user.avatar,
      message: input.trim(),
      timestamp: new Date().toISOString(),
      userId: user.id,
      ip: user.ip
    };

    setInput(''); 
    localStorage.removeItem('draft_message');

    try {
      await fetch(MOCK_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      });
      
      fetchMessages(); 

      const res = await fetch(MOCK_API_URL);
      const allData = await res.json();
      
      await updateTg(allData);
    } catch (err) {
      alert("Xabar yuborishda xatolik yuz berdi!");
      console.error(err);
    }
  };

  const getAvatarIcon = (type) => type === 'man' ? '🧑' : '👩';

  return (
    <div className="chat-layout">
      <div className="chat-header">
        <div className="header-info">
          <div className="status-dot"></div>
          <div>
            <h1 className="header-title">Global Chat</h1>
            <p className="header-subtitle">{messages.length} ta xabar</p>
          </div>
        </div>
        
        <button 
          onDoubleClick={onAdminClick} 
          className="icon-btn"
          title="⚙️"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </button>
      </div>

      <div className="chat-messages">
        {loading ? (
          <div className="loading-text">Yuklanmoqda...</div>
        ) : (
          messages.map((msg, idx) => {
            if (msg.isOwner) {
              return (
                <div key={msg.id || idx} className="owner-row animate-slide-up">
                  <div className="owner-wrap">
                    <div className="owner-inner">
                      <div className="owner-icon">👑</div>
                      <div className="owner-content">
                        <h4 className="owner-title">Asosiy Boshqaruvchi</h4>
                        <p className="owner-text">{msg.message}</p>
                        <p className="owner-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            const isMe = msg.userId === user.id;
            return (
              <div key={msg.id || idx} className={`msg-row ${isMe ? 'me' : 'other'} animate-slide-up`}>
                <div className="msg-wrap">
                  <div className="msg-avatar">{getAvatarIcon(msg.avatar)}</div>
                  <div className={`msg-bubble ${isMe ? 'msg-self' : 'msg-other'}`}>
                    {!isMe && <span className="msg-nick">{msg.nickname}</span>}
                    {editingId === msg.id ? (
                      <div className="edit-area">
                        <textarea 
                          value={editText} 
                          onChange={(e) => setEditText(e.target.value)} 
                          className="edit-input" 
                          rows="2" 
                          autoFocus 
                        />
                        <div className="edit-controls">
                          <button onClick={() => setEditingId(null)} className="edit-cancel">Bekor qilish</button>
                          <button onClick={() => saveEdit(msg.id)} className="edit-save">Saqlash</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="msg-text">{msg.message}</p>
                        <span className="msg-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </>
                    )}
                  </div>
                  {isMe && editingId !== msg.id && (
                    <div className="msg-actions">
                      <button onClick={() => { setEditingId(msg.id); setEditText(msg.message); }} className="action-btn" title="Tahrirlash">✏️</button>
                      <button onClick={() => deleteMsg(msg.id)} className="action-btn" title="O'chirish">🗑️</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {isRestricted ? (
        <div className="chat-input-area" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>
            🚫 Siz Ban Yegansiz
          </div>
        </div>
      ) : (
        <div className="chat-input-area">
          <form onSubmit={handleSend} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Xabar yozing..."
              className="chat-input"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="send-btn"
            >
              <svg className="send-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const AdminPanel = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [bannedIPs, setBannedIPs] = useState(JSON.parse(localStorage.getItem('ip_blacklist') || '[]'));
  const [spammedUsers, setSpammedUsers] = useState(JSON.parse(localStorage.getItem('user_blacklist') || '[]'));
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const res = await fetch(MOCK_API_URL);
      const data = await res.json();
      setMessages(data.filter(msg => !msg.isSystem));
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const usersMap = new Map();
  messages.forEach(msg => {
    if (!usersMap.has(msg.userId)) {
      usersMap.set(msg.userId, { 
        id: msg.userId, 
        nick: msg.nickname, 
        ip: msg.ip, 
        avatar: msg.avatar, 
        lastActive: msg.timestamp,
        msgCount: 1
      });
    } else {
      const u = usersMap.get(msg.userId);
      u.msgCount++;
      if (new Date(msg.timestamp) > new Date(u.lastActive)) u.lastActive = msg.timestamp;
    }
  });
  const usersList = Array.from(usersMap.values()).sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive));

  const deleteUser = async (userId, nick, ip) => {
    if (!window.confirm(`${nick} ni butunlay o'chirmoqchimisiz?`)) return;
    
    const userMsgs = messages.filter(m => m.userId === userId);
    for (let msg of userMsgs) {
      await fetch(`${MOCK_API_URL}/${msg.id}`, { method: 'DELETE' });
    }
    
    sendTelegramMessage(`🔴 <b>FOYDALANUVCHI O'CHIRILDI!</b>\n👤 Nick: ${nick}\n🌐 IP: ${ip}\n🕐 Vaqt: ${new Date().toLocaleTimeString()}`);
    fetchAll();
  };

  const banUser = async (ip) => {
    if (!window.confirm(`${ip} IP manzilini bloklamoqchimisiz?`)) return;
    
    const newBans = [...bannedIPs, ip];
    setBannedIPs(newBans);
    localStorage.setItem('ip_blacklist', JSON.stringify(newBans));

    const userMsgs = messages.filter(m => m.ip === ip);
    for (let msg of userMsgs) {
      await fetch(`${MOCK_API_URL}/${msg.id}`, { method: 'DELETE' });
    }

    sendTelegramMessage(`⛔ <b>IP BAN QO'YILDI!</b>\n🌐 IP: ${ip}\n🕐 Vaqt: ${new Date().toLocaleTimeString()}`);
    fetchAll();
  };

  const spamUser = async (userId, nick) => {
    if (!window.confirm(`${nick} akkauntiga spam bermoqchimisiz?`)) return;
    
    const newSpams = [...spammedUsers, { id: userId, nick }];
    setSpammedUsers(newSpams);
    localStorage.setItem('user_blacklist', JSON.stringify(newSpams));

    const userMsgs = messages.filter(m => m.userId === userId);
    for (let msg of userMsgs) {
      await fetch(`${MOCK_API_URL}/${msg.id}`, { method: 'DELETE' });
    }

    sendTelegramMessage(`⚠️ <b>AKKAUNT SPAM QILINDI!</b>\n👤 Nick: ${nick}\n🆔 ID: ${userId}\n🕐 Vaqt: ${new Date().toLocaleTimeString()}`);
    fetchAll();
  };

  const unbanIP = (ip) => {
    const newBans = bannedIPs.filter(i => i !== ip);
    setBannedIPs(newBans);
    localStorage.setItem('ip_blacklist', JSON.stringify(newBans));
  };

  const unspamUser = (userId) => {
    const newSpams = spammedUsers.filter(u => u.id !== userId);
    setSpammedUsers(newSpams);
    localStorage.setItem('user_blacklist', JSON.stringify(newSpams));
  };

  return (
    <div className="admin-layout">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Admin Panel</h1>
          <button onClick={onClose} className="btn-exit">Chiqish</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card purple">
            <h3 className="stat-label">Jami Foydalanuvchilar</h3>
            <p className="stat-value">{usersList.length}</p>
          </div>
          <div className="stat-card blue">
            <h3 className="stat-label">Jami Xabarlar</h3>
            <p className="stat-value">{messages.length}</p>
          </div>
          <div className="stat-card red">
            <h3 className="stat-label">Ban qilinganlar</h3>
            <p className="stat-value">{bannedIPs.length}</p>
          </div>
          <div className="stat-card" style={{ borderTopColor: '#eab308' }}>
            <h3 className="stat-label">Spam qilinganlar</h3>
            <p className="stat-value">{spammedUsers.length}</p>
          </div>
        </div>

        {bannedIPs.length > 0 && (
          <div>
            <h2 className="section-title red">Bloklangan IP manzillar</h2>
            <div className="ban-list">
              {bannedIPs.map(ip => (
                <div key={ip} className="ban-item">
                  <span className="ban-ip">{ip}</span>
                  <button onClick={() => unbanIP(ip)} className="btn-unban">Bandan olish</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {spammedUsers.length > 0 && (
          <div>
            <h2 className="section-title" style={{ color: '#eab308' }}>Spam qilingan Akkauntlar</h2>
            <div className="ban-list">
              {spammedUsers.map(u => (
                <div key={u.id} className="ban-item">
                  <span className="ban-ip">{u.nick} <span style={{fontSize: '0.75rem', color: '#6b7280'}}>({u.id})</span></span>
                  <button onClick={() => unspamUser(u.id)} className="btn-unban">Spamdan olish</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="section-title">Foydalanuvchilar</h2>
        <div className="table-wrapper">
          {loading ? (
            <div className="loading-text" style={{padding: '2rem'}}>Ma'lumotlar yuklanmoqda...</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Foydalanuvchi</th>
                  <th className="hidden-md">IP Manzil</th>
                  <th>Xabarlar</th>
                  <th className="hidden-sm">So'nggi faollik</th>
                  <th style={{textAlign: 'right'}}>Harakatlar</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map(u => (
                  <tr key={u.id}>
                    <td className="user-cell">
                      <span className="user-avatar">{u.avatar === 'man' ? '🧑' : '👩'}</span>
                      <span className="user-nick">{u.nick}</span>
                    </td>
                    <td className="ip-cell hidden-md">{u.ip}</td>
                    <td><span className="msg-badge">{u.msgCount}</span></td>
                    <td className="date-cell hidden-sm">{new Date(u.lastActive).toLocaleString()}</td>
                    <td>
                      <div className="action-btns">
                        <button onClick={() => deleteUser(u.id, u.nick, u.ip)} className="btn-delete">O'chirish</button>
                        <button onClick={() => spamUser(u.id, u.nick)} className="btn-spam">Spam</button>
                        <button onClick={() => banUser(u.ip)} className="btn-ban">Ban</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [route, setRoute] = useState('loading'); 
  const [user, setUser] = useState({ nick: '', avatar: '', id: '', ip: '' });
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      showToast("Dnx Loxmanmi sanga");
    };

    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
      ) {
        e.preventDefault();
        showToast("Dnx lox");
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (route !== 'loading' && route !== 'admin') {
      localStorage.setItem('current_route', route);
    }
  }, [route]);

  useEffect(() => {
    const initApp = async () => {
      const currentIp = await getIP();
      const blacklist = JSON.parse(localStorage.getItem('ip_blacklist') || '[]');
      
      if (blacklist.includes(currentIp)) {
        setRoute('ban');
        return;
      }

      const savedNick = localStorage.getItem('user_nickname');
      const savedAvatar = localStorage.getItem('user_avatar');
      const savedRoute = localStorage.getItem('current_route');
      const savedId = localStorage.getItem('user_id') || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      if (!localStorage.getItem('user_id')) {
        localStorage.setItem('user_id', savedId);
      }

      const userData = { nick: savedNick, avatar: savedAvatar, id: savedId, ip: currentIp };
      setUser(userData);

      if (savedNick && savedAvatar) {
        setRoute('chat'); 
      } else if (savedNick && !savedAvatar) {
        setRoute('avatar'); 
      } else if (savedRoute && ['nick', 'avatar'].includes(savedRoute)) {
        setRoute(savedRoute); 
      } else {
        setRoute('nick'); 
      }
    };

    initApp();
  }, []);

  const handleNickSubmit = (nick) => {
    localStorage.setItem('user_nickname', nick);
    setUser(prev => ({ ...prev, nick }));
    setRoute('avatar');
  };

  const handleAvatarSubmit = (avatar) => {
    localStorage.setItem('user_avatar', avatar);
    const updatedUser = { ...user, avatar };
    setUser(updatedUser);
    setRoute('chat');

    const tgMsg = `🟢 <b>YANGI FOYDALANUVCHI KIRDI!</b>\n👤 Nick: ${updatedUser.nick}\n🧑 Avatar: ${avatar}\n🌐 IP: ${updatedUser.ip}\n🕐 Vaqt: ${new Date().toLocaleTimeString()}`;
    sendTelegramMessage(tgMsg);
  };

  const handleAdminRequest = () => {
    const pwd = prompt("Admin parolini kiriting:");
    if (pwd === ADMIN_PASSWORD) {
      setRoute('admin');
    } else if (pwd !== null) {
      alert("Parol noto'g'ri!");
    }
  };

  return (
    <>
      <style>{globalStyles}</style>

      {toast && (
        <div className="toast-notification animate-slide-down">
          {toast}
        </div>
      )}
      
      {route === 'loading' && (
        <div className="screen-center" style={{ backgroundColor: '#000' }}>
          <div className="spinner"></div>
        </div>
      )}
      
      {route === 'ban' && <BanScreen />}
      
      {route === 'nick' && <NicknameInput onNext={handleNickSubmit} />}
      
      {route === 'avatar' && <AvatarSelect nick={user.nick} onComplete={handleAvatarSubmit} />}
      
      {route === 'chat' && <Chat user={user} onAdminClick={handleAdminRequest} />}
      
      {route === 'admin' && <AdminPanel onClose={() => setRoute('chat')} />}
    </>
  );
}