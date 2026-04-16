import React, { useState } from 'react'
import { HelpCircle, ChevronDown, Send, MessageCircle, BookOpen, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

const Help: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const faqs = [
    {
      question: 'How do I start a practice test?',
      answer: 'Navigate to the "Practice Tests" section, select a subject and difficulty level, and click "Start Test". You can pause and resume tests anytime.',
    },
    {
      question: 'Can I retake a completed exam?',
      answer: 'Yes, you can retake any exam. Your previous score will be saved, and you can compare your performance to track improvement over time.',
    },
    {
      question: 'How is my performance calculated?',
      answer: 'Your performance is based on accuracy rate, consistency, time management, and improvement over time. We use a weighted algorithm to ensure fair evaluation.',
    },
    {
      question: 'What subjects are available?',
      answer: 'We offer preparation for all major WAEC and JAMB subjects including Mathematics, English, Physics, Chemistry, Biology, and more.',
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes! Our mobile app is available on iOS and Android. You can download it from the App Store or Google Play Store.',
    },
    {
      question: 'How often are new tests added?',
      answer: 'We add new practice tests and exams weekly. You can enable notifications to stay updated about new content.',
    },
    {
      question: 'Can I download my results?',
      answer: 'Yes, you can export your results as PDF or CSV from the Results page. Click the "Export" button and select your preferred format.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! We use industry-standard encryption and follow GDPR guidelines to protect your data. Your information is never shared with third parties.',
    },
  ]

  const tutorials = [
    {
      title: 'Getting Started with PrepAI',
      duration: '5 min',
      icon: '🚀',
    },
    {
      title: 'How to Use Practice Tests Effectively',
      duration: '8 min',
      icon: '📝',
    },
    {
      title: 'Understanding Your Performance Analytics',
      duration: '6 min',
      icon: '📊',
    },
    {
      title: 'Time Management Tips for Exams',
      duration: '7 min',
      icon: '⏱️',
    },
  ]

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', contactForm)
    setContactForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <Layout title="Help & Support" streak={7}>
      <div className="space-y-8 px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-6 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-spiritual-900 mb-2">Browse FAQs</h3>
            <p className="text-sm text-spiritual-600">Find answers to common questions</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-3">🎬</div>
            <h3 className="font-bold text-spiritual-900 mb-2">Watch Tutorials</h3>
            <p className="text-sm text-spiritual-600">Learn from video guides</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-bold text-spiritual-900 mb-2">Contact Support</h3>
            <p className="text-sm text-spiritual-600">Reach out to our team</p>
          </Card>
        </div>

        <Card className="p-4 sm:p-6">
          <h2 className="mb-6 text-2xl font-bold text-spiritual-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-spiritual-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 hover:bg-spiritual-50 transition-colors"
                >
                  <span className="font-medium text-spiritual-900 text-left">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-spiritual-600" />
                  </motion.div>
                </button>

                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-spiritual-200 p-4 bg-spiritual-50"
                  >
                    <p className="text-sm text-spiritual-700">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <h2 className="mb-6 text-2xl font-bold text-spiritual-900">Video Tutorials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-spiritual-200 rounded-lg p-4 hover:shadow-medium transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{tutorial.icon}</div>
                  <span className="text-xs font-medium text-spiritual-600 bg-spiritual-100 px-2 py-1 rounded-lg">
                    {tutorial.duration}
                  </span>
                </div>
                <h3 className="font-medium text-spiritual-900 group-hover:text-primary-600 transition-colors">
                  {tutorial.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <h2 className="mb-6 text-2xl font-bold text-spiritual-900">Contact Support</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={contactForm.name}
                onChange={handleFormChange}
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleFormChange}
                required
              />
            </div>

            <Input
              label="Subject"
              name="subject"
              value={contactForm.subject}
              onChange={handleFormChange}
              required
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-spiritual-700">Message</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleFormChange}
                rows={6}
                className="textarea-field"
                placeholder="Describe your issue or question..."
                required
              />
            </div>

            <Button variant="primary" fullWidth rightIcon={<Send size={18} />}>
              Send Message
            </Button>
          </form>
        </Card>

        <Card className="p-4 sm:p-6">
          <h2 className="mb-4 text-xl font-bold text-spiritual-900">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: <BookOpen size={18} />, text: 'Documentation', href: '#' },
              { icon: <Lightbulb size={18} />, text: 'Study Tips', href: '#' },
              { icon: <MessageCircle size={18} />, text: 'Community Forum', href: '#' },
              { icon: <HelpCircle size={18} />, text: 'Report a Bug', href: '#' },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-spiritual-50 transition-colors"
              >
                <span className="text-primary-600">{link.icon}</span>
                <span className="font-medium text-spiritual-900 hover:text-primary-600">{link.text}</span>
              </a>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default Help
