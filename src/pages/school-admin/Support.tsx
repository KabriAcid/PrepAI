import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import {
  HelpCircle,
  Mail,
  Phone,
  MessageSquare,
  BookOpen,
  Video,
  FileText,
  Search,
  ChevronDown,
  ChevronRight,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I add a new student to the system?",
      answer:
        "Go to the Students page and click the 'Add Student' button. Fill in the required information including name, email, class, and contact details. You can also bulk upload students using the CSV import feature.",
    },
    {
      question: "How can I create a new exam?",
      answer:
        "Navigate to the Exams page and click 'Create Exam'. Follow the 4-step wizard to set up basic information, select subjects, configure questions, and review before creating.",
    },
    {
      question: "What exam types are supported?",
      answer:
        "The system supports JAMB, WAEC, NECO, and custom internal exams. Each type can be configured with different durations, question counts, and difficulty levels.",
    },
    {
      question: "How do I view student performance?",
      answer:
        "Go to the Performance page to view detailed analytics including subject performance, top performers, weak areas, and overall statistics. You can also export reports for further analysis.",
    },
    {
      question: "Can I import questions from external sources?",
      answer:
        "Yes, you can import questions using the CSV template available on the Question Bank page. Make sure to follow the specified format for successful import.",
    },
    {
      question: "How do I manage subjects?",
      answer:
        "Visit the Subjects page to add, edit, or deactivate subjects. Each subject can be configured with a name, short code, and status. Active subjects appear in exam creation.",
    },
    {
      question: "What happens when students complete an exam?",
      answer:
        "Results are automatically calculated and saved. You'll receive a notification, and the results appear on the Results page. Students can view their scores in their dashboard.",
    },
    {
      question: "How can I export exam results?",
      answer:
        "On the Results page, click the 'Export' button next to any exam. You can download results in CSV or PDF format for record-keeping or printing.",
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      detail: "support@PrepAI.com",
      description: "Get help via email within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone Support",
      detail: "+234 800 PrepAI",
      description: "Monday - Friday, 9 AM - 5 PM WAT",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      detail: "Start a conversation",
      description: "Chat with our support team in real-time",
    },
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides and tutorials",
      link: "#",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video walkthroughs",
      link: "#",
    },
    {
      icon: FileText,
      title: "User Manual",
      description: "Download the complete user manual",
      link: "#",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-spiritual-900">
            Help & Support
          </h1>
          <p className="text-sm text-spiritual-600 mt-1">
            Find answers and get assistance
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20 hover:shadow-medium transition-all duration-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <method.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-spiritual-900 mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm font-medium text-primary">
                    {method.detail}
                  </p>
                </div>
              </div>
              <p className="text-xs text-spiritual-600">{method.description}</p>
            </div>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-spiritual-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-spiritual-400" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-spiritual-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-spiritual-50 transition-colors"
                >
                  <span className="font-medium text-spiritual-900 text-left">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-spiritual-600 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-spiritual-600 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-spiritual-50 border-t border-spiritual-200">
                    <p className="text-sm text-spiritual-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-lg font-bold text-spiritual-900 mb-4">
            Helpful Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.link}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-soft border border-white/20 hover:shadow-medium transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-secondary/10 rounded-xl group-hover:scale-110 transition-transform">
                    <resource.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-spiritual-900 mb-1 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-spiritual-600">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-white/20">
          <h2 className="text-lg font-bold text-spiritual-900 mb-4">
            Submit a Support Request
          </h2>
          <p className="text-sm text-spiritual-600 mb-6">
            Can't find what you're looking for? Send us a message and we'll get
            back to you soon.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-spiritual-900 mb-2">
                  Your Name
                </label>
                <Input placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-spiritual-900 mb-2">
                  Email Address
                </label>
                <Input type="email" placeholder="your@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-spiritual-900 mb-2">
                Subject
              </label>
              <Input placeholder="Brief description of your issue" />
            </div>

            <div>
              <label className="block text-sm font-medium text-spiritual-900 mb-2">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-spiritual-300 rounded-lg">
                <option>Technical Issue</option>
                <option>Feature Request</option>
                <option>General Question</option>
                <option>Billing</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-spiritual-900 mb-2">
                Message
              </label>
              <Textarea
                placeholder="Describe your issue or question in detail..."
                className="h-32"
              />
            </div>

            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-primary to-primary-dark">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Support;
