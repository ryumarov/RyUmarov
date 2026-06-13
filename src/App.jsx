import React, { useState, useEffect, useRef } from 'react';

const MOCK_API_URL = 'https://6a2c1f2a3e2b60ab038f7f8e.mockapi.io/Menu';
const TG_BOT_TOKEN = '8748920850:AAELc92e93YypCmpm2B6szjBcJN4ufRYkg0';
const TG_CHAT_ID = '8551504472';
const ADMIN_PASSWORD = 'umarov2025';

const IconBan = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>;
const IconMan = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>;
const IconGirl = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5z"/><path d="M17 9v4a2 2 0 0 0 2 2h1"/><path d="M7 9v4a2 2 0 0 1-2 2H4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>;
const IconCrown = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>;
const IconEdit = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
const IconTrash = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const IconReply = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>;
const IconCopy = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
const IconForward = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>;
const IconPin = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.68V6a3 3 0 0 0-6 0v4.68a2 2 0 0 1-1.11 1.87l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>;
const IconInfo = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
const IconCheck = ({ color = "#84939f" }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconDoubleCheck = ({ color = "#34c759" }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 6 7 17 2 12"/><polyline points="22 6 11 17 8 14"/></svg>;
const IconSmile = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b9eb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
const IconSend = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const IconChevronLeft = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IconMore = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#84939f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>;
const IconClose = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b9eb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconSearch = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b9eb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b9eb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IconPencil = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b9eb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconSettings = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b9eb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconMoon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b9eb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const IconUser = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b9eb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconChevronDown = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b9eb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;

const EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🎉'];
const AURA_EMOJIS = ['✨', '🌟', '💫', '🔥', '💥', '⚡', '🦋', '🌸', '🔮', '🧿', '👑', '💎', '🚀', '🌌', '🌈', '❤️', '😎', '🥺', '😈', '👻', '👽', '🤖', '👾', '👿', '👺', '👹', '🎃', '💀', '☠️', '💯', '💢', '♨️', '💖', '💗', '💓', '💞', '💕', '💘', '💝', '💟'];

const globalStyles = `
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #e4e4e5; color: #000; overflow: hidden; -webkit-tap-highlight-color: transparent; }
  
  .screen-center { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; width: 100vw; padding: 1rem; position: relative; overflow: hidden; background: #fff; }
  .glass-panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); padding: 2rem; width: 100%; max-width: 28rem; }
  .text-center { text-align: center; }
  
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes pulseType { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
  
  .animate-fade-in { animation: fadeIn 0.2s ease forwards; }
  .animate-slide-up { animation: slideUp 0.3s ease forwards; }
  .spinner { width: 2.5rem; height: 2.5rem; border: 4px solid #007aff; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }

  .ban-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(127, 29, 29, 0.1); pointer-events: none; }
  .ban-panel { max-width: 32rem; border-color: rgba(239, 68, 68, 0.3); box-shadow: 0 0 50px rgba(239,68,68,0.2); z-index: 10; margin: 0 1rem; }
  .ban-icon { font-size: 3.75rem; margin-bottom: 1.5rem; color: #ef4444; }
  .ban-title { font-size: 2.25rem; font-weight: bold; margin-bottom: 1rem; color: #ef4444; }
  .ban-subtitle { color: #f87171; font-family: monospace; font-size: 1.125rem; margin-bottom: 2rem; letter-spacing: 0.1em; text-transform: uppercase; }
  .ban-box { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 0.5rem; padding: 1rem; }
  .ban-box p { color: #d1d5db; margin: 0; }

  .title-gradient { font-size: 1.875rem; font-weight: bold; background: linear-gradient(to right, #007aff, #34c759); -webkit-background-clip: text; color: transparent; margin: 0 0 0.5rem 0; }
  .subtitle { color: #6b7280; margin: 0 0 2rem 0; }
  .neon-input { width: 100%; padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 1.125rem; background: #f3f4f6; border: 1px solid #e5e7eb; color: #000; margin-bottom: 1.5rem; transition: all 0.2s; outline: none; }
  .neon-input:focus { border-color: #007aff; background: #fff; box-shadow: 0 0 0 3px rgba(0,122,255,0.1); }
  .btn-primary { width: 100%; padding: 1rem; border-radius: 0.75rem; font-weight: bold; font-size: 1.125rem; transition: all 0.2s; border: none; cursor: pointer; background: #007aff; color: white; }
  .btn-primary:disabled { background: #d1d5db; color: #9ca3af; cursor: not-allowed; }
  
  .avatar-container { display: flex; gap: 1.5rem; margin-bottom: 2.5rem; justify-content: center; }
  .avatar-card { cursor: pointer; transition: all 0.2s; padding: 2rem; border-radius: 1rem; border: 2px solid #e5e7eb; background: #f9fafb; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
  .avatar-card.selected-man { border-color: #007aff; background: #eff6ff; }
  .avatar-card.selected-girl { border-color: #ec4899; background: #fdf2f8; }
  .avatar-icon { font-size: 4.5rem; }
  .avatar-label { font-size: 1.25rem; font-weight: bold; color: #374151; }

  .chat-layout { display: flex; flex-direction: column; height: 100vh; width: 100vw; max-width: 100%; margin: 0; background: #e5e5ea; color: #000; position: relative; }
  
  .app-container { display: flex; height: 100%; width: 100%; overflow: hidden; background: #fff; position: relative; }
  
  .sidebar { width: 350px; border-right: 1px solid #e5e7eb; display: flex; flex-direction: column; background: #fff; flex-shrink: 0; transition: transform 0.3s; z-index: 20; position: relative; }
  .chat-area { flex: 1; display: flex; flex-direction: column; position: relative; background-color: #e6ebe1; background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d8cc' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }

  @media (max-width: 768px) {
    .sidebar { width: 100%; position: absolute; top: 0; left: 0; height: 100%; }
    .sidebar.hidden { transform: translateX(-100%); }
    .chat-area { width: 100%; position: absolute; top: 0; left: 0; height: 100%; transition: transform 0.3s; }
    .chat-area.hidden { transform: translateX(100%); }
  }

  .sidebar-header { padding: 12px 16px; display: flex; flex-direction: column; gap: 12px; border-bottom: 1px solid #f3f4f6; }
  .sidebar-top { display: flex; justify-content: space-between; align-items: center; }
  .sidebar-title { font-size: 18px; font-weight: 600; }
  .search-box { display: flex; align-items: center; background: #f3f4f6; padding: 8px 12px; border-radius: 20px; gap: 8px; }
  .search-input { border: none; background: transparent; outline: none; flex: 1; font-size: 15px; }
  .tabs { display: flex; gap: 8px; margin-top: 4px; overflow-x: auto; padding-bottom: 4px; }
  .tabs::-webkit-scrollbar { display: none; }
  .tab { padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; cursor: pointer; white-space: nowrap; color: #6b7280; }
  .tab.active { background: #007aff; color: #fff; }

  .chat-list { flex: 1; overflow-y: auto; }
  .chat-list::-webkit-scrollbar { width: 4px; }
  .chat-list::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
  .chat-item { display: flex; padding: 10px 16px; gap: 12px; cursor: pointer; transition: background 0.2s; align-items: center; }
  .chat-item:hover { background: #f9fafb; }
  .chat-item.active { background: #007aff; color: #fff; }
  .chat-item.active .chat-item-time, .chat-item.active .chat-item-msg { color: rgba(255,255,255,0.8); }
  .chat-avatar { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 18px; flex-shrink: 0; }
  .chat-item-content { flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
  .chat-item-top { display: flex; justify-content: space-between; margin-bottom: 4px; align-items: baseline; }
  .chat-item-name { font-weight: 600; font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .chat-item-time { font-size: 12px; color: #8b9eb0; }
  .chat-item-bottom { display: flex; justify-content: space-between; align-items: center; }
  .chat-item-msg { font-size: 14px; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; padding-right: 8px; }
  .chat-badge { background: #007aff; color: #fff; font-size: 12px; font-weight: 600; min-width: 20px; height: 20px; border-radius: 10px; display: flex; align-items: center; justify-content: center; padding: 0 6px; }
  .chat-item.active .chat-badge { background: #fff; color: #007aff; }

  .chat-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; background: #fff; z-index: 10; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0,0,0,0.02); height: 60px; }
  .header-left { display: flex; align-items: center; gap: 12px; }
  .back-btn { display: flex; align-items: center; color: #007aff; font-size: 17px; background: none; border: none; padding: 0; cursor: pointer; display: none; }
  @media (max-width: 768px) { .back-btn { display: flex; } }
  .header-info { display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .header-avatar { width: 40px; height: 40px; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 16px; }
  .header-text { display: flex; flex-direction: column; }
  .header-title { font-weight: 600; font-size: 16px; margin: 0; color: #000; }
  .header-subtitle { font-size: 13px; color: #8b9eb0; margin: 0; }
  .icon-btn { background: none; border: none; padding: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; }
  .icon-btn:hover { background: rgba(0,0,0,0.05); }

  .pinned-bar { display: flex; align-items: center; padding: 8px 16px; background: #fff; border-bottom: 1px solid #e5e7eb; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
  .pinned-line { width: 3px; height: 36px; background: #007aff; border-radius: 2px; margin-right: 12px; }
  .pinned-content { flex: 1; overflow: hidden; }
  .pinned-title { color: #007aff; font-size: 14px; font-weight: 600; margin: 0 0 2px 0; }
  .pinned-text { color: #8b9eb0; font-size: 14px; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .messages-container { flex: 1; overflow-y: auto; padding: 16px 16px 8px 16px; display: flex; flex-direction: column; gap: 8px; }
  .messages-container::-webkit-scrollbar { width: 5px; }
  .messages-container::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
  
  .date-separator { align-self: center; background: rgba(0,0,0,0.15); color: #fff; font-size: 13px; font-weight: 500; padding: 4px 12px; border-radius: 12px; margin: 8px 0 16px 0; }

  .msg-row { display: flex; width: 100%; position: relative; margin-bottom: 2px; }
  .msg-row.me { justify-content: flex-end; }
  .msg-row.other { justify-content: flex-start; }
  .msg-wrap { display: flex; gap: 8px; max-width: 80%; align-items: flex-end; position: relative; }
  @media (min-width: 768px) { .msg-wrap { max-width: 65%; } }
  .msg-avatar-small { width: 32px; height: 32px; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; margin-bottom: 2px; font-weight: 600; }
  
  .msg-bubble { padding: 6px 10px 8px 12px; display: flex; flex-direction: column; position: relative; cursor: pointer; min-width: 80px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); user-select: none; }
  .msg-row.me .msg-bubble { background: #e1ffc7; border-radius: 16px 16px 4px 16px; }
  .msg-row.other .msg-bubble { background: #ffffff; border-radius: 16px 16px 16px 4px; }
  .msg-bubble.selected { filter: brightness(0.95); }
  
  .msg-sender { font-size: 13px; font-weight: 600; margin-bottom: 4px; line-height: 1.2; }
  
  .msg-reply-box { border-left: 3px solid #007aff; background: rgba(0,122,255,0.05); padding: 4px 8px; border-radius: 4px; margin-bottom: 6px; cursor: pointer; }
  .msg-row.me .msg-reply-box { background: rgba(0,122,255,0.1); border-left-color: #007aff; }
  .msg-reply-name { font-size: 13px; font-weight: 600; color: #007aff; margin: 0 0 2px 0; }
  .msg-reply-text { font-size: 13px; color: #374151; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .msg-forwarded { font-size: 13px; color: #007aff; margin-bottom: 4px; font-weight: 500; border-left: 2px solid #007aff; padding-left: 6px; }

  .msg-text { font-size: 15px; white-space: pre-wrap; word-break: break-word; margin: 0; line-height: 1.4; color: #000; padding-bottom: 12px; }
  
  .msg-footer { position: absolute; bottom: 4px; right: 8px; display: flex; align-items: center; gap: 4px; background: inherit; padding-left: 4px; border-radius: 8px; }
  .msg-time { font-size: 11px; color: #8b9eb0; }
  .msg-row.me .msg-time { color: #53bdeb; }
  .msg-status { display: flex; align-items: center; margin-left: 2px; margin-top: 1px; }
  
  .msg-reactions { display: flex; flex-wrap: wrap; gap: 4px; position: absolute; bottom: -12px; right: 0; z-index: 2; }
  .react-pill { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2px 6px; font-size: 12px; display: flex; align-items: center; gap: 4px; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
  .msg-row.me .react-pill { background: #e1ffc7; border-color: #c7ebaa; }
  .react-pill.active { background: #eff6ff !important; border-color: #bfdbfe !important; color: #007aff; }

  .reply-preview-bar { display: flex; align-items: center; padding: 8px 16px; background: #fff; border-top: 1px solid #d1d5db; position: relative; }
  .reply-preview-bar .pinned-line { height: 36px; background: #007aff; }
  .reply-preview-bar .pinned-title { color: #007aff; }
  .reply-preview-bar .pinned-text { color: #000; }

  .chat-input-area { padding: 8px 16px; background: #f4f4f5; display: flex; align-items: flex-end; gap: 8px; z-index: 10; border-top: 1px solid #e5e7eb; }
  .chat-input-wrapper { flex: 1; display: flex; align-items: flex-end; background: #fff; border-radius: 20px; padding: 0 4px; border: 1px solid #d1d5db; min-height: 40px; }
  .chat-input { flex: 1; padding: 10px 8px; border: none; background: transparent; font-size: 16px; color: #000; outline: none; resize: none; max-height: 120px; font-family: inherit; line-height: 1.4; }
  .send-btn-circle { width: 34px; height: 34px; border-radius: 50%; background: #007aff; color: white; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; transition: transform 0.1s; margin-bottom: 3px; margin-right: 3px; flex-shrink: 0; }
  .send-btn-circle:active { transform: scale(0.9); }

  .typing-indicator { font-size: 13px; color: #007aff; font-weight: 500; margin-top: 2px; animation: pulseType 1.5s infinite; }

  .context-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99; }
  .context-container { position: fixed; z-index: 100; display: flex; flex-direction: column; gap: 8px; animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: top left; }
  .cm-reactions { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 24px; padding: 8px 12px; display: flex; gap: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.05); }
  .cm-reaction { font-size: 24px; cursor: pointer; transition: transform 0.1s; }
  .cm-reaction:active { transform: scale(1.3); }
  .context-menu { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); width: 220px; overflow: hidden; border: 1px solid rgba(0,0,0,0.05); }
  .cm-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; cursor: pointer; font-size: 15px; color: #000; border-bottom: 1px solid rgba(0,0,0,0.05); background: transparent; transition: background 0.1s; font-weight: 500; }
  .cm-item:last-child { border-bottom: none; }
  .cm-item:active { background: rgba(0,0,0,0.05); }
  .cm-item.danger { color: #ff3b30; }

  .info-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); z-index: 200; display: flex; align-items: center; justify-content: center; }
  .info-modal { background: #fff; width: 90%; max-width: 320px; border-radius: 16px; overflow: hidden; animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
  .info-header { padding: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb; }
  .info-title { font-weight: 600; font-size: 16px; }
  .info-body { max-height: 300px; overflow-y: auto; padding: 8px 0; }
  .info-row { display: flex; align-items: center; padding: 10px 16px; gap: 12px; border-bottom: 1px solid rgba(0,0,0,0.02); }
  .info-avatar { width: 36px; height: 36px; border-radius: 50%; background: #007aff; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #fff; font-weight: bold; }
  .info-details { flex: 1; }
  .info-name { font-weight: 600; font-size: 15px; color: #000; }
  .info-sub { font-size: 13px; color: #8b9eb0; }
  .info-right { font-size: 20px; }

  .emoji-panel-container { position: absolute; bottom: 60px; right: 16px; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid #d1d5db; border-radius: 16px; padding: 12px; width: 280px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); z-index: 50; display: flex; flex-direction: column; gap: 8px; animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: bottom right; }
  .emoji-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; max-height: 180px; overflow-y: auto; padding-right: 4px; }
  .emoji-grid::-webkit-scrollbar { width: 4px; }
  .emoji-grid::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
  .aura-emoji { font-size: 22px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; user-select: none; }
  .aura-emoji:hover { transform: scale(1.25); background: rgba(0, 122, 255, 0.1); box-shadow: 0 0 12px rgba(0, 122, 255, 0.3); z-index: 2; }
  .emoji-panel-title { font-size: 13px; font-weight: 600; color: #8b9eb0; margin-bottom: 4px; margin-left: 4px; }

  .header-dropdown { position: absolute; top: 100%; right: 0; margin-top: 8px; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border: 1px solid rgba(0,0,0,0.05); z-index: 100; overflow: hidden; animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: top right; min-width: 160px; }
  .header-dropdown-item { padding: 12px 16px; cursor: pointer; font-size: 15px; color: #ff3b30; display: flex; align-items: center; gap: 12px; transition: background 0.1s; font-weight: 500; }
  .header-dropdown-item:hover { background: rgba(0,0,0,0.05); }

  @keyframes slideInLeftMenu { from { transform: translateX(-100%); } to { transform: translateX(0); } }
  .main-menu-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 100; background: rgba(0,0,0,0.3); }
  .main-menu { position: absolute; top: 0; left: 0; height: 100%; background: #fff; width: 280px; z-index: 101; overflow: hidden; box-shadow: 2px 0 10px rgba(0,0,0,0.1); animation: slideInLeftMenu 0.2s cubic-bezier(0.175, 0.885, 0.32, 1); display: flex; flex-direction: column; border-radius: 0; border: none; }
  .mm-header { padding: 20px 20px 12px 20px; display: flex; flex-direction: column; gap: 16px; }
  .mm-avatar { width: 50px; height: 50px; border-radius: 50%; background: #007aff; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
  .mm-info-row { display: flex; justify-content: space-between; align-items: center; }
  .mm-name-col { display: flex; flex-direction: column; }
  .mm-name { font-weight: 600; font-size: 15px; color: #000; }
  .mm-sub { font-size: 13px; color: #007aff; margin-top: 2px; }
  .mm-divider { height: 1px; background: #e5e7eb; width: 100%; }
  .mm-body { flex: 1; padding: 8px 0; overflow-y: auto; }
  .mm-item { display: flex; align-items: center; gap: 20px; padding: 12px 20px; cursor: pointer; transition: background 0.2s; color: #000; font-size: 15px; font-weight: 500; }
  .mm-item:hover { background: #f3f4f6; }
  .mm-icon { color: #8b9eb0; display: flex; align-items: center; justify-content: center; width: 24px; }

  .toast-notification { position: fixed; top: 16px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 10px 20px; border-radius: 20px; font-weight: 500; font-size: 14px; z-index: 99999; backdrop-filter: blur(8px); white-space: nowrap; pointer-events: none; }
  @keyframes slideDownToast { from { top: -20px; opacity: 0; } to { top: 16px; opacity: 1; } }
  .animate-slide-down { animation: slideDownToast 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

  .admin-layout { height: 100vh; width: 100%; background: #f4f4f5; overflow-y: auto; padding: 2rem; position: absolute; z-index: 999; top: 0; left: 0; }
`;

const getIP = async () => {
  try { 
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal }); 
    clearTimeout(id);
    const data = await res.json(); 
    return data.ip; 
  } catch { 
    return `unknown_${Math.floor(Math.random() * 100000)}`; 
  }
};

