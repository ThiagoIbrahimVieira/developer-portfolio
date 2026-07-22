'use client';

import { useState, FormEvent } from 'react';
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useLanguage } from '@/lib/LanguageContext';
import FadeIn from './ui/FadeIn';

const EMAILJS_PUBLIC_KEY = 'HSqyxWoN8eQJnDNVJ';
const EMAILJS_SERVICE_ID = 'service_3h9lkte';
const EMAILJS_TEMPLATE_ID = 'template_u2vuag7';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.contact.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.contact.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.emailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.contact.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.contact.messageMin;
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setErrors({});
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: formData.name,
          user_email: formData.email,
          title: formData.name,
          message: formData.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = { ...errors };
      delete newErrors[field as keyof FormErrors];
      setErrors(newErrors);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate();
    if (fieldErrors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field as keyof FormErrors] }));
    }
  };

  const inputClasses = (field: string) =>
    `w-full px-4 py-2.5 bg-bg-card border rounded-xl text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-1 transition-all duration-200 ${
      errors[field as keyof FormErrors] && touched[field]
        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
        : 'border-border-subtle focus:border-accent focus:ring-accent/50'
    }`;

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.contact.sectionTitle}
          </h2>
          <p className="text-text-secondary text-lg">
            {t.contact.description}
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FadeIn direction="left" className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-bg-card rounded-xl border border-border-subtle hover:border-accent/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-text-tertiary text-xs uppercase tracking-wider">Email</p>
                <p className="text-text-primary text-sm">thiagoibrahimvieira@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-bg-card rounded-xl border border-border-subtle hover:border-accent/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-text-tertiary text-xs uppercase tracking-wider">Location</p>
                <p className="text-text-primary text-sm">Brazil</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={inputClasses('name')}
                  placeholder="John Doe"
                />
                <AnimatePresence>
                  {errors.name && touched.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={inputClasses('email')}
                  placeholder="john@example.com"
                />
                <AnimatePresence>
                  {errors.email && touched.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1.5">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`${inputClasses('message')} resize-none`}
                  placeholder="..."
                />
                <AnimatePresence>
                  {errors.message && touched.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-premium w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-bg-primary font-medium rounded-xl transition-all duration-250 hover:shadow-lg hover:shadow-accent/20"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    {t.contact.send}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-xl text-success text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {t.contact.success}
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {t.contact.error}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
