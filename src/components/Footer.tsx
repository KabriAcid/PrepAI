import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Quran.com', href: 'https://quran.com', external: true },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-spiritual-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">QuranQuiz</span>
            </motion.div>
            <p className="text-spiritual-300 text-sm leading-relaxed">
              Enhance your knowledge of the Holy Quran through interactive quizzes and challenges. 
              Learn, compete, and grow in your Islamic knowledge.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-spiritual-300 hover:text-white transition-colors text-sm flex items-center space-x-1"
                  >
                    <span>{link.name}</span>
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-spiritual-300 text-sm leading-relaxed">
              This application is designed to help Muslims worldwide deepen their understanding 
              of the Quran through engaging and educational quizzes.
            </p>
            <div className="flex items-center space-x-1 text-sm text-spiritual-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>for the Ummah</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-spiritual-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-spiritual-400 text-sm">
              © {currentYear} QuranQuiz. All rights reserved.
            </p>
            <p className="text-spiritual-400 text-sm">
              "And We have certainly made the Quran easy for remembrance, so is there any who will remember?" - Quran 54:17
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;