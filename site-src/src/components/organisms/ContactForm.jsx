import { useState } from 'react';
import { contactFormConfig } from '../../data/contactForm';

const initialValues = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!contactFormConfig.endpoint) {
      const subject = values.subject || 'お問い合わせ';
      const body = [
        `お名前: ${values.name}`,
        `メールアドレス: ${values.email}`,
        '',
        values.message,
      ].join('\n');
      window.location.href = `mailto:${contactFormConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(contactFormConfig.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setValues(initialValues);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="contact-form-field">
        <label htmlFor="contact-name">
          お名前 <span className="contact-form-required">必須</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form-field">
        <label htmlFor="contact-email">
          メールアドレス <span className="contact-form-required">必須</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form-field">
        <label htmlFor="contact-subject">件名</label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form-field">
        <label htmlFor="contact-message">
          お問い合わせ内容 <span className="contact-form-required">必須</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={8}
          required
          value={values.message}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form-actions">
        <button type="submit" className="cta-button" disabled={status === 'sending'}>
          {status === 'sending' ? '送信中…' : '送信する'}
        </button>
      </div>

      <p className="contact-form-status" role="status">
        {status === 'sent' && 'お問い合わせを送信しました。ありがとうございます。'}
        {status === 'error' && '送信に失敗しました。時間をおいて再度お試しください。'}
      </p>
    </form>
  );
}
