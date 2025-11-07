import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import backgroundImage from "../assets/Untitled-design-27.png";

export default function Frameworks() {
  const frameworks = [
    {
      title: "AI Strategy",
      description: "A robust AI strategy is the foundational blueprint for success, transforming ambitious goals into actionable plans. We provide comprehensive frameworks to help organizations define their AI vision, align AI initiatives with core business objectives, and identify high-impact use cases. Our approach goes beyond simple technology adoption, focusing on strategic roadmaps that consider organizational readiness, data infrastructure, and resource allocation. By establishing a clear, forward-looking AI strategy, you can ensure that every AI investment drives tangible business value and builds a competitive advantage."
    },
    {
      title: "Enterprise AI Architecture",
      description: "Building a resilient and scalable AI ecosystem requires a well-defined Enterprise AI Architecture. This specification focuses on designing a holistic, organization-wide framework that supports a multitude of AI applications and data flows. We define the standards for a secure and integrated infrastructure, from data ingestion pipelines to model deployment platforms and monitoring systems. Our guidance ensures your AI architecture is not only technologically sound but also flexible enough to evolve with future innovations, enabling seamless collaboration and standardized governance across your entire enterprise."
    },
    {
      title: "AI Solution Architecture",
      description: "The success of any individual AI project hinges on a thoughtful AI Solution Architecture. This involves the detailed design of a specific AI application, from selecting the right machine learning algorithms to defining the data pipelines and integration points with existing systems. Our expertise helps you translate business requirements into a technically sound and ethical solution, with a focus on mitigating bias, ensuring data privacy, and implementing transparency by design. A well-crafted solution architecture guarantees that your AI application is not only effective but also reliable, secure, and ready for responsible deployment."
    },
    {
      title: "AI Developer",
      description: "The AI Developer is the cornerstone of practical AI implementation. Our content and certifications provide developers with the hands-on skills needed to build, train, and deploy responsible AI applications from the ground up. This includes mastery of modern frameworks, best practices for secure coding, and techniques for ensuring fairness and transparency throughout the development lifecycle. We empower developers to create AI solutions that are robust and efficient, while also instilling a deep commitment to ethical design, making every line of code a step towards trustworthy and impactful AI."
    },
    {
      title: "AI Governance",
      description: "Effective AI Governance is the critical overlay that ensures your AI initiatives are both innovative and responsible. This specification focuses on establishing the policies, processes, and oversight structures needed to manage AI throughout its lifecycle. We define clear frameworks for accountability, risk management, and regulatory compliance, ensuring that AI decisions are transparent, auditable, and aligned with organizational values. By implementing a strong governance model, you can mitigate legal and reputational risks while fostering a culture of trust and ethical responsibility in all AI endeavors."
    },
    {
      title: "AI Security",
      description: "As AI systems become central to business operations, AI Security becomes a paramount concern. This specification addresses the unique security vulnerabilities inherent in AI, such as adversarial attacks, model inversion, and data poisoning. We provide best practices for securing your entire AI ecosystem, from protecting your data and models to implementing resilient deployment and monitoring systems. Our guidance ensures that your AI initiatives are not only high-performing and ethical but also robustly defended against malicious threats, safeguarding your assets and maintaining the integrity of your AI-driven decisions."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Background Image */}
      <section 
        className="bg-cover bg-center bg-no-repeat relative py-20"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-white bg-opacity-90"></div>
        
        <div className="relative z-10 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Frameworks
            </h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              In the rapidly evolving field of artificial intelligence, clear and consistent specifications are the foundation of responsible innovation. Our comprehensive specifications provide the definitive frameworks, methodologies, and best practices required to navigate every facet of the AI lifecycle. From crafting a high-level AI strategy to architecting secure and ethical solutions, these specifications serve as the authoritative guidelines for professionals and organizations committed to excellence. By adhering to these standards, you can ensure that your AI initiatives are not only technically sound and business-aligned, but also trustworthy, transparent, and built to withstand the complexities of today's regulatory and ethical landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Frameworks Grid Section - Clean White Background */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Frameworks Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frameworks.map((framework, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Star Icon */}
                <div className="flex justify-center mb-6">
                  <Star className="w-12 h-12 text-gray-500 fill-current" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
                  {framework.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-sm">
                  {framework.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}