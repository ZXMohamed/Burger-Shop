import React from 'react'
import emailjs from '@emailjs/browser'

function useEmail() {
  return (data, onSuccess, onFailed) => {
    const service = import.meta.env.VITE_email_contact_service_key; 
    const template = import.meta.env.VITE_email_contact_template_key; 
    emailjs.send(service, template, data)
      .then(() => { onSuccess() })
      .catch(() => { onFailed() });
  }
}

export default useEmail;