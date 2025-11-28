import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Layers,
  Monitor,
  Box,
  Camera,
  Mail,
  Phone,
  MapPin,
  Plus,
  X,
  Menu,
  Briefcase,
  PenTool,
  Sparkles,
  Calendar,
  ArrowUpRight,
  ChevronRight,
  Copy,
  Check,
  MessageCircle,
  ArrowRight,
  Maximize2,
  Grid3X3,
  XCircle,
  Image as ImageIcon,
  Bot,
  Component,
  Palette,
  Send,
  Wand2,
  Loader2,
  User,
  Cpu,
  Brain,
  Zap,
  Clock,
  Aperture, // Added for the logo
} from "lucide-react";

/* Custom CSS */
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');

  :root {
    --font-primary: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "Alibaba PuHuiTi", "Noto Sans SC", sans-serif;
  }

  body {
    font-family: var(--font-primary);
    background-color: #f5f5f7;
    color: #1d1d1f;
    -webkit-font-smoothing: antialiased;
  }

  /* Global Grain Texture */
  .bg-noise {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    opacity: 0.03; 
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(15px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }

  /* Icon Fly-out Animations */
  @keyframes fly-out-1 {
    0% { opacity: 0; transform: translate(-20px, 20px) scale(0.5); }
    100% { opacity: 1; transform: translate(0, 0) scale(1); }
  }
  @keyframes fly-out-2 {
    0% { opacity: 0; transform: translate(20px, -20px) scale(0.5); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes fly-out-3 {
    0% { opacity: 0; transform: translate(20px, 0px) scale(0.5); }
    100% { transform: translate(0, 0) scale(1); }
  }

  .animate-fly-1 { animation: fly-out-1 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .animate-fly-2 { animation: fly-out-2 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .animate-fly-3 { animation: fly-out-3 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

  /* NEW: Floating Animation */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  .animate-float-slow {
    animation: float 4s ease-in-out infinite;
  }
  .animate-float-delay {
    animation: float 3.5s ease-in-out infinite;
    animation-delay: 1s;
  }

  /* 呼吸光晕动画 */
  @keyframes glow-breathe {
    0% { opacity: 0.8; transform: scale(1.5); }
    50% { opacity: 1; transform: scale(1.55); }
    100% { opacity: 0.8; transform: scale(1.5); }
  }
  .animate-glow-breathe {
    animation: glow-breathe 8s ease-in-out infinite;
  }

  /* Shimmer effect */
  @keyframes shimmer-subtle {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .group:hover .animate-shimmer-subtle {
    animation: shimmer-subtle 1.5s infinite;
  }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  .reveal-wrapper {
    opacity: 0;
    transform: translateY(30px) scale(0.99);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }
  .reveal-wrapper.is-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  
  /* NEW: Staggered Fade-in for sub-elements - FIX: Now relies on setting transition-delay inline */
  .staggered-entry {
      opacity: 0;
      transform: translateY(15px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
  }
  /* Crucially, we must style the visible state to apply the transition-delay dynamically via JS/React inline style */
  .reveal-wrapper.is-visible .staggered-entry {
      opacity: 1;
      transform: translateY(0);
  }

  /* NEW: Hero Text Entry Animation (Used via inline style) */
  .hero-text-entry {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }


  /* --- 核心光影系统升级 (Core Lighting System) --- */

  /* NEW: Unified Base Glass Style (Used for TiltCard, Navbar, Controls) */
  .liquid-control-base {
    /* INCREASED OPACITY (WAS 0.2 -> 0.6) for readability */
    background: rgba(255, 255, 255, 0.6); 
    /* Slightly less blur for better background visibility */
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    /* Stronger borders/highlights for depth */
    border: 1px solid rgba(255, 255, 255, 0.5); 
    box-shadow: 
      0 4px 30px rgba(0, 0, 0, 0.08), 
      inset 0 1px 0 rgba(255, 255, 255, 0.8); /* Top Rim brighter */
    
    transform-style: preserve-3d;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* TiltCard hover effect logic: FIXED SHADOW */
  .glass-hover-effect:hover {
    transform: translateY(-4px); 
    box-shadow: 
      /* New Soft Shadow: Large blur, low density, multiple layers for rich, soft lift */
      0 12px 30px -4px rgba(0, 0, 0, 0.1), /* Primary soft shadow */
      0 2px 10px rgba(0, 0, 0, 0.05),      /* Near field soft shadow */
      inset 0 1px 0 0 rgba(255,255,255,0.95);  /* Top highlight strengthened */
  }

  /* Badge Style (Reverted to previous look) */
  .badge-style {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.5rem; 
    border-radius: 9999px;
    border: 1px solid rgba(0,0,0,0.05);
    background-color: rgba(255,255,255,0.9); /* Opaque for readability */
    color: #6e6e73;
    backdrop-filter: blur(4px);
    transition: all 0.3s;
  }
  /* Parent .group Hover on the TiltCard, child badge highlights */
  .group:hover .badge-style {
    color: #0071e3;
    border-color: rgba(0, 113, 227, 0.2);
    background-color: rgba(255,255,255,1);
  }

  /* Skill Chip Style (Reverted to previous look) */
  .skill-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background-color: rgba(255,255,255,0.9); /* Opaque background */
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    color: #1d1d1f;
    transition: all 0.3s;
    cursor: default;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  }
  .skill-chip:hover {
    background-color: #fff;
    border-color: rgba(0,113,227,0.2);
    color: #0071e3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }

  /* Button: The "Liquid Sapphire" */
  .liquid-glass-btn {
    position: relative;
    border-radius: 9999px;
    overflow: hidden;
    
    /* 1. Base Color: Pure Brand Blue, opaque, but slightly reflective */
    background: #0071e3; /* Pure Brand Blue */
    
    color: white;
    font-weight: 600;
    letter-spacing: 0.02em;
    
    /* 2. Physics: The "Glass Thickness" look - added subtle edge highlight */
    border: 1px solid rgba(255, 255, 255, 0.15); /* Subtle white border */
    box-shadow: 
      /* Inner top highlight for depth */
      inset 0 1px 1px rgba(255, 255, 255, 0.6),
      /* Strong drop shadow to make it float */
      0 12px 24px rgba(0, 113, 227, 0.4);
      
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform: translate3d(0,0,0); 
  }

  /* The Refraction/Liquid Layer (Applied to the pure color button) */
  .liquid-glass-btn::after {
    content: "";
    position: absolute;
    inset: -50%;
    width: 200%;
    height: 200%;
    
    /* Noise Texture: High contrast light for strong refraction */
    background: radial-gradient(
      circle at 50% 50%, 
      rgba(255, 255, 255, 0.9) 0%,  
      rgba(255, 255, 255, 0) 60%
    );
    
    /* Strong Distortion */
    filter: url(#liquid-distortion); 
    
    /* Blend it: Soft light preserves color but adds bright ripples */
    mix-blend-mode: soft-light; 
    opacity: 0.8; 
    
    /* Animation */
    transform: translateY(0) scale(1);
    transition: transform 3s ease-in-out, opacity 0.4s;
    pointer-events: none;
  }

  .liquid-glass-btn:hover {
    background: #005bb5; /* Darker blue on hover */
    box-shadow: 
      inset 0 1px 1px rgba(255, 255, 255, 0.8),
      0 16px 32px rgba(0, 113, 227, 0.6);
    transform: translateY(-2px) scale(1.02);
  }

  /* Liquid Animation on Hover */
  .liquid-glass-btn:hover::after {
    /* Gentle flowing movement */
    transform: translateY(-10px) scale(1.1) rotate(10deg);
    opacity: 1;
  }
  
  .liquid-glass-btn:active {
    transform: scale(0.98);
  }
  
  /* Specific style for Floating Info Cards */
  .floating-info-card {
    /* Inherit liquid-control-base properties */
    background: rgba(255, 255, 255, 0.6); 
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 
      0 4px 12px rgba(0,0,0,0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  /* FIX: Ensure Modal Backdrop Blur is strong enough */
  .modal-backdrop-blur {
    background-color: rgba(255, 255, 255, 0.7); /* Slightly higher opacity for focus */
    backdrop-filter: blur(40px) saturate(150%);
    -webkit-backdrop-filter: blur(40px) saturate(150%);
    transform: translate3d(0,0,0);
  }
`;
document.head.appendChild(style);

// --- Components ---
const FloatingGlassCard = ({ children, className, delay }) => (
  <div
    className={`absolute z-20 animate-fade-in animate-float-delay ${className}`}
    style={{ animationDelay: delay }}
  >
    <div className="floating-info-card rounded-xl p-2 flex items-center gap-2 pr-3 md:pr-4">
      {" "}
      {/* Reduced padding/size */}
      {children}
    </div>
  </div>
);

// UPDATED: TiltCard now uses liquid-control-base parameters for glass-panel
const TiltCard = ({
  children,
  className = "",
  onClick,
  style: customStyle,
  noHoverEffect = false,
  ...props
}) => {
  const ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -1.5;
    const rotateY = ((x - centerX) / centerX) * 1.5;

    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.005, 1.005, 1.005)`;
  };

  return (
    <div
      ref={ref}
      /* Changed class reference to use liquid-control-base and the TiltCard's unique shadow */
      className={`liquid-control-base group ${className} ${
        isHovering ? "tilt-transition" : "tilt-reset"
      } ${
        !noHoverEffect ? "glass-hover-effect" : ""
      } transition-all duration-300`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={(e) => {
        setIsHovering(false);
        if (ref.current)
          ref.current.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      }}
      onClick={onClick}
      style={{ willChange: "transform", ...customStyle }}
      {...props}
    >
      <div
        className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{ opacity: isHovering ? 0.4 : 0 }}
      />
      {children}
    </div>
  );
};

const SectionHeader = ({ en, cn, align = "left" }) => (
  <div
    className={`mb-12 ${
      align === "center" ? "text-center" : "text-left"
    } flex flex-col ${align === "center" ? "items-center" : "items-start"}`}
  >
    <span className="text-[10px] font-bold text-[#0071e3] uppercase tracking-[0.25em] mb-2 block opacity-80">
      {en}
    </span>
    <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight leading-tight">
      {cn}
    </h2>
  </div>
);

const ContactCopyCard = ({ icon: Icon, label, value, colorClass, delay }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    const textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
    document.body.removeChild(textArea);
  };

  return (
    <div className={`reveal-wrapper group ${delay} w-full`}>
      {/* UPDATED: Changed class to liquid-control-base */}
      <TiltCard
        className="liquid-control-base block w-full p-5 rounded-[24px] flex items-center justify-between cursor-pointer hover:bg-white/90 transition-colors h-full"
        onClick={handleCopy}
      >
        <div className="flex items-center gap-4 relative z-10 overflow-hidden">
          <div
            className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center ${colorClass} transition-transform group-hover:scale-105`}
          >
            <Icon size={18} />
          </div>
          <div className="text-left min-w-0">
            <div className="text-[10px] text-[#86868b] uppercase tracking-wider font-semibold mb-0.5 opacity-80">
              {label}
            </div>
            <div className="text-[#1d1d1f] font-medium text-lg tracking-normal truncate font-sans">
              {value}
            </div>
          </div>
        </div>
        <div
          className={`flex-shrink-0 relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border ml-4 ${
            copied
              ? "bg-emerald-100 text-emerald-600 border-emerald-200"
              : "bg-white/60 text-[#86868b] border-black/5 group-hover:bg-white group-hover:text-[#1d1d1f] group-hover:shadow-sm"
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={14} />}
        </div>
      </TiltCard>
    </div>
  );
};

// --- Data ---
const SKILLS_TAGS = {
  design: [
    { name: "Photoshop", icon: Layers },
    { name: "Illustrator", icon: PenTool },
    { name: "Figma", icon: Monitor },
    { name: "Sketch", icon: Box },
  ],
  aigc: [
    { name: "Midjourney", icon: Bot },
    { name: "即梦", icon: Wand2 },
    { name: "Stable Diffusion", icon: Sparkles },
    { name: "ComfyUI", icon: Cpu },
    { name: "GPT", icon: Brain },
    { name: "Gemini", icon: Zap },
  ],
  threeD: [
    { name: "Blender", icon: Box },
    { name: "Cinema 4D", icon: Component },
    { name: "Octane", icon: Loader2 },
  ],
};

const EXPERIENCE_DETAILED = [
  {
    company: "涅生科技(广州)股份有限公司",
    role: "平面设计师",
    roleEn: "Graphic Designer",
    time: "2022.07 - 2025.11", // UPDATED: Changed end date to 2025.11
    tags: ["UI体系建设", "电商大促", "移动端/H5"],
    desc: [
      "长期服务核心客户云南中烟，主导平台移动端 UI 迭代与各类活动视觉设定，确保品牌调性在商业活动中的统一性。",
      "负责会员平台日常活动、物料资源位的设计迭代与更新支持，确保运营活动视觉资产的高效配置和及时交付。",
      "梳理并建立物料设计规范，推动 UI 组件标准化，显著提升团队协作效率。", // FIXED: Enhanced operational design contribution
    ],
  },
  {
    company: "昆明爱尔眼科医院",
    role: "视觉设计师",
    roleEn: "Visual Designer",
    time: "2021.08 - 2021.12",
    tags: ["品牌物料", "环境美陈", "商业摄影"],
    desc: [
      "统筹医院日常及会展视觉物料，独立执行画册、折页等全套传播设计，确保品牌专业感。",
      "推进院区导视系统与环境美陈落地，提升线下就医体验与空间氛围。",
      "兼任现场拍摄与后期精修，产出高质量品牌宣传影像，建立视觉资产库。",
    ],
  },
  {
    company: "昆明市春城剧院有限公司",
    role: "平面设计",
    roleEn: "Graphic Designer",
    time: "2020.02 - 2021.05",
    tags: ["演艺宣发", "活动拍摄", "社媒运营"],
    desc: [
      "担任企业宣传主力，负责演出活动主视觉设计与线上线下全渠道物料延展。",
      "协同市场部制定视觉策略，针对不同剧目风格调整设计语言，增强传播效果。",
      "独立完成演出现场的纪实拍摄与后期归档，用于对外发布与内部留存。",
    ],
  },
];

const PORTFOLIO_ITEMS = [
  {
    id: 9,
    title: "自然生态摄影系列",
    titleEn: "WILDLIFE & NATURE SERIES",
    category: ["photo"],
    tag: "摄影创作 / 个人系列",
    desc: "克制的色彩与自然光影下的微观情绪记录。画面以低饱和、胶片颗粒为基调，聚焦于动物、植物等自然元素，追求干净构图与安静的孤独感表达。",
    bg: "bg-stone-100",
    galleryColor: "bg-stone-50",
    role: "摄影创作",
    time: "长期积累",
    client: "个人创作",
    tools: "A7C2 LR",
    thought:
      "通过自然光创造画面的层次感，利用大光圈、深色背景将主体清晰、安静地从环境中分离。在构图上，追求画面简洁，将焦点留给主体形态和光影变化，传达一种内敛而有力量的情绪。",
    coverImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/DSC08082.jpg?raw=true",
    mediaAspect: "aspect-[3/4]",
    longImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/%E9%95%BF%E5%9B%BE.jpg?raw=true",
    imagePosition: "object-center",
  },
  {
    id: 8,
    title: "会员日四季主题视觉",
    titleEn: "SEASONAL MEMBER CAMPAIGN",
    category: ["graphic"], // Standard graphic
    tag: "运营设计 / 系列海报",
    desc: "针对平台月度会员日打造的系列化视觉提案。摒弃了单一固定的模版，转而在统一的版式规范下，依据时令节气（春樱、夏暑、金秋）定制差异化的视觉主题，旨在消除用户的审美疲劳，赋予常规活动以新鲜的生命力。",
    bg: "bg-gradient-to-br from-blue-50 to-pink-50",
    galleryColor: "bg-blue-50",
    role: "平面设计",
    time: "周期性项目",
    client: "商业委托",
    tools: "PS",
    thought:
      "“重复”是运营设计的大忌。在处理长线周期性活动时，策略是将“时间感”引入视觉语言。通过提取当季代表性元素（如樱花、西瓜、水墨山水）作为视觉符号，在保持品牌识别度的同时，用色彩温度调动用户的情绪感知，实现“月月有新意”的运营目标。",
    mediaAspect: "aspect-[4/3]", // Changed from 1/1 to 4/3 as requested
    coverImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/2025%E5%B9%B44%E6%9C%88%E4%BC%9A%E5%91%98%E6%97%A5%20%E8%BD%AE%E6%92%AD%E5%9B%BE.png?raw=true",
    longImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/%E9%95%BF%E5%9B%BE5.jpg?raw=true",
    imagePosition: "object-center",
  },
  {
    id: 5,
    title: "耳机产品详情页与主视觉",
    category: ["graphic", "aigc"], // Double tag
    tag: "平面设计 / 产品视觉",
    desc: "采用深蓝背景与科技光效，烘托 TWS 耳机的高端、沉浸调性。通过模块化布局与数据化图表，清晰传递音质、降噪等核心卖点。",
    bg: "bg-gradient-to-br from-slate-900 to-slate-800",
    galleryColor: "bg-slate-50",
    role: "平面设计",
    time: "3 天",
    client: "概念设计",
    tools: "PS AIGC",
    thought:
      "运用深色背景和蓝色光效，营造沉浸的“声学空间”。头图以大尺寸渲染图占据视觉中心，详情页采用模块化布局，理性且高效地传递产品价值。",
    coverImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/%E8%80%B3%E6%9C%BA%E5%A4%B4%E5%9B%BE.jpg?raw=true",
    mediaAspect: "aspect-[3/4]",
    longImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/%E8%80%B3%E6%9C%BA%E8%AF%A6%E6%83%85%E9%A1%B5.png?raw=true",
    imagePosition: "object-center",
  },
  {
    id: 3,
    title: "产品渲染",
    en: "HARDWARE & PACKAGING VISUALIZATION",
    category: ["3d"],
    tag: "Blender / C4D",
    desc: "情绪光影与材质质感的精准复刻。 专注于化妆品、日化、快消品等商业产品的视觉表达。",
    bg: "bg-gradient-to-br from-purple-50 to-pink-50",
    galleryColor: "bg-purple-50",
    role: "视觉设计",
    time: "一周",
    client: "技法探索",
    tools: "Blender C4D",
    thought:
      "运用环境光与区域布光的对比，呈现不同材质在真实光影下的细腻质感。通过控制光比与反射，让画面保持留白与平衡，使产品在干净的视觉中自然凸显。",
    coverImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/1-%E5%90%8E%E6%9C%9F%201.png.png?raw=true",
    mediaAspect: "aspect-[1/1]",
    longImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/%E9%95%BF%E5%9B%BE2.jpg?raw=true",
    imagePosition: "object-center",
  },
  {
    id: 4,
    title: "人像摄影",
    en: "Portrait Photography",
    category: ["photo"],
    tag: "摄影创作 / 个人系列",
    desc: "低饱和与胶片颗粒调色，捕捉人物内敛的细微情绪与自然光影的柔和和流动。画面以克制的色彩为基调，通过景深分离主体与环境，追求干净构图与安静的表达。",
    bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
    galleryColor: "bg-emerald-50",
    role: "摄影创作",
    time: "长期积累",
    client: "个人创作",
    tools: "A7C2 LR",
    thought:
      "捕捉情绪凝固与流动的瞬间，利用大光圈与前景元素创造空间层次和梦幻氛围。在构图上，追求克制留白，将焦点留给人物形态与光影的对话，传达一种内敛而有厚度的叙事感。",
    coverImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/PixPin_2025-11-27_16-26-56.jpg?raw=true",
    mediaAspect: "aspect-[3/4]",
    longImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/%E9%95%BF%E5%9B%BE1.jpg?raw=true",
    imagePosition: "object-center",
  },
  {
    id: 1,
    title: "国潮节日营销视觉",
    en: "Festive Campaign Identity",
    category: ["graphic", "aigc"], // Double tag
    tag: "平面设计 / 节日营销", // FIXED: Restored missing tag
    desc: "以节日营销为契机，通过限时、分阶段的三重跨界联名福利，吸引并回馈粉丝。视觉上采用节日、中式背景，突出福利主体——兔子形象，营造喜庆氛围。",
    bg: "bg-gradient-to-br from-red-50 to-orange-50",
    galleryColor: "bg-red-50",
    role: "平面设计",
    time: "3天",
    client: "商业委托",
    tools: "PS AIGC",
    thought:
      "信息层级：突出活动主题和“三重福利”的利益点。视觉风格：采用喜庆的红色、金色调搭配暗蓝背景，符合中秋国庆节日氛围，结合IP形象（兔子）增加亲和力。交互引导：明确给出扫码立即参与的行动呼吁（CTA），提升转化效率。",
    coverImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/PixPin_2025-11-27_20-26-59.jpg?raw=true",
    mediaAspect: "aspect-[4/3]",
    longImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/%E9%95%BF%E5%9B%BE3.jpg?raw=true",
    imagePosition: "object-center",
  },
  {
    id: 6,
    title: "日常运营活动视觉",
    en: "LOYALTY PROGRAM CAMPAIGN",
    category: ["graphic"],
    tag: "运营设计 / 弹窗与海报",
    // UPDATED: Removed specific brand name
    desc: "面向会员权益平台的防伪扫码活动视觉。采用高明度蓝橙与 3D 字体，让画面更轻盈。弹窗突出核心利益点，主海报用模块化结构清晰梳理规则。",
    bg: "bg-gradient-to-br from-blue-50 to-blue-100",
    galleryColor: "bg-blue-50",
    role: "平面设计",
    time: "3 天",
    client: "商业委托",
    tools: "PS",
    // UPDATED: Removed specific brand name in thought
    thought:
      "用清透的天空蓝传达扫码验真的安全感，以暖橙突出积分奖励，在小屏里保持信息清晰，不让促销氛围压过可读性。",
    coverImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/%E6%9C%AC%E9%A6%99%E5%B9%B8%E8%BF%90%E6%95%B0%C2%B7%E6%89%AB%E7%A0%81%E4%BA%AB%E5%A5%BD%E8%BF%90%20%E5%BC%B9%E7%AA%97.png?raw=true", // NEW COVER: Pop-up Image (弹窗)
    longImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/%E6%9C%AC%E9%A6%99%E5%B9%B8%E8%BF%90%E6%95%B0%C2%B7%E6%89%AB%E7%A0%81%E4%BA%AB%E5%A5%BD%E8%BF%90%20%E4%B8%BB%E6%B5%B7%E6%8A%A5.png?raw=true", // NEW LONG IMAGE: Main Poster (主海报)
    mediaAspect: "aspect-[1/1]", // Reverting to 1/1 for a square crop of the pop-up, which works better in the grid.
    imagePosition: "object-center",
  },
  {
    id: 7,
    title: "会员中心 UI 体系升级",
    en: "LOYALTY APP UI SYSTEM",
    category: ["ui"],
    tag: "UI / UX 设计",
    // UPDATED: Removed specific brand name
    desc: "针对某头部快消集团的会员权益平台进行界面重构。将验真、问卷、直播、积分兑换等高频入口以卡片方式重新组织，提高信息扫描效率。整体视觉采用清爽的微质感，兼顾大促场景的活力与日常使用的舒适度。",
    bg: "bg-gradient-to-br from-red-50 to-orange-50",
    galleryColor: "bg-gray-50",
    role: "UI 设计",
    time: "2 周",
    client: "商业委托",
    tools: "Figma",
    thought:
      "面对高密度的功能入口，核心挑战在于“秩序感”的建立。摒弃了以往的列表式堆叠，转而采用栅格化图标与卡片容器，明确划分功能区（工具/活动/挑战）。色彩上，保留品牌红作为强调色，大面积留白以确保长时间使用的视觉舒适性。",
    coverImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/PixPin_2025-11-28_09-01-38.jpg?raw=true",
    mediaAspect: "aspect-[3/4]",
    longImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/Portrait%20_%2053.png?raw=true",
    imagePosition: "object-top",
  },
  {
    id: 2,
    title: "3D 游戏化营销视觉",
    category: ["graphic", "aigc"], // Double tag
    tag: "平面设计 / 电商活动",
    desc: "通过限时短周期的积分抽奖活动（每周三10:00至周四20:00），以“最高8800分”的巨大数字利益点吸引用户参与。素材设计采用高饱和度的橙红暖色调和3D卡通风格，营造抢购、福利、惊喜的浓烈活动氛围。",
    bg: "bg-gradient-to-br from-orange-50 to-red-50",
    galleryColor: "bg-orange-50",
    role: "平面设计",
    time: "2天",
    client: "商业委托",
    tools: "PS AIGC",
    thought:
      "采用了高光、高饱和、立体化的电商/游戏风格，目的是为了最大化抓人眼球，迅速传达“福利”、“有趣”和“可获得性”，尤其适合在平台内弹窗、轮播图等寸土寸金的位置抢占注意力。",
    coverImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/%E6%9C%AC%E9%A6%99%E4%B8%96%E7%95%8C%20%E7%A7%AF%E5%88%86%E5%8A%A0%E6%B2%B9%E7%AB%99%20%E7%AC%AC%E4%B8%80%E6%9C%9F%20%E8%BD%AE%E6%92%AD%E5%9B%BE.png?raw=true",
    mediaAspect: "aspect-[4/3]",
    longImage:
      "https://github.com/akinal5765-byte/Portfolio/blob/main/photos/%E9%95%BF%E5%9B%BE4.jpg?raw=true",
    imagePosition: "object-center",
  },
];

const useMasonry = (items) => {
  const [columns, setColumns] = useState([[], [], []]);
  useEffect(() => {
    const calculateColumns = () => {
      const width = window.innerWidth;
      let numCols = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
      const newCols = Array.from({ length: numCols }, () => []);
      items.forEach((item, index) => newCols[index % numCols].push(item));
      setColumns(newCols);
    };
    calculateColumns();
    window.addEventListener("resize", calculateColumns);
    return () => window.removeEventListener("resize", calculateColumns);
  }, [items]);
  return columns;
};

export default function App() {
  const [activeTab, setActiveTab] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const filteredItems = useMemo(() => {
    // UPDATED: Filter logic now checks if the category array includes the activeTab
    const items =
      activeTab === "all"
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter((item) => item.category.includes(activeTab));

    return items.map((item) => ({
      ...item,
      mediaAspect: item.mediaAspect || "aspect-[4/3]",
    }));
  }, [activeTab]);

  const masonryColumns = useMasonry(filteredItems);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 }
    );
    setTimeout(
      () =>
        document
          .querySelectorAll(".reveal-wrapper")
          .forEach((el) => observer.observe(el)),
      100
    );
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [activeTab, masonryColumns]);

  // UPDATED: Added ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setModalItem(null);
    };

    if (modalItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalItem]);

  // Data for the Floating Info Cards (REVERTED TO PROJECTS)
  const heroFloatingData = useMemo(
    () => [
      {
        title: "05 Years", // Changed from 5+ Years to 05 Years
        subtitle: "Experience",
        icon: Clock,
        position: "top-0 -right-4 md:right-0",
        delay: "0.1s", // Hero delay 1
      },
      {
        title: "20+ Projects",
        subtitle: "Portfolio",
        icon: Layers,
        position: "top-12 -left-4 md:-left-12",
        delay: "0.2s", // Hero delay 2
      },
      {
        title: "10+ Tools",
        subtitle: "Creative Stack",
        icon: PenTool,
        position: "bottom-4 -right-4 md:-right-12",
        delay: "1s",
      },
      {
        title: "04 Domains",
        subtitle: "Cross-functional",
        icon: Component,
        position: "bottom-0 -left-12 md:left-0",
        delay: "1.5s", // Hero delay 4
      },
    ],
    []
  );

  // Hero Text Entry Animation Control
  const textEntryDelay = {
    status: "0.5s",
    title: "0.6s",
    subtitle: "0.7s",
    buttons: "0.8s",
  };

  return (
    <div className="min-h-screen relative text-[#1d1d1f] font-sans selection:bg-[#0071e3]/20 selection:text-[#0071e3] overflow-x-hidden bg-[#fbfbfd]">
      <div className="bg-noise"></div>

      {/* ... Background Blobs ... */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-100/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-100/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-indigo-100/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob delay-4000"></div>
      </div>

      {/* --- Hidden SVG Filter for Liquid Effect --- */}
      <svg className="hidden">
        <defs>
          {/* HUGE DISTORTION PARAMETERS HERE */}
          {/* Scale 100 creates the strong refraction/liquid bending visible in the reference image */}
          <filter
            id="liquid-distortion"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            {/* Increased baseFrequency to 0.015 for a tighter ripple, numOctaves to 3 for detail */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              result="warp"
            />
            {/* Increased scale to 100 for stronger refraction */}
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale="100"
              in="SourceGraphic"
              in2="warp"
            />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>

      {/* ... Navbar (Capsule Style) ... */}
      <nav
        className={`fixed z-50 transition-all duration-500 ease-out left-1/2 -translate-x-1/2 ${
          scrolled
            ? "top-4 w-[90%] max-w-[850px] h-14 rounded-full liquid-control-base px-6" /* Used unified liquid-control-base */
            : "top-0 w-full h-24 bg-transparent px-6"
        }`}
      >
        <div
          className={`h-full flex justify-between items-center ${
            scrolled ? "w-full" : "max-w-[1024px] mx-auto w-full"
          }`}
        >
          <a href="#" className="flex items-center gap-2 group">
            {/* MODIFIED: Used a sleek Aperture icon for a minimal logo feel */}
            <div className="w-8 h-8 rounded-lg bg-[#1d1d1f] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <Aperture size={18} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col justify-center h-full">
              {/* MODIFIED: Changed from Name to PORTFOLIO */}
              <span className="text-sm font-bold leading-none tracking-tight text-[#1d1d1f] uppercase">
                PORTFOLIO
              </span>
              {/* MODIFIED: Changed subtitle to VISUAL DESIGN */}
              <span className="text-[10px] text-[#86868b] leading-none mt-0.5 tracking-wider uppercase font-semibold">
                VISUAL DESIGN
              </span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide text-[#1d1d1f]/70">
            {["关于 About", "作品 Works", "经历 Career", "联系 Contact"].map(
              (item, idx) => {
                const [cn] = item.split(" ");
                const href = `#${
                  cn === "关于"
                    ? "about"
                    : cn === "作品"
                    ? "work"
                    : cn === "经历"
                    ? "experience"
                    : "contact"
                }`;
                return (
                  <a
                    key={idx}
                    href={href}
                    className="hover:text-[#0071e3] transition-colors"
                  >
                    {item}
                  </a>
                );
              }
            )}
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-2">
            {/* Desktop CTA: Visible only on Desktop */}
            <a
              href="#contact"
              className="hidden md:flex h-8 px-5 items-center justify-center rounded-full transition-all text-xs font-semibold tracking-wide liquid-glass-btn"
              style={{
                backgroundColor: "rgba(0, 113, 227, 0.95)", // Increased opacity to 0.95 for pure color
                backdropFilter: "blur(10px) saturate(200%)",
                WebkitBackdropFilter: "blur(10px) saturate(200%)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow:
                  "0 8px 20px rgba(0, 113, 227, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
              }}
            >
              合作咨询
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#1d1d1f] p-2 rounded-full hover:bg-black/5 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ... Mobile Menu ... */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/90 backdrop-blur-2xl pt-24 px-8 animate-fade-in-up">
          <div className="flex flex-col gap-6 text-xl font-semibold text-[#1d1d1f]">
            {["关于 About", "作品 Works", "经历 Career", "联系 Contact"].map(
              (item, idx) => {
                const [cn] = item.split(" ");
                const href = `#${
                  cn === "关于"
                    ? "about"
                    : cn === "作品"
                    ? "work"
                    : cn === "经历"
                    ? "experience"
                    : "contact"
                }`;
                return (
                  <a
                    key={idx}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="border-b border-black/5 pb-4"
                  >
                    {item}
                  </a>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* ... Hero Section ... */}
      <section className="pt-32 md:pt-48 pb-20 md:pb-40 px-6 max-w-[1024px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-16">
          {/* Image Section: Order 1 on mobile, Order 2 on Desktop */}
          <div className="w-full md:w-auto flex justify-center md:justify-end order-1 md:order-2 relative md:-mt-24">
            <div className="relative w-64 h-64 md:w-80 md:h-80 transform md:rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="absolute bottom-0 left-0 right-0 h-[85%] bg-white/40 backdrop-blur-xl rounded-[40px] border border-white/60 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] z-0"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] z-10 flex items-end justify-center">
                <img
                  src="https://github.com/akinal5765-byte/Portfolio/blob/main/photos/my-avatar.png?raw=true"
                  alt="3D Avatar"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* --- FLOATERS: Glass Cards around Avatar (4 Data Points) --- */}
              {heroFloatingData.map((data, index) => (
                <FloatingGlassCard
                  key={index}
                  className={data.position}
                  delay={data.delay}
                >
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-black/5 flex items-center justify-center text-[#1d1d1f]">
                    {" "}
                    {/* Icon Size Reduced */}
                    <data.icon size={14} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1d1d1f] leading-none">
                      {data.title}
                    </span>{" "}
                    {/* Text Size Reduced */}
                    <span className="text-[8px] text-[#86868b] font-bold uppercase tracking-wider leading-none mt-1">
                      {data.subtitle}
                    </span>{" "}
                    {/* Text Size Reduced */}
                  </div>
                </FloatingGlassCard>
              ))}
            </div>
          </div>

          {/* Text Section: Order 2 on mobile, Order 1 on Desktop */}
          <div className="flex-1 flex flex-col items-start text-left z-10 order-2 md:order-1 w-full md:w-auto">
            {/* Status Tag - UPDATED TEXT */}
            <div
              className="hero-text-entry inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-black/5 shadow-sm mb-6 md:mb-8 cursor-default hover:scale-105 transition-transform"
              style={{ animationDelay: textEntryDelay.status }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-[#6e6e73] tracking-wider uppercase ml-1">
                开放合作中
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="hero-text-entry text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-[#1d1d1f] md:whitespace-nowrap"
              style={{ animationDelay: textEntryDelay.title }}
            >
              理性构建视觉秩序，
              <br />
              <span className="text-[#86868b]">感性触达人心。</span>
            </h1>

            {/* Subtitle / Introduction - MODIFIED */}
            <p
              className="hero-text-entry text-lg md:text-xl font-medium text-[#1d1d1f]/80 mb-8 leading-relaxed tracking-tight w-full md:whitespace-nowrap"
              style={{ animationDelay: textEntryDelay.subtitle }}
            >
              {/* REMOVED: Name, ADDED: Professional Title */}
              视觉设计师 / 摄影创作者
              <br />
              <span className="text-[#86868b] font-normal text-base">
                在逻辑与美学之间寻找平衡，构建清晰且有温度的视觉叙事。
              </span>
            </p>

            {/* Buttons */}
            <div
              className="hero-text-entry flex flex-wrap gap-4"
              style={{ animationDelay: textEntryDelay.buttons }}
            >
              <a
                href="#work"
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#1d1d1f] text-white font-medium shadow-[0_4px_14px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transition-all duration-300 text-sm relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  浏览作品{" "}
                  <ChevronRight
                    size={14}
                    className="text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer-subtle pointer-events-none" />
              </a>

              <a
                href="#experience"
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/60 backdrop-blur-md text-[#1d1d1f] border border-black/5 font-medium hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] text-sm"
              >
                {/* FIXED: Changed group-hover:-translate-y-0.5 to match the first button's horizontal logic only, removing diagonal movement for the briefcase icon. */}
                职业经历{" "}
                <Briefcase
                  size={14}
                  className="text-[#86868b] group-hover:text-[#1d1d1f] group-hover:translate-x-0.5 transition-all duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ... About Section ... */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-[1024px] mx-auto px-6">
          <SectionHeader en="About Me" cn="关于我" />

          <div className="reveal-wrapper mb-6">
            {" "}
            {/* Unified spacing with gap-6 */}
            {/* UPDATED: TiltCard now uses liquid-control-base */}
            <TiltCard className="liquid-control-base rounded-[32px] p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start relative z-10">
                <div className="flex-1 text-left">
                  <p className="text-[#424245] leading-relaxed text-base md:text-lg font-normal">
                    拥有 5 年设计经验，游走于平面、UI
                    与影像之间。从商业大促到品牌重塑，我擅长在理性的商业逻辑中注入感性的视觉叙事。不仅精通
                    Figma、PS 等主流工具，更致力于探索 AIGC 与 3D
                    技术的边界，以全栈能力为品牌提供具有差异化与生命力的视觉解决方案。
                  </p>
                </div>

                {/* Right: Stats Grid (2x2) */}
                <div className="w-full md:w-auto shrink-0">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8">
                    {/* Item 1 */}
                    <div
                      className="staggered-entry"
                      style={{ transitionDelay: "0.15s" }}
                    >
                      <div className="text-3xl font-bold text-[#1d1d1f] tracking-tight tabular-nums">
                        05
                      </div>
                      <div className="text-[10px] text-[#86868b] uppercase mt-1 font-bold tracking-wider">
                        Years Exp.
                      </div>
                    </div>
                    {/* Item 2 (REVERTED: Projects) */}
                    <div
                      className="staggered-entry"
                      style={{ transitionDelay: "0.30s" }}
                    >
                      <div className="text-3xl font-bold text-[#1d1d1f] tracking-tight tabular-nums">
                        20
                        <span className="text-sm font-normal text-[#86868b] ml-0.5 align-top">
                          +
                        </span>
                      </div>
                      <div className="text-[10px] text-[#86868b] uppercase mt-1 font-bold tracking-wider">
                        Projects
                      </div>
                    </div>
                    {/* Item 3 */}
                    <div
                      className="staggered-entry"
                      style={{ transitionDelay: "0.45s" }}
                    >
                      <div className="text-3xl font-bold text-[#1d1d1f] tracking-tight tabular-nums">
                        10
                        <span className="text-sm font-normal text-[#86868b] ml-0.5 align-top">
                          +
                        </span>
                      </div>
                      <div className="text-[10px] text-[#86868b] uppercase mt-1 font-bold tracking-wider">
                        Tools
                      </div>
                    </div>
                    {/* Item 4 */}
                    <div
                      className="staggered-entry"
                      style={{ transitionDelay: "0.60s" }}
                    >
                      <div className="text-3xl font-bold text-[#1d1d1f] tracking-tight tabular-nums">
                        04
                      </div>
                      <div className="text-[10px] text-[#86868b] uppercase mt-1 font-bold tracking-wider">
                        Domains
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Skills Section as Chips */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {" "}
            {/* Unified spacing with mt-6 (24px) */}
            {/* Design Skills */}
            <div className="reveal-wrapper delay-100">
              <TiltCard className="liquid-control-base rounded-[24px] p-6 h-full flex flex-col items-start">
                <div className="flex items-center gap-2 mb-4 text-[#0071e3]">
                  <PenTool size={18} />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Graphic & UI
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_TAGS.design.map((skill, i) => (
                    <div
                      key={skill.name}
                      className="skill-chip staggered-entry"
                      style={{ transitionDelay: `${i * 0.07 + 0.1}s` }}
                    >
                      <skill.icon size={14} /> {skill.name}
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
            {/* AIGC Skills */}
            <div className="reveal-wrapper delay-200">
              <TiltCard className="liquid-control-base rounded-[24px] p-6 h-full flex flex-col items-start">
                <div className="flex items-center gap-2 mb-4 text-emerald-600">
                  <Sparkles size={18} />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    AI Generation
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_TAGS.aigc.map((skill, i) => (
                    <div
                      key={skill.name}
                      className="skill-chip staggered-entry"
                      style={{ transitionDelay: `${i * 0.07 + 0.2}s` }}
                    >
                      <skill.icon size={14} /> {skill.name}
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
            {/* 3D Skills */}
            <div className="reveal-wrapper delay-300">
              <TiltCard className="liquid-control-base rounded-[24px] p-6 h-full flex flex-col items-start">
                <div className="flex items-center gap-2 mb-4 text-purple-600">
                  <Box size={18} />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    3D Design
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_TAGS.threeD.map((skill, i) => (
                    <div
                      key={skill.name}
                      className="skill-chip staggered-entry"
                      style={{ transitionDelay: `${i * 0.07 + 0.3}s` }}
                    >
                      <skill.icon size={14} /> {skill.name}
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* ... Work, Experience, Contact Sections ... */}

      <section id="work" className="py-24 relative z-10">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="mb-6 md:mb-0">
              <SectionHeader en="Selected Works" cn="精选作品" />
            </div>
            {/* Works Filter Bar */}
            <div className="flex w-full md:w-auto md:min-w-[320px] p-1 rounded-full justify-between md:justify-start overflow-x-auto no-scrollbar liquid-control-base">
              {[
                { id: "all", label: "全部" },
                { id: "graphic", label: "平面" },
                { id: "ui", label: "UI" },
                { id: "3d", label: "3D" },
                { id: "aigc", label: "AIGC" },
                { id: "photo", label: "摄影" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 md:flex-none px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap text-center ${
                    activeTab === tab.id
                      ? "bg-white text-[#1d1d1f] shadow-sm"
                      : "text-[#86868b] hover:text-[#1d1d1f]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Works Grid: gap-6 for columns and rows */}
          <div className="flex gap-6 w-full items-start">
            {masonryColumns.map((colItems, colIndex) => (
              <div
                key={colIndex}
                className="flex-1 min-w-0 flex flex-col gap-6 w-full"
              >
                {colItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="reveal-wrapper group w-full"
                    style={{
                      /* Staggered delay for works: based on column index + item index */
                      transitionDelay: `${colIndex * 0.15 + index * 0.08}s`,
                    }}
                  >
                    {/* UPDATED: TiltCard now uses liquid-control-base */}
                    <TiltCard
                      onClick={() => setModalItem(item)}
                      className="liquid-control-base rounded-[32px] overflow-hidden cursor-pointer w-full relative isolate transition-all duration-500 flex flex-col"
                    >
                      <div
                        className={`relative w-full ${item.mediaAspect} z-10 group-hover:scale-[1.01] transition-transform duration-700 bg-gray-100`}
                      >
                        {item.coverImage ? (
                          <>
                            <img
                              src={item.coverImage}
                              className="w-full h-full object-cover block relative z-10"
                              alt={item.title}
                            />
                            <div className="absolute -bottom-[400px] left-0 right-0 h-[500px] z-0 pointer-events-none">
                              <div className="w-full h-full relative overflow-hidden">
                                <img
                                  src={item.coverImage}
                                  className="w-full h-full object-cover blur-[50px] scale-150 opacity-90 origin-top animate-glow-breathe"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div
                            className={`absolute inset-0 w-full h-full ${item.bg} flex items-center justify-center`}
                          >
                            {item.category.includes("ui") && (
                              <Monitor size={48} />
                            )}
                            {item.category.includes("graphic") && (
                              <Layers size={48} />
                            )}
                            {item.category.includes("3d") && <Box size={48} />}
                            {item.category.includes("photo") && (
                              <Camera size={48} />
                            )}
                            {item.category.includes("aigc") && (
                              <Bot size={48} />
                            )}
                          </div>
                        )}
                      </div>
                      {/* Inner text block needs its own light background for legibility over the image blur */}
                      <div className="relative z-20 flex flex-col justify-between flex-1 p-6 bg-gradient-to-b from-white/70 to-white/90 backdrop-blur-xl border-t border-white/40">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex flex-col items-start w-full min-w-0">
                            <div className="flex items-center mb-2 opacity-80">
                              <span className="badge-style">{item.tag}</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#1d1d1f] mb-0.5 tracking-tight group-hover:text-[#0071e3] transition-colors truncate w-full">
                              {item.title}
                            </h3>
                            <div className="text-[10px] font-semibold text-[#86868b] mb-3 uppercase tracking-[0.2em] opacity-70 truncate w-full">
                              {item.titleEn}
                            </div>
                            <p className="text-xs text-[#424245] leading-relaxed line-clamp-2 font-medium opacity-90">
                              {item.desc}
                            </p>
                          </div>
                          <div className="shrink-0 w-8 h-8 rounded-full bg-white/50 backdrop-blur-md border border-white/40 flex items-center justify-center text-[#1d1d1f]/70 shadow-sm group-hover:bg-[#0071e3] group-hover:text-white group-hover:border-[#0071e3] group-hover:scale-110 transition-all duration-300 mt-1">
                            <ArrowUpRight size={14} strokeWidth={2} />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 relative z-10">
        <div className="max-w-[1024px] mx-auto px-6">
          <SectionHeader en="Timeline" cn="职业生涯" />
          <div className="space-y-6">
            {" "}
            {/* Keep vertical space-y-6 */}
            {EXPERIENCE_DETAILED.map((exp, index) => (
              <div
                key={index}
                className="reveal-wrapper group"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {/* UPDATED: TiltCard now uses liquid-control-base */}
                <TiltCard className="liquid-control-base rounded-[28px] p-6 md:p-8">
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5 pb-5 border-b border-black/5">
                      <div>
                        <h3 className="text-xl font-bold text-[#1d1d1f] mb-1 tracking-tight group-hover:text-[#0071e3] transition-colors">
                          {exp.company}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="text-[#1d1d1f] font-medium text-sm">
                            {exp.role}
                          </span>
                          <span className="badge-style ml-2">{exp.roleEn}</span>
                        </div>
                      </div>
                      <div className="self-start md:self-auto shrink-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/50 border border-blue-100/50 text-[#0071e3] text-xs font-semibold backdrop-blur-sm">
                          <Calendar size={12} className="opacity-80" />
                          {exp.time}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      {exp.desc.map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-3 text-sm text-[#424245] leading-relaxed staggered-entry"
                          style={{
                            transitionDelay: `${index * 0.15 + i * 0.07}s`,
                          }}
                        >
                          <span className="text-[#0071e3]/40 mt-2 text-[6px] shrink-0">
                            ●
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <span
                          key={tag}
                          className="badge-style staggered-entry"
                          style={{
                            transitionDelay: `${index * 0.15 + i * 0.05}s`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-24 border-t border-black/5 bg-white/40 backdrop-blur-lg relative z-10"
      >
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <SectionHeader en="Connect" cn="保持联系" />
            <p className="text-lg text-[#86868b] leading-relaxed font-medium mt-6">
              目前常驻 <span className="text-[#1d1d1f]">昆明</span>
              ，随时准备开始新的全职工作或项目合作。
            </p>
          </div>
          {/* UPDATED: Contact Cards gap increased from gap-4 to gap-6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Contact Card 1 */}
            <ContactCopyCard
              icon={Mail}
              label="Email"
              value="576584015@qq.com"
              colorClass="bg-blue-50 text-[#0071e3]"
              delay="delay-100"
            />
            {/* Contact Card 2 */}
            <ContactCopyCard
              icon={MessageCircle}
              label="WeChat"
              value="akina5765"
              colorClass="bg-emerald-50 text-emerald-600"
              delay="delay-200"
            />
          </div>
          <div className="max-w-2xl mt-16 text-[10px] uppercase font-bold text-[#86868b] flex items-center gap-2 tracking-widest opacity-60">
            <MapPin size={10} />
            {/* MODIFIED: Used your English name in copyright */}
            <span>Yunnan, Kunming</span>
            <span className="ml-2">© 2025 Li Yukun</span>
          </div>
        </div>
      </section>

      {/* Mobile Floating CTA (Visible only on mobile, hidden when menu is open) */}
      {!mobileMenuOpen && (
        <div className="md:hidden fixed bottom-6 right-6 z-40 animate-fade-in">
          {/* Applied 'liquid-glass-btn' class to mobile floating button as well */}
          <a
            href="#contact"
            className="flex items-center gap-2 px-5 py-3 rounded-full text-white shadow-[0_8px_20px_rgba(0,113,227,0.3)] hover:scale-105 active:scale-95 transition-all font-semibold text-sm backdrop-blur-sm border border-white/10 liquid-glass-btn"
          >
            <MessageCircle size={18} />
            <span>合作咨询</span>
          </a>
        </div>
      )}

      {/* --- MODAL --- */}
      {modalItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4">
          <div
            className="absolute inset-0 modal-backdrop-blur animate-fade-in"
            onClick={() => setModalItem(null)}
          ></div>

          <div className="relative w-full md:max-w-4xl h-full md:h-[90vh] bg-white rounded-none md:rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-scale-in">
            {/* Close Button: Top-Right on Desktop, Bottom-Center on Mobile */}
            {/* UPDATED: Used liquid-control-base for the close button. */}
            <button
              onClick={() => setModalItem(null)}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:absolute md:top-6 md:right-6 md:bottom-auto md:left-auto md:translate-x-0 w-12 h-12 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-white/90 transition-all shadow-lg md:shadow-sm text-[#1d1d1f] ring-1 ring-white/30 liquid-control-base"
            >
              <X size={20} />
            </button>

            <div className="flex-1 overflow-y-auto no-scrollbar relative bg-white">
              <div
                className={`w-full aspect-[4/3] ${modalItem.bg} relative flex items-center justify-center shrink-0 overflow-hidden`}
              >
                {/* Background Content (The Image) */}
                <div className={`absolute inset-0 z-0`}>
                  {modalItem.coverImage ? (
                    <img
                      src={modalItem.coverImage}
                      alt={modalItem.title}
                      className="w-full h-full object-cover block"
                    />
                  ) : (
                    <div
                      className={`w-full h-full ${modalItem.bg} flex items-center justify-center`}
                    >
                      {/* Placeholder Icon */}
                    </div>
                  )}
                </div>

                {/* Image Fade/Gradient Mask (FIXED: Restored the white gradient mask) */}
                <div className="absolute bottom-0 left-0 right-0 h-40 md:h-64 bg-gradient-to-t from-white via-white/25 to-transparent z-20 pointer-events-none"></div>
              </div>

              <div className="px-4 md:px-12 relative -mt-20 md:-mt-32 z-30">
                {/* UPDATED: Info Island now uses liquid-control-base */}
                <div className="liquid-control-base rounded-[24px] p-6 md:p-8 mb-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-8 justify-between">
                    <div className="w-full md:w-[60%]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="badge-style">{modalItem.tag}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-2 tracking-tight leading-tight">
                        {modalItem.title}
                      </h2>
                      <div className="text-xs font-bold text-[#86868b] uppercase tracking-widest opacity-60 mb-6">
                        {modalItem.titleEn}
                      </div>
                      <p className="text-base md:text-lg text-[#424245] leading-relaxed font-medium">
                        {modalItem.desc}
                      </p>
                    </div>

                    <div className="w-full md:w-[35%] grid grid-cols-2 gap-x-8 gap-y-4 text-sm border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-8 min-w-0">
                      <div>
                        <div className="text-[10px] text-[#86868b] uppercase tracking-wider font-bold mb-1">
                          角色
                        </div>
                        <div className="font-semibold text-[#1d1d1f]">
                          {modalItem.role || "视觉设计"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#86868b] uppercase tracking-wider font-bold mb-1">
                          周期
                        </div>
                        <div className="font-semibold text-[#1d1d1f]">
                          {modalItem.time || "4 周"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#86868b] uppercase tracking-wider font-bold mb-1">
                          项目性质
                        </div>
                        <div className="font-semibold text-[#1d1d1f]">
                          {modalItem.client || "保密项目"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#86868b] uppercase tracking-wider font-bold mb-1">
                          工具
                        </div>
                        <div className="font-semibold text-[#1d1d1f]">
                          {modalItem.tools || "Figma, Blender"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-black/5">
                    <h3 className="text-sm font-bold text-[#1d1d1f] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Sparkles size={14} className="text-yellow-500" />{" "}
                      设计思考
                    </h3>
                    <p className="text-[#424245] leading-relaxed text-sm md:text-base">
                      {modalItem.thought ||
                        "在逻辑与美学之间寻找平衡，构建清晰且有温度的视觉叙事。通过对色彩、排版和留白的精确控制，我们实现了视觉上的平衡与信息的高效传递。"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-0 md:px-12 pb-32 flex flex-col w-full max-w-5xl mx-auto items-center">
                <div className="flex items-center gap-2 mb-6 px-6 md:px-0 w-full max-w-[1000px]">
                  <Grid3X3 size={16} className="text-[#0071e3]" />
                  <span className="text-xs font-bold text-[#1d1d1f] uppercase tracking-widest">
                    项目细节展示
                  </span>
                </div>

                <div className="w-full max-w-[1000px] bg-white rounded-none md:rounded-2xl overflow-hidden shadow-sm border border-black/5">
                  {modalItem.longImage ? (
                    <img
                      src={modalItem.longImage}
                      alt={`项目长图: ${modalItem.title}`}
                      className="w-full h-auto object-cover block"
                    />
                  ) : (
                    <div
                      className={`w-full ${
                        modalItem.galleryColor || "bg-gray-50"
                      } min-h-[1200px] flex flex-col items-center justify-center relative`}
                    >
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                      <ImageIcon
                        size={48}
                        className="text-[#1d1d1f] mb-4 opacity-20"
                      />
                      <span className="text-lg font-bold text-[#1d1d1f] uppercase tracking-widest">
                        长图展示区域
                      </span>
                      <span className="text-xs text-[#1d1d1f] mt-2 opacity-30">
                        宽度: 100% (最大 1000px) / 高度: 自适应
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}