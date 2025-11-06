import { useState } from "react";
import bgImage from '../assets/Untitled-design-36.png';

export default function TrainingService() {
  const [openIndex, setOpenIndex] = useState(null);

  const sections = [
    {
      title: "Master Proprietary Toolkits",
      content:
        "Gain hands-on expertise in AI Maturity, Readiness, Value, Regulation Compliance, Bias Impact, and Fairness Assessment Toolkits. Learn how to assess and improve your organization’s AI capabilities rigorously and systematically.",
    },
    {
      title: "Understand AI Authority Frameworks",
      content:
        "Dive deep into our exclusive frameworks covering AI Strategy, Enterprise AI Architecture, Solution Architecture, Developer Guidelines, Governance, and Security. Acquire the skills to implement scalable, secure, and compliant AI systems aligned with global ethical standards.",
    },
    {
      title: "AI Strategy",
      content:
        "Develop a robust AI roadmap tailored to your organization’s goals and digital transformation journey.",
    },
    {
      title: "Enterprise AI Architecture",
      content:
        "Understand how to design scalable, secure, and efficient AI systems aligned with enterprise needs.",
    },
    {
      title: "Real-World Application",
      content:
        "Through case studies, scenario-driven workshops, and interactive toolkits, participants will gain practical insights to embed responsible AI across their AI lifecycle — from strategy to deployment and monitoring",
    },
    {
      title: "Certification Preparation",
      content:
        "Our training also serves as comprehensive preparation for AI Authority’s certification programs, helping individuals and teams validate their proficiency and leadership in Responsible AI.",
    },
    {
      title: "AI Maturity Assessment Toolkit",
      content:
        "Diagnose your organization’s current state and plan your journey to AI excellence.",
    },
    {
      title: "AI Readiness Assessment Toolkit",
      content:
        "Evaluate infrastructure, skills, and culture to ensure successful AI adoption.",
    },
    {
      title: "AI Value Assessment Toolkit",
      content:
        " Quantify business impact, identify value drivers, and prioritize responsible AI investments",
    },
  ];

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Background section */}
<div
  className="relative h-screen bg-repeat bg-center flex items-center justify-center"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundAttachment: "scroll",
  }}
>
  <div className="absolute inset-0 bg-white/30" />
  <h1 className="relative text-5xl font-bold text-gray-900 z-10 text-center px-4">
    AI Authority Training Programs
  </h1>
</div>

      {/* Content section */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <p className="text-lg text-gray-600 mb-6">
          Unlock the full potential of your team with expert-led training on AI Authority’s unique proprietary resources. Our training programs empower your workforce to:
        </p>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleSection(index)}
                className="flex items-center w-full min-h-[70px] p-4 text-left text-lg font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
              >
                <span className="text-2xl font-bold w-6 text-center">
                  {openIndex === index ? "−" : "+"}
                </span>
                <span className="ml-2">{section.title}</span>
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden border-t bg-gray-50 text-gray-700 ${
                  openIndex === index ? "max-h-[200px] p-4" : "max-h-0 p-0"
                }`}
              >
                <p className="m-0 leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}