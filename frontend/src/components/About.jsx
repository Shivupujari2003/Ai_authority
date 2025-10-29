import { Link } from "react-router-dom";
import { ArrowRight, Users, Award, Shield, Target, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import circuitBackground from "../assets/Premium-Photo-_-White-circuit-background.jpg";

// Animated Counter Component
function AnimatedCounter({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target, duration]);

  return (
    <span ref={counterRef} className="text-5xl font-bold text-gray-200">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const stats = [
    { number: 150, suffix: "+", label: "Satisfied Clients" },
    { number: 15, suffix: "", label: "Years of Experience" },
    { number: 250, suffix: "", label: "Completed Projects" }
  ];

  const pillars = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Responsible AI Best Practices",
      description: "Dive into our comprehensive guides, frameworks, and tools for ethical AI design, development, and deployment. Learn how to mitigate bias, ensure transparency, and build robust, human-centric AI systems. We cover the foundational principles and practical steps to integrate responsibility at every stage of the AI lifecycle."
    },
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: "AI Best Practices Certification",
      description: "Validate your expertise and become a recognized leader in responsible AI. Our certification framework provides a rigorous, industry-recognized pathway to demonstrate your proficiency in operationalizing responsible AI, from policy to practice. Show the world you possess the critical skills to ensure ethical and effective AI development."
    },
    {
      icon: <Target className="w-12 h-12 text-blue-600" />,
      title: "AI Governance & Compliance",
      description: "Understand and navigate the evolving landscape of AI regulations, ethical standards, and accountability. Access essential resources on establishing robust governance models, ensuring compliance with emerging laws, and building transparent oversight mechanisms for your AI initiatives."
    }
  ];

  const whatWeProvide = [
    {
      title: "Clarity & Direction",
      description: "We curate and distill the most effective best practices and frameworks, offering clear, actionable guidance for your AI initiatives."
    },
    {
      title: "Quality & Trust",
      description: "Every piece of content, every guide, and every resource is rigorously vetted for accuracy, relevance, and real-world applicability, ensuring you receive reliable insights."
    },
    {
      title: "Validation & Expertise",
      description: "Our robust certification program provides an industry-recognized pathway to validate skills in responsible AI development and governance, empowering professionals to lead with confidence."
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20 px-6"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(55, 65, 81, 0.9), rgba(17, 24, 39, 0.9)), url(${circuitBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-200">
            Navigating the AI Frontier, From Ambition to Ethical Excellence
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            Empowering developers, leaders, and organizations to build, deploy, and govern AI with integrity, intelligence, and impact.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              The promise of Artificial Intelligence is immense, poised to reshape industries and lives. Yet, this rapid evolution also presents significant challenges: a lack of clear ethical guidelines, inconsistent development standards, and the absence of a unified approach to responsible deployment. This often leads to AI solutions that are opaque, biased, or simply fail to meet their intended potential.
            </p>
            
            <p>
              At <span className="font-bold text-blue-600">AI Authority</span>, we firmly believe that groundbreaking AI must also be good AI. We're building the definitive platform to bridge this critical gap, transforming abstract policies into actionable practices. We are a collective of experts and enthusiasts committed to guiding the AI community towards responsible innovation.
            </p>
          </div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What We Provide</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whatWeProvide.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-16 px-6 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Numbers Speak For Themselves</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <AnimatedCounter 
                    target={stat.number} 
                    duration={2500 + index * 500} 
                    suffix={stat.suffix} 
                  />
                </div>
                <div className="text-xl font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Pillars Section */}
      <section 
        className="py-16 px-6 bg-white relative"
        style={{
          backgroundImage: `url(${circuitBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-90"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Pillars</h2>
            <h3 className="text-2xl font-semibold text-blue-600">Guiding You Towards Trustworthy AI</h3>
            <p className="mt-6 text-lg text-gray-700 max-w-4xl mx-auto">
              At AI Authority, we understand that navigating the complexities of AI requires more than just technical skill—it demands a commitment to ethical, fair, and transparent practices. Our mission is to be your trusted guide, providing you with meticulously curated and actionable best practices that directly address your unique AI challenges.
            </p>
          </div>

          <div className="space-y-12">
            {pillars.map((pillar, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${circuitBackground})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{pillar.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-6">
                <Target className="w-10 h-10 text-gray-600 mr-4" />
                <h3 className="text-3xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be the definitive, authoritative resource for Responsible AI Best Practices, driving the responsible development and deployment of AI. We are dedicated to leading a future where artificial intelligence is synonymous with trust, fairness, and positive societal impact, with our standards and certifications being globally recognized.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-6">
                <Users className="w-10 h-10 text-gray-600 mr-4" />
                <h3 className="text-3xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                We envision a world where AI empowers progress without compromise, guided by the highest ethical standards. This vision is realized through our commitment to providing <span className="font-semibold">Comprehensive Education</span>, which offers accessible and rigorously vetted knowledge and frameworks.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We deliver <span className="font-semibold">Actionable Guidance</span>, translating complex ethical principles into practical, implementable strategies, while establishing global standards through <span className="font-semibold">Robust Certification</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your AI Journey</h2>
          <p className="text-xl mb-8 text-gray-200">
            Join us in fostering an AI ecosystem where innovation thrives responsibly, and trust is built into every algorithm.
          </p>
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
          >
            Learn More
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}