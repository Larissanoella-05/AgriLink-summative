'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaLinkedinIn, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiInstagramLine } from 'react-icons/ri';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaLinkedinIn,
      href: '#',
      label: 'LinkedIn',
      color: 'hover:bg-blue-600',
    },
    {
      icon: RiInstagramLine,
      href: '#',
      label: 'Instagram',
      color: 'hover:bg-pink-600',
    },
  ];

  const companyLinks = [
    { key: 'footerAbout', to: 'about', type: 'scroll' },
    { key: 'footerProducts', to: '/products', type: 'link' },
    { key: 'footerEducation', to: '/education', type: 'link' },
  ];

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-gray-900"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-yellow-900/20"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
              >
                <div className="text-4xl filter drop-shadow-lg">🌾</div>
                <motion.div
                  className="absolute -inset-3 bg-yellow-400/20 rounded-full blur-md"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              <div className="flex flex-col">
                <div className="text-3xl font-bold text-white font-display tracking-tight">
                  {t('appName')}
                </div>
                <div className="text-sm text-green-300 font-medium tracking-wider uppercase">
                  Rwanda Agriculture Platform
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 font-medium leading-relaxed text-lg">
                {t('footerCall')}
              </p>
              <p className="text-green-300 font-semibold text-lg">
                {t('footerCall2')}
              </p>

              <div className="flex items-center gap-2 text-gray-300">
                <FaMapMarkerAlt className="text-green-400" />
                <span>Kigali, Rwanda</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 ${social.color} transition-all duration-300 shadow-glow hover:shadow-glow-lg hover:scale-110`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                  aria-label={social.label}
                >
                  <social.icon size={22} className="text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-2xl font-bold text-green-300 font-display">
              {t('footerCompany')}
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((link, index) => (
                <motion.li
                  key={link.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  {link.type === 'scroll' ? (
                    <Link
                      to={link.to}
                      spy={true}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      className="text-gray-300 hover:text-green-300 transition-all duration-300 cursor-pointer font-medium hover:translate-x-2 inline-block text-lg"
                    >
                      {t(link.key)}
                    </Link>
                  ) : (
                    <NavLink
                      to={link.to}
                      className="text-gray-300 hover:text-green-300 transition-all duration-300 font-medium hover:translate-x-2 inline-block text-lg"
                    >
                      {t(link.key)}
                    </NavLink>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-2xl font-bold text-green-300 font-display">
              {t('getInTouch')}
            </h3>
            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                  <FaPhoneAlt size={18} className="text-white" />
                </div>
                <a
                  href="tel:+250790101642"
                  className="text-gray-300 hover:text-green-300 transition-colors duration-300 font-medium text-lg"
                >
                  +250 790101642
                </a>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                  <MdEmail size={18} className="text-white" />
                </div>
                <a
                  className="text-gray-300 hover:text-green-300 transition-colors duration-300 font-medium text-lg"
                  href="mailto:info@agrilink.rw"
                >
                  info@agrilink.rw
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="mt-20 pt-8 border-t border-green-800/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 font-medium text-center md:text-left">
              &copy; {year}. {t('allRightsReserved')}
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-green-300 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-green-300 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-green-300 transition-colors duration-300"
              >
                Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
