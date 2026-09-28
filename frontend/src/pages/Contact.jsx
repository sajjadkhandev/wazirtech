import React, { useState } from 'react';
import { contactAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

const Contact = () => {
  const { showNotification } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg('Please fill in all required fields (Name, Email, Subject, Message).');
      return;
    }

    setSubmitting(true);
    try {
      const res = await contactAPI.submit(formData);
      setSuccess(true);
      showNotification(res.data.message || 'Message sent successfully!', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit contact inquiry. Please try again.';
      setErrorMsg(msg);
      showNotification(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How quickly does WazirTech respond to project inquiries?',
      a: 'Our engineering leadership reviews all submissions within 1 business day and typically schedules an initial scoping call within 24 to 48 hours.'
    },
    {
      q: 'What engagement models do you support?',
      a: 'We offer fixed-price milestone contracts for well-defined scopes, as well as dedicated monthly agile engineering squads for evolving product roadmaps.'
    },
    {
      q: 'Do you provide post-launch maintenance & cloud monitoring?',
      a: 'Yes, we provide ongoing SLAs, 24/7 security vulnerability monitoring, automated backups, and version updates.'
    }
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Get in Touch with WazirTech
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Have a project in mind, an architectural question, or an RFP to share? Drop us a message and our technical team will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Left Column: Office & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white mb-2">Contact Details</h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Headquarters</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Silicon District, Suite 400<br />
                    Tech Corridor, California, USA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Direct Email</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    <a href="mailto:contact@wazirtech.com" className="text-brand-400 hover:underline">
                      contact@wazirtech.com
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Average response under 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Direct Line</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    <a href="tel:03069122770" className="text-brand-400 hover:underline">
                      0306-9122770
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Mon - Fri, 9am - 6pm PKT</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Working Hours</h4>
                  <p className="text-xs text-slate-400 mt-1">Monday – Friday: 9:00 AM – 6:00 PM</p>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5">24/7 SLA client hotline for critical servers</p>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="p-6 rounded-2xl bg-brand-950/40 border border-brand-500/30 text-xs text-slate-300">
              <span className="font-semibold text-brand-300 block mb-1">Looking to initiate a formal project?</span>
              For detailed scoping, budget selections, and deadline planning, use our specialized{' '}
              <a href="/request-project" className="text-brand-400 font-bold hover:underline">
                Request a Project form
              </a>.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">Send Us a Direct Message</h2>
              <p className="text-slate-400 text-xs mb-6">
                Fill in the form below and our team will get in touch shortly.
              </p>

              {errorMsg && (
                <div className="p-4 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Delivered Successfully!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you for reaching out. We have logged your message in our database and an engineer will reply to you soon.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Michael Stone"
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. michael@company.com"
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +1 (555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Subject <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Custom MERN Stack Application"
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project requirements, target timeline, or any technical questions..."
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold text-sm shadow-glow transition-all"
                  >
                    {submitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-400" />
            <span>Frequently Asked Questions</span>
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
