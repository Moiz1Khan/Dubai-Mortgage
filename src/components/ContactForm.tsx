"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  if (submitted) {
    return (
      <section className="py-10 md:py-14 bg-transparent" data-reveal>
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <div className="bg-card border-2 border-primary/30 rounded-2xl p-8 md:p-12 text-center">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Mail className="size-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-muted-foreground">
              We've received your message and will get back to you within 2 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Form */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full h-12 px-4 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full h-12 px-4 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="+971 50 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full h-12 px-4 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Right: Quick Contact */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Quick Contact</h2>
              <p className="text-muted-foreground mb-8">
                Prefer to reach out directly? Use one of these methods:
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+971501234567"
                className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                  <p className="text-sm text-muted-foreground">+971 50 123 4567</p>
                  <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9 AM - 6 PM GST</p>
                </div>
              </a>

              <a
                href="mailto:info@nexhome.com"
                className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                  <p className="text-sm text-muted-foreground">info@nexhome.com</p>
                  <p className="text-xs text-muted-foreground mt-1">We reply within 2 hours</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MessageSquare className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">+971 50 123 4567</p>
                  <p className="text-xs text-muted-foreground mt-1">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
