'use client';

import { useState, FormEvent } from 'react';
import { Send, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            {t.contact.sectionTitle}
          </h2>
          <p className="text-text-secondary text-lg">
            {t.contact.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-bg-card rounded-xl border border-border-subtle">
              <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-text-tertiary text-xs uppercase tracking-wider">Email</p>
                <p className="text-text-primary text-sm">contato@thiagoibrahim.dev</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-bg-card rounded-xl border border-border-subtle">
              <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-text-tertiary text-xs uppercase tracking-wider">Location</p>
                <p className="text-text-primary text-sm">Brazil</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">
                {t.contact.name}
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-bg-card border border-border-subtle rounded-xl text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
                {t.contact.email}
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-bg-card border border-border-subtle rounded-xl text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1.5">
                {t.contact.message}
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 bg-bg-card border border-border-subtle rounded-xl text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-colors resize-none"
                placeholder="..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-bg-primary font-medium rounded-xl transition-all duration-200"
            >
              {status === 'sending' ? (
                t.contact.sending
              ) : (
                <>
                  {t.contact.send}
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {status === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-xl text-success text-sm animate-fade-in">
                <CheckCircle className="w-4 h-4" />
                {t.contact.success}
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-fade-in">
                <AlertCircle className="w-4 h-4" />
                {t.contact.error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