const sendTelegramMessage = async (text) => {
  try { await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'HTML' }) }); } catch (error) {}
};

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

const NicknameInput = ({ onNext }) => {
  const [nick, setNick] = useState(localStorage.getItem('draft_nick') || '');
  useEffect(() => { localStorage.setItem('draft_nick', nick); }, [nick]);
  return (
    <div className="screen-center">
      <div className="glass-panel animate-slide-up text-center">
        <h2 className="title-gradient">Xush Kelibsiz</h2>
        <p className="subtitle">Chatga kirish uchun o'zingizni tanishtiring</p>
        <input type="text" value={nick} onChange={(e) => setNick(e.target.value)} placeholder="Taxallusingizni kiriting..." className="neon-input" maxLength={20} />
        <button onClick={() => { if(nick.trim()) { localStorage.removeItem('draft_nick'); onNext(nick.trim()); } }} disabled={!nick.trim()} className="btn-primary">Davom etish</button>
      </div>
    </div>
  );
};

const AvatarSelect = ({ nick, onComplete }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="screen-center">
      <div className="text-center mb-8 animate-fade-in">
        <h2 style={{color: '#000'}}>Avatarni tanlang</h2>
        <p className="subtitle">Salom, <span style={{color: '#007aff', fontWeight: 'bold'}}>{nick}</span>!</p>
      </div>
      <div className="avatar-container animate-slide-up">
        <div onClick={() => setSelected('man')} className={`avatar-card ${selected === 'man' ? "selected-man" : ""}`}><span className="avatar-icon"><IconMan /></span><span className="avatar-label">Man</span></div>
        <div onClick={() => setSelected('girl')} className={`avatar-card ${selected === 'girl' ? "selected-girl" : ""}`}><span className="avatar-icon"><IconGirl /></span><span className="avatar-label">Girl</span></div>
      </div>
      <button onClick={() => selected && onComplete(selected)} disabled={!selected} className="btn-primary" style={{maxWidth: '200px'}}>Tasdiqlash</button>
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
      if (!res.ok) { setLoading(false); return; }
      const data = await res.json(); 
      setMessages(data); 
      setLoading(false);
    } catch (err) {
      setLoading(false);
    } 
  };
  useEffect(() => { fetchAll(); }, []);

  const usersMap = new Map();
  messages.forEach(msg => {
    if (!msg.isSystem && msg.userId && msg.nickname !== '👑 OWNER') {
      if (!usersMap.has(msg.userId)) { usersMap.set(msg.userId, { id: msg.userId, nick: msg.nickname, ip: msg.ip, avatar: msg.avatar, lastActive: msg.timestamp, msgCount: 1 }); } 
      else { const u = usersMap.get(msg.userId); u.msgCount++; if (new Date(msg.timestamp) > new Date(u.lastActive)) u.lastActive = msg.timestamp; }
    }
  });
  const usersList = Array.from(usersMap.values()).sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive));

  const deleteUser = async (userId, nick, ip) => { if (!window.confirm(`O'chirasizmi?`)) return; const userMsgs = messages.filter(m => m.userId === userId); for (let msg of userMsgs) await fetch(`${MOCK_API_URL}/${msg.id}`, { method: 'DELETE' }); fetchAll(); };
  const banUser = async (ip) => { if (!window.confirm(`Ban?`)) return; const newBans = [...bannedIPs, ip]; setBannedIPs(newBans); localStorage.setItem('ip_blacklist', JSON.stringify(newBans)); fetchAll(); };
  const spamUser = async (userId, nick) => { if (!window.confirm(`Spam?`)) return; const newSpams = [...spammedUsers, { id: userId, nick }]; setSpammedUsers(newSpams); localStorage.setItem('user_blacklist', JSON.stringify(newSpams)); fetchAll(); };

  return (
    <div className="admin-layout">
      <div style={{maxWidth: '72rem', margin: '0 auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2rem'}}>
          <h1 style={{fontSize: '24px', fontWeight: 'bold', color: '#000'}}>Admin Panel</h1>
          <button onClick={onClose} style={{padding: '8px 16px', background: '#007aff', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer'}}>Chiqish</button>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px'}}>
          <div style={{background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb'}}><h3 style={{margin:0, color:'#6b7280', fontSize:'14px'}}>Foydalanuvchilar</h3><p style={{margin:'8px 0 0 0', fontSize:'28px', fontWeight:'bold'}}>{usersList.length}</p></div>
          <div style={{background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb'}}><h3 style={{margin:0, color:'#6b7280', fontSize:'14px'}}>Xabarlar</h3><p style={{margin:'8px 0 0 0', fontSize:'28px', fontWeight:'bold'}}>{messages.length}</p></div>
        </div>
        <div style={{background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflowX: 'auto'}}>
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
            <thead><tr><th style={{padding:'16px', borderBottom:'1px solid #e5e7eb'}}>Nick</th><th style={{padding:'16px', borderBottom:'1px solid #e5e7eb'}}>IP</th><th style={{padding:'16px', borderBottom:'1px solid #e5e7eb', textAlign:'right'}}>Harakatlar</th></tr></thead>
            <tbody>
              {usersList.map(u => (
                <tr key={u.id}>
                  <td style={{padding:'16px', borderBottom:'1px solid #f3f4f6'}}>{u.nick}</td><td style={{padding:'16px', borderBottom:'1px solid #f3f4f6'}}>{u.ip}</td>
                  <td style={{padding:'16px', borderBottom:'1px solid #f3f4f6', textAlign:'right'}}>
                    <div style={{display:'flex', gap:'8px', justifyContent:'flex-end'}}>
                      <button onClick={() => deleteUser(u.id, u.nick, u.ip)} style={{background:'#fee2e2', color:'#ef4444', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer'}}>Del</button>
                      <button onClick={() => spamUser(u.id, u.nick)} style={{background:'#fef3c7', color:'#f59e0b', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer'}}>Spam</button>
                      <button onClick={() => banUser(u.ip)} style={{background:'#fee2e2', color:'#ef4444', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer'}}>Ban</button>
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
  const [user, setUser] = useState({ nick: '', avatar: '', id: '', ip: '' });
  const [toast, setToast] = useState(null);

  const [messages, setMessages] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [typingRecordId, setTypingRecordId] = useState(null);
  
  const [activeChatId, setActiveChatId] = useState('global');
  const [input, setInput] = useState('');
  const [contextMenu, setContextMenu] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [infoModal, setInfoModal] = useState(null);
  const [forwardModal, setForwardModal] = useState(null);
  const [search, setSearch] = useState('');
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const lastApiTypingTime = useRef(0);

  const isBannedIP = JSON.parse(localStorage.getItem('ip_blacklist') || '[]').includes(user.ip);
  const isSpammedUser = JSON.parse(localStorage.getItem('user_blacklist') || '[]').some(u => u.id === user.id);
  const isRestricted = isBannedIP || isSpammedUser;

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  useEffect(() => {
    const handleContextMenu = (e) => { 
      if(!e.target.closest('.msg-bubble') && !e.target.closest('.context-menu') && !e.target.closest('.pinned-bar')) { 
        e.preventDefault(); showToast("Mening saytimda bu ishlarni qilish mumkun emas"); 
      } 
    };
    const handleKeyDown = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) || (e.ctrlKey && (e.key === 'U' || e.key === 'u'))) {
        e.preventDefault(); showToast("Mening saytimda bu ishlarni qilish mumkun emas");
      }
    };
    document.addEventListener('contextmenu', handleContextMenu); document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('contextmenu', handleContextMenu); document.removeEventListener('keydown', handleKeyDown); };
  }, []);

  useEffect(() => { if (route !== 'loading' && route !== 'admin') localStorage.setItem('current_route', route); }, [route]);

  useEffect(() => {
    const initApp = async () => {
      const currentIp = await getIP();
      const blacklist = JSON.parse(localStorage.getItem('ip_blacklist') || '[]');
      if (blacklist.includes(currentIp)) return setRoute('ban');
      const savedNick = localStorage.getItem('user_nickname');
      const savedAvatar = localStorage.getItem('user_avatar');
      const savedRoute = localStorage.getItem('current_route');
      const savedId = localStorage.getItem('user_id') || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      if (!localStorage.getItem('user_id')) localStorage.setItem('user_id', savedId);
      setUser({ nick: savedNick, avatar: savedAvatar, id: savedId, ip: currentIp });
      if (savedNick && savedAvatar) setRoute('chat'); else if (savedNick && !savedAvatar) setRoute('avatar'); else if (savedRoute && ['nick', 'avatar'].includes(savedRoute)) setRoute(savedRoute); else setRoute('nick');
    };
    initApp();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingUsers(prev => prev.filter(u => Date.now() - u.time < 4000));
    }, 1000);
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

  const updateTg = async (allData) => {
    try {
      const sysRec = allData.find(item => item.isSystem && !item.isTypingRecord);
      const actualMsgs = allData.filter(item => !item.isSystem && (!item.chatId || item.chatId === 'global'));
      const chatHistoryText = "💬 <b>Real-time Global Chat Kuzatuv:</b>\n\n" + 
        actualMsgs.slice(-50).map(m => m.isOwner ? `👑 <b>OWNER:</b> ${m.message}` : `<b>${m.nickname}:</b> ${m.message}`).join("\n");

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
      const res = await fetch(MOCK_API_URL);
      if (!res.ok) return;
      const data = await res.json();
      setMessages(data);

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
            return Array.from(map.values()).filter(u => Date.now() - u.time < 5000);
          });
        } catch(e){}
      }

      const uMap = new Map();
      data.forEach(m => {
        if (!m.isSystem && m.userId && m.nickname !== '👑 OWNER') {
          if (!uMap.has(m.userId)) {
            uMap.set(m.userId, { id: m.userId, name: m.nickname, avatar: m.avatar, ip: m.ip, lastActive: m.timestamp, avatarColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][m.userId.length % 6] });
          } else {
            if (new Date(m.timestamp) > new Date(uMap.get(m.userId).lastActive)) {
              uMap.get(m.userId).lastActive = m.timestamp;
              uMap.get(m.userId).name = m.nickname; 
            }
          }
        }
      });
      setUsersList(Array.from(uMap.values()).filter(u => u.id !== user.id));

      const getPId = (id1, id2) => [id1, id2].sort().join('_');
      const activeMsgs = data.filter(m => !m.isSystem && (activeChatId === 'global' ? (!m.chatId || m.chatId === 'global') : m.chatId === getPId(user.id, activeChatId)));
      const unreadMsgs = activeMsgs.filter(m => m.userId !== user.id && !(m.seenBy || []).some(s => s.id === user.id));
      
      if (unreadMsgs.length > 0) {
        const lastMsg = unreadMsgs[unreadMsgs.length - 1];
        const updatedSeenBy = [...(lastMsg.seenBy || []), { id: user.id, nick: user.nick }];
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

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'auto' }); }, [messages, activeChatId, typingUsers]);

  const handleTyping = () => {
    const now = Date.now();
    if (now - lastApiTypingTime.current > 2000) {
      lastApiTypingTime.current = now;
      const meTyping = { id: user.id, nick: user.nick, chatId: activeChatId, time: now };
      
      localStorage.setItem('chat_typing_event', JSON.stringify(meTyping));
      setTypingUsers(prev => {
        const filtered = prev.filter(u => u.id !== user.id);
        return [...filtered, meTyping];
      });

      if (typingRecordId) {
        const active = typingUsers.filter(u => now - u.time < 5000 && u.id !== user.id);
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

  const handleSend = async (e) => {
    if(e) e.preventDefault();
    if (!input.trim() || isRestricted || !activeChatId) return;
    
    const sendInput = input.trim();
    setInput(''); setReplyingTo(null); setShowEmojiPanel(false);

    if (editingId) {
      const msgToUpdate = messages.find(m => m.id === editingId);
      await fetch(`${MOCK_API_URL}/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...msgToUpdate, message: sendInput }) });
      setEditingId(null);
    } else {
      const cId = activeChatId === 'global' ? 'global' : [user.id, activeChatId].sort().join('_');
      const newMessage = { chatId: cId, nickname: user.nick, avatar: user.avatar, message: sendInput, type: 'text', timestamp: new Date().toISOString(), userId: user.id, ip: user.ip, seenBy: [{ id: user.id, nick: user.nick }], reactions: {}, isPinned: false, replyToId: replyingTo ? replyingTo.id : null };
      await fetch(MOCK_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newMessage) });
    }
    
    fetchMessages().then(async () => {
      if (activeChatId === 'global') {
        const res = await fetch(MOCK_API_URL); const allData = await res.json(); updateTg(allData);
      }
    });
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
      seenBy: [{ id: user.id, nick: user.nick }],
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
    if (action === 'delete') { await fetch(`${MOCK_API_URL}/${msg.id}`, { method: 'DELETE' }); fetchMessages(); }
    else if (action === 'edit') { setEditingId(msg.id); setInput(msg.message); setTimeout(()=>inputRef.current?.focus(), 100); }
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
    const pwd = prompt("Admin parolini kiriting:");
    if (pwd !== ADMIN_PASSWORD) {
      if (pwd !== null) showToast("Parol noto'g'ri!");
      return;
    }
    if (!window.confirm("Ushbu chatdagi barcha xabarlarni o'chirmoqchimisiz?")) return;
    
    for (let msg of messages.filter(m => !m.isSystem && (activeChatId === 'global' ? (!m.chatId || m.chatId === 'global') : m.chatId === getPId(user.id, activeChatId)))) {
      await fetch(`${MOCK_API_URL}/${msg.id}`, { method: 'DELETE' });
    }
    showToast("Barcha xabarlar o'chirildi");
    fetchMessages();
  };

  const getPId = (id1, id2) => [id1, id2].sort().join('_');
  
  const globalMsgs = messages.filter(m => !m.isSystem && (!m.chatId || m.chatId === 'global'));
  const chatList = [
    {
      id: 'global', name: 'Global Chat', isGroup: true, avatarColor: '#007aff', avatarText: 'GC', members: `${usersList.length + 1} members`,
      lastMsgObj: globalMsgs[globalMsgs.length - 1],
      unread: globalMsgs.filter(m => m.userId !== user.id && !(m.seenBy||[]).some(s=>s.id===user.id)).length
    },
    ...usersList.map(u => {
      const pMsgs = messages.filter(m => !m.isSystem && m.chatId === getPId(user.id, u.id));
      return {
        id: u.id, name: u.name, isGroup: false, avatarColor: u.avatarColor, avatarText: u.name.substring(0,2).toUpperCase(), members: `last seen ${new Date(u.lastActive).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}`,
        lastMsgObj: pMsgs[pMsgs.length - 1],
        unread: pMsgs.filter(m => m.userId !== user.id && !(m.seenBy||[]).some(s=>s.id===user.id)).length
      };
    })
  ].filter(c => c.name.toLowerCase().includes(search.toLowerCase())).sort((a,b) => {
    if(a.id === 'global') return -1; if(b.id === 'global') return 1;
    const tA = a.lastMsgObj ? new Date(a.lastMsgObj.timestamp).getTime() : 0;
    const tB = b.lastMsgObj ? new Date(b.lastMsgObj.timestamp).getTime() : 0;
    return tB - tA;
  });

  const activeChatDetails = chatList.find(c => c.id === activeChatId) || chatList[0];
  const activeMessages = messages.filter(m => !m.isSystem && (activeChatId === 'global' ? (!m.chatId || m.chatId === 'global') : m.chatId === getPId(user.id, activeChatId)));
  const pinnedMessage = activeMessages.slice().reverse().find(m => m.isPinned);

  const activeTypists = typingUsers.filter(u => u.chatId === activeChatId && u.id !== user.id && Date.now() - u.time < 4000);
  let subtitleText = activeChatDetails?.members || '';
  if (activeTypists.length > 0 && activeChatDetails) {
    const names = activeTypists.map(u => u.nick).join(', ');
    const baseInfo = activeChatDetails.isGroup ? activeChatDetails.members.split('-')[0].trim() : '';
    subtitleText = baseInfo ? `${baseInfo} - ${names} typing...` : `${names} typing...`;
  }

  return (
    <>
      <style>{globalStyles}</style>
      {toast && <div className="toast-notification animate-slide-down">{toast}</div>}
      
      {route === 'loading' && <div className="screen-center" style={{ backgroundColor: '#fff' }}><div className="spinner"></div></div>}
      {route === 'ban' && <BanScreen />}
      {route === 'nick' && <NicknameInput onNext={(nick) => { localStorage.setItem('user_nickname', nick); setUser(p => ({ ...p, nick })); setRoute('avatar'); }} />}
      {route === 'avatar' && <AvatarSelect nick={user.nick} onComplete={(av) => { localStorage.setItem('user_avatar', av); setUser(p => ({ ...p, avatar: av })); setRoute('chat'); }} />}
      
      {route === 'chat' && (
        <div className="chat-layout" onClick={() => { setContextMenu(null); setShowEmojiPanel(false); setHeaderMenuOpen(false); setIsMainMenuOpen(false); }}>
          <div className="app-container">
            <div className={`sidebar ${activeChatId ? 'hidden' : ''}`}>
              <div className="sidebar-header">
                <div className="sidebar-top">
                  <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setIsMainMenuOpen(true); }}><IconMenu/></button>
                  <h2 className="sidebar-title">Chats</h2>
                  <button className="icon-btn" onDoubleClick={() => { if(prompt("Parol:") === ADMIN_PASSWORD) setRoute('admin'); }}><IconPencil/></button>
                </div>
                <div className="search-box">
                  <IconSearch/>
                  <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="search-input" />
                </div>
                <div className="tabs"><div className="tab active">All</div><div className="tab">Unread</div></div>
              </div>

              {isMainMenuOpen && (
                <>
                  <div className="main-menu-overlay" onClick={() => setIsMainMenuOpen(false)}></div>
                  <div className="main-menu" onClick={e => e.stopPropagation()}>
                    <div className="mm-header">
                      <div className="mm-avatar" style={{background: user.avatar === 'man' ? '#007aff' : '#ec4899'}}>
                        {user.avatar === 'man' ? <IconMan /> : <IconGirl />}
                      </div>
                      <div className="mm-info-row">
                        <div className="mm-name-col">
                          <span className="mm-name">{user.nick} 🎻</span>
                          <span className="mm-sub">App Preferences</span>
                        </div>
                      </div>
                    </div>
                    <div className="mm-divider"></div>
                    <div className="mm-body">
                      <div className="mm-item" onClick={() => { setIsMainMenuOpen(false); showToast("Profile menyusi tez kunda"); }}>
                        <span className="mm-icon"><IconUser /></span> My Profile
                      </div>
                      <div className="mm-item" onClick={() => { setIsMainMenuOpen(false); showToast("Sozlamalar tez kunda"); }}>
                        <span className="mm-icon"><IconSettings /></span> Settings
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="chat-list">
                {chatList.map(c => (
                  <div key={c.id} className={`chat-item ${activeChatId === c.id ? 'active' : ''}`} onClick={() => setActiveChatId(c.id)}>
                    <div className="chat-avatar" style={{background: c.avatarColor}}>{c.avatarText}</div>
                    <div className="chat-item-content">
                      <div className="chat-item-top">
                        <span className="chat-item-name">{c.name}</span>
                        <span className="chat-item-time">{c.lastMsgObj ? new Date(c.lastMsgObj.timestamp).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : ''}</span>
                      </div>
                      <div className="chat-item-bottom">
                        <span className="chat-item-msg">{c.lastMsgObj ? (c.lastMsgObj.userId === user.id ? `You: ${c.lastMsgObj.message}` : `${c.lastMsgObj.nickname}: ${c.lastMsgObj.message}`) : 'Saytga xush kelibsiz!'}</span>
                        {c.unread > 0 && <span className="chat-badge">{c.unread}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`chat-area ${!activeChatId ? 'hidden' : ''}`}>
              {activeChatId && activeChatDetails ? (
                <>
                  <div className="chat-header">
                    <div className="header-left">
                      <button className="back-btn" onClick={() => setActiveChatId(null)}><IconChevronLeft/> <span className="back-badge">{chatList.reduce((a,b)=>a+b.unread,0)}</span></button>
                      <div className="header-info">
                        <div className="header-avatar" style={{background: activeChatDetails.avatarColor}}>{activeChatDetails.avatarText}</div>
                        <div className="header-text">
                          <h1 className="header-title">{activeChatDetails.name}</h1>
                          <p className="header-subtitle">
                            {activeTypists.length > 0 ? <span className="typing-indicator">{subtitleText}</span> : subtitleText}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setHeaderMenuOpen(!headerMenuOpen); }}><IconMore/></button>
                      {headerMenuOpen && (
                        <div className="header-dropdown" onClick={e => e.stopPropagation()}>
                          <div className="header-dropdown-item" onClick={handleClearAll}>
                            <IconTrash /> Clear All
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {pinnedMessage && (
                    <div className="pinned-bar" onClick={() => document.getElementById(`msg-${pinnedMessage.id}`)?.scrollIntoView({behavior:'smooth'})}>
                      <div className="pinned-line"></div>
                      <div className="pinned-content"><p className="pinned-title">Pinned Message</p><p className="pinned-text">{pinnedMessage.message}</p></div>
                      <button className="icon-btn" style={{padding:0}} onClick={(e) => { e.stopPropagation(); setContextMenu({msg: pinnedMessage}); executeAction('pin'); }}><IconPin/></button>
                    </div>
                  )}

                  <div className="messages-container">
                    <div className="date-separator">Today</div>
                    {activeMessages.map((msg, idx) => {
                      const isMe = msg.userId === user.id;
                      const seenCount = (msg.seenBy || []).length;
                      const hasReactions = Object.keys(msg.reactions || {}).length > 0;
                      const repliedMsg = msg.replyToId ? messages.find(m => m.id === msg.replyToId) : null;
                      const nameColor = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][msg.userId.length % 6];

                      return (
                        <div key={msg.id || idx} id={`msg-${msg.id}`} className={`msg-row ${isMe ? 'me' : 'other'}`}>
                          <div className="msg-wrap">
                            {!isMe && activeChatDetails.isGroup && <div className="msg-avatar-small" style={{background: nameColor}}>{msg.nickname.charAt(0).toUpperCase()}</div>}
                            <div className={`msg-bubble ${contextMenu?.msg.id === msg.id ? 'selected' : ''}`} onContextMenu={(e) => handleContextMenu(e, msg)}>
                              {!isMe && activeChatDetails.isGroup && <span className="msg-nick" style={{color: nameColor}}>{msg.nickname}</span>}
                              
                              {repliedMsg && (
                                <div className="msg-reply-box" onClick={(e) => { e.stopPropagation(); document.getElementById(`msg-${repliedMsg.id}`)?.scrollIntoView({behavior:'smooth'}); }}>
                                  <p className="msg-reply-name" style={{color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][repliedMsg.userId.length % 6]}}>{repliedMsg.nickname}</p>
                                  <p className="msg-reply-text">{repliedMsg.message}</p>
                                </div>
                              )}

                              {msg.forwardedFrom && <div className="msg-forwarded">Forwarded from {msg.forwardedFrom}</div>}

                              <p className="msg-text">{msg.message}</p>
                              
                              <div className="msg-footer">
                                <span className="msg-time">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                {isMe && <span className="msg-status">{seenCount > 1 ? <IconDoubleCheck /> : <IconCheck color="#8b9eb0" />}</span>}
                              </div>

                              {hasReactions && (
                                <div className="msg-reactions">
                                  {Object.entries(msg.reactions).map(([em, users]) => (
                                    <div key={em} className={`react-pill ${users.some(u => u.id === user.id) ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setContextMenu({msg}); handleReaction(em); }}>
                                      {em} <span style={{fontWeight:'600', marginLeft:'2px'}}>{users.length > 1 ? users.length : ''}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} style={{height: '24px'}}/>
                  </div>

                  {replyingTo && (
                    <div className="reply-preview-bar">
                      <div className="pinned-line"></div>
                      <div className="pinned-content"><p className="pinned-title">Reply to {replyingTo.nickname}</p><p className="pinned-text">{replyingTo.message}</p></div>
                      <button className="icon-btn" onClick={() => setReplyingTo(null)}><IconClose/></button>
                    </div>
                  )}

                  {editingId && (
                    <div className="reply-preview-bar">
                      <div className="pinned-line" style={{background:'#ec4899'}}></div>
                      <div className="pinned-content"><p className="pinned-title" style={{color:'#ec4899'}}>Edit Message</p><p className="pinned-text">{input}</p></div>
                      <button className="icon-btn" onClick={() => {setEditingId(null); setInput('');}}><IconClose/></button>
                    </div>
                  )}

                  {isRestricted ? (
                    <div className="chat-input-area" style={{ justifyContent: 'center' }}>
                      <div style={{ color: '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}><IconBan /> Siz Ban Yegansiz</div>
                    </div>
                  ) : (
                    <div className="chat-input-area" style={{ position: 'relative' }}>
                      {showEmojiPanel && (
                        <div className="emoji-panel-container" onClick={e => e.stopPropagation()}>
                          <div className="emoji-panel-title">Aura Emojis</div>
                          <div className="emoji-grid">
                            {AURA_EMOJIS.map((emoji, i) => (
                              <div 
                                key={i} 
                                className="aura-emoji" 
                                onClick={(e) => { e.stopPropagation(); setInput(prev => prev + emoji); inputRef.current?.focus(); }}
                              >
                                {emoji}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="chat-input-wrapper">
                        <textarea ref={inputRef} value={input} onChange={(e) => { setInput(e.target.value); handleTyping(); }} onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { handleSend(e); } }} placeholder="Message" className="chat-input" rows="1" />
                        <button type="button" className="icon-btn" onClick={(e)=>{e.stopPropagation(); setShowEmojiPanel(!showEmojiPanel);}}><IconSmile /></button>
                      </div>
                      {(input.trim() || editingId) ? (
                        <button onClick={handleSend} className="send-btn-circle"><IconSend /></button>
                      ) : null}
                    </div>
                  )}
                </>
              ) : (
                <div className="screen-center" style={{background:'transparent'}}><div style={{background:'rgba(0,0,0,0.2)', color:'#fff', padding:'4px 12px', borderRadius:'12px', fontSize:'14px'}}>Select a chat to start messaging</div></div>
              )}
            </div>

            {contextMenu && contextMenu.visible && (
              <>
                <div className="context-overlay" onContextMenu={(e) => { e.preventDefault(); setContextMenu(null); }} />
                <div className="context-container" style={{ top: contextMenu.y, left: contextMenu.x }} onClick={e => e.stopPropagation()} onContextMenu={e=>e.preventDefault()}>
                  <div className="cm-reactions">{EMOJIS.map(em => <span key={em} className="cm-reaction" onClick={() => handleReaction(em)}>{em}</span>)}</div>
                  <div className="context-menu">
                    <div className="cm-item" onClick={() => executeAction('reply')}><span>Reply</span><IconReply/></div>
                    <div className="cm-item" onClick={() => executeAction('copy')}><span>Copy</span><IconCopy/></div>
                    {contextMenu.msg.userId === user.id && <div className="cm-item" onClick={() => executeAction('edit')}><span>Edit</span><IconEdit/></div>}
                    <div className="cm-item" onClick={() => executeAction('forward')}><span>Forward</span><IconForward/></div>
                    <div className="cm-item" onClick={() => executeAction('pin')}><span>{contextMenu.msg.isPinned ? 'Unpin' : 'Pin'}</span><IconPin/></div>
                    {contextMenu.msg.userId === user.id && <div className="cm-item danger" onClick={() => executeAction('delete')}><span>Delete</span><IconTrash/></div>}
                    <div className="cm-item" onClick={() => executeAction('info')}><span>Message Info</span><IconInfo/></div>
                  </div>
                </div>
              </>
            )}

            {infoModal && (
              <div className="info-modal-overlay" onClick={() => setInfoModal(null)}>
                <div className="info-modal" onClick={e => e.stopPropagation()}>
                  <div className="info-header"><span style={{width:24}}></span><span className="info-title">Message Info</span><button className="icon-btn" style={{padding:0}} onClick={()=>setInfoModal(null)}><IconClose/></button></div>
                  <div className="info-body">
                    {Object.entries(infoModal.reactions || {}).map(([em, users]) => 
                      users.map(u => (
                        <div key={em+u.id} className="info-row">
                          <div className="info-avatar" style={{background: u.id===user.id?'#007aff':'#10b981'}}>{u.nick.charAt(0).toUpperCase()}</div>
                          <div className="info-details"><div className="info-name">{u.id === user.id ? 'You' : u.nick}</div><div className="info-sub">reacted with {em}</div></div>
                          <div className="info-right">{em}</div>
                        </div>
                      ))
                    )}
                    {(infoModal.seenBy || []).map(u => (
                      <div key={'seen'+u.id} className="info-row">
                        <div className="info-avatar" style={{background: '#8b5cf6'}}>{u.nick.charAt(0).toUpperCase()}</div>
                        <div className="info-details"><div className="info-name">{u.nick}</div><div className="info-sub">seen just now</div></div>
                        <div className="info-right" style={{color:'#8b9eb0'}}><IconDoubleCheck color="#8b9eb0"/></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {forwardModal && (
              <div className="info-modal-overlay" onClick={() => setForwardModal(null)}>
                <div className="info-modal" onClick={e => e.stopPropagation()} style={{maxHeight: '80vh'}}>
                  <div className="info-header">
                    <span style={{width:24}}></span>
                    <span className="info-title">Forward to...</span>
                    <button className="icon-btn" style={{padding:0}} onClick={()=>setForwardModal(null)}><IconClose/></button>
                  </div>
                  <div className="info-body" style={{padding: 0}}>
                    {chatList.map(c => (
                      <div key={c.id} style={{ display: 'flex', padding: '10px 16px', gap: '12px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6', alignItems: 'center' }} onClick={() => handleForwardTarget(c.id)}>
                        <div className="chat-avatar" style={{background: c.avatarColor, width: '40px', height: '40px', fontSize: '15px'}}>{c.avatarText}</div>
                        <div style={{ flex: 1, fontWeight: '600', fontSize: '15px' }}>{c.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {route === 'admin' && <AdminPanel onClose={() => setRoute('chat')} />}
    </>
  );
}