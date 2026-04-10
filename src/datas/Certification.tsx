import { FaCertificate } from "react-icons/fa";

export const CertificationData = {
  certifications: [
    {
      id: 1,
      title: "Generative Ai",
      institution: "Coursera",
      date: "2023-05-15",
      description:
        "Completed a course on Generative AI, focusing on building applications using Langchain and integrating machine learning models.",
      skills: ["Langchain", "Generative AI", "Machine Learning"],
      icon: <FaCertificate className="text-yellow-400 text-xl" />,
      link: "https://www.coursera.org/account/accomplishments/verify/8X3Z2K5F7Y9D",
      linkText: "View Certificate",
    },
    {
      id: 2,
      title: "Langchain for Developers",
      institution: "Udemy",
      date: "2023-08-20",
      description:
        "In-depth course on Langchain, covering its applications in building AI-driven applications and workflows.",
      skills: ["Langchain", "AI Development", "Python"],
      link: "https://www.udemy.com/certificate/UC-1234567890/",
      linkText: "View Certificate",

      icon: <FaCertificate className="text-yellow-400 text-xl" />,
    },
    {
      id: 3,
      title: "MERN Stack Development",
      institution: "Udemy",
      date: "2023-10-05",
      description:
        " Comprehensive course on MERN stack development, focusing on building full-stack applications using MongoDB, Express.js, React.js, and Node.js.",
      skills: ["MERN Stack", "Full Stack Development", "JavaScript"],
      icon: <FaCertificate className="text-yellow-400 text-xl" />,
      link: "https://www.udemy.com/certificate/UC-0987654321/",
      linkText: "View Certificate",
    },
    {
      id: 4,
      title: "Flutter Development",
      institution: "Udemy",
      date: "2023-11-10",
      description:
        "Course on Flutter development, focusing on building cross-platform mobile applications with a focus on performance and user experience.",
      skills: ["Flutter", "Mobile Development", "Dart"],
      icon: <FaCertificate className="text-yellow-400 text-xl" />,
      link: "https://www.udemy.com/certificate/UC-1122334455/",
      linkText: "View Certificate",
    },
    {
      id: 5,
      title: "React Native",
      institution: "Udemy",
      date: "2023-12-01",
      description:
        "Course on React Native development, focusing on building high-performance mobile applications for both Android and iOS platforms.",
      skills: ["React Native", "Mobile Development", "JavaScript"],
      icon: <FaCertificate className="text-yellow-400 text-xl" />,
      link: "https://www.udemy.com/certificate/UC-5566778899/",
      linkText: "View Certificate",
    },
  ],
};
