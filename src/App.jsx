import React, { useState, useEffect, useRef } from 'react';

const MOCK_API_URL = 'https://6a2c1f2a3e2b60ab038f7f8e.mockapi.io/Menu';
const LOGIN_API_URL = 'https://6a2c1f2a3e2b60ab038f7f8e.mockapi.io/Login';
const SETTINGS_API_URL = 'https://6a2e50d1c9776ca6c0c47df2.mockapi.io/umarov';
const AUDIO_API_URL = 'https://6a2e50d1c9776ca6c0c47df2.mockapi.io/audio';
const TG_BOT_TOKEN = '8748920850:AAELc92e93YypCmpm2B6szjBcJN4ufRYkg0';
const TG_CHAT_ID = '8551504472';
const ADMIN_PASSWORD = '1818ea44';

const IconImage = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IconLock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconBan = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>;
const IconCrown = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>;
const IconEdit = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
const IconTrash = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const IconReply = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>;
const IconCopy = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
const IconForward = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>;
const IconPin = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.68V6a3 3 0 0 0-6 0v4.68a2 2 0 0 1-1.11 1.87l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>;
const IconInfo = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
const IconCheck = ({ color = "currentColor" }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconDoubleCheck = ({ color = "currentColor" }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 6 7 17 2 12"/><polyline points="22 6 11 17 8 14"/></svg>;
const IconSmile = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
const IconSend = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const IconChevronLeft = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IconMore = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>;
const IconClose = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconSearch = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IconPencil = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconSettings = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconMoon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const IconUser = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconLogOut = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconMessageSquare = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const IconBellOff = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>;
const IconBell = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const IconStar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconDiamond = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 22 12 12 22 2 12 22"/></svg>;
const IconFire = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>;
const IconShield = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconMic = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>;
const IconPlay = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const IconPause = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;
const IconClock = ({ color = "currentColor" }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

const IconAlertCircle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;

const IconAuthMan = () => (
  <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 80 180 L 80 300 L 120 300 L 120 180 Z" fill="#1e293b" />
    <path d="M 50 90 C 50 60 150 60 150 90 L 140 180 L 60 180 Z" fill="#132e33" />
    <circle cx="100" cy="50" r="30" fill="#fcd34d" />
    <path d="M 65 40 Q 100 -10 135 40 Q 100 20 65 40 Z" fill="#0f172a" />
    <path d="M 140 90 L 180 140" stroke="#132e33" strokeWidth="15" strokeLinecap="round" />
    <circle cx="110" cy="45" r="4" fill="#000" />
    <path d="M 105 60 Q 115 65 125 60" stroke="#000" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const AVATAR_IMAGES = {
  man: "https://i.pinimg.com/736x/3c/c8/2d/3cc82d28e90efa14c04a2d922f56d688.jpg",
  girl: "https://i.pinimg.com/736x/f9/16/4a/f9164a36d6fccdf3ab15f66ef188c190.jpg",
  old: "https://i.pinimg.com/736x/d6/18/80/d6188000ca1dbcec7c4e76f29e9b0b8d.jpg",
  kpop: "https://i.pinimg.com/736x/c9/5f/20/c95f20b8fc3f57291595338e3cdd5aea.jpg"
};

const getAvatarImg = (type) => {
  if (!type) return AVATAR_IMAGES['man'];
  if (type.startsWith('http') || type.startsWith('data:')) return type;
  return AVATAR_IMAGES[type] || AVATAR_IMAGES['man'];
};

const EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🎉'];
const AURA_EMOJIS = ['✨', '🌟', '💫', '🔥', '💥', '⚡', '🦋', '🌸', '🔮', '🧿', '👑', '💎', '🚀', '🌌', '🌈', '❤️', '😎', '🥺', '😈', '👻', '👽', '🤖', '👾', '👿', '👺', '👹', '🎃', '💀', '☠️', '💯', '💢', '♨️', '💖', '💗', '💓', '💞', '💕', '💘', '💝', '💟'];

const globalStyles = `
  * { box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; }
  input, textarea { -webkit-user-select: auto; -moz-user-select: auto; -ms-user-select: auto; user-select: auto; }
  body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: var(--bg-outer); color: var(--text-main); overflow: hidden; -webkit-tap-highlight-color: transparent; transition: background-color 0.3s, color 0.3s; }
  
  :root {
    --bg-outer: #e4e4e5;
    --bg-main: #fff;
    --bg-sidebar: #fff;
    --bg-chat: #e6ebe1;
    --bg-input: #f4f4f5;
    --bg-input-inner: #fff;
    --bg-hover: #f9fafb;
    --bg-overlay: rgba(255,255,255,0.95);
    
    --text-main: #000;
    --text-muted: #6b7280;
    --text-icon: #8b9eb0;
    --text-blue: #007aff;
    
    --border-color: #e5e7eb;
    
    --msg-me-bg: #e1ffc7;
    --msg-me-text: #000;
    --msg-me-time: #53bdeb;
    
    --msg-other-bg: #fff;
    --msg-other-text: #000;
    --msg-other-time: #8b9eb0;
  }

  body.dark {
    --bg-outer: #0e1621;
    --bg-main: #17212b;
    --bg-sidebar: #17212b;
    --bg-chat: #0e1621;
    --bg-input: #17212b;
    --bg-input-inner: #242f3d;
    --bg-hover: #202b36;
    --bg-overlay: rgba(23,33,43,0.98);
    
    --text-main: #f5f5f5;
    --text-muted: #7f91a4;
    --text-icon: #7f91a4;
    --text-blue: #3b82f6;
    
    --border-color: #242f3d;
    
    --msg-me-bg: #2b5278;
    --msg-me-text: #fff;
    --msg-me-time: #7cb5eb;
    
    --msg-other-bg: #182533;
    --msg-other-text: #fff;
    --msg-other-time: #7f91a4;
  }

  .screen-center { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; width: 100vw; padding: 1rem; position: relative; overflow: hidden; background: var(--bg-main); }
  .text-center { text-align: center; }
  
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes pulseType { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
  @keyframes highlightBlink { 0%, 100% { filter: brightness(1); } 20%, 80% { filter: brightness(0.85); } }
  @keyframes chatSlideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes msgSlideIn { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes sendFlyAnim { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 40% { transform: translate(15px, -15px) scale(0.8); opacity: 0; } 40.001% { transform: translate(-15px, 15px) scale(0.5); opacity: 0; } 100% { transform: translate(0, 0) scale(1); opacity: 1; } }
  
  .animate-fade-in { animation: fadeIn 0.2s ease forwards; }
  .animate-slide-up { animation: slideUp 0.3s ease forwards; }
  .spinner { width: 2.5rem; height: 2.5rem; border: 4px solid var(--text-blue); border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }

  /* VIBE STYLES */
  .owner-vibe {
      background: linear-gradient(135deg, #1e1b4b, #312e81) !important;
      border: 1px solid #4f46e5 !important;
      box-shadow: 0 0 15px rgba(79, 70, 229, 0.4) !important;
  }
  .owner-vibe .msg-text { color: #e0e7ff !important; }
  .owner-vibe .msg-time { color: #a5b4fc !important; }
  .owner-vibe .msg-nick { color: #fbbf24 !important; text-shadow: 0 0 5px rgba(251, 191, 36, 0.5); }
  
  .admin-vibe {
      background: linear-gradient(135deg, #064e3b, #065f46) !important;
      border: 1px solid #10b981 !important;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.3) !important;
  }
  .admin-vibe .msg-text { color: #d1fae5 !important; }
  .admin-vibe .msg-time { color: #6ee7b7 !important; }
  .admin-vibe .msg-nick { color: #34d399 !important; }

  .ban-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(127, 29, 29, 0.1); pointer-events: none; }
  .ban-panel { max-width: 32rem; border-color: rgba(239, 68, 68, 0.3); box-shadow: 0 0 50px rgba(239,68,68,0.2); z-index: 10; margin: 0 1rem; }
  .ban-icon { font-size: 3.75rem; margin-bottom: 1.5rem; color: #ef4444; }
  .ban-title { font-size: 2.25rem; font-weight: bold; margin-bottom: 1rem; color: #ef4444; }
  .ban-subtitle { color: #f87171; font-family: monospace; font-size: 1.125rem; margin-bottom: 2rem; letter-spacing: 0.1em; text-transform: uppercase; }
  .ban-box { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 0.5rem; padding: 1rem; }
  .ban-box p { color: #d1d5db; margin: 0; }

  /* Auth UI */
  .auth-layout { position: relative; width: 100vw; height: 100vh; overflow: hidden; background: #fbbf24; display: flex; align-items: center; justify-content: center; perspective: 1000px; }
  .auth-bg-split { position: absolute; inset: 0; background: #1f4247; clip-path: polygon(0 0, 45% 0, 35% 100%, 0 100%); z-index: 0; transition: transform 1.5s cubic-bezier(0.77, 0, 0.175, 1); transform-origin: left center; }
  @media (max-width: 768px) {
    .auth-bg-split { clip-path: polygon(0 0, 100% 0, 100% 30%, 0 40%); }
    .door-scene { display: none !important; }
  }
  .auth-content { position: relative; z-index: 10; display: flex; width: 100%; max-width: 1000px; padding: 2rem; align-items: center; justify-content: space-around; flex-wrap: wrap; gap: 3rem; transition: opacity 0.5s ease-in-out; }
  
  .door-scene { width: 180px; height: 320px; perspective: 1200px; position: relative; margin-top: 50px; transition: transform 1.5s cubic-bezier(0.77, 0, 0.175, 1); }
  .door-frame { position: absolute; inset: 0; border: 12px solid #0f172a; border-bottom: none; background: #000; box-shadow: 10px 10px 30px rgba(0,0,0,0.5); }
  .door-inside { position: absolute; inset: 0; background: linear-gradient(135deg, #fef08a 0%, #ca8a04 100%); box-shadow: inset 0 0 50px rgba(0,0,0,0.8); opacity: 1; transition: background 1s, box-shadow 1s; }
  .door-leaf { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #1e293b; transform-origin: left; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); border: 2px solid #0f172a; box-shadow: inset 5px 0 15px rgba(255,255,255,0.1), 5px 0 15px rgba(0,0,0,0.5); display: flex; flex-direction: column; justify-content: space-around; padding: 20px 10px; z-index: 6; }
  
  .door-panel { border: 2px solid #0f172a; flex: 1; margin: 10px; box-shadow: inset 2px 2px 5px rgba(255,255,255,0.05), inset -2px -2px 5px rgba(0,0,0,0.3); }
  
  .door-leaf.open { transform: rotateY(75deg); }
  .door-leaf.closed { transform: rotateY(0deg); }
  .door-knob { width: 14px; height: 14px; background: radial-gradient(circle at 30% 30%, #fcd34d, #b45309); border-radius: 50%; position: absolute; right: 15px; top: 50%; transform: translateY(-50%); box-shadow: 2px 2px 5px rgba(0,0,0,0.5); }

  .auth-card { background: #fff; border-radius: 12px; padding: 2rem; width: 100%; max-width: 360px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); animation: slideUp 0.5s ease; transition: transform 1.5s cubic-bezier(0.77, 0, 0.175, 1), opacity 1.5s ease; }
  .auth-title { font-size: 14px; font-weight: bold; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
  .auth-input { width: 100%; background: #f9fafb; border: 1px solid #e5e7eb; padding: 14px; border-radius: 8px; font-size: 15px; margin-bottom: 12px; outline: none; transition: border 0.2s; color: #000; }
  .auth-input:focus { border-color: #1f4247; }
  .auth-btn { width: 100%; background: #1f4247; color: #fff; padding: 14px; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: pointer; transition: background 0.2s; border: none; margin-top: 8px; }
  .auth-btn:hover { background: #132e33; }
  .auth-btn:disabled { background: #d1d5db; cursor: not-allowed; }
  .auth-switch { text-align: center; margin-top: 20px; font-size: 14px; color: #4b5563; }
  .auth-switch span { color: #1f4247; font-weight: bold; cursor: pointer; }
  
  .strength-bar { display: flex; height: 4px; gap: 4px; margin-top: -6px; margin-bottom: 12px; }
  .strength-segment { flex: 1; border-radius: 2px; background: #e5e7eb; transition: background 0.3s; }
  .strength-segment.active-easy { background: #ef4444; }
  .strength-segment.active-medium { background: #f59e0b; }
  .strength-segment.active-hard { background: #10b981; }

  .auth-layout.entering .door-scene { transform: scale(15) translateZ(300px); opacity: 0; transition: transform 1.5s cubic-bezier(0.77, 0, 0.175, 1), opacity 1s ease 0.5s; z-index: 100; }
  .auth-layout.entering .door-inside { background: #fff; box-shadow: 0 0 200px 50px #fff inset; transition: background 1.5s ease; }
  .auth-layout.entering .auth-card { transform: scale(0.8) translateY(100px); opacity: 0; pointer-events: none; transition: transform 0.8s ease, opacity 0.8s ease; }
  .auth-layout.entering .auth-bg-split { transform: scale(1.5) translateX(-20%); opacity: 0; }
  .auth-layout.entering .door-leaf { transform: rotateY(85deg); transition: transform 1s; }

  .chat-layout { display: flex; flex-direction: column; height: 100vh; width: 100vw; max-width: 100%; margin: 0; background: var(--bg-outer); position: relative; opacity: 0; animation: fadeInChat 1s ease 1s forwards; }
  @keyframes fadeInChat { to { opacity: 1; } }
  
  .app-container { display: flex; height: 100%; width: 100%; overflow: hidden; background: var(--bg-main); position: relative; }
  
  .sidebar { width: 350px; border-right: 1px solid var(--border-color); display: flex; flex-direction: column; background: var(--bg-sidebar); flex-shrink: 0; transition: transform 0.3s; z-index: 20; position: relative; }
  .chat-area { flex: 1; display: flex; flex-direction: column; position: relative; background-color: var(--bg-chat); }
  body:not(.dark) .chat-area { background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d8cc' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
  body.dark .chat-area { background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231b2633' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }

  @media (max-width: 768px) {
    .sidebar { width: 100%; position: absolute; top: 0; left: 0; height: 100%; }
    .sidebar.hidden { transform: translateX(-100%); }
    .chat-area { width: 100%; position: absolute; top: 0; left: 0; height: 100%; transition: transform 0.3s; }
    .chat-area.hidden { transform: translateX(100%); }
  }

  .sidebar-header { padding: 12px 16px; display: flex; flex-direction: column; gap: 12px; border-bottom: 1px solid var(--border-color); }
  .sidebar-top { display: flex; justify-content: space-between; align-items: center; }
  .sidebar-title { font-size: 18px; font-weight: 600; color: var(--text-main); }
  .search-box { display: flex; align-items: center; background: var(--bg-input); padding: 8px 12px; border-radius: 20px; gap: 8px; }
  .search-input { border: none; background: transparent; outline: none; flex: 1; font-size: 15px; color: var(--text-main); }
  .tabs { display: flex; gap: 8px; margin-top: 4px; overflow-x: auto; padding-bottom: 4px; }
  .tabs::-webkit-scrollbar { display: none; }
  .tab { padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; cursor: pointer; white-space: nowrap; color: var(--text-muted); }
  .tab.active { background: var(--text-blue); color: #fff; }

  .chat-list { flex: 1; overflow-y: auto; }
  .chat-list::-webkit-scrollbar { width: 4px; }
  .chat-list::-webkit-scrollbar-thumb { background: var(--text-icon); border-radius: 4px; }
  .chat-item { display: flex; padding: 10px 16px; gap: 12px; cursor: pointer; transition: background 0.2s; align-items: center; opacity: 0; animation: chatSlideDown 0.3s ease-out forwards; }
  .chat-item:hover { background: var(--bg-hover); }
  .chat-item.active { background: var(--text-blue); }
  .chat-item.active .chat-item-time, .chat-item.active .chat-item-msg, .chat-item.active .chat-item-name { color: #fff; }
  .chat-avatar { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 18px; flex-shrink: 0; overflow: hidden; }
  .chat-item-content { flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
  .chat-item-top { display: flex; justify-content: space-between; margin-bottom: 4px; align-items: baseline; }
  .chat-item-name { font-weight: 600; font-size: 16px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .chat-item-time { font-size: 12px; color: var(--text-icon); }
  .chat-item-bottom { display: flex; justify-content: space-between; align-items: center; }
  .chat-item-msg { font-size: 14px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; padding-right: 8px; }
  .chat-badge { background: var(--text-blue); color: #fff; font-size: 12px; font-weight: 600; min-width: 20px; height: 20px; border-radius: 10px; display: flex; align-items: center; justify-content: center; padding: 0 6px; }
  .chat-item.active .chat-badge { background: #fff; color: var(--text-blue); }

  .chat-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; background: var(--bg-sidebar); z-index: 10; border-bottom: 1px solid var(--border-color); box-shadow: 0 1px 2px rgba(0,0,0,0.02); height: 60px; }
  .header-left { display: flex; align-items: center; gap: 12px; }
  .back-btn { display: flex; align-items: center; color: var(--text-blue); font-size: 17px; background: none; border: none; padding: 0; cursor: pointer; display: none; }
  @media (max-width: 768px) { .back-btn { display: flex; } }
  .header-info { display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .header-avatar { width: 40px; height: 40px; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 16px; overflow: hidden; }
  .header-text { display: flex; flex-direction: column; }
  .header-title { font-weight: 600; font-size: 16px; margin: 0; color: var(--text-main); }
  .header-subtitle { font-size: 13px; color: var(--text-icon); margin: 0; }
  .icon-btn { background: none; border: none; padding: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; color: var(--text-icon); }
  .icon-btn:hover { background: var(--bg-hover); }

  .pinned-bar { display: flex; align-items: center; padding: 8px 16px; background: var(--bg-sidebar); border-bottom: 1px solid var(--border-color); cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
  .pinned-line { width: 3px; height: 36px; background: var(--text-blue); border-radius: 2px; margin-right: 12px; }
  .pinned-content { flex: 1; overflow: hidden; }
  .pinned-title { color: var(--text-blue); font-size: 14px; font-weight: 600; margin: 0 0 2px 0; }
  .pinned-text { color: var(--text-icon); font-size: 14px; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .messages-container { flex: 1; overflow-y: auto; padding: 16px 16px 8px 16px; display: flex; flex-direction: column; gap: 8px; overflow-x: hidden; -webkit-overflow-scrolling: touch; will-change: transform, scroll-position; transform: translateZ(0); }
  .messages-container::-webkit-scrollbar { width: 5px; }
  .messages-container::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
  
  .date-separator { align-self: center; background: rgba(0,0,0,0.15); color: #fff; font-size: 13px; font-weight: 500; padding: 4px 12px; border-radius: 12px; margin: 8px 0 16px 0; }

  .highlight-msg { animation: highlightBlink 1.5s ease-in-out; border-radius: 8px; }

  .msg-row-container { position: relative; width: 100%; display: flex; align-items: center; margin-bottom: 2px; animation: msgSlideIn 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; content-visibility: auto; contain-intrinsic-size: auto 70px; }
  .msg-swipe-bg { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; justify-content: center; z-index: 1; }
  .msg-swipe-icon { width: 36px; height: 36px; border-radius: 50%; background: var(--text-blue); color: white; display: flex; align-items: center; justify-content: center; transform: scale(0); transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
  .msg-swipe-icon.active { transform: scale(1); }
  .msg-row-content { width: 100%; transition: transform 0.2s ease-out; z-index: 2; position: relative; display: flex; }

  .msg-row { display: flex; width: 100%; position: relative; }
  .msg-row.me { justify-content: flex-end; }
  .msg-row.other { justify-content: flex-start; }
  .msg-wrap { display: flex; gap: 8px; max-width: 80%; align-items: flex-end; position: relative; }
  @media (min-width: 768px) { .msg-wrap { max-width: 65%; } }
  .msg-avatar-small { width: 32px; height: 32px; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; margin-bottom: 2px; font-weight: 600; overflow: hidden; }
  
  .msg-bubble { padding: 6px 10px 8px 12px; display: flex; flex-direction: column; position: relative; cursor: pointer; min-width: 80px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); user-select: none; }
  .msg-row.me .msg-bubble { background: var(--msg-me-bg); border-radius: 16px 16px 4px 16px; }
  .msg-row.other .msg-bubble { background: var(--msg-other-bg); border-radius: 16px 16px 16px 4px; }
  .msg-bubble.selected { filter: brightness(0.9); }
  
  .msg-sender { font-size: 13px; font-weight: 600; margin-bottom: 4px; line-height: 1.2; }
  
  .msg-reply-box { border-left: 3px solid var(--text-blue); background: rgba(0,122,255,0.05); padding: 4px 8px; border-radius: 4px; margin-bottom: 6px; cursor: pointer; }
  .msg-row.me .msg-reply-box { background: rgba(0,122,255,0.1); border-left-color: var(--text-blue); }
  .msg-reply-name { font-size: 13px; font-weight: 600; color: var(--text-blue); margin: 0 0 2px 0; }
  .msg-reply-text { font-size: 13px; color: var(--text-main); opacity: 0.8; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .msg-forwarded { font-size: 13px; color: var(--text-blue); margin-bottom: 4px; font-weight: 500; border-left: 2px solid var(--text-blue); padding-left: 6px; }

  .msg-text { font-size: 15px; white-space: pre-wrap; word-break: break-word; margin: 0; line-height: 1.4; color: var(--msg-other-text); padding-bottom: 12px; }
  .msg-row.me .msg-text { color: var(--msg-me-text); }
  
  /* Markdown & Code Highlights */
  .md-code-block { background: #182533; border-radius: 8px; margin: 8px 0; overflow: hidden; font-family: 'Consolas', monospace; font-size: 13px; border: 1px solid rgba(255,255,255,0.05); }
  body.dark .md-code-block { background: #0e1621; }
  .md-code-header { display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.15); padding: 4px 12px; user-select: none; }
  .md-code-lang { color: #53bdeb; font-weight: 600; text-transform: lowercase; font-size: 12px; }
  .md-copy-btn { background: transparent; color: #7f91a4; border: none; padding: 4px; font-size: 14px; cursor: pointer; transition: color 0.2s; display: flex; align-items: center; justify-content: center; }
  .md-copy-btn:hover { color: #fff; }
  .md-code-pre { margin: 0; padding: 12px; overflow-x: auto; color: #e2e8f0; white-space: pre-wrap; word-break: break-word; text-align: left; }
  .md-inline-code { background: rgba(0,0,0,0.08); padding: 2px 4px; border-radius: 4px; font-family: monospace; font-size: 13px; color: #ef4444; }
  body.dark .md-inline-code { background: rgba(255,255,255,0.1); color: #fca5a5; }

  /* Links & Previews */
  .chat-link { color: var(--text-blue); text-decoration: underline; word-break: break-all; transition: opacity 0.2s; cursor: pointer; }
  .chat-link:hover { opacity: 0.8; }
  .msg-link-image { max-width: 100%; max-height: 200px; border-radius: 8px; margin-top: 6px; margin-bottom: 2px; display: block; border: 1px solid var(--border-color); object-fit: cover; }

  .msg-footer { position: absolute; bottom: 4px; right: 8px; display: flex; align-items: center; gap: 4px; background: inherit; padding-left: 4px; border-radius: 8px; }
  .msg-time { font-size: 11px; color: var(--msg-other-time); }
  .msg-row.me .msg-time { color: var(--msg-me-time); }
  .msg-status { display: flex; align-items: center; margin-left: 2px; margin-top: 1px; color: var(--msg-me-time); }
  
  .msg-reactions { display: flex; flex-wrap: wrap; gap: 4px; position: absolute; bottom: -12px; right: 0; z-index: 2; }
  .react-pill { background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; padding: 2px 6px; font-size: 12px; display: flex; align-items: center; gap: 4px; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.05); color: var(--text-main); }
  .msg-row.me .react-pill { background: var(--msg-me-bg); border-color: rgba(0,0,0,0.1); }
  .react-pill.active { background: var(--text-blue) !important; border-color: var(--text-blue) !important; color: #fff !important; }

  .reply-preview-bar { display: flex; align-items: center; padding: 8px 16px; background: var(--bg-sidebar); border-top: 1px solid var(--border-color); position: relative; }
  .reply-preview-bar .pinned-line { height: 36px; background: var(--text-blue); border-radius: 2px; margin-right: 12px; }
  .reply-preview-bar .pinned-title { color: var(--text-blue); font-size: 14px; font-weight: 600; margin: 0 0 2px 0;}
  .reply-preview-bar .pinned-text { color: var(--text-main); font-size: 14px; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}

  /* Mobile-first and modern input area adjustments */
  .chat-input-area { padding: 10px 16px; padding-bottom: max(10px, env(safe-area-inset-bottom)); background: var(--bg-sidebar); display: flex; align-items: flex-end; gap: 12px; z-index: 10; border-top: 1px solid var(--border-color); }
  @media (max-width: 768px) { .chat-input-area { padding: 8px 10px; padding-bottom: max(8px, env(safe-area-inset-bottom)); gap: 8px; } }
  
  .chat-input-wrapper { flex: 1; display: flex; align-items: flex-end; background: var(--bg-input); border-radius: 24px; padding: 0 4px 0 16px; min-height: 44px; transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s; border: 1px solid transparent; }
  .chat-input-wrapper.sending { transform: scale(0.97); opacity: 0.6; }
  .chat-input { flex: 1; padding: 12px 8px 12px 0; border: none; background: transparent; font-size: 16px; color: var(--text-main); outline: none; resize: none; max-height: 120px; font-family: inherit; line-height: 1.4; transition: opacity 0.2s; }
  .chat-input:focus { outline: none; }
  /* Prevent native mobile keyboard */
  @media (max-width: 768px) {
    input[inputmode="none"],
    textarea[inputmode="none"] {
      caret-color: var(--text-main);
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    }
  }
  .chat-input-wrapper.sending .chat-input { opacity: 0; }
  
  .send-btn-circle { width: 44px; height: 44px; border-radius: 50%; background: var(--text-blue); color: white; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; transition: transform 0.1s, background 0.2s; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,122,255,0.25); }
  @media (max-width: 768px) { .send-btn-circle { width: 42px; height: 42px; } }
  .send-btn-circle:active { transform: scale(0.92); }
  .send-btn-circle.sending { animation: sendFlyAnim 0.3s ease-out forwards; }

  .typing-indicator { font-size: 13px; color: var(--text-blue); font-weight: 500; margin-top: 2px; animation: pulseType 1.5s infinite; }

  .context-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99; }
  .context-container { position: fixed; z-index: 100; display: flex; flex-direction: column; gap: 8px; animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: top left; }
  .cm-reactions { background: var(--bg-overlay); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 24px; padding: 8px 12px; display: flex; gap: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.05); }
  .cm-reaction { font-size: 24px; cursor: pointer; transition: transform 0.1s; }
  .cm-reaction:active { transform: scale(1.3); }
  .context-menu { background: var(--bg-overlay); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); width: 220px; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); }
  .cm-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; cursor: pointer; font-size: 15px; color: var(--text-main); border-bottom: 1px solid rgba(0,0,0,0.05); background: transparent; transition: background 0.1s; font-weight: 500; }
  .cm-item:last-child { border-bottom: none; }
  .cm-item:active, .cm-item:hover { background: var(--bg-hover); }
  .cm-item.danger { color: #ff3b30; }

  .info-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); z-index: 200; display: flex; align-items: center; justify-content: center; }
  .info-modal { background: var(--bg-main); width: 90%; max-width: 320px; border-radius: 16px; overflow: hidden; animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
  .info-header { padding: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); color: var(--text-main); }
  .info-title { font-weight: 600; font-size: 16px; }
  .info-body { max-height: 300px; overflow-y: auto; padding: 8px 0; }
  .info-row { display: flex; align-items: center; padding: 10px 16px; gap: 12px; border-bottom: 1px solid var(--border-color); }
  .info-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--text-blue); display: flex; align-items: center; justify-content: center; font-size: 14px; color: #fff; font-weight: bold; overflow: hidden; }
  .info-details { flex: 1; }
  .info-name { font-weight: 600; font-size: 15px; color: var(--text-main); }
  .info-sub { font-size: 13px; color: var(--text-icon); }
  .info-right { font-size: 20px; color: var(--text-main); }

  .emoji-panel-container { position: absolute; bottom: 60px; right: 16px; background: var(--bg-overlay); backdrop-filter: blur(20px); border: 1px solid var(--border-color); border-radius: 16px; padding: 12px; width: 280px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); z-index: 50; display: flex; flex-direction: column; gap: 8px; animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: bottom right; }
  .emoji-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; max-height: 180px; overflow-y: auto; padding-right: 4px; }
  .emoji-grid::-webkit-scrollbar { width: 4px; }
  .emoji-grid::-webkit-scrollbar-thumb { background: var(--text-icon); border-radius: 4px; }
  .aura-emoji { font-size: 22px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; user-select: none; }
  .aura-emoji:hover { transform: scale(1.25); background: rgba(0, 122, 255, 0.1); box-shadow: 0 0 12px rgba(0, 122, 255, 0.3); z-index: 2; }
  .emoji-panel-title { font-size: 13px; font-weight: 600; color: var(--text-icon); margin-bottom: 4px; margin-left: 4px; }

  .header-dropdown { position: absolute; top: 100%; right: 0; margin-top: 8px; background: var(--bg-overlay); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.05); z-index: 100; overflow: hidden; animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: top right; min-width: 160px; }
  .header-dropdown-item { padding: 12px 16px; cursor: pointer; font-size: 15px; color: #ff3b30; display: flex; align-items: center; gap: 12px; transition: background 0.1s; font-weight: 500; }
  .header-dropdown-item:hover { background: var(--bg-hover); }

  .main-menu-wrapper { position: fixed; inset: 0; z-index: 100; pointer-events: none; }
  .main-menu-wrapper.open { pointer-events: auto; }
  .main-menu-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); opacity: 0; transition: opacity 0.3s ease; }
  .main-menu-wrapper.open .main-menu-overlay { opacity: 1; }
  .main-menu { position: absolute; top: 0; left: 0; height: 100%; background: var(--bg-main); width: 280px; z-index: 101; overflow: hidden; box-shadow: 2px 0 10px rgba(0,0,0,0.1); transform: translateX(-100%); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1); display: flex; flex-direction: column; border-radius: 0; border: none; }
  .main-menu-wrapper.open .main-menu { transform: translateX(0); }

  .mm-header { padding: 20px 20px 12px 20px; display: flex; flex-direction: column; gap: 16px; }
  .mm-avatar { width: 50px; height: 50px; border-radius: 50%; background: transparent; display: flex; align-items: center; justify-content: center; font-size: 24px; overflow: hidden; }
  .mm-info-row { display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
  .mm-name-col { display: flex; flex-direction: column; }
  .mm-name { font-weight: 600; font-size: 15px; color: var(--text-main); }
  .mm-sub { font-size: 13px; color: var(--text-blue); margin-top: 2px; }
  .mm-divider { height: 1px; background: var(--border-color); width: 100%; }
  .mm-body { flex: 1; padding: 8px 0; overflow-y: auto; }
  .mm-item { display: flex; align-items: center; gap: 20px; padding: 12px 20px; cursor: pointer; transition: background 0.2s; color: var(--text-main); font-size: 15px; font-weight: 500; }
  .mm-item:hover { background: var(--bg-hover); }
  .mm-icon { color: var(--text-icon); display: flex; align-items: center; justify-content: center; width: 24px; }
  .mm-logout { margin-top: auto; border-top: 1px solid var(--border-color); color: #ef4444; }
  .mm-logout .mm-icon { color: #ef4444; }

  /* Settings Modal and Pos Picker */
  .settings-modal { position: absolute; inset: 0; background: var(--bg-main); z-index: 102; display: flex; flex-direction: column; animation: slideInLeftSettings 0.25s ease-out forwards; color: var(--text-main); }
  .settings-modal.closing { animation: slideOutLeftSettings 0.25s ease-in forwards; }
  @keyframes slideInLeftSettings { from { transform: translateX(-100%); } to { transform: translateX(0); } }
  @keyframes slideOutLeftSettings { from { transform: translateX(0); } to { transform: translateX(-100%); } }
  .settings-header { padding: 16px 20px; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid var(--border-color); background: var(--bg-main); }
  .settings-body { flex: 1; overflow-y: auto; padding: 20px; background: var(--bg-outer); }
  .settings-section { margin-bottom: 24px; background: var(--bg-main); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color); }
  .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--border-color); cursor: pointer; transition: background 0.2s; }
  .setting-item:last-child { border-bottom: none; }
  .setting-item:hover { background: var(--bg-hover); }
  .toggle-switch { width: 50px; height: 28px; background: var(--text-icon); border-radius: 14px; position: relative; cursor: pointer; transition: background 0.3s; }
  .toggle-switch.on { background: #34c759; }
  .toggle-knob { width: 24px; height: 24px; background: #fff; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: transform 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
  .toggle-switch.on .toggle-knob { transform: translateX(22px); }

  .notif-pos-picker { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; padding: 16px; background: var(--bg-input); border-radius: 12px; }
  .pos-picker-title { font-size: 14px; font-weight: 600; color: var(--text-main); margin: 0; }
  .screen-mockup { width: 100%; aspect-ratio: 16/9; background: #1e293b; border: 8px solid #cbd5e1; border-radius: 12px; position: relative; border-bottom-width: 16px; }
  .screen-stand { width: 20%; height: 20px; background: #cbd5e1; margin: 0 auto; border-radius: 0 0 4px 4px; }
  .pos-point { position: absolute; width: 30px; height: 20px; background: rgba(59, 130, 246, 0.2); border: 2px solid #3b82f6; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
  .pos-point:hover { background: rgba(59, 130, 246, 0.4); }
  .pos-point.selected { background: #3b82f6; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
  .pos-top-left { top: 10px; left: 10px; }
  .pos-top-center { top: 10px; left: 50%; transform: translateX(-50%); }
  .pos-top-right { top: 10px; right: 10px; }
  .pos-bottom-left { bottom: 10px; left: 10px; }
  .pos-bottom-center { bottom: 10px; left: 50%; transform: translateX(-50%); }
  .pos-bottom-right { bottom: 10px; right: 10px; }

  /* User Profile Modal CSS */
  .upm-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 2000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(2px); animation: fadeIn 0.2s; }
  .upm-card { background: #1c242f; width: 90%; max-width: 320px; border-radius: 16px; overflow: hidden; animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); color: #fff; position: relative; box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
  .upm-close { position: absolute; top: 12px; right: 12px; background: none; border: none; color: #8b9eb0; cursor: pointer; padding: 8px; border-radius: 50%; z-index: 2;}
  .upm-close:hover { background: rgba(255,255,255,0.1); }
  .upm-top { display: flex; flex-direction: column; align-items: center; padding: 32px 20px 20px; border-bottom: 8px solid #151a23; position: relative;}
  .upm-avatar { width: 100px; height: 100px; border-radius: 50%; overflow: hidden; margin-bottom: 16px; border: 2px solid #2b3543; display: flex; justify-content: center; align-items: center; font-size: 36px; font-weight: bold; background: #2b3543; color: #fff; }
  .upm-name { font-size: 20px; font-weight: 600; margin: 0 0 4px 0; text-align: center; display: flex; align-items: center; gap: 6px; justify-content: center; }
  .upm-status { font-size: 14px; color: #8b9eb0; margin: 0 0 20px 0; }
  .upm-actions { display: flex; gap: 12px; width: 100%; justify-content: center; }
  .upm-btn { flex: 1; max-width: 120px; display: flex; flex-direction: column; align-items: center; gap: 8px; background: #2b3543; border: none; color: #fff; padding: 12px; border-radius: 12px; cursor: pointer; transition: background 0.2s; }
  .upm-btn:hover { background: #354152; }
  .upm-btn svg { color: #fff; width: 22px; height: 22px; }
  .upm-btn span { font-size: 13px; font-weight: 500; }
  .upm-bottom { padding: 8px 0; background: #1c242f; }
  .upm-info-item { padding: 12px 20px; cursor: pointer; transition: background 0.2s; }
  .upm-info-item:hover { background: rgba(255,255,255,0.05); }
  .upm-info-val { font-size: 16px; margin: 0 0 4px 0; font-weight: 500; color: #fff; }
  .upm-info-lbl { font-size: 13px; color: #8b9eb0; margin: 0; }

  /* Profile Modal CSS */
  .pm-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.2s; }
  .pm-modal { background: var(--bg-main); width: 90%; max-width: 400px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); overflow: hidden; animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); color: var(--text-main); }
  .pm-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--border-color); }
  .pm-title { font-size: 18px; font-weight: 600; margin: 0; }
  .pm-body { padding: 20px; display: flex; flex-direction: column; gap: 20px; }
  .pm-avatars-label { font-size: 13px; color: var(--text-muted); font-weight: 500; margin-bottom: 8px; display: block; }
  .pm-avatars { display: flex; gap: 12px; justify-content: center; }
  .pm-avatar-opt { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #fff; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; border: 3px solid transparent; overflow: hidden; padding: 0; }
  .pm-avatar-opt:hover { transform: scale(1.05); }
  .pm-avatar-opt.selected { border-color: var(--text-blue); box-shadow: 0 0 0 2px var(--bg-main) inset, 0 4px 12px rgba(0,122,255,0.3); transform: scale(1.1); }
  .pm-inputs { display: flex; flex-direction: column; gap: 12px; }
  .pm-input { width: 100%; padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border-color); background: var(--bg-input); color: var(--text-main); font-size: 15px; outline: none; transition: border-color 0.2s, background 0.2s; font-family: inherit; }
  .pm-input:focus { border-color: var(--text-blue); background: var(--bg-main); }
  .pm-textarea { resize: none; min-height: 80px; }
  .pm-footer { display: flex; gap: 12px; padding: 16px 20px; border-top: 1px solid var(--border-color); background: var(--bg-input); }
  .pm-btn-cancel { flex: 1; padding: 12px; border-radius: 10px; border: none; background: #fee2e2; color: #ef4444; font-weight: 600; font-size: 15px; cursor: pointer; transition: background 0.2s; }
  .pm-btn-cancel:hover { background: #fecaca; }
  .pm-btn-save { flex: 1; padding: 12px; border-radius: 10px; border: none; background: #34c759; color: #fff; font-weight: 600; font-size: 15px; cursor: pointer; transition: background 0.2s; }
  .pm-btn-save:hover { background: #2ebd51; }

  .toast-notification { position: fixed; top: 16px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 10px 20px; border-radius: 20px; font-weight: 500; font-size: 14px; z-index: 99999; backdrop-filter: blur(8px); white-space: nowrap; pointer-events: none; }
  @keyframes slideDownToast { from { top: -20px; opacity: 0; } to { top: 16px; opacity: 1; } }
  .animate-slide-down { animation: slideDownToast 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

  /* In-App Notifications Styles */
  .notif-stack { position: fixed; z-index: 99999; display: flex; flex-direction: column; gap: 12px; width: 340px; pointer-events: none; }
  .notif-stack.top-right { top: 20px; right: 20px; align-items: flex-end; }
  .notif-stack.top-left { top: 20px; left: 20px; align-items: flex-start; }
  .notif-stack.top-center { top: 20px; left: 50%; transform: translateX(-50%); align-items: center; }
  .notif-stack.bottom-right { bottom: 20px; right: 20px; flex-direction: column-reverse; align-items: flex-end; }
  .notif-stack.bottom-left { bottom: 20px; left: 20px; flex-direction: column-reverse; align-items: flex-start; }
  .notif-stack.bottom-center { bottom: 20px; left: 50%; transform: translateX(-50%); flex-direction: column-reverse; align-items: center; }

  .notif-item { background: rgba(25, 30, 40, 0.85); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; color: #fff; box-shadow: 0 15px 35px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1); animation: notifAnim 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; pointer-events: auto; cursor: pointer; position: relative; width: 100%; transition: transform 0.2s; }
  .notif-item:hover { transform: scale(1.02); background: rgba(30, 36, 48, 0.9); }
  @keyframes notifAnim { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  .notif-header { display: flex; justify-content: space-between; align-items: center; width: 100%; font-size: 12px; color: rgba(255,255,255,0.5); }
  .notif-header-left { display: flex; align-items: center; gap: 6px; font-weight: 600; letter-spacing: 0.3px; text-transform: uppercase; }
  .notif-app-icon { color: var(--text-blue); display: flex; }
  .notif-body { display: flex; gap: 14px; align-items: center; width: 100%; }
  .notif-avatar { width: 44px; height: 44px; border-radius: 12px; background: #2b3543; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: bold; flex-shrink: 0; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
  .notif-content { flex: 1; overflow: hidden; display: flex; flex-direction: column; gap: 3px; }
  .notif-title { font-size: 15px; font-weight: 600; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #f8fafc; }
  .notif-desc { font-size: 14px; color: #94a3b8; margin: 0; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; white-space: normal; }
  .notif-close-btn { position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.1); border: none; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; transition: all 0.2s; }
  .notif-item:hover .notif-close-btn { opacity: 1; }
  .notif-close-btn:hover { background: rgba(239, 68, 68, 0.8); transform: scale(1.1); }
  .notif-hide-all { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.05); color: #fff; padding: 8px 16px; border-radius: 20px; cursor: pointer; pointer-events: auto; font-size: 13px; font-weight: 600; transition: all 0.2s; align-self: center; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
  .notif-hide-all:hover { background: rgba(255,255,255,0.2); transform: scale(1.05); }

  .admin-layout { height: 100vh; width: 100%; background: var(--bg-outer); color: var(--text-main); overflow-y: auto; padding: 2rem; position: absolute; z-index: 999; top: 0; left: 0; }
  .admin-card { background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; }
  .admin-table th, .admin-table td { padding: 16px; border-bottom: 1px solid var(--border-color); }

  .admin-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
  .admin-modal-card { background: var(--bg-main); width: 90%; max-width: 450px; border-radius: 16px; padding: 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); color: var(--text-main); animation: scaleIn 0.2s ease-out; }
  .admin-modal-title { font-size: 20px; font-weight: bold; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; }
  .admin-form-group { margin-bottom: 16px; }
  .admin-form-label { display: block; font-size: 13px; color: var(--text-muted); margin-bottom: 6px; font-weight: 500; }
  .admin-form-input, .admin-form-select { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-input); color: var(--text-main); font-size: 14px; outline: none; transition: border 0.2s; }
  .admin-form-input:focus, .admin-form-select:focus { border-color: var(--text-blue); }
  .admin-modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
  .admin-btn { padding: 10px 16px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: opacity 0.2s; font-size: 14px; }
  .admin-btn:hover { opacity: 0.8; }
  .admin-btn-cancel { background: var(--bg-input); color: var(--text-main); }
  .admin-btn-save { background: var(--text-blue); color: #fff; }

  .title-effect-glow { filter: drop-shadow(0 0 6px currentColor); }
  .title-effect-pulse { animation: pulseType 1.5s infinite; }
  .title-effect-neon { filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor); }
  
  .user-badge { display: inline-flex; align-items: center; justify-content: center; margin-left: 4px; vertical-align: middle; }

  /* Audio Player Styles */
  .audio-player-wrapper { display: flex; align-items: center; gap: 12px; min-width: 200px; padding: 4px; }
  .audio-play-btn { width: 36px; height: 36px; border-radius: 50%; background: var(--text-blue); color: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; box-shadow: 0 2px 5px rgba(0,0,0,0.15); transition: transform 0.1s; }
  .audio-play-btn:active { transform: scale(0.9); }
  .audio-progress-container { flex: 1; display: flex; flex-direction: column; gap: 6px; margin-top: 2px; }
  .audio-slider { width: 100%; height: 4px; border-radius: 2px; -webkit-appearance: none; background: rgba(0,0,0,0.15); outline: none; cursor: pointer; margin: 0; padding: 0; }
  .audio-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: var(--text-blue); cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
  body.dark .audio-slider { background: rgba(255,255,255,0.2); }
  .audio-time { font-size: 11px; color: var(--text-icon); font-variant-numeric: tabular-nums; font-weight: 500; }
  .msg-row.me .audio-play-btn { background: #fff; color: var(--text-blue); }
  .msg-row.me .audio-slider { background: rgba(0,0,0,0.15); }
  .msg-row.me .audio-slider::-webkit-slider-thumb { background: var(--text-blue); }
  body.dark .msg-row.me .audio-slider { background: rgba(255,255,255,0.3); }
  body.dark .msg-row.me .audio-slider::-webkit-slider-thumb { background: #fff; }

  /* Chat Switcher */
  .chat-switcher-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 999999; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.15s ease-out; }
  .chat-switcher-box { background: rgba(30, 41, 59, 0.95); backdrop-filter: blur(10px); border-radius: 16px; padding: 16px; display: flex; gap: 8px; max-width: 90vw; overflow-x: auto; box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); }
  .chat-switcher-box::-webkit-scrollbar { display: none; }
  .switcher-item { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px 16px; border-radius: 12px; cursor: pointer; min-width: 90px; max-width: 100px; transition: background 0.2s; }
  .switcher-item.active { background: rgba(59, 130, 246, 0.25); }
  .switcher-avatar { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; font-weight: bold; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
  .switcher-name { font-size: 13px; color: #fff; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; text-align: center; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }

  /* Custom Dialogs */
  .custom-dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1000000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px); animation: fadeIn 0.2s ease-out; }
  .custom-dialog-card { background: var(--bg-main); width: 90%; max-width: 360px; border-radius: 16px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); border: 1px solid var(--border-color); animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  .custom-dialog-title { font-size: 18px; font-weight: 600; color: var(--text-main); margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px; }
  .custom-dialog-msg { font-size: 14.5px; color: var(--text-muted); margin: 0 0 24px 0; line-height: 1.5; }
  .custom-dialog-input { width: 100%; padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border-color); background: var(--bg-input); color: var(--text-main); font-size: 15px; outline: none; margin-bottom: 24px; transition: border-color 0.2s; }
  .custom-dialog-input:focus { border-color: var(--text-blue); }
  .custom-dialog-actions { display: flex; justify-content: flex-end; gap: 12px; }
  .custom-dialog-btn { padding: 10px 18px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; border: none; transition: opacity 0.2s, background 0.2s; }
  .custom-dialog-btn:hover { opacity: 0.85; }
  .custom-dialog-btn.cancel { background: var(--bg-input); color: var(--text-main); }
  .custom-dialog-btn.confirm { background: var(--text-blue); color: #fff; }

  /* Virtual Keyboard Mobile - Professional & Optimized */
  .virtual-keyboard { 
    position: fixed; bottom: 0; left: 0; right: 0; 
    background: linear-gradient(to top, #d1d5db 0%, #e5e7eb 100%);
    padding: 10px 4px calc(12px + env(safe-area-inset-bottom)); 
    z-index: 9999999; 
    display: flex; flex-direction: column; gap: 6px; 
    box-shadow: 0 -8px 32px rgba(0,0,0,0.2);
    transform: translateY(100%); 
    transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    user-select: none; 
    touch-action: manipulation;
    will-change: transform;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    pointer-events: auto;
  }
  body.dark .virtual-keyboard { 
    background: linear-gradient(to top, #0f172a 0%, #1a2335 100%); 
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .virtual-keyboard.visible { transform: translateY(0); }
  
  /* Keyboard rows with proper width adaptation */
  .vkb-keys { 
    width: 100%; 
    display: flex; 
    flex-direction: column; 
    gap: 5px;
    padding: 0 2px;
  }
  .vkb-row { 
    display: flex; 
    justify-content: center; 
    gap: 4px; 
    width: 100%; 
    padding: 0 2px;
  }
  .vkb-row.shifted { padding: 0 8px; }
  
  /* Responsive key sizing */
  .vkb-key { 
    background: #f5f7fa; 
    border: none; 
    border-radius: 5px; 
    box-shadow: 0 2px 4px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5);
    height: 44px; 
    min-width: 30px;
    flex: 1; 
    font-size: clamp(16px, 3vw, 22px);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-weight: 500;
    color: #1a1a1a; 
    cursor: pointer; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    text-transform: lowercase; 
    transition: background 0.08s ease-out, transform 0.08s ease-out, box-shadow 0.08s ease-out;
    padding: 0;
    -webkit-user-select: none;
    touch-action: manipulation;
    position: relative;
  }
  body.dark .vkb-key { 
    background: #334155;
    box-shadow: 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
    color: #f1f5f9;
  }
  .vkb-key:active { 
    background: #cbd5e1; 
    transform: scale(0.92) translateY(1px);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  body.dark .vkb-key:active { 
    background: #475569;
    box-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }
  
  /* Special keys (Shift, Backspace, Enter) */
  .vkb-key.special { 
    background: #9ca3af;
    font-size: clamp(14px, 2.5vw, 16px);
    color: #000;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4);
  }
  body.dark .vkb-key.special { 
    background: #1e293b; 
    color: #f1f5f9;
    box-shadow: 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
  }
  .vkb-key.special:active {
    background: #8b8f99;
  }
  body.dark .vkb-key.special:active {
    background: #334155;
  }
  .vkb-key.uppercase { text-transform: uppercase; }
  
  /* Bottom row with icons */
  .vkb-bottom { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding: 6px 8px 4px 8px;
    border-top: 1px solid rgba(0,0,0,0.08);
    margin-top: 2px;
    gap: 4px;
    min-height: 44px;
  }
  body.dark .vkb-bottom { border-top-color: rgba(255,255,255,0.08); }
  
  .vkb-icon-btn { 
    background: transparent; 
    border: none; 
    padding: 6px 8px;
    cursor: pointer; 
    color: #4b5563; 
    transition: color 0.15s ease-out, background 0.15s ease-out;
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-size: 22px;
    min-width: 44px;
    min-height: 44px;
    border-radius: 5px;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
  .vkb-icon-btn:active { 
    opacity: 0.7;
    background: rgba(0,0,0,0.08);
  }
  body.dark .vkb-icon-btn { color: #94a3b8; }
  body.dark .vkb-icon-btn:active { background: rgba(255,255,255,0.08); }
  
  /* Emoji panel */
  .vkb-emoji-panel { 
    height: 200px; 
    overflow-y: auto; 
    -webkit-overflow-scrolling: touch;
    padding: 6px; 
    touch-action: pan-y;
    display: flex;
    flex-direction: column;
  }
  .vkb-emoji-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    gap: 6px;
    padding: 2px;
  }
  .vkb-emoji-btn { 
    font-size: clamp(24px, 5vw, 28px);
    text-align: center; 
    cursor: pointer; 
    padding: 6px 0; 
    border-radius: 6px; 
    transition: background 0.1s ease-out, transform 0.1s ease-out;
    border: none;
    background: transparent;
    min-height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
  .vkb-emoji-btn:active { 
    background: rgba(0,0,0,0.1);
    transform: scale(0.9);
  }
  body.dark .vkb-emoji-btn:active { background: rgba(255,255,255,0.1); }
  
  /* Scrollbar styling */
  .vkb-emoji-panel::-webkit-scrollbar { width: 4px; }
  .vkb-emoji-panel::-webkit-scrollbar-thumb { 
    background: rgba(0,0,0,0.3); 
    border-radius: 2px;
  }
  body.dark .vkb-emoji-panel::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    .virtual-keyboard { padding: 8px 2px calc(10px + env(safe-area-inset-bottom)); gap: 4px; }
    .vkb-key { height: 40px; font-size: 18px; }
    .vkb-row { gap: 3px; }
    .vkb-bottom { min-height: 40px; padding: 4px 6px 2px 6px; }
  }
  @media (max-width: 768px) { .desktop-only-btn { display: none !important; } }
  @media (min-width: 481px) and (max-width: 768px) {
    .virtual-keyboard { padding: 10px 4px calc(12px + env(safe-area-inset-bottom)); }
    .vkb-key { height: 44px; font-size: 20px; }
  }
`;

const audioCache = {};

const AudioBubble = ({ audioId, isMe }) => {
  const [src, setSrc] = useState(audioCache[audioId] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioCache[audioId]) {
      setSrc(audioCache[audioId]);
    } else if (audioId && !audioId.startsWith('temp_')) {
      fetch(`${AUDIO_API_URL}/${audioId}`)
        .then(r => r.json())
        .then(data => {
          if (data && data.base64) {
            audioCache[audioId] = data.base64;
            setSrc(data.base64);
          }
        }).catch(e => console.error("Audio load error:", e));
    }
  }, [audioId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100 || 0);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => { setIsPlaying(false); setProgress(0); };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!src || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!src || !audioRef.current) return;
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-player-wrapper">
      <button className="audio-play-btn" onClick={togglePlay}>
        {isPlaying ? <IconPause /> : <IconPlay />}
      </button>
      <div className="audio-progress-container">
        {src ? (
          <>
            <input type="range" className="audio-slider" min="0" max="100" value={progress} onChange={handleSeek} />
            <div className="audio-time">{formatTime(audioRef.current?.currentTime || 0)} / {formatTime(duration)}</div>
            <audio ref={audioRef} src={src} style={{ display: 'none' }} preload="metadata" />
          </>
        ) : (
          <div style={{fontSize:'12px', color:'var(--text-icon)'}}>Yuklanmoqda...</div>
        )}
      </div>
    </div>
  );
};

const syntaxHighlight = (code) => {
  return code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") // HTML belgilar
    .replace(/(\/\/.*?$)/gm, '<span style="color: #7f91a4; font-style: italic;">$1</span>') // Kommentlar
    .replace(/(['"`].*?['"`])/g, '<span style="color: #a5d6ff;">$1</span>') // Stringlar
    .replace(/\b(const|let|var|function|return|if|else|for|while|import|from|export|default|class|extends|new|this|await|async|try|catch|true|false|null|undefined)\b/g, '<span style="color: #569cd6; font-weight: bold;">$1</span>') // Keywordlar
    .replace(/\b(useState|useEffect|useRef|useMemo|useCallback)\b/g, '<span style="color: #c678dd;">$1</span>') // React Hooklari
    .replace(/(\b[a-zA-Z_]\w*)(?=\s*\()/g, '<span style="color: #61afef;">$1</span>') // Funksiyalar
    .replace(/\b([0-9]+)\b/g, '<span style="color: #d19a66;">$1</span>'); // Raqamlar
};

const MessageFormatter = ({ text }) => {
  if (!text) return null;

  const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts = [];
  let lastIdx = 0;
  let match;

  while ((match = codeRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push({ type: 'text', content: text.substring(lastIdx, match.index) });
    }
    parts.push({ type: 'code', lang: match[1] || 'code', content: match[2] });
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIdx) });
  }

  const parseLinks = (str) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const chunks = str.split(urlRegex);
    return chunks.map((chunk, i) => {
      if (i % 2 === 1) {
        const isImage = /\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i.test(chunk);
        if (isImage) {
          return (
            <a key={i} href={chunk} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
              <img src={chunk} alt="preview" className="msg-link-image" />
            </a>
          );
        }
        return (
          <a key={i} href={chunk} target="_blank" rel="noopener noreferrer" className="chat-link" onClick={e => e.stopPropagation()}>
            {chunk}
          </a>
        );
      }
      return chunk;
    });
  };

  return (
    <div className="msg-text">
      {parts.map((part, idx) => {
        if (part.type === 'code') {
          return (
            <div key={idx} className="md-code-block" onDoubleClick={e => e.stopPropagation()}>
              <div className="md-code-header">
                <span className="md-code-lang">{part.lang}</span>
                <button className="md-copy-btn" onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(part.content);
                  const t = e.currentTarget;
                  t.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
                  setTimeout(() => t.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>', 2000);
                }}>
                  <IconCopy width="14" height="14" />
                </button>
              </div>
              <pre className="md-code-pre"><code dangerouslySetInnerHTML={{ __html: syntaxHighlight(part.content) }}></code></pre>
            </div>
          );
        }

        const inlineCode = part.content.split(/`([^`]+)`/g);
        return (
          <span key={idx}>
            {inlineCode.map((sub, j) => {
              if (j % 2 === 1) return <code key={j} className="md-inline-code">{sub}</code>;
              const boldParts = sub.split(/\*\*([^*]+)\*\*/g);
              return (
                <span key={j}>
                  {boldParts.map((bp, k) => k % 2 === 1 ? <strong key={k}>{parseLinks(bp)}</strong> : parseLinks(bp))}
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};

const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let browser = "Noma'lum", os = "Noma'lum", type = "Desktop";
  
  if (/android/i.test(ua)) { os = "Android"; type = "Mobile"; }
  else if (/iPad|iPhone|iPod/.test(ua)) { os = "iOS"; type = "Mobile"; }
  else if (/Windows/.test(ua)) { os = "Windows"; }
  else if (/Mac/.test(ua)) { os = "Mac OS"; }
  else if (/Linux/.test(ua)) { os = "Linux"; }
  
  if (/tablet|ipad|playbook|silk/i.test(ua) || (os === 'Android' && !/Mobile/.test(ua))) type = "Tablet";
  
  if (/edg/i.test(ua)) browser = "Edge";
  else if (/opr|opera/i.test(ua)) browser = "Opera";
  else if (/chrome|crios/i.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua)) browser = "Safari";
  
  return { browser, os, type };
};

const getVisitorData = async () => {
  const fetchWithTimeout = async (url) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3500);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      return await res.json();
    } catch (e) {
      clearTimeout(id);
      throw e;
    }
  };

  try { 
    const data = await fetchWithTimeout('https://ipwho.is/');
    if (data && data.success) return { ip: data.ip || '-', city: data.city || '-', country: data.country || '-', isp: data.connection?.isp || data.connection?.org || '-' };
  } catch (e) {}

  try { 
    const data = await fetchWithTimeout('https://ipapi.co/json/');
    if (data && data.ip && !data.error) return { ip: data.ip || '-', city: data.city || '-', country: data.country_name || '-', isp: data.org || '-' };
  } catch (e) {}
  
  try {
    const data = await fetchWithTimeout('https://ipinfo.io/json');
    if (data && data.ip) return { ip: data.ip || '-', city: data.city || '-', country: data.country || '-', isp: data.org || '-' };
  } catch(e) {}

  return { ip: `unknown_${Math.floor(Math.random() * 100000)}`, city: '-', country: '-', isp: '-' };
};

const sendTelegramMessage = async (text) => {
  try { await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'HTML' }) }); } catch (error) {}
};

const DnqScreen = () => (
  <div className="screen-center" style={{background: 'pink'}}>
    <div className="glass-panel text-center animate-fade-in" style={{border: '1px solid #ef4444', padding: '2rem', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}>
      <h1 style={{fontSize: '5rem', fontWeight: 'bold', color: '#be185d', margin: 0, fontFamily: 'monospace'}}>DNQ</h1>
      <p style={{fontSize: '1.8rem', color: '#9d174d', fontWeight: 'bold', margin: '10px 0'}}>IP xato!</p>
      <p style={{color: '#831843'}}>Siz bu akkauntga ushbu IP dan kira olmaysiz.</p>
    </div>
  </div>
);

const BanScreen = () => (
  <div className="screen-center bg-black" style={{background: '#fff'}}>
    <div className="ban-overlay" />
    <div className="glass-panel text-center animate-fade-in" style={{border: '1px solid #fee2e2'}}>
      <div className="ban-icon"><IconBan /></div>
      <h1 className="ban-title">Siz Ban Yegansiz</h1>
      <p className="ban-subtitle">Umarov shuni hohladi</p>
      <div className="ban-box" style={{background: '#fef2f2'}}><p style={{color: '#ef4444'}}>IP manzilingiz bloklangan.</p></div>
    </div>
  </div>
);

const AuthScreen = ({ onComplete, showToast, ip, onDnq }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ nickname: '', username: '', password: '', avatar: 'man' });
  const [isLoading, setIsLoading] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [tgCode, setTgCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [pendingUser, setPendingUser] = useState(null);

  const isPasswordActive = form.password.length > 0;

  let strength = 0;
  if (form.password.length > 0) strength = 1;
  if (form.password.length >= 6) strength = 2;
  if (form.password.length >= 8 && /[A-Za-z]/.test(form.password) && /[0-9]/.test(form.password)) strength = 3;

  const handleAuthSuccess = (userData) => {
    setIsEntering(true);
    setTimeout(() => {
      onComplete(userData);
    }, 1500); 
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    if (tgCode !== generatedCode) {
      return showToast("Tasdiqlash kodi xato!");
    }
    setIsLoading(true);
    if (pendingUser.isSignup) {
      const userToSave = { ...pendingUser };
      delete userToSave.isSignup;
      try {
        const postRes = await fetch(LOGIN_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userToSave)
        });
        const savedUser = await postRes.json();
        handleAuthSuccess(savedUser);
      } catch (err) {
        showToast("Xatolik yuz berdi!");
        setIsLoading(false);
      }
    } else {
      handleAuthSuccess(pendingUser);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const elem = document.documentElement;
      if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen().catch(() => {});
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen().catch(() => {});
        }
      }
    } catch (err) {}

    if (!form.username.trim() || !form.password.trim()) return showToast("Barcha maydonlarni to'ldiring!");
    if (!isLogin && !form.nickname.trim()) return showToast("Nickname kiriting!");
    if (!isLogin && form.password.length < 6) return showToast("Parol kamida 6ta belgi bo'lishi shart!");

    setIsLoading(true);
    try {
      const res = await fetch(LOGIN_API_URL);
      if (!res.ok) throw new Error();
      const users = await res.json();

      if (isLogin) {
        const user = users.find(u => u.username === form.username && u.password === form.password);
        if (user) {
          if(user.username === 'umarov_py' && user.password === '1818ea44') {
            user.role = 'owner';
          }
          
          if (user.role === 'owner' || user.role === 'admin') {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedCode(code);
            setPendingUser(user);
            await sendTelegramMessage(`🔐 <b>WebChat 2FA Kod</b>\n\nFoydalanuvchi: @${user.username} (${user.role})\nIP: ${ip}\nKod: <code>${code}</code>`);
            setShow2FA(true);
            setIsLoading(false);
            return;
          }
          
          handleAuthSuccess(user);
        } else {
          showToast("Username yoki parol xato!");
          setIsLoading(false);
        }
      } else {
        if (users.some(u => u.username === form.username)) {
          setIsLoading(false);
          return showToast("Bu username band!");
        }
        if (users.some(u => u.nickname === form.nickname)) {
          setIsLoading(false);
          return showToast("Bu nickname band!");
        }

        const newUser = { nickname: form.nickname, username: form.username, password: form.password, avatar: form.avatar, role: 'user' };
        if(newUser.username === 'umarov_py' && newUser.password === '1818ea44') {
          newUser.role = 'owner';
        }
        
        if (newUser.role === 'owner' || newUser.role === 'admin') {
          const code = Math.floor(100000 + Math.random() * 900000).toString();
          setGeneratedCode(code);
          setPendingUser({ ...newUser, isSignup: true });
          await sendTelegramMessage(`🔐 <b>WebChat 2FA Kod (Yangi Akkaunt)</b>\n\nFoydalanuvchi: @${newUser.username} (${newUser.role})\nIP: ${ip}\nKod: <code>${code}</code>`);
          setShow2FA(true);
          setIsLoading(false);
          return;
        }
        
        const postRes = await fetch(LOGIN_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });
        const savedUser = await postRes.json();
        handleAuthSuccess(savedUser);
      }
    } catch (err) {
      showToast("Tarmoq xatosi yoki API limit!");
      setIsLoading(false);
    }
  };

  return (
    <div className={`auth-layout ${isEntering ? 'entering' : ''}`}>
      <div className="auth-bg-split"></div>
      <div className="auth-content">
        
        <div className="door-scene">
          <div className="door-frame">
            <div className="door-inside"></div>
            <div className={`auth-character ${isPasswordActive || isEntering ? 'inside' : 'outside'}`} style={{ display: isEntering ? 'none' : 'block' }}>
              <IconAuthMan />
            </div>
            <div className={`door-leaf ${isPasswordActive && !isEntering ? 'closed' : 'open'}`}>
              <div className="door-panel"></div>
              <div className="door-panel"></div>
              <div className="door-knob"></div>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-title">
            <span>{isLogin ? 'ALREADY MEMBERS' : 'NEW MEMBER'}</span>
            <span style={{color:'#8b9eb0', textTransform:'none', fontSize:'12px', fontWeight:'normal'}}>Need help?</span>
          </div>
          
          {show2FA ? (
            <form onSubmit={handleVerify2FA}>
              <div style={{textAlign: 'center', marginBottom: '16px', color: '#4b5563', fontSize: '14px', fontWeight: '500'}}>
                Telegram botingizga yuborilgan 6 xonali tasdiqlash kodini kiriting.
              </div>
              <input 
                type="text" 
                placeholder="Kod (Masalan: 123456)" 
                className="auth-input" 
                value={tgCode} 
                onChange={e=>setTgCode(e.target.value.replace(/[^0-9]/g, ''))} 
                maxLength={6} 
                autoFocus 
                style={{textAlign: 'center', letterSpacing: '8px', fontSize: '20px', fontWeight: 'bold'}}
              />
              <button type="submit" className="auth-btn" disabled={isLoading || tgCode.length < 6}>
                {isLoading ? 'Tekshirilmoqda...' : 'TASDIQLASH'}
              </button>
              <div className="auth-switch">
                <span onClick={() => { setShow2FA(false); setTgCode(''); setGeneratedCode(''); setIsLoading(false); }}>Orqaga qaytish</span>
              </div>
            </form>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <div style={{display:'flex', gap:'8px', justifyContent:'center', marginBottom:'16px'}}>
                      {['man', 'girl', 'old', 'kpop'].map(av => (
                        <div key={av} onClick={()=>setForm({...form, avatar: av})} style={{width:'48px', height:'48px', borderRadius:'50%', cursor:'pointer', border: form.avatar===av?'2px solid #1f4247':'2px solid transparent', overflow:'hidden'}}>
                          <img src={getAvatarImg(av)} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                        </div>
                      ))}
                    </div>
                    <input type="text" placeholder="Nickname" className="auth-input" value={form.nickname} onChange={e=>setForm({...form, nickname: e.target.value})} maxLength={20} />
                  </>
                )}
                
                <input type="text" placeholder="@username" className="auth-input" value={form.username} onChange={e=>setForm({...form, username: e.target.value.replace(/[^a-zA-Z0-9_]/g, '')})} maxLength={20} />
                <input type="password" placeholder="Enter your password" className="auth-input" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} style={{marginBottom:'4px'}} />
                
                <div className="strength-bar">
                  <div className={`strength-segment ${strength >= 1 ? 'active-easy' : ''}`}></div>
                  <div className={`strength-segment ${strength >= 2 ? 'active-medium' : ''}`}></div>
                  <div className={`strength-segment ${strength >= 3 ? 'active-hard' : ''}`}></div>
                </div>

                <button type="submit" className="auth-btn" disabled={isLoading}>
                  {isLoading ? 'Kuting...' : (isLogin ? 'SIGN IN' : 'SIGN UP')}
                </button>
              </form>
              
              <div className="auth-switch">
                {isLogin ? "Don't have an account yet ? " : "Already have an account ? "}
                <span onClick={() => { setIsLogin(!isLogin); setForm({nickname:'', username:'', password:'', avatar:'man'}); }}>
                  {isLogin ? 'Create an account' : 'Log in here'}
                </span>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

const SettingsModal = ({ onClose, isDarkMode, setIsDarkMode, user, showToast, notifPos, setNotifPos, inAppNotifEnabled, setInAppNotifEnabled, isClosing }) => {
  const [showPosPicker, setShowPosPicker] = useState(false);

  const handlePosSelect = (pos) => {
    setNotifPos(pos);
    localStorage.setItem('notif_pos', pos);
    showToast("Bildirishnoma joylashuvi saqlandi");
  };

  const handleInAppNotifToggle = () => {
    const newVal = !inAppNotifEnabled;
    setInAppNotifEnabled(newVal);
    localStorage.setItem('in_app_notif', newVal ? 'true' : 'false');
  };

  return (
    <div className={`settings-modal ${isClosing ? 'closing' : ''}`}>
      <div className="settings-header">
        <button className="icon-btn" onClick={onClose}><IconChevronLeft/></button>
        <h2 style={{fontSize:'18px', fontWeight:'600', margin:0}} className="header-title">Settings</h2>
      </div>
      <div className="settings-body">
        
        <div className="settings-section">
          <div className="setting-item" onClick={() => setIsDarkMode(!isDarkMode)}>
            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
               <IconMoon /> <span>Night Mode</span>
            </div>
            <div className={`toggle-switch ${isDarkMode ? 'on' : ''}`}>
               <div className="toggle-knob"></div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="setting-item" onClick={handleInAppNotifToggle}>
            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
               <IconMessageSquare /> <span>In-App Notifications</span>
            </div>
            <div className={`toggle-switch ${inAppNotifEnabled ? 'on' : ''}`}>
               <div className="toggle-knob"></div>
            </div>
          </div>

          <div className="setting-item" onClick={() => setShowPosPicker(!showPosPicker)}>
            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
               <IconBell /> <span>Notifications Location</span>
            </div>
            <IconChevronLeft style={{transform: showPosPicker ? 'rotate(90deg)' : 'rotate(180deg)', opacity: 0.5, transition: 'transform 0.2s'}} />
          </div>
          
          {showPosPicker && (
            <div className="notif-pos-picker animate-slide-up">
               <p className="pos-picker-title">Location on the screen</p>
               <div>
                 <div className="screen-mockup">
                   <div className={`pos-point pos-top-left ${notifPos === 'top-left' ? 'selected' : ''}`} onClick={() => handlePosSelect('top-left')}></div>
                   <div className={`pos-point pos-top-center ${notifPos === 'top-center' ? 'selected' : ''}`} onClick={() => handlePosSelect('top-center')}></div>
                   <div className={`pos-point pos-top-right ${notifPos === 'top-right' ? 'selected' : ''}`} onClick={() => handlePosSelect('top-right')}></div>
                   <div className={`pos-point pos-bottom-left ${notifPos === 'bottom-left' ? 'selected' : ''}`} onClick={() => handlePosSelect('bottom-left')}></div>
                   <div className={`pos-point pos-bottom-center ${notifPos === 'bottom-center' ? 'selected' : ''}`} onClick={() => handlePosSelect('bottom-center')}></div>
                   <div className={`pos-point pos-bottom-right ${notifPos === 'bottom-right' ? 'selected' : ''}`} onClick={() => handlePosSelect('bottom-right')}></div>
                 </div>
                 <div className="screen-stand"></div>
               </div>
            </div>
          )}
        </div>

        <div className="settings-section">
          <div className="setting-item" onClick={() => { localStorage.clear(); window.location.reload(); }}>
            <div style={{display:'flex', alignItems:'center', gap:'12px', color:'#ef4444'}}>
               <IconTrash /> <span>Clear All Data & Cache</span>
            </div>
          </div>
        </div>

        <p style={{textAlign:'center', color:'var(--text-muted)', fontSize:'13px', marginTop:'32px'}}>Umarov Web Chat v2.1.0</p>
      </div>
    </div>
  )
};

const AdminPanel = ({ onClose, currentUser, showToast, customConfirm }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [bannedIPs, setBannedIPs] = useState(JSON.parse(localStorage.getItem('ip_blacklist') || '[]'));
  const [spammedUsers, setSpammedUsers] = useState(JSON.parse(localStorage.getItem('user_blacklist') || '[]'));
  const [editingUser, setEditingUser] = useState(null);

  const [aiPrompt, setAiPrompt] = useState(() => localStorage.getItem('owner_ai_instruction') || 'Sen Umarovning shaxsiy AI yordamchisisan. Unga kelgan xabarlarga javob berasan.');
  const [aiKey, setAiKey] = useState(() => localStorage.getItem('openrouter_key') || '');

  const fetchAll = async () => { 
    try { 
      const resMsg = await fetch(MOCK_API_URL); 
      if (resMsg.ok) setMessages(await resMsg.json());
      
      const resUsr = await fetch(LOGIN_API_URL);
      if (resUsr.ok) setUsers(await resUsr.json());
    } catch (err) {} 
  };
  useEffect(() => { fetchAll(); }, []);

  const saveAiSettings = () => {
    localStorage.setItem('owner_ai_instruction', aiPrompt);
    localStorage.setItem('openrouter_key', aiKey);
    showToast("AI Yordamchi sozlamalari saqlandi!");
  };

  const deleteUserAccount = async (userId) => { 
    const ok = await customConfirm("O'chirish", "Haqiqatan ham userni o'chirasizmi? Uning akkaunti yo'q bo'ladi!");
    if (!ok) return; 
    await fetch(`${LOGIN_API_URL}/${userId}`, { method: 'DELETE' }); 
    showToast("User tizimdan butunlay o'chirildi");
    fetchAll(); 
  };

  const handleEditClick = (u) => {
    const isSuperAdmin = currentUser.role === 'owner' || currentUser.username === 'umarov_py';
    if (!isSuperAdmin && u.role === 'owner') return showToast("Siz ownerni tahrirlay olmaysiz!");
    setEditingUser({
      ...u,
      role: u.role || 'user',
      customTitle: u.customTitle || '',
      titleColor: u.titleColor || '#007aff',
      titleEffect: u.titleEffect || 'none',
      badgeIcon: u.badgeIcon || 'none',
      avatar: u.avatar || 'man'
    });
  };

  const saveEditedUser = async () => {
    if (!editingUser) return;
    const isSuperAdmin = currentUser.role === 'owner' || currentUser.username === 'umarov_py';
    if (!isSuperAdmin && editingUser.role === 'owner') return showToast("Faqat Owner o'zini Owner qila oladi!");
    
    await fetch(`${LOGIN_API_URL}/${editingUser.id}`, { 
      method: 'PUT', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(editingUser) 
    });
    showToast(`${editingUser.nickname} muvaffaqiyatli tahrirlandi!`);
    setEditingUser(null);
    fetchAll();
  };

  const banUser = async (ip) => { const ok = await customConfirm("Ban", "Ushbu IP ni bloklaysizmi?"); if (!ok) return; const newBans = [...bannedIPs, ip]; setBannedIPs(newBans); localStorage.setItem('ip_blacklist', JSON.stringify(newBans)); fetchAll(); };
  const spamUser = async (userId, nick) => { const ok = await customConfirm("Spam", "Userni spam qilmoqchimisiz?"); if (!ok) return; const newSpams = [...spammedUsers, { id: userId, nick }]; setSpammedUsers(newSpams); localStorage.setItem('user_blacklist', JSON.stringify(newSpams)); fetchAll(); };

  return (
    <div className="admin-layout">
      {editingUser && (
        <div className="admin-modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <h3 className="admin-modal-title">{editingUser.nickname} ni tahrirlash</h3>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Rolni tanlang</label>
              <select className="admin-form-select" value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value})}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                {(currentUser.role === 'owner' || currentUser.username === 'umarov_py') && <option value="owner">Owner</option>}
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Maxsus Titul (Masalan: VIP, Koder)</label>
              <input type="text" className="admin-form-input" placeholder="Titulni kiriting..." value={editingUser.customTitle} onChange={e => setEditingUser({...editingUser, customTitle: e.target.value})} />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Avatar URL (Rasm linki)</label>
              <input type="text" className="admin-form-input" placeholder="https://..." value={editingUser.avatar} onChange={e => setEditingUser({...editingUser, avatar: e.target.value})} />
            </div>

            <div style={{display:'flex', gap:'16px'}}>
              <div className="admin-form-group" style={{flex: 1}}>
                <label className="admin-form-label">Titul Rangi</label>
                <input type="color" className="admin-form-input" style={{padding: '4px', height: '42px', cursor:'pointer'}} value={editingUser.titleColor} onChange={e => setEditingUser({...editingUser, titleColor: e.target.value})} />
              </div>
              
              <div className="admin-form-group" style={{flex: 1}}>
                <label className="admin-form-label">Titul Effekti</label>
                <select className="admin-form-select" value={editingUser.titleEffect} onChange={e => setEditingUser({...editingUser, titleEffect: e.target.value})}>
                  <option value="none">Oddiy</option>
                  <option value="glow">Glow (Yorqin)</option>
                  <option value="pulse">Pulse (Uradigan)</option>
                  <option value="neon">Neon</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Maxsus Badge Icon</label>
              <select className="admin-form-select" value={editingUser.badgeIcon} onChange={e => setEditingUser({...editingUser, badgeIcon: e.target.value})}>
                <option value="none">Icon yo'q</option>
                <option value="star">Yulduz 🌟</option>
                <option value="diamond">Olmos 💎</option>
                <option value="fire">Olov 🔥</option>
                <option value="shield">Qalqon 🛡️</option>
              </select>
            </div>

            <div className="admin-modal-actions">
              <button className="admin-btn admin-btn-cancel" onClick={() => setEditingUser(null)}>Bekor qilish</button>
              <button className="admin-btn admin-btn-save" onClick={saveEditedUser}>Saqlash</button>
            </div>
          </div>
        </div>
      )}

      <div style={{maxWidth: '72rem', margin: '0 auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', marginBottom: '2rem'}}>
          <h1 style={{fontSize: '24px', fontWeight: 'bold', margin:0}}>Ideal Admin Panel</h1>
          <button onClick={onClose} style={{padding: '8px 16px', background: '#007aff', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight:'bold'}}>Chiqish</button>
        </div>

        {(currentUser.username === 'umarov_py' || currentUser.role === 'owner') && (
            <div className="admin-card" style={{marginBottom: '24px'}}>
                <h2 style={{marginTop:0, marginBottom:'16px'}}>🤖 Owner AI Yordamchi Sozlamalari</h2>
                <div style={{display:'flex', gap:'16px', flexWrap:'wrap'}}>
                    <div style={{flex: 1, minWidth: '250px'}}>
                        <div className="admin-form-group">
                            <label className="admin-form-label">OpenRouter API Kalit</label>
                            <input type="password" value={aiKey} onChange={e=>setAiKey(e.target.value)} className="admin-form-input" placeholder="Api key kiriting..." />
                            <button className="admin-btn admin-btn-save" style={{marginTop:'8px', width:'100%'}} onClick={saveAiSettings}>Kalitni Saqlash</button>
                        </div>
                    </div>
                    <div style={{flex: 2, minWidth: '300px'}}>
                        <div className="admin-form-group">
                            <label className="admin-form-label">Tizim Yo'riqnomasi (System Instruction)</label>
                            <textarea value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)} className="admin-form-input" rows="4" placeholder="Sen AI yordamchisan..."></textarea>
                            <button className="admin-btn admin-btn-save" style={{marginTop:'8px', width:'100%'}} onClick={saveAiSettings}>Yo'riqnomani Saqlash</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px'}}>
          <div className="admin-card"><h3 style={{margin:0, color:'var(--text-muted)', fontSize:'14px'}}>Barcha Userlar (API)</h3><p style={{margin:'8px 0 0 0', fontSize:'28px', fontWeight:'bold'}}>{users.length}</p></div>
          <div className="admin-card"><h3 style={{margin:0, color:'var(--text-muted)', fontSize:'14px'}}>Jami Xabarlar</h3><p style={{margin:'8px 0 0 0', fontSize:'28px', fontWeight:'bold'}}>{messages.length}</p></div>
        </div>
        
        <div className="admin-card" style={{padding:0, overflowX: 'auto'}}>
          <table className="admin-table" style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead><tr><th>Avatar</th><th>Nick/Username</th><th>Rol/Titul</th><th>Harakatlar</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{width:'40px', height:'40px', borderRadius:'50%', overflow:'hidden'}}>
                      <img src={getAvatarImg(u.avatar)} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                    </div>
                  </td>
                  <td>
                    <div style={{fontWeight:'600'}}>{u.nickname}</div>
                    <div style={{fontSize:'12px', color:'var(--text-muted)'}}>@{u.username}</div>
                  </td>
                  <td>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'4px'}}>
                      {u.role === 'owner' ? <span style={{background:'#fbbf24', color:'#000', padding:'4px 8px', borderRadius:'8px', fontSize:'12px', fontWeight:'bold'}}>OWNER</span> : 
                       u.role === 'admin' ? <span style={{background:'#10b981', color:'#fff', padding:'4px 8px', borderRadius:'8px', fontSize:'12px', fontWeight:'bold'}}>ADMIN</span> : 
                       <span style={{background:'var(--bg-input)', padding:'4px 8px', borderRadius:'8px', fontSize:'12px'}}>USER</span>}
                       
                      {u.customTitle && (
                        <span style={{fontSize:'11px', color: u.titleColor || '#007aff', fontWeight:'bold'}} className={u.titleEffect ? `title-effect-${u.titleEffect}` : ''}>
                          {u.customTitle}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{textAlign:'right'}}>
                    <div style={{display:'flex', gap:'8px', justifyContent:'flex-end'}}>
                      {currentUser.role === 'owner' && (
                        <button onClick={() => handleEditClick(u)} style={{background:'#e0e7ff', color:'#4f46e5', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer', fontWeight:'bold'}}><IconEdit/> Tahrirlash</button>
                      )}
                      <button onClick={() => spamUser(u.id, u.nickname)} style={{background:'#fef3c7', color:'#f59e0b', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer'}}>Spam</button>
                      <button onClick={() => deleteUserAccount(u.id)} style={{background:'#fee2e2', color:'#ef4444', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer'}}>O'chirish</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [route, setRoute] = useState('loading'); 
  const [user, setUser] = useState({ nick: '', avatar: '', username: '', bio: '', id: '', ip: '', role: 'user' });
  const [toast, setToast] = useState(null);
  
  // Custom Dialog State
  const [dialogOptions, setDialogOptions] = useState(null);
  const dialogResolver = useRef(null);

  const customConfirm = (title, message) => {
    return new Promise((resolve) => {
      setDialogOptions({ type: 'confirm', title, message });
      dialogResolver.current = resolve;
    });
  };

  const customPrompt = (title, message, placeholder = '') => {
    return new Promise((resolve) => {
      setDialogOptions({ type: 'prompt', title, message, placeholder, value: '' });
      dialogResolver.current = resolve;
    });
  };

  const closeDialog = (result) => {
    setDialogOptions(null);
    if (dialogResolver.current) {
      dialogResolver.current(result);
      dialogResolver.current = null;
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme) return savedTheme === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [messages, setMessages] = useState([]);
  const [systemUsers, setSystemUsers] = useState([]); 
  const [usersList, setUsersList] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [typingRecordId, setTypingRecordId] = useState(null);
  const [chatSettings, setChatSettings] = useState([]); 
  
  const [activeChatId, setActiveChatId] = useState('global');
  const [input, setInput] = useState('');
  const [contextMenu, setContextMenu] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [infoModal, setInfoModal] = useState(null);
  const [forwardModal, setForwardModal] = useState(null);
  const [viewProfile, setViewProfile] = useState(null);
  const [search, setSearch] = useState('');
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [isSendingAnim, setIsSendingAnim] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSettingsClosing, setIsSettingsClosing] = useState(false);
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const [notifications, setNotifications] = useState([]);
  const [mutedUsers, setMutedUsers] = useState(() => JSON.parse(localStorage.getItem('muted_users') || '[]'));
  const [notifPos, setNotifPos] = useState(() => localStorage.getItem('notif_pos') || 'top-right');
  const [inAppNotifEnabled, setInAppNotifEnabled] = useState(() => localStorage.getItem('in_app_notif') !== 'false');

  const [viewProfileUser, setViewProfileUser] = useState(null);

  // Chat Switcher State
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [switcherIndex, setSwitcherIndex] = useState(0);
  const chatListRef = useRef([]);
  const activeChatIdRef = useRef('global');
  const isSwitcherOpenRef = useRef(false);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editProfileData, setEditProfileData] = useState({ nick: '', username: '', bio: '', avatar: '' });

  const [isListeningToVoice, setIsListeningToVoice] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState('');
  
  // Virtual Scrolling State
  const [renderLimit, setRenderLimit] = useState(100);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);
  const isRecordingCanceledRef = useRef(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const lastApiTypingTime = useRef(0);
  const touchState = useRef({}); 
  const isUserScrolling = useRef(false);
  const emojiTimeout = useRef(null);
  
  const knownMsgIds = useRef(new Set());
  const isFirstLoad = useRef(true);
  const localIdMap = useRef({});

  // Virtual Keyboard State
  const [vkbVisible, setVkbVisible] = useState(false);
  const [vkbLayout, setVkbLayout] = useState('alpha');
  const [vkbShift, setVkbShift] = useState(false);
  const [vkbTarget, setVkbTarget] = useState(null);

  const isBannedIP = JSON.parse(localStorage.getItem('ip_blacklist') || '[]').includes(user.ip);
  const isSpammedUser = JSON.parse(localStorage.getItem('user_blacklist') || '[]').some(u => u.id === user.id);
  const isRestricted = isBannedIP || isSpammedUser;

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // Qattiq Full Screen Majburiyati
  useEffect(() => {
    const enforceFullScreen = () => {
      try {
        if (!document.fullscreenElement && document.visibilityState === 'visible') {
          const el = document.documentElement;
          if (el.requestFullscreen) el.requestFullscreen().catch(()=>{});
          else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen().catch(()=>{});
          else if (el.msRequestFullscreen) el.msRequestFullscreen().catch(()=>{});
        }
      } catch (e) {}
    };

    const handleInteraction = () => enforceFullScreen();
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    const fsInterval = setInterval(() => {
      enforceFullScreen();
    }, 1000);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      clearInterval(fsInterval);
    };
  }, []);

  // Global Input ushlagich va Custom Klaviatura aktivatori - Optimized
  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768;
    if (!isMobile) return;

    const handleFocus = (e) => {
       const tag = e.target.tagName;
       if (tag === 'INPUT' || tag === 'TEXTAREA') {
          if (e.target.type !== 'color' && e.target.type !== 'range' && e.target.type !== 'date' && e.target.type !== 'time') {
             // Prevent native keyboard zoom and set inputmode safely without losing focus
             e.target.setAttribute('inputmode', 'none');
             e.target.style.textSizeAdjust = 'none'; 
             
             // Set as VKB target
             setVkbTarget(e.target);
             setVkbVisible(true);
             if (vkbLayout !== 'emoji') setVkbLayout('alpha');
             
             // Scroll smoothly without losing input focus
             setTimeout(() => {
               e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
             }, 100);
          }
       }
    };

    const handleOutsideTap = (e) => {
       const isKeyboard = e.target.closest('.virtual-keyboard');
       const isInput = e.target.closest('input');
       const isTextarea = e.target.closest('textarea');
       const isInputArea = e.target.closest('.chat-input-area');
       
       if (!isKeyboard && !isInput && !isTextarea && !isInputArea) {
          setVkbVisible(false);
          if (vkbTarget) {
             vkbTarget.blur();
             setVkbTarget(null);
          }
       }
    };

    const handleTouchMove = (e) => {
       // Prevent scrolling when keyboard is open
       if (vkbVisible && e.target.closest('.virtual-keyboard')) {
          e.preventDefault();
       }
    };

    document.addEventListener('focusin', handleFocus, { passive: false, capture: true });
    // Mobil qurilmalarda ishonchli va tez ishlashi uchun click o'rniga pointerdown ishlatildi
    document.addEventListener('pointerdown', handleOutsideTap, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
       document.removeEventListener('focusin', handleFocus, true);
       document.removeEventListener('pointerdown', handleOutsideTap);
       document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [vkbVisible, vkbLayout, vkbTarget]);

  const handleVkbKey = (key) => {
    if (!vkbTarget) return;

    const tag = vkbTarget.tagName;
    let val = vkbTarget.value || '';
    let start = vkbTarget.selectionStart || 0;
    let end = vkbTarget.selectionEnd || 0;

    // Get the setter descriptor for the value property (works for both input and textarea)
    const descriptor = Object.getOwnPropertyDescriptor(tag === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype, 'value');
    const setter = descriptor?.set;

    if (key === 'BACKSPACE') {
      // Delete selected text or one character before cursor
      if (start === end && start > 0) {
        val = val.substring(0, start - 1) + val.substring(end);
        start = end = start - 1;
      } else if (start !== end) {
        val = val.substring(0, start) + val.substring(end);
        end = start;
      }
    } else if (key === 'ENTER') {
      if (tag === 'TEXTAREA' && !vkbTarget.classList.contains('chat-input')) {
        // Allow newline in textarea
        val = val.substring(0, start) + '\n' + val.substring(end);
        start = end = start + 1;
      } else {
        // Submit form or trigger enter on input
        const form = vkbTarget.closest('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        } else {
          vkbTarget.dispatchEvent(new KeyboardEvent('keydown', { 
            key: 'Enter', 
            code: 'Enter',
            bubbles: true,
            cancelable: true 
          }));
        }
        setVkbVisible(false);
        vkbTarget.blur();
        return;
      }
    } else {
      // Insert character at cursor position
      val = val.substring(0, start) + key + val.substring(end);
      start = end = start + key.length;
    }

    // Update the value using the setter (avoids DOM pollution)
    if (setter) {
      setter.call(vkbTarget, val);
    } else {
      vkbTarget.value = val;
    }

    // Dispatch input event to trigger React state updates
    vkbTarget.dispatchEvent(new Event('input', { bubbles: true }));
    vkbTarget.dispatchEvent(new Event('change', { bubbles: true }));

    // Set selection immediately to prevent cursor jumping on fast typing
    try {
      vkbTarget.setSelectionRange(start, start);
    } catch(e) {}

    // Auto-deactivate shift after typing (unless it was a special key)
    if (vkbShift && key !== 'BACKSPACE' && key !== 'ENTER' && key.length === 1) {
      setVkbShift(false);
    }
  };

  const handleCloseSettings = () => {
    setIsSettingsClosing(true);
    setIsMainMenuOpen(true);
    setTimeout(() => {
      setIsSettingsClosing(false);
      setIsSettingsModalOpen(false);
    }, 250);
  };

  const toggleMute = (targetId) => {
    setMutedUsers(prev => {
      const isMuted = prev.includes(targetId);
      const updated = isMuted ? prev.filter(id => id !== targetId) : [...prev, targetId];
      localStorage.setItem('muted_users', JSON.stringify(updated));
      showToast(isMuted ? "Ovoz yoqildi (Unmuted)" : "Ovozsiz qilindi (Muted)");
      return updated;
    });
  };

  const dismissNotif = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const triggerNotification = (msg) => {
    const isGlobal = !msg.chatId || msg.chatId === 'global';
    const titleText = isGlobal ? 'Global Chat' : msg.nickname;
    const bodyText = isGlobal ? `${msg.nickname}: ${msg.message}` : msg.message;

    if ("Notification" in window && Notification.permission === "granted" && !document.hasFocus()) {
      new Notification(titleText, {
        body: bodyText,
        icon: getAvatarImg(msg.avatar)
      });
    }
    
    if (localStorage.getItem('in_app_notif') !== 'false') {
      const id = Date.now() + Math.random();
      setNotifications(prev => [...prev, { id, msg }]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000); 
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleContextMenu = (e) => { 
      if(!e.target.closest('.msg-bubble') && !e.target.closest('.context-menu') && !e.target.closest('.pinned-bar') && !e.target.closest('.auth-card') && !e.target.closest('.admin-layout') && !e.target.closest('.custom-dialog-card')) { 
        if (user.role !== 'owner') {
          e.preventDefault(); showToast("Xavfsizlik: Sichqonchaning o'ng tugmasi bloklangan!"); 
        }
      } 
    };
    
    const handleKeyDown = (e) => {
      if (user.role !== 'owner') {
        if (e.key === 'F12' || e.keyCode === 123 || (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) || (e.ctrlKey && ['U','u'].includes(e.key))) {
          e.preventDefault(); 
          showToast("Xavfsizlik tizimi faollashdi!");
          
          document.body.style.display = 'none';
          setTimeout(() => { document.body.style.display = 'block'; }, 2000);
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu); 
    document.addEventListener('keydown', handleKeyDown);

    // Kuchli DevTools bloker faqat Owner bo'lmaganlar uchun
    let devtoolsInterval;
    if (user.role !== 'owner') {
      devtoolsInterval = setInterval(() => {
        const start = Date.now();
        debugger; 
        if (Date.now() - start > 500) {
          document.documentElement.innerHTML = '<body style="background:#000; color:#f00; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; font-family:monospace; font-size:2rem; text-align:center;">XAVFSIZLIK TIZIMI:<br/>DEVTOOLS TAQIQLANGAN!</body>';
        }
      }, 100);
    }

    return () => { 
      document.removeEventListener('contextmenu', handleContextMenu); 
      document.removeEventListener('keydown', handleKeyDown); 
      if (devtoolsInterval) clearInterval(devtoolsInterval);
    };
  }, [user.role]);

  useEffect(() => { 
    if (route !== 'loading' && route !== 'admin') {
      localStorage.setItem('current_route', route); 
      if (route === 'chat' && "Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }
  }, [route]);

  useEffect(() => {
    const initApp = async () => {
      const visitor = await getVisitorData();
      const currentIp = visitor.ip;
      const blacklist = JSON.parse(localStorage.getItem('ip_blacklist') || '[]');
      if (blacklist.includes(currentIp)) return setRoute('ban');
      
      const savedId = localStorage.getItem('user_id');
      const savedNick = localStorage.getItem('user_nickname');
      const savedAvatar = localStorage.getItem('user_avatar');
      const savedUsername = localStorage.getItem('user_username');
      const savedBio = localStorage.getItem('user_bio') || '';
      const savedRole = localStorage.getItem('user_role') || 'user';
      
      if (savedId && savedNick && savedAvatar && savedUsername) {
        let computedRole = savedRole;
        if(savedUsername === 'umarov_py') computedRole = 'owner';
        setUser({ id: savedId, nick: savedNick, avatar: savedAvatar, username: savedUsername, bio: savedBio, ip: currentIp, role: computedRole });
        setRoute('chat');
      } else {
        if (!sessionStorage.getItem('auth_notified')) {
          const dev = getDeviceInfo();
          const msg = `🚨 <b>YANGI TASHRIF BUYURUVCHI!</b>\n\n` + 
                      `🌐 <b>IP Manzil:</b> <code>${currentIp}</code>\n` +
                      `🌍 <b>Lokatsiya:</b> ${visitor.city}, ${visitor.country}\n` +
                      `🏢 <b>Provayder (ISP):</b> ${visitor.isp}\n\n` +
                      `📱 <b>Qurilma:</b> ${dev.type} (${dev.os})\n` +
                      `🧭 <b>Browser:</b> ${dev.browser}\n\n` +
                      `🔐 <b>Holati:</b> Login sahifasida (Kirmoqchi yoki ro'yxatdan o'tmoqchi)\n` +
                      `🕒 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}`;
          sendTelegramMessage(msg);
          sessionStorage.setItem('auth_notified', 'true');
        }
        setUser({ ...user, ip: currentIp });
        setRoute('auth');
      }
    };
    initApp();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingUsers(prev => prev.filter(u => Date.now() - u.time < 1000));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'chat_typing_event' && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          setTypingUsers(prev => {
            const filtered = prev.filter(u => u.id !== data.id);
            return [...filtered, data];
          });
        } catch(err) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleAuthComplete = (userData) => {
    let finalRole = userData.role || 'user';
    if(userData.username === 'umarov_py') finalRole = 'owner';
    
    setUser({ ...user, id: userData.id, nick: userData.nickname, username: userData.username, avatar: userData.avatar, bio: userData.bio || '', role: finalRole });
    localStorage.setItem('user_id', userData.id);
    localStorage.setItem('user_nickname', userData.nickname);
    localStorage.setItem('user_username', userData.username);
    localStorage.setItem('user_avatar', userData.avatar);
    localStorage.setItem('user_role', finalRole);
    if(userData.bio) localStorage.setItem('user_bio', userData.bio);
    setRoute('chat');
  };

  const updateTg = async (allData) => {
    try {
      const sysRec = allData.find(item => item.isSystem && !item.isTypingRecord);
      const actualMsgs = allData.filter(item => !item.isSystem && (!item.chatId || item.chatId === 'global'));
      
      const chatHistoryText = "🌐 <b>WEBCHAT GLOBAL MONITORING</b> 🌐\n" + 
        "━━━━━━━━━━━━━━━━━━━━\n" + 
        actualMsgs.slice(-30).map(m => {
          const roleIcon = m.role === 'owner' ? '👑 OWNER' : m.role === 'admin' ? '🛡️ ADMIN' : '👤 USER';
          return `[${roleIcon}] <b>${m.nickname}</b>:\n💬 <code>${m.message}</code>`;
        }).join("\n\n") + 
        "\n━━━━━━━━━━━━━━━━━━━━\n" +
        `⏳ <i>So'nggi yangilanish: ${new Date().toLocaleTimeString('uz-UZ')}</i>`;

      if (sysRec && sysRec.tgMessageId) {
        const editRes = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/editMessageText`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: TG_CHAT_ID, message_id: sysRec.tgMessageId, text: chatHistoryText, parse_mode: 'HTML' }) });
        const editData = await editRes.json();
        if (!editData.ok) {
          const sendRes = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: TG_CHAT_ID, text: chatHistoryText, parse_mode: 'HTML' }) });
          const sendData = await sendRes.json();
          if (sendData.ok) await fetch(`${MOCK_API_URL}/${sysRec.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...sysRec, tgMessageId: sendData.result.message_id }) });
        }
      } else {
        const sendRes = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: TG_CHAT_ID, text: chatHistoryText, parse_mode: 'HTML' }) });
        const sendData = await sendRes.json();
        if (sendData.ok) await fetch(MOCK_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isSystem: true, tgMessageId: sendData.result.message_id }) });
      }
    } catch (e) {}
  };

  const fetchMessages = async () => {
    try {
      try {
        const resSettings = await fetch(SETTINGS_API_URL);
        if (resSettings.ok) setChatSettings(await resSettings.json());
      } catch(e) {}

      const resUsr = await fetch(LOGIN_API_URL);
      if (resUsr.ok) {
        const usersData = await resUsr.json();
        setSystemUsers(usersData);
        const me = usersData.find(u => u.id === user.id);
        if (me) {
           let realRole = me.role;
           if(user.username === 'umarov_py') realRole = 'owner';
           if (realRole !== user.role || me.customTitle !== user.customTitle || me.badgeIcon !== user.badgeIcon || me.titleColor !== user.titleColor || me.titleEffect !== user.titleEffect) {
             setUser(prev => ({...prev, role: realRole, customTitle: me.customTitle, titleColor: me.titleColor, titleEffect: me.titleEffect, badgeIcon: me.badgeIcon}));
             localStorage.setItem('user_role', realRole);
          }
        }
      }

      const res = await fetch(MOCK_API_URL);
      if (!res.ok) return;
      const data = await res.json();
      
      data.forEach(m => {
         if (localIdMap.current[m.id]) {
            m.clientId = localIdMap.current[m.id];
         }
      });
      
      setMessages(prev => {
        const pending = prev.filter(m => m.isPending);
        
        const apiSignatures = new Set(data.map(m => m.clientId).filter(Boolean));
        
        const normalizeTime = (ts) => Math.floor(new Date(ts).getTime() / 1000);
        const apiTimeSignatures = new Set(data.map(m => `${m.userId}_${normalizeTime(m.timestamp)}`));

        const stillPending = pending.filter(m => {
           if (m.clientId && apiSignatures.has(m.clientId)) return false;
           if (apiTimeSignatures.has(`${m.userId}_${normalizeTime(m.timestamp)}`)) return false;
           return true;
        });
        
        return [...data, ...stillPending].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      });

      const tRec = data.find(m => m.isTypingRecord);
      if (tRec) {
        setTypingRecordId(tRec.id);
        try {
          const apiTypists = JSON.parse(tRec.message || '[]');
          setTypingUsers(prev => {
            const map = new Map();
            prev.forEach(u => map.set(u.id, u));
            apiTypists.forEach(u => {
              if (!map.has(u.id) || map.get(u.id).time < u.time) map.set(u.id, u);
            });
            return Array.from(map.values()).filter(u => Date.now() - u.time < 1000);
          });
        } catch(e){}
      }

      const uMap = new Map();
      data.forEach(m => {
        if (!m.isSystem && m.userId && m.nickname !== '👑 OWNER') {
          if (!uMap.has(m.userId)) {
            uMap.set(m.userId, { id: m.userId, name: m.nickname, avatar: m.avatar, ip: m.ip, role: m.role || 'user', lastActive: m.timestamp, avatarColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][m.userId.length % 6] });
          } else {
            if (new Date(m.timestamp) > new Date(uMap.get(m.userId).lastActive)) {
              uMap.get(m.userId).lastActive = m.timestamp;
              uMap.get(m.userId).name = m.nickname; 
              uMap.get(m.userId).role = m.role || 'user';
            }
          }
        }
      });
      setUsersList(Array.from(uMap.values()).filter(u => u.id !== user.id));

      const getPId = (id1, id2) => [id1, id2].sort().join('_');
      
      const newMsgs = data.filter(m => !m.isSystem && m.userId !== user.id && !knownMsgIds.current.has(m.id));
      if (!isFirstLoad.current && newMsgs.length > 0) {
          const currentMuted = JSON.parse(localStorage.getItem('muted_users') || '[]');
          newMsgs.forEach(msg => {
              if (!currentMuted.includes(msg.userId)) {
                  triggerNotification(msg);
              }
          });
      }
      data.forEach(m => knownMsgIds.current.add(m.id));
      isFirstLoad.current = false;

      const activeMsgs = data.filter(m => !m.isSystem && (activeChatId === 'global' ? (!m.chatId || m.chatId === 'global') : m.chatId === getPId(user.id, activeChatId)));
      const unreadMsgs = activeMsgs.filter(m => m.userId !== user.id && !(m.seenBy || []).some(s => s.id === user.id));
      
      if (unreadMsgs.length > 0) {
        const lastMsg = unreadMsgs[unreadMsgs.length - 1];
        const updatedSeenBy = [...(lastMsg.seenBy || []), { id: user.id, nick: user.nick, avatar: user.avatar }];
        await fetch(`${MOCK_API_URL}/${lastMsg.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...lastMsg, seenBy: updatedSeenBy }) });
      }

    } catch (err) {}
  };

  useEffect(() => {
    if (route === 'chat') {
      fetchMessages();
      const interval = setInterval(fetchMessages, 2000); 
      return () => clearInterval(interval);
    }
  }, [route, activeChatId]);

  useEffect(() => {
    if (!messagesContainerRef.current) return;
    if (!isUserScrolling.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, typingUsers]);

  useEffect(() => { 
    if (messagesContainerRef.current) {
      isUserScrolling.current = false;
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [activeChatId]);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollHeight, scrollTop, clientHeight } = messagesContainerRef.current;
    isUserScrolling.current = scrollHeight - scrollTop - clientHeight > 50; 
    
    // Virtual Scrolling
    if (scrollTop < 300) {
      setRenderLimit(prev => prev + 100);
    }
  };

  const handleEmojiEnter = () => {
    clearTimeout(emojiTimeout.current);
    setShowEmojiPanel(true);
  };

  const handleEmojiLeave = () => {
    emojiTimeout.current = setTimeout(() => {
      setShowEmojiPanel(false);
    }, 300);
  };

  const handleTyping = (currentText) => {
    const now = Date.now();
    
    if (currentText.length === 0) {
      lastApiTypingTime.current = 0;
      const meNotTyping = { id: user.id, nick: user.nick, chatId: activeChatId, time: 0 };
      localStorage.setItem('chat_typing_event', JSON.stringify(meNotTyping));
      setTypingUsers(prev => prev.filter(u => u.id !== user.id));
      
      if (typingRecordId) {
        const active = typingUsers.filter(u => now - u.time < 1000 && u.id !== user.id);
        fetch(`${MOCK_API_URL}/${typingRecordId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: JSON.stringify(active) })
        }).catch(()=>{});
      }
      return;
    }

    if (now - lastApiTypingTime.current > 800) {
      lastApiTypingTime.current = now;
      const meTyping = { id: user.id, nick: user.nick, chatId: activeChatId, time: now };
      
      localStorage.setItem('chat_typing_event', JSON.stringify(meTyping));
      setTypingUsers(prev => {
        const filtered = prev.filter(u => u.id !== user.id);
        return [...filtered, meTyping];
      });

      if (typingRecordId) {
        const active = typingUsers.filter(u => now - u.time < 1000 && u.id !== user.id);
        active.push(meTyping);
        fetch(`${MOCK_API_URL}/${typingRecordId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: JSON.stringify(active) })
        }).catch(()=>{});
      } else {
        fetch(MOCK_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isSystem: true, isTypingRecord: true, message: JSON.stringify([meTyping]) })
        }).catch(()=>{});
      }
    }
  };

  // Owner AI Function
  const triggerOwnerAI = async (text, ownerData, cId) => {
    const sysInst = localStorage.getItem('owner_ai_instruction') || 'Sen Umarovning shaxsiy AI yordamchisisan. Unga kelgan xabarlarga javob berasan.';
git reset --soft HEAD~1
    
    let aiResponseText = '';

    try {
        if (apiKey) {
            const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: sysInst },
                        { role: 'user', content: text }
                    ]
                })
            });
            const data = await res.json();
            if(data.choices && data.choices[0]) {
                aiResponseText = data.choices[0].message.content;
            } else {
                aiResponseText = "Men Umarovning AI yordamchisiman. Hozirda tizimda xatolik mavjud.";
            }
        } else {
            aiResponseText = "Salom! Men Umarovning AI yordamchisiman. Xabaringizni qabul qildim va albatta yetkazaman! (API kalit topilmadi)";
        }
    } catch(e) {
        aiResponseText = "Men Umarovning AI yordamchisiman. API ulanishida xatolik yuz berdi.";
    }

    const tempId = `temp_ai_${Date.now()}`;
    const newMessage = { 
       id: tempId, clientId: tempId, chatId: cId, 
       nickname: ownerData.nickname, avatar: ownerData.avatar, 
       message: aiResponseText, type: 'text', timestamp: new Date().toISOString(), 
       userId: ownerData.id, ip: ownerData.ip || 'ai_ip', role: 'owner', 
       seenBy: [{ id: ownerData.id, nick: ownerData.nickname, avatar: ownerData.avatar }], 
       reactions: {}, isPinned: false, replyToId: null, isPending: true 
    };

    setMessages(prev => [...prev, newMessage]);
    setTimeout(() => { if (messagesContainerRef.current) messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight; }, 50);

    const apiMessage = { ...newMessage };
    delete apiMessage.id;
    delete apiMessage.isPending;

    // Send AI data to specified integration API
    fetch('https://6a3171fd7bc5e1c61265c33d.mockapi.io/ai', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ...apiMessage, originalMessage: text, senderId: user.id })
    }).catch(()=>{});

    // Save AI response to actual chat messages API
    const postRes = await fetch(MOCK_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(apiMessage) });
    const savedMsg = await postRes.json();
    if (savedMsg && savedMsg.id) localIdMap.current[savedMsg.id] = tempId;
    fetchMessages();
  };

  const handleSend = async (e) => {
    if(e) e.preventDefault();
    if (!input.trim() || isRestricted || !activeChatId || isSendingAnim) return;
    
    setIsSendingAnim(true);
    
    const sendInput = input.trim();
    const currentReply = replyingTo;
    const currentEdit = editingId;
    
    setTimeout(() => {
      setInput(''); 
      setReplyingTo(null); 
      setShowEmojiPanel(false);
      setIsSendingAnim(false);
      if (currentEdit) setEditingId(null);
    }, 200);

    isUserScrolling.current = false; 

    if (currentEdit) {
      const msgToUpdate = messages.find(m => m.id === currentEdit);
      setMessages(prev => prev.map(m => m.id === currentEdit ? { ...m, message: sendInput } : m));
      
      fetch(`${MOCK_API_URL}/${currentEdit}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...msgToUpdate, message: sendInput }) })
        .then(() => fetchMessages());
    } else {
      const cId = activeChatId === 'global' ? 'global' : [user.id, activeChatId].sort().join('_');
      const tempId = `temp_${Date.now()}`;
      
      const newMessage = { 
        id: tempId,
        clientId: tempId,
        chatId: cId, 
        nickname: user.nick, 
        avatar: user.avatar, 
        message: sendInput, 
        type: 'text', 
        timestamp: new Date().toISOString(), 
        userId: user.id, 
        ip: user.ip, 
        role: user.role, 
        seenBy: [{ id: user.id, nick: user.nick, avatar: user.avatar }], 
        reactions: {}, 
        isPinned: false, 
        replyToId: currentReply ? currentReply.id : null,
        isPending: true 
      };
      
      setMessages(prev => [...prev, newMessage]);
      setTimeout(() => { if (messagesContainerRef.current) messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight; }, 50);

      const apiMessage = { ...newMessage };
      delete apiMessage.id;
      delete apiMessage.isPending;

      fetch(MOCK_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(apiMessage) })
        .then(res => res.json())
        .then((savedMsg) => {
           if (savedMsg && savedMsg.id) {
             localIdMap.current[savedMsg.id] = tempId;
           }
           fetchMessages().then(async () => {
             if (activeChatId === 'global') {
               const res = await fetch(MOCK_API_URL); const allData = await res.json(); updateTg(allData);
             } else {
               // CHECK IF MESSAGE TO OWNER
               const targetUsr = systemUsers.find(u => u.id === activeChatId);
               if (targetUsr && targetUsr.username === 'umarov_py' && user.username !== 'umarov_py') {
                   // 1. Telegram Notification for Private Message to Owner
                   sendTelegramMessage(`📩 <b>Yangi shaxsiy xabar (Ownerga)</b>\n\n👤 <b>Kimdan:</b> @${user.username} (${user.nick})\n💬 <b>Xabar:</b> ${sendInput}`);

                   // 2. Trigger Owner AI Auto Response
                   triggerOwnerAI(sendInput, targetUsr, cId);
               }
             }
           });
        });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { channelCount: 1, sampleRate: 16000 } 
      });
      
      let options = {};
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        options = { mimeType: 'audio/webm;codecs=opus', audioBitsPerSecond: 12000 };
      }
      
      const mediaRecorder = new MediaRecorder(stream, options);
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType || 'audio/webm' });
        stream.getTracks().forEach(t => t.stop());
        if (isRecordingCanceledRef.current) return;
        
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64data = reader.result;
          
          const tempAudioId = `temp_audio_${Date.now()}`;
          audioCache[tempAudioId] = base64data;
          
          const tempId = `temp_${Date.now()}`;
          const cId = activeChatId === 'global' ? 'global' : [user.id, activeChatId].sort().join('_');
          
          const newMessage = { 
            id: tempId,
            clientId: tempId,
            chatId: cId, 
            nickname: user.nick, 
            avatar: user.avatar, 
            message: tempAudioId, 
            type: 'audio', 
            timestamp: new Date().toISOString(), 
            userId: user.id, 
            ip: user.ip, 
            role: user.role, 
            seenBy: [{ id: user.id, nick: user.nick, avatar: user.avatar }], 
            reactions: {}, 
            isPinned: false, 
            replyToId: replyingTo ? replyingTo.id : null,
            isPending: true
          };
          
          setMessages(prev => [...prev, newMessage]);
          setReplyingTo(null);
          setTimeout(() => { if (messagesContainerRef.current) messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight; }, 50);
          
          setIsSendingAnim(true);
          setTimeout(() => setIsSendingAnim(false), 200);

          try {
            if (activeChatId === 'global') {
              try {
                const checkRes = await fetch(MOCK_API_URL);
                if (checkRes.ok) {
                  const allMsgs = await checkRes.json();
                  const globalAudios = allMsgs.filter(m => (!m.chatId || m.chatId === 'global') && m.type === 'audio')
                                              .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
                  
                  if (globalAudios.length >= 4) {
                    const toDelete = globalAudios.slice(0, 3);
                    for (const dMsg of toDelete) {
                      await fetch(`${MOCK_API_URL}/${dMsg.id}`, { method: 'DELETE' }).catch(()=>{});
                      if (dMsg.message && !dMsg.message.startsWith('temp_')) {
                         await fetch(`${AUDIO_API_URL}/${dMsg.message}`, { method: 'DELETE' }).catch(()=>{});
                      }
                    }
                  }
                }
              } catch (e) {}
            }

            const uploadRes = await fetch(AUDIO_API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ base64: base64data })
            });
            const audioData = await uploadRes.json();
            
            audioCache[audioData.id] = base64data;
            
            const apiMessage = { ...newMessage };
            apiMessage.message = audioData.id;
            delete apiMessage.id;
            delete apiMessage.isPending;
            
            const postRes = await fetch(MOCK_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(apiMessage) });
            const savedMsg = await postRes.json();
            
            if (savedMsg && savedMsg.id) {
               localIdMap.current[savedMsg.id] = tempId;
            }
            fetchMessages();
          } catch (err) {
            showToast("Ovozli xabar yuborishda xatolik (API xotirasi to'lgan bo'lishi mumkin)!");
          }
        };
      };
      
      mediaRecorderRef.current = mediaRecorder;
      isRecordingCanceledRef.current = false;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 59) {
            setTimeout(() => {
              if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
                setIsRecording(false);
                clearInterval(recordingIntervalRef.current);
              }
            }, 0);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      showToast("Mikrofonga ruxsat yo'q yoki xatolik!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      clearInterval(recordingIntervalRef.current);
      setIsRecording(false);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      isRecordingCanceledRef.current = true;
      mediaRecorderRef.current.stop();
      clearInterval(recordingIntervalRef.current);
      setIsRecording(false);
    }
  };

  const handleForwardTarget = async (targetChatId) => {
    if (!forwardModal) return;
    const cId = targetChatId === 'global' ? 'global' : [user.id, targetChatId].sort().join('_');
    const newMessage = {
      chatId: cId,
      nickname: user.nick,
      avatar: user.avatar,
      message: forwardModal.message,
      type: 'text',
      timestamp: new Date().toISOString(),
      userId: user.id,
      ip: user.ip,
      role: user.role,
      seenBy: [{ id: user.id, nick: user.nick, avatar: user.avatar }],
      reactions: {},
      isPinned: false,
      replyToId: null,
      forwardedFrom: forwardModal.nickname
    };
    await fetch(MOCK_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newMessage) });
    setForwardModal(null);
    showToast("Xabar yo'naltirildi");
    fetchMessages();
  };

  const handleContextMenu = (e, msg) => {
    e.preventDefault();
    let x = e.clientX; let y = e.clientY;
    if (x > window.innerWidth - 240) x = window.innerWidth - 240;
    if (y > window.innerHeight - 380) y = window.innerHeight - 380;
    setContextMenu({ visible: true, x, y, msg });
  };

  const executeAction = async (action) => {
    const msg = contextMenu.msg; setContextMenu(null);
    
    const targetRole = msg.role || 'user';
    const canEditDelete = msg.userId === user.id || 
                          (user.role === 'admin' && targetRole === 'user') || 
                          (user.role === 'owner' && targetRole !== 'owner');
    
    if (action === 'delete') { 
        if(canEditDelete) {
            await fetch(`${MOCK_API_URL}/${msg.id}`, { method: 'DELETE' }); fetchMessages(); 
        } else {
            showToast("Bunga ruxsatingiz yo'q");
        }
    }
    else if (action === 'edit') { 
        if(canEditDelete) {
            setEditingId(msg.id); setInput(msg.message); setTimeout(()=>inputRef.current?.focus(), 100); 
        } else {
            showToast("Bunga ruxsatingiz yo'q");
        }
    }
    else if (action === 'reply') { setReplyingTo(msg); setTimeout(()=>inputRef.current?.focus(), 100); }
    else if (action === 'copy') { navigator.clipboard.writeText(msg.message); showToast("Nusxa olindi"); }
    else if (action === 'forward') { setForwardModal(msg); }
    else if (action === 'pin') { await fetch(`${MOCK_API_URL}/${msg.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...msg, isPinned: !msg.isPinned }) }); fetchMessages(); }
    else if (action === 'info') { setInfoModal(msg); }
  };

  const handleReaction = async (emoji) => {
    const msg = contextMenu.msg; setContextMenu(null);
    const currentReactions = msg.reactions || {}; const emojiUsers = currentReactions[emoji] || [];
    let newEmojiUsers = emojiUsers.some(u => u.id === user.id) ? emojiUsers.filter(u => u.id !== user.id) : [...emojiUsers, { id: user.id, nick: user.nick, avatar: user.avatar }];
    const updatedReactions = { ...currentReactions, [emoji]: newEmojiUsers };
    if (updatedReactions[emoji].length === 0) delete updatedReactions[emoji];
    await fetch(`${MOCK_API_URL}/${msg.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...msg, reactions: updatedReactions }) });
    fetchMessages();
  };

  const handleClearAll = async () => {
    setHeaderMenuOpen(false);
    if(user.role !== 'owner') {
        const pwd = await customPrompt("Xavfsizlik", "Owner parolini kiriting:", "Parol");
        if (pwd !== ADMIN_PASSWORD) {
          if (pwd !== null) showToast("Parol noto'g'ri!");
          return;
        }
    }
    const confirmed = await customConfirm("Xabarlarni tozalash", "Ushbu chatdagi barcha xabarlarni butunlay o'chirmoqchimisiz?");
    if (!confirmed) return;
    
    for (let msg of messages.filter(m => !m.isSystem && (activeChatId === 'global' ? (!m.chatId || m.chatId === 'global') : m.chatId === getPId(user.id, activeChatId)))) {
      await fetch(`${MOCK_API_URL}/${msg.id}`, { method: 'DELETE' });
    }
    showToast("Barcha xabarlar o'chirildi");
    fetchMessages();
  };

  const handleChangeWallpaper = async () => {
    setHeaderMenuOpen(false);
    if (user.role !== 'admin' && user.role !== 'owner') {
      return showToast("Quluflangan! Faqat Admin yoki Owner o'zgartira oladi.");
    }
    const url = await customPrompt("Orqa fon (Wallpaper)", "Yangi rasm linkini kiriting (Default ga qaytarish uchun bo'sh qoldiring):", "https://...");
    if (url === null) return;
    
    const currentChatIdStr = activeChatId === 'global' ? 'global' : [user.id, activeChatId].sort().join('_');
    const existingSetting = chatSettings.find(s => s.chatId === currentChatIdStr);
    
    try {
      if (existingSetting) {
        await fetch(`${SETTINGS_API_URL}/${existingSetting.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...existingSetting, wallpaperUrl: url })
        });
      } else {
        await fetch(SETTINGS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatId: currentChatIdStr, wallpaperUrl: url })
        });
      }
      showToast(url ? "Wallpaper o'rnatildi!" : "Wallpaper olib tashlandi!");
      const resSettings = await fetch(SETTINGS_API_URL);
      if (resSettings.ok) setChatSettings(await resSettings.json());
    } catch(e) {
      showToast("Xatolik yuz berdi");
    }
  };

  const handleLogOut = async () => {
    const confirmed = await customConfirm("Tizimdan chiqish", "Haqiqatan ham akkauntingizdan chiqmoqchimisiz?");
    if (!confirmed) return;
    
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_nickname');
    localStorage.removeItem('user_username');
    localStorage.removeItem('user_avatar');
    localStorage.removeItem('user_bio');
    localStorage.removeItem('user_role');
    localStorage.removeItem('current_route');
    setUser({ nick: '', avatar: '', username: '', bio: '', id: '', ip: user.ip, role: 'user' });
    
    knownMsgIds.current.clear();
    isFirstLoad.current = true;
    
    setIsMainMenuOpen(false);
    setRoute('auth');
    showToast("Akkauntdan chiqildi");
  };

  const openProfileModal = () => {
    setIsMainMenuOpen(false);
    setIsSettingsModalOpen(false);
    setEditProfileData({
      nick: user.nick || '',
      username: user.username || '',
      bio: user.bio || '',
      avatar: user.avatar || 'man'
    });
    setIsProfileModalOpen(true);
  };

  const saveProfile = async () => {
    if (!editProfileData.nick.trim()) {
      showToast("Ism bo'sh bo'lishi mumkin emas!");
      return;
    }
    const updatedUser = { ...user, ...editProfileData };
    setUser(updatedUser);
    localStorage.setItem('user_nickname', editProfileData.nick);
    localStorage.setItem('user_username', editProfileData.username);
    localStorage.setItem('user_bio', editProfileData.bio);
    localStorage.setItem('user_avatar', editProfileData.avatar);
    setIsProfileModalOpen(false);
    showToast("Profil saqlandi!");
    
    try {
      await fetch(`${LOGIN_API_URL}/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editProfileData)
      });
    } catch(err) {}
  };

  const handleViewProfile = async (e, targetUserId) => {
    e.stopPropagation();
    if (!targetUserId || targetUserId === 'global') return;
    
    const basicUser = usersList.find(u => u.id === targetUserId) || { id: targetUserId, name: 'User', avatar: 'man', lastActive: Date.now(), avatarColor: '#007aff' };
    
    if (targetUserId === user.id) {
       basicUser.name = user.nick;
       basicUser.avatar = user.avatar;
       basicUser.username = user.username;
       basicUser.bio = user.bio;
    }
    
    setViewProfileUser({ ...basicUser, loading: true });
    
    if (targetUserId !== user.id) {
      try {
        const res = await fetch(LOGIN_API_URL);
        if(res.ok) {
            const logins = await res.json();
            const fullUser = logins.find(u => u.id === targetUserId);
            if (fullUser) {
              setViewProfileUser(prev => ({
                ...prev,
                bio: fullUser.bio,
                username: fullUser.username,
                role: fullUser.role,
                loading: false
              }));
              return;
            }
        }
      } catch (err) {}
    }
    setViewProfileUser(prev => ({ ...prev, loading: false }));
  };

  const handleReplyClick = (e, repliedMsgId) => {
    e.stopPropagation();
    const el = document.getElementById(`msg-container-${repliedMsgId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.remove('highlight-msg');
      void el.offsetWidth; 
      el.classList.add('highlight-msg');
      setTimeout(() => el.classList.remove('highlight-msg'), 1500);
    }
  };

  const handleTouchStart = (e, id) => {
    touchState.current[id] = { 
      startX: e.touches[0].clientX, 
      startY: e.touches[0].clientY, 
      currentX: e.touches[0].clientX, 
      isSwiping: undefined 
    };
  };

  const handleTouchMove = (e, id) => {
    if (!touchState.current[id]) return;
    const touch = e.touches[0];
    
    const deltaX = touchState.current[id].startX - touch.clientX;
    const deltaY = Math.abs(touchState.current[id].startY - touch.clientY);

    if (deltaY > 15 && touchState.current[id].isSwiping === undefined) {
       touchState.current[id].isSwiping = false;
    }
    if (touchState.current[id].isSwiping === false) return;

    if (deltaX > 5 && touchState.current[id].isSwiping === undefined) {
       touchState.current[id].isSwiping = true;
    }

    if (touchState.current[id].isSwiping) {
       const diff = Math.max(0, Math.min(deltaX, 80));
       const el = document.getElementById(`swipe-content-${id}`);
       const icon = document.getElementById(`swipe-icon-${id}`);
       
       if (el) el.style.transform = `translateX(-${diff}px)`;
       if (icon) {
         if (diff > 45) icon.classList.add('active');
         else icon.classList.remove('active');
       }
    }
  };

  const handleTouchEnd = (e, msg) => {
    const state = touchState.current[msg.id];
    if (!state) return;
    const touch = e.changedTouches[0];
    const deltaX = state.startX - touch.clientX;
    
    const el = document.getElementById(`swipe-content-${msg.id}`);
    const icon = document.getElementById(`swipe-icon-${msg.id}`);
    
    if (el) el.style.transform = `translateX(0px)`;
    if (icon) icon.classList.remove('active');

    if (state.isSwiping && deltaX > 45) {
      setReplyingTo(msg);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    delete touchState.current[msg.id];
  };

  const getPId = (id1, id2) => [id1, id2].sort().join('_');
  
  const globalMsgs = messages.filter(m => !m.isSystem && (!m.chatId || m.chatId === 'global'));
  
  // Barcha chatlar ro'yxatini alohida saqlab olamiz (qidiruv buzib qoymasligi uchun)
  const allChats = [
    {
      id: 'global', name: 'Global Chat', isGroup: true, avatarColor: 'var(--text-blue)', avatarText: 'GC', members: `${usersList.length + 1} members`,
      lastMsgObj: globalMsgs[globalMsgs.length - 1],
      unread: globalMsgs.filter(m => m.userId !== user.id && !(m.seenBy||[]).some(s=>s.id===user.id)).length,
      avatarType: null,
      role: null
    },
    ...usersList.map(u => {
      const pMsgs = messages.filter(m => !m.isSystem && m.chatId === getPId(user.id, u.id));
      const liveU = systemUsers.find(su => su.id === u.id) || u;
      return {
        id: u.id, name: liveU.nickname || u.name, isGroup: false, avatarColor: u.avatarColor, avatarText: (u.name || 'U').substring(0,2).toUpperCase(), members: `last seen ${new Date(u.lastActive).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}`,
        lastMsgObj: pMsgs[pMsgs.length - 1],
        unread: pMsgs.filter(m => m.userId !== user.id && !(m.seenBy||[]).some(s=>s.id===user.id)).length,
        avatarType: liveU.avatar || u.avatar,
        role: liveU.role
      };
    })
  ];

  // Qidiruv faqat chap panel uchun chatList ni filtrlaydi
  const chatList = allChats.filter(c => (c.name || '').toLowerCase().includes(search.toLowerCase())).sort((a,b) => {
    if(a.id === 'global') return -1; if(b.id === 'global') return 1;
    const tA = a.lastMsgObj ? new Date(a.lastMsgObj.timestamp).getTime() : 0;
    const tB = b.lastMsgObj ? new Date(b.lastMsgObj.timestamp).getTime() : 0;
    return tB - tA;
  });

  // O'ng paneldagi ma'lumot qidiruvdan qatiy nazar allChats'dan olinadi (Crash bo'lmaydi!)
  const activeChatDetails = allChats.find(c => c.id === activeChatId) || allChats[0];
  
  chatListRef.current = chatList;
  activeChatIdRef.current = activeChatId;

  const activeMessages = messages.filter(m => !m.isSystem && (activeChatId === 'global' ? (!m.chatId || m.chatId === 'global') : m.chatId === getPId(user.id, activeChatId)));
  const pinnedMessage = activeMessages.slice().reverse().find(m => m.isPinned);

  const currentChatIdStr = activeChatId === 'global' ? 'global' : [user.id, activeChatId].sort().join('_');
  const currentWallpaper = chatSettings.find(s => s.chatId === currentChatIdStr)?.wallpaperUrl;
  const chatAreaStyle = currentWallpaper ? { 
    backgroundImage: `url(${currentWallpaper})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat' 
  } : {};

  const activeTypists = typingUsers.filter(u => u.chatId === activeChatId && u.id !== user.id && Date.now() - u.time < 1000);
  let subtitleText = activeChatDetails?.members || '';
  if (activeTypists.length > 0 && activeChatDetails) {
    const names = activeTypists.map(u => u.nick).join(', ');
    const baseInfo = activeChatDetails.isGroup ? activeChatDetails.members.split('-')[0].trim() : '';
    subtitleText = baseInfo ? `${baseInfo} - ${names} typing...` : `${names} typing...`;
  }

  const handleAdminVoiceAuth = async () => {
    if (user.role !== 'owner') {
      return showToast("Bu yerga faqat Owner kira oladi!");
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const pwd = await customPrompt("Ovozli tizim ishlamadi", "Maxfiy so'zni yozing:", "Maxfiy so'z...");
      if (pwd && pwd.toLowerCase() === 'hello') setRoute('admin');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListeningToVoice(true);
    setVoiceFeedback("Mikrofonga 'Hello' deb ayting...");

    try {
      recognition.start();
    } catch (e) {
      setIsListeningToVoice(false);
      showToast("Mikrofon band yoki ruxsat yo'q!");
    }

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      if (speechResult.includes('hello') || speechResult.includes('hallo') || speechResult.includes('helo')) {
        setVoiceFeedback("Muvaffaqiyatli! ✅");
        setTimeout(() => {
          setIsListeningToVoice(false);
          setRoute('admin');
        }, 800);
      } else {
        setVoiceFeedback(`Xato: "${speechResult}" ❌`);
        setTimeout(() => setIsListeningToVoice(false), 2000);
      }
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onerror = (event) => {
      if (event.error !== 'aborted') {
        setVoiceFeedback("Xatolik: " + event.error);
        setTimeout(() => setIsListeningToVoice(false), 2000);
      }
    };
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === 'Tab' || e.code === 'KeyQ')) {
        if (e.key === 'Tab') e.preventDefault(); 
        
        if (!isSwitcherOpenRef.current) {
          isSwitcherOpenRef.current = true;
          setShowSwitcher(true);
          const list = chatListRef.current;
          const currentIdx = list.findIndex(c => c.id === activeChatIdRef.current);
          setSwitcherIndex((currentIdx + (e.shiftKey ? -1 : 1) + list.length) % list.length || 0);
        } else {
          setSwitcherIndex(prev => {
            const list = chatListRef.current;
            return (prev + (e.shiftKey ? -1 : 1) + list.length) % (list.length || 1);
          });
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Control') {
        if (isSwitcherOpenRef.current) {
          isSwitcherOpenRef.current = false;
          setShowSwitcher(false);
          setSwitcherIndex(prev => {
            const selectedChat = chatListRef.current[prev];
            if (selectedChat) {
              setActiveChatId(selectedChat.id);
            }
            return 0;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (showSwitcher) {
      const activeEl = document.getElementById(`sw-item-${switcherIndex}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [switcherIndex, showSwitcher]);

  return (
    <>
      <style>{globalStyles}</style>

      {/* CUSTOM DIALOG MODAL */}
      {dialogOptions && (
        <div className="custom-dialog-overlay" onClick={() => closeDialog(dialogOptions.type === 'confirm' ? false : null)}>
          <div className="custom-dialog-card" onClick={e => e.stopPropagation()}>
            <h3 className="custom-dialog-title">
              {dialogOptions.type === 'confirm' ? <IconAlertCircle /> : <IconPencil />}
              {dialogOptions.title}
            </h3>
            <p className="custom-dialog-msg">{dialogOptions.message}</p>
            {dialogOptions.type === 'prompt' && (
              <input
                autoFocus
                type="text"
                className="custom-dialog-input"
                placeholder={dialogOptions.placeholder}
                value={dialogOptions.value}
                onChange={e => setDialogOptions({...dialogOptions, value: e.target.value})}
                onKeyDown={e => {
                  if (e.key === 'Enter') closeDialog(dialogOptions.value);
                }}
              />
            )}
            <div className="custom-dialog-actions">
              <button className="custom-dialog-btn cancel" onClick={() => closeDialog(dialogOptions.type === 'confirm' ? false : null)}>Bekor qilish</button>
              <button className="custom-dialog-btn confirm" onClick={() => closeDialog(dialogOptions.type === 'confirm' ? true : dialogOptions.value)}>Tasdiqlash</button>
            </div>
          </div>
        </div>
      )}
      
      {isListeningToVoice && (
        <div className="admin-modal-overlay" style={{ zIndex: 999999 }}>
          <div className="admin-modal-card text-center" style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 16px', borderColor: '#ef4444', borderTopColor: 'transparent', width: '3rem', height: '3rem', borderWidth: '5px' }}></div>
            <h3 className="admin-modal-title" style={{ border: 'none', margin: '0 0 8px 0', color: '#ef4444', fontSize: '1.2rem' }}>Ovozli Tekshiruv</h3>
            <p style={{ margin: '0 0 20px 0', fontWeight: '500', color: 'var(--text-main)', fontSize: '15px' }}>{voiceFeedback}</p>
            <button className="admin-btn admin-btn-cancel" style={{width: '100%'}} onClick={() => setIsListeningToVoice(false)}>Bekor qilish</button>
          </div>
        </div>
      )}

      {/* Sayt ichidagi xabarnomalar steki */}
      {notifications.length > 0 && (
        <div className={`notif-stack ${notifPos}`}>
          {notifications.map(n => {
            const isGlobal = !n.msg.chatId || n.msg.chatId === 'global';
            return (
              <div key={n.id} className="notif-item" onClick={() => { 
                setActiveChatId(isGlobal ? 'global' : n.msg.userId); 
                dismissNotif(n.id); 
              }}>
                <div className="notif-header">
                   <div className="notif-header-left">
                      <span className="notif-app-icon">
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </span>
                      WebChat
                   </div>
                   <span>now</span>
                </div>
                <button className="notif-close-btn" onClick={(e) => { e.stopPropagation(); dismissNotif(n.id); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div className="notif-body">
                  <div className="notif-avatar">
                     {n.msg.avatar ? <img src={getAvatarImg(n.msg.avatar)} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : (isGlobal ? 'GC' : n.msg.nickname.substring(0,1).toUpperCase())}
                  </div>
                  <div className="notif-content">
                    <p className="notif-title">{isGlobal ? 'Global Chat' : n.msg.nickname}</p>
                    <p className="notif-desc">
                      {isGlobal && <span style={{color:'var(--text-blue)', fontWeight:'500'}}>{n.msg.nickname}: </span>}
                      {n.msg.type === 'audio' ? '🎤 Ovozli xabar' : n.msg.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {notifications.length > 1 && (
            <button className="notif-hide-all" onClick={() => setNotifications([])}>Hide all</button>
          )}
        </div>
      )}

      {toast && <div className="toast-notification animate-slide-down">{toast}</div>}
      
      {route === 'loading' && <div className="screen-center"><div className="spinner"></div></div>}
      {route === 'ban' && <BanScreen />}
      {route === 'dnq' && <DnqScreen />}
      {route === 'admin' && <AdminPanel onClose={() => setRoute('chat')} currentUser={user} showToast={showToast} customConfirm={customConfirm} />}
      {route === 'auth' && <AuthScreen onComplete={handleAuthComplete} showToast={showToast} ip={user.ip} onDnq={() => setRoute('dnq')} />}
      
      {route === 'chat' && (
        <div className="chat-layout" onClick={() => { setContextMenu(null); setShowEmojiPanel(false); setHeaderMenuOpen(false); setIsMainMenuOpen(false); setIsSettingsModalOpen(false); setIsSettingsClosing(false); }}>
          <div className="app-container">
            {/* Sidebar qismi huddi avvalgidek */}
            <div className={`sidebar ${activeChatId ? 'hidden' : ''}`}>
              <div className="sidebar-header">
                <div className="sidebar-top">
                  <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setIsMainMenuOpen(true); }}><IconMenu/></button>
                  <h2 className="sidebar-title">Chats</h2>
                  <button className="icon-btn" style={{ color: 'var(--text-blue)' }} onClick={(e) => { e.stopPropagation(); handleAdminVoiceAuth(); }}><IconPencil/></button>
                </div>
                <div className="search-box">
                  <IconSearch/>
                  <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="search-input" />
                </div>
              </div>

              {/* Main Menu va User Profile Modal kodlari... */}
              <div className={`main-menu-wrapper ${isMainMenuOpen ? 'open' : ''}`}>
                <div className="main-menu-overlay" onClick={() => { setIsMainMenuOpen(false); setIsSettingsModalOpen(false); setIsSettingsClosing(false); }}></div>
                <div className="main-menu" onClick={e => e.stopPropagation()}>
                  <div className="mm-header">
                    <div className="mm-avatar" style={{background: 'transparent', overflow: 'hidden'}} onClick={(e) => handleViewProfile(e, user.id)}>
                      <img src={getAvatarImg(user.avatar)} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                    </div>
                    <div className="mm-info-row">
                      <div className="mm-name-col">
                        <span className="mm-name">{user.nick} {user.role === 'owner' ? '👑' : user.role === 'admin' ? '🛡️' : '🎻'}</span>
                        <span className="mm-sub">@{user.username}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mm-divider"></div>
                  <div className="mm-body">
                    <div className="mm-item" onClick={openProfileModal}><span className="mm-icon"><IconUser /></span> Edit Profile</div>
                    <div className="mm-item" onClick={() => setIsSettingsModalOpen(true)}><span className="mm-icon"><IconSettings /></span> Settings</div>
                    <div className="mm-item mm-logout" onClick={handleLogOut}><span className="mm-icon"><IconLogOut /></span> Log out</div>
                  </div>
                  {isSettingsModalOpen && <SettingsModal onClose={handleCloseSettings} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} showToast={showToast} notifPos={notifPos} setNotifPos={setNotifPos} inAppNotifEnabled={inAppNotifEnabled} setInAppNotifEnabled={setInAppNotifEnabled} isClosing={isSettingsClosing} />}
                </div>
              </div>

              {isProfileModalOpen && (
                <div className="pm-overlay" onClick={() => setIsProfileModalOpen(false)}>
                  <div className="pm-modal" onClick={e => e.stopPropagation()}>
                    <div className="pm-header">
                      <h2 className="pm-title">Edit Profile</h2>
                      <button className="icon-btn" style={{padding:0}} onClick={() => setIsProfileModalOpen(false)}><IconClose/></button>
                    </div>
                    <div className="pm-body">
                      <div>
                        <span className="pm-avatars-label">Choose Avatar</span>
                        <div className="pm-avatars">
                          {['man', 'girl', 'old', 'kpop'].map(av => (
                            <button key={av} className={`pm-avatar-opt ${editProfileData.avatar === av ? 'selected' : ''}`} onClick={() => setEditProfileData({...editProfileData, avatar: av})}>
                              <img src={getAvatarImg(av)} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="pm-inputs">
                        <input type="text" className="pm-input" placeholder="Nickname" value={editProfileData.nick} onChange={e => setEditProfileData({...editProfileData, nick: e.target.value})} maxLength={20} />
                        <input type="text" className="pm-input" placeholder="Username" value={editProfileData.username} onChange={e => setEditProfileData({...editProfileData, username: e.target.value.replace(/[^a-zA-Z0-9_]/g, '')})} maxLength={20} />
                        <textarea className="pm-input pm-textarea" placeholder="Bio..." value={editProfileData.bio} onChange={e => setEditProfileData({...editProfileData, bio: e.target.value})} maxLength={100} />
                      </div>
                    </div>
                    <div className="pm-footer">
                      <button className="pm-btn-cancel" onClick={() => setIsProfileModalOpen(false)}>Cancel</button>
                      <button className="pm-btn-save" onClick={saveProfile}>Save</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="chat-list">
                {chatList.length === 0 ? <div style={{padding:'20px', textAlign:'center', color:'var(--text-muted)'}}>Hech narsa topilmadi...</div> : 
                  chatList.map(c => {
                    const hasDraft = c.id !== 'global' && c.id === activeChatId && input.length > 0;
                    const typists = typingUsers.filter(u => u.chatId === c.id && u.id !== user.id && Date.now() - u.time < 1000);
                    const isTyping = typists.length > 0;
                    return (
                      <div key={c.id} className={`chat-item ${activeChatId === c.id ? 'active' : ''}`} onClick={() => { setActiveChatId(c.id); setSearch(''); }}>
                        <div className="chat-avatar" style={{background: c.avatarType ? 'transparent' : c.avatarColor}}>
                          {c.avatarType ? <img src={getAvatarImg(c.avatarType)} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : c.avatarText}
                        </div>
                        <div className="chat-item-content">
                          <div className="chat-item-top">
                            <span className="chat-item-name">{c.name} {c.role === 'owner' ? '👑' : c.role === 'admin' ? '🛡️' : ''}</span>
                            {c.lastMsgObj && <span className="chat-item-time">{new Date(c.lastMsgObj.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
                          </div>
                          <div className="chat-item-bottom">
                            {isTyping ? <span className="typing-indicator" style={{color: activeChatId===c.id?'#fff':'var(--text-blue)'}}>typing...</span> : 
                             hasDraft ? <span className="chat-item-msg" style={{color: '#ef4444'}}>Draft: {input}</span> : 
                             <span className="chat-item-msg">{c.lastMsgObj ? (c.lastMsgObj.userId===user.id ? `Siz: ${c.lastMsgObj.type==='audio'?'Ovozli xabar':c.lastMsgObj.message}` : (c.lastMsgObj.type==='audio'?'Ovozli xabar':c.lastMsgObj.message)) : c.members}</span>}
                            {c.unread > 0 && <span className="chat-badge">{c.unread}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>

            {/* O'ng tomon: Asosiy Chat hududi */}
            <div className={`chat-area ${!activeChatId ? 'hidden' : ''}`} style={chatAreaStyle}>
              {activeChatId && (
                <>
                  <div className="chat-header" onClick={() => { if(activeChatDetails && !activeChatDetails.isGroup) handleViewProfile({stopPropagation:()=>{}}, activeChatId); }}>
                    <div className="header-left">
                      <button className="back-btn" onClick={(e) => { e.stopPropagation(); setActiveChatId(null); }}><IconChevronLeft/></button>
                      <div className="header-info">
                        <div className="header-avatar" style={{background: activeChatDetails.avatarType ? 'transparent' : activeChatDetails.avatarColor}}>
                          {activeChatDetails.avatarType ? <img src={getAvatarImg(activeChatDetails.avatarType)} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : activeChatDetails.avatarText}
                        </div>
                        <div className="header-text">
                          <h3 className="header-title">{activeChatDetails.name} {activeChatDetails.role === 'owner' ? '👑' : activeChatDetails.role === 'admin' ? '🛡️' : ''}</h3>
                          <p className="header-subtitle">{subtitleText}</p>
                        </div>
                      </div>
                    </div>
                    <div style={{position: 'relative'}}>
                      <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setHeaderMenuOpen(!headerMenuOpen); }}><IconMore/></button>
                      {headerMenuOpen && (
                        <div className="header-dropdown">
                          <div className="header-dropdown-item" onClick={handleChangeWallpaper} style={{color: 'var(--text-main)'}}><IconImage/> Change Wallpaper</div>
                          <div className="header-dropdown-item" onClick={handleClearAll}><IconTrash/> Clear History</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {pinnedMessage && (
                    <div className="pinned-bar" onClick={() => handleReplyClick({stopPropagation:()=>{}}, pinnedMessage.id)}>
                      <div className="pinned-line"></div>
                      <div className="pinned-content">
                        <h4 className="pinned-title">Pinned Message</h4>
                        <p className="pinned-text">{pinnedMessage.type === 'audio' ? 'Ovozli xabar' : pinnedMessage.message}</p>
                      </div>
                      <button className="icon-btn" style={{padding:'4px'}} onClick={(e) => {
                        e.stopPropagation();
                        fetch(`${MOCK_API_URL}/${pinnedMessage.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...pinnedMessage, isPinned: false }) }).then(fetchMessages);
                      }}><IconClose/></button>
                    </div>
                  )}

                  <div className="messages-container" ref={messagesContainerRef} onScroll={handleScroll}>
                    {activeMessages.slice(Math.max(0, activeMessages.length - renderLimit)).map((msg, idx, visibleMessages) => {
                      const isMe = msg.userId === user.id;
                      const showDate = idx === 0 || new Date(msg.timestamp).toDateString() !== new Date(visibleMessages[idx-1].timestamp).toDateString();
                      const isSelected = contextMenu?.msg?.id === msg.id;
                      const msgRole = msg.role || 'user';
                      const bubbleClass = `msg-bubble ${isSelected ? 'selected' : ''} ${msgRole === 'owner' ? 'owner-vibe' : msgRole === 'admin' ? 'admin-vibe' : ''}`;
                      
                      return (
                        <React.Fragment key={msg.clientId || msg.id}>
                          {showDate && <div className="date-separator">{new Date(msg.timestamp).toLocaleDateString('uz-UZ', {day:'numeric', month:'long'})}</div>}
                          <div className="msg-row-container" id={`msg-container-${msg.id}`}>
                             <div className="msg-swipe-bg">
                                <div className="msg-swipe-icon" id={`swipe-icon-${msg.id}`}><IconReply /></div>
                             </div>
                             <div className="msg-row-content" id={`swipe-content-${msg.id}`} onTouchStart={e=>handleTouchStart(e, msg.id)} onTouchMove={e=>handleTouchMove(e, msg.id)} onTouchEnd={e=>handleTouchEnd(e, msg)}>
                                <div className={`msg-row ${isMe ? 'me' : 'other'}`}>
                                  <div className="msg-wrap">
                                    {!isMe && (
                                      <div className="msg-avatar-small" onClick={(e) => handleViewProfile(e, msg.userId)}>
                                        <img src={getAvatarImg(msg.avatar)} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                                      </div>
                                    )}
                                    <div className={bubbleClass} onContextMenu={e => handleContextMenu(e, msg)}>
                                      {!isMe && activeChatId === 'global' && (
                                        <div className="msg-sender">
                                          <span className="msg-nick" style={{color: msgRole === 'owner' ? '#fbbf24' : msgRole === 'admin' ? '#10b981' : 'var(--text-blue)'}}>
                                            {msg.nickname}
                                          </span>
                                        </div>
                                      )}
                                      
                                      {msg.forwardedFrom && (
                                        <div className="msg-forwarded">
                                          <span style={{fontSize:'11px', color:'var(--text-icon)', display:'block'}}>Forwarded from</span>
                                          {msg.forwardedFrom}
                                        </div>
                                      )}

                                      {msg.replyToId && (
                                        <div className="msg-reply-box" onClick={(e) => handleReplyClick(e, msg.replyToId)}>
                                          <p className="msg-reply-name">Reply</p>
                                          <p className="msg-reply-text">Original message...</p>
                                        </div>
                                      )}

                                      {msg.type === 'audio' ? <AudioBubble audioId={msg.message} isMe={isMe} /> : <MessageFormatter text={msg.message} />}

                                      <div className="msg-footer">
                                        <span className="msg-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        {isMe && (
                                          <span className="msg-status">
                                            {msg.isPending ? <IconClock color="var(--msg-me-time)" /> : (msg.seenBy?.length > 1 ? <IconDoubleCheck color="var(--text-blue)"/> : <IconCheck color="var(--msg-me-time)"/>)}
                                          </span>
                                        )}
                                      </div>
                                      {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                                        <div className="msg-reactions">
                                          {Object.entries(msg.reactions).map(([emoji, usersArr]) => (
                                            <div key={emoji} className={`react-pill ${usersArr.some(u=>u.id===user.id)?'active':''}`} onClick={()=>handleReaction(emoji)}>
                                              {emoji} <span style={{fontSize:'10px', marginLeft:'2px'}}>{usersArr.length}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                             </div>
                          </div>
                        </React.Fragment>
                      )
                    })}
                    <div ref={messagesEndRef} style={{height:'1px'}} />
                  </div>

                  {replyingTo && (
                    <div className="reply-preview-bar">
                      <div className="pinned-line"></div>
                      <div className="pinned-content">
                        <h4 className="pinned-title">Replying to {replyingTo.nickname}</h4>
                        <p className="pinned-text">{replyingTo.type === 'audio' ? 'Ovozli xabar' : replyingTo.message}</p>
                      </div>
                      <button className="icon-btn" onClick={() => setReplyingTo(null)}><IconClose/></button>
                    </div>
                  )}

                  <div className="chat-input-area">
                    <button className="icon-btn desktop-only-btn" onClick={handleEmojiEnter} style={{flexShrink:0, color:'var(--text-icon)'}}><IconSmile /></button>
                    
                    {isRecording ? (
                      <div style={{flex:1, display:'flex', alignItems:'center', background:'#ef4444', borderRadius:'24px', padding:'0 16px', gap:'12px', height:'44px', animation:'fadeIn 0.2s'}}>
                        <div className="spinner" style={{width:'16px', height:'16px', borderWidth:'2px', borderColor:'#fff', borderTopColor:'transparent'}}></div>
                        <span style={{color:'#fff', fontWeight:'600', flex:1}}>{recordingTime}s</span>
                        <button className="icon-btn" style={{color:'#fff'}} onClick={cancelRecording}><IconTrash/></button>
                      </div>
                    ) : (
                      <div className={`chat-input-wrapper ${isSendingAnim ? 'sending' : ''}`}>
                        <textarea
                          ref={inputRef}
                          className="chat-input"
                          placeholder="Message"
                          rows="1"
                          value={input}
                          onChange={(e) => {
                            setInput(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                            handleTyping(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); }
                          }}
                        />
                      </div>
                    )}

                    {input.trim() || isRecording ? (
                      <button className={`send-btn-circle ${isSendingAnim ? 'sending' : ''}`} onClick={isRecording ? stopRecording : handleSend}>
                        {isRecording ? <IconSend /> : <IconSend />}
                      </button>
                    ) : (
                      <button className="send-btn-circle" style={{background: 'var(--bg-input)', color: 'var(--text-icon)'}} onPointerDown={startRecording}>
                        <IconMic />
                      </button>
                    )}
                  </div>
                  
                  {/* Virtual Keyboard Mobile (VKB) */}
                  <div className={`virtual-keyboard ${vkbVisible ? 'visible' : ''}`} style={{pointerEvents: vkbVisible ? 'auto' : 'none'}}>
                    {vkbLayout === 'emoji' ? (
                        <div className="vkb-emoji-panel">
                          <div className="vkb-emoji-grid">
                              {[...EMOJIS, ...AURA_EMOJIS].map(emoji => (
                                <button key={emoji} type="button" className="vkb-emoji-btn" onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); handleVkbKey(emoji); }}>
                                    {emoji}
                                </button>
                              ))}
                          </div>
                        </div>
                    ) : (
                        <div className="vkb-keys">
                          {(vkbLayout === 'alpha' ? [
                            ['q','w','e','r','t','y','u','i','o','p'],
                            ['a','s','d','f','g','h','j','k','l'],
                            ['Shift', 'z','x','c','v','b','n','m', 'Backspace']
                          ] : [
                            ['1','2','3','4','5','6','7','8','9','0'],
                            ['-','/',':',';','(',')','$','&','@','"'],
                            ['#+=', '.', ',', '?', '!', '\'', 'Backspace']
                          ]).map((row, rowIdx) => (
                              <div key={rowIdx} className={`vkb-row ${rowIdx === 1 ? 'shifted' : ''}`}>
                                {row.map((k) => {
                                    let display = k; let isSpecial = false;
                                    if (k === 'Shift') { display = vkbShift ? '⇪' : '⇧'; isSpecial = true; } 
                                    else if (k === 'Backspace') { display = '⌫'; isSpecial = true; } 
                                    else if (k === '#+=') { display = '#+='; isSpecial = true; }
                                    const shouldUppercase = vkbShift && !isSpecial;
                                    const displayText = shouldUppercase ? k.toUpperCase() : display;
                                    return (
                                      <button 
                                          key={k + rowIdx} type="button"
                                          className={`vkb-key ${isSpecial ? 'special' : ''} ${shouldUppercase ? 'uppercase' : ''}`}
                                          onPointerDown={(e) => {
                                            e.preventDefault(); e.stopPropagation();
                                            if (k === 'Shift') setVkbShift(!vkbShift);
                                            else if (k === '#+=') setVkbLayout(vkbLayout === 'alpha' ? 'num' : 'alpha');
                                            else handleVkbKey(shouldUppercase ? k.toUpperCase() : k);
                                          }}
                                      >
                                          {displayText}
                                      </button>
                                    );
                                })}
                              </div>
                          ))}
                          <div className="vkb-row" style={{gap: '4px', justifyContent: 'space-between'}}>
                              <button type="button" className="vkb-key special" style={{flex: '0 0 auto', minWidth: '50px'}} onPointerDown={(e) => { e.preventDefault(); setVkbLayout(vkbLayout === 'alpha' ? 'num' : 'alpha'); }}>
                                {vkbLayout === 'alpha' ? '123' : 'ABC'}
                              </button>
                              <button type="button" className="vkb-key" style={{flex: 1, minWidth: '50px'}} onPointerDown={(e) => { e.preventDefault(); handleVkbKey(' '); }}>bo'shliq</button>
                              <button type="button" className="vkb-key special" style={{flex: '0 0 auto', minWidth: '60px', background: 'var(--text-blue)', color: '#fff'}} onPointerDown={(e) => { e.preventDefault(); handleVkbKey('ENTER'); }}>Bajarish</button>
                          </div>
                        </div>
                    )}
                    <div className="vkb-bottom">
                        <button type="button" className="vkb-icon-btn" onPointerDown={(e) => { e.preventDefault(); setVkbLayout(vkbLayout === 'emoji' ? 'alpha' : 'emoji'); }}>
                          {vkbLayout === 'emoji' ? <span style={{fontSize: '16px', fontWeight: 600}}>ABC</span> : <IconSmile />}
                        </button>
                        {isRecording ? (
                          <div style={{display:'flex', alignItems:'center', background:'#ef4444', borderRadius:'24px', padding:'4px 12px', gap:'12px', height:'36px', animation:'fadeIn 0.2s'}}>
                              <span className="typing-indicator" style={{color:'#fff', margin:0, display:'flex', alignItems:'center', gap:'4px'}}><div style={{width:'8px', height:'8px', borderRadius:'50%', background:'#fff'}}></div>{recordingTime}s</span>
                              <button type="button" className="icon-btn" style={{color:'#fff', padding:'4px', width:'32px', height:'32px'}} onPointerDown={(e) => { e.preventDefault(); cancelRecording(); }}><IconTrash/></button>
                              <button type="button" className="icon-btn" style={{color:'#fff', padding:'4px', width:'32px', height:'32px'}} onPointerDown={(e) => { e.preventDefault(); stopRecording(); }}><IconSend/></button>
                          </div>
                        ) : (
                          <button type="button" className="vkb-icon-btn" style={{color: 'var(--text-blue)'}} onPointerDown={(e) => { e.preventDefault(); startRecording(); }}><IconMic /></button>
                        )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Chat Switcher UI */}
          {showSwitcher && (
             <div className="chat-switcher-overlay">
                <div className="chat-switcher-box">
                   {chatListRef.current.map((chat, idx) => (
                      <div key={chat.id} id={`sw-item-${idx}`} className={`switcher-item ${idx === switcherIndex ? 'active' : ''}`} onClick={() => {
                         setActiveChatId(chat.id);
                         setShowSwitcher(false);
                         isSwitcherOpenRef.current = false;
                      }}>
                         <div className="switcher-avatar" style={{background: chat.avatarType ? 'transparent' : chat.avatarColor}}>
                            {chat.avatarType ? <img src={getAvatarImg(chat.avatarType)} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : chat.avatarText}
                         </div>
                         <div className="switcher-name">{chat.name}</div>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {contextMenu && contextMenu.visible && (
            <div className="context-overlay" onContextMenu={e=>e.preventDefault()} onClick={() => setContextMenu(null)}>
              <div className="context-container" style={{top: contextMenu.y, left: contextMenu.x}} onClick={e => e.stopPropagation()}>
                <div className="cm-reactions">
                  {EMOJIS.map(em => <span key={em} className="cm-reaction" onClick={() => handleReaction(em)}>{em}</span>)}
                </div>
                <div className="context-menu">
                  <div className="cm-item" onClick={() => executeAction('reply')}><span>Reply</span><IconReply/></div>
                  <div className="cm-item" onClick={() => executeAction('copy')}><span>Copy</span><IconCopy/></div>
                  <div className="cm-item" onClick={() => executeAction('forward')}><span>Forward</span><IconForward/></div>
                  <div className="cm-item" onClick={() => executeAction('pin')}><span>{contextMenu.msg.isPinned ? 'Unpin' : 'Pin'}</span><IconPin/></div>
                  {user.role === 'owner' && <div className="cm-item" onClick={() => executeAction('info')}><span>Info</span><IconInfo/></div>}
                  {(contextMenu.msg.userId === user.id || (user.role === 'admin' && (contextMenu.msg.role||'user') === 'user') || (user.role === 'owner' && (contextMenu.msg.role||'user') !== 'owner')) && (
                    <>
                      <div className="cm-item" onClick={() => executeAction('edit')}><span>Edit</span><IconEdit/></div>
                      <div className="cm-item danger" onClick={() => executeAction('delete')}><span>Delete</span><IconTrash/></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {showEmojiPanel && (
            <div className="emoji-panel-container" onMouseEnter={() => clearTimeout(emojiTimeout.current)} onMouseLeave={handleEmojiLeave}>
              <div className="emoji-panel-title">Aura Emojis</div>
              <div className="emoji-grid">
                {AURA_EMOJIS.map(em => (
                  <span key={em} className="aura-emoji" onClick={() => { setInput(prev => prev + em); handleTyping(input + em); inputRef.current?.focus(); }}>
                    {em}
                  </span>
                ))}
              </div>
            </div>
          )}

          {infoModal && (
            <div className="info-modal-overlay" onClick={() => setInfoModal(null)}>
              <div className="info-modal" onClick={e => e.stopPropagation()}>
                <div className="info-header"><span className="info-title">Message Info</span><button className="icon-btn" onClick={() => setInfoModal(null)}><IconClose/></button></div>
                <div className="info-body">
                  <div className="info-row">
                     <div className="info-details"><div className="info-name">Sender ID</div><div className="info-sub" style={{fontFamily:'monospace', fontSize:'11px'}}>{infoModal.userId}</div></div>
                  </div>
                  <div className="info-row">
                     <div className="info-details"><div className="info-name">Sender IP</div><div className="info-sub" style={{fontFamily:'monospace', fontSize:'11px'}}>{infoModal.ip || 'Unknown'}</div></div>
                     <div className="info-right"><IconShield/></div>
                  </div>
                  <div className="info-row">
                     <div className="info-details"><div className="info-name">Seen by ({infoModal.seenBy?.length || 0})</div></div>
                  </div>
                  {(infoModal.seenBy || []).map(s => (
                    <div key={s.id} className="info-row" style={{padding:'6px 16px'}}>
                      <div className="info-avatar" style={{width:'28px', height:'28px', fontSize:'12px'}}><img src={getAvatarImg(s.avatar)} style={{width:'100%', height:'100%', objectFit:'cover'}} /></div>
                      <div className="info-details"><div className="info-name" style={{fontSize:'14px'}}>{s.nick}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {forwardModal && (
            <div className="info-modal-overlay" onClick={() => setForwardModal(null)}>
              <div className="info-modal" onClick={e => e.stopPropagation()}>
                <div className="info-header"><span className="info-title">Forward to...</span><button className="icon-btn" onClick={() => setForwardModal(null)}><IconClose/></button></div>
                <div className="info-body">
                  {chatList.map(c => (
                    <div key={c.id} className="info-row" style={{cursor:'pointer'}} onClick={() => handleForwardTarget(c.id)}>
                      <div className="info-avatar" style={{background: c.avatarType ? 'transparent' : c.avatarColor}}>
                         {c.avatarType ? <img src={getAvatarImg(c.avatarType)} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : c.avatarText}
                      </div>
                      <div className="info-details"><div className="info-name">{c.name}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {viewProfileUser && (
            <div className="upm-overlay" onClick={() => setViewProfileUser(null)}>
              <div className="upm-card" onClick={e => e.stopPropagation()}>
                <button className="upm-close" onClick={() => setViewProfileUser(null)}><IconClose /></button>
                <div className="upm-top">
                  <div className="upm-avatar">
                    <img src={getAvatarImg(viewProfileUser.avatar)} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                  </div>
                  <h2 className="upm-name">
                    {viewProfileUser.name} 
                    {viewProfileUser.role === 'owner' ? '👑' : viewProfileUser.role === 'admin' ? '🛡️' : ''}
                  </h2>
                  <p className="upm-status">
                    {viewProfileUser.loading ? 'Yuklanmoqda...' : (viewProfileUser.lastActive ? `last seen ${new Date(viewProfileUser.lastActive).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}` : 'online')}
                  </p>
                  
                  <div className="upm-actions">
                    <button className="upm-btn" onClick={() => { setActiveChatId(viewProfileUser.id); setViewProfileUser(null); }}>
                      <IconMessageSquare /><span>Message</span>
                    </button>
                    <button className="upm-btn" onClick={() => toggleMute(viewProfileUser.id)} style={{background: mutedUsers.includes(viewProfileUser.id) ? '#3b82f6' : '#2b3543'}}>
                      {mutedUsers.includes(viewProfileUser.id) ? <IconBellOff /> : <IconBell />}
                      <span>{mutedUsers.includes(viewProfileUser.id) ? 'Unmute' : 'Mute'}</span>
                    </button>
                  </div>
                </div>
                
                <div className="upm-bottom">
                  <div className="upm-info-item">
                    <h3 className="upm-info-val">{viewProfileUser.loading ? '...' : (viewProfileUser.username ? `@${viewProfileUser.username}` : 'Noma\'lum')}</h3>
                    <p className="upm-info-lbl">Username</p>
                  </div>
                  <div className="upm-info-item">
                    <h3 className="upm-info-val" style={{whiteSpace:'pre-wrap'}}>{viewProfileUser.loading ? '...' : (viewProfileUser.bio || 'Bio yozilmagan')}</h3>
                    <p className="upm-info-lbl">Bio</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}