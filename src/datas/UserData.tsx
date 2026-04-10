
import {
  FaReact,
  FaMobileAlt,
  FaBrain,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export const userData = {
  user: {
    id: 1,
    name: "Ashwin V",
    domain: "Full Stack Developer",
    email: "ashwinash190105@gmail.com",
    phone: "8778310929",
    Birthday: "2005-01-19",
    Location: "Vellore, Tamil Nadu",
    pic: "",
    AboutMe:
      "I am a passionate Full-Stack Developer with expertise in building modern, scalable web and mobile applications. With hands-on experience in React.js, React Native, and Flutter, I develop responsive, high-performance user interfaces for both platforms. My backend skills include building robust APIs using Node.js and Express, paired with efficient, real-time databases like MongoDB and Firebase. As a MERN stack developer, I manage the full development lifecycle from frontend to backend. Additionally, I have a growing interest in emerging technologies like Generative AI and Machine Learning, enabling me to integrate intelligent, AI-driven features into applications. Whether it's developing dynamic websites, mobile apps, or experimenting with AI, I thrive on solving real-world problems through code.",

    Highlights: [
      "Full-Stack Developer with expertise in React.js, React Native, and Flutter",
      "Proficient in building responsive, high-performance user interfaces",
      "Experienced in backend development with Node.js, Express, MongoDB, and Firebase",
      "Skilled in developing dynamic websites and mobile applications",
      "Passionate about integrating AI-driven features into applications",
      "Strong problem-solving skills with a focus on real-world applications",
    ],

    mainSkills: [
      {
        icon: <FaReact className="text-cyan-400" />,
        title: "Full Stack Developer",
        description:
          "Experienced in building complete web applications using the MERN stack — from crafting dynamic frontends with React.js to developing secure, scalable backends with Node.js, Express, and MongoDB.",

      },
      {
        icon: <FaMobileAlt className="text-blue-400" />,
        title: "App Developer",
        description:
          "Skilled in cross-platform mobile application development using React Native and Flutter, delivering smooth, high-performance apps for both Android and iOS platforms.",
         
      },
      {
        icon: <FaBrain className="text-yellow-400" />,
        title: "AI Enthusiast",
        description:
          "Passionate about exploring Generative AI and Machine Learning, with practical experience integrating intelligent, AI-driven features into web and mobile applications.",
      },
      {
        icon: <FaCode className="text-purple-500" />,
        title: "Problem Solver",
        description:
          "Driven by curiosity and logical thinking, I enjoy breaking down complex problems and building innovative, real-world solutions through clean, efficient code.",
      },
    ],

    socialLinks: {
      github: {
        link: "https://github.com/ashwin1901",
        icon: <FaGithub className="text-white" />,
      },
      linkedIn: {
        link: "https://www.linkedin.com/in/ashwin-v-1901/",
        icon: <FaLinkedin className="text-blue-400" />,
      },
      twitter: {
        link: "https://twitter.com/ashwin_dev",
        icon: <FaTwitter className="text-blue-400" />,
      },
      instagram: {
        link: "https://instagram.com/ashwin.dev",
        icon: <FaInstagram className="text-pink-500" />,
      },
      leetcode: {
        link: "https://leetcode.com/ashwin1901",
        icon: <SiLeetcode className="text-yellow-400" />,
      },
    },

    education: {
      period: "2022 - 2027",
      course: "M.Tech in Computer Science",
      college: "VIT University",
      description:
        "Pursuing a Master's degree with a focus on software engineering and mobile application development. Engaged in research projects related to AI and machine learning.",
      skills: ["software engineering", "Database", "Development", "AIML"],
      cgpa: "8.23",
    },

    intership: [
      {
        period: "May 2022 - July 2022",
        title: "Frontend Developer (Intern)",
        company: "Sentinel GuardAI",
        description:
          "Developed dynamic web application for a cyber threat intelligence using React.js and Next.js. Implemented responsive designs with Tailwind CSS and optimized performance.",
        skills: ["React js", "Next js", "Astro", "Tailwind CSS"],
      },
    ],
    additionalStats: [
      {
        title: "Leetcode",
        value: "100+ problems solved",
        icon: <SiLeetcode className="text-yellow-400" />,
        description: "Competitive programming and algorithm practice",
        color: "amber",
      },
      {
        title: "GitHub",
        value: "50+ repositories",
        icon: <FaGithub className="text-gray-300" />,
        description: "Open-source contributions and personal projects",
        color: "gray",
      },
      {
        title: "Projects",
        value: "15+ completed",
        icon: <FaCode className="text-purple-500" />,
        description: "Diverse projects ranging from web apps to mobile apps",
        color: "purple",
      },
      {
        title: "Followers",
        value: "500+",
        icon: <FaLinkedin className="text-blue-400" />,
        description: "Professional network on LinkedIn",
        color: "blue",
      },
    ],
  },
};
