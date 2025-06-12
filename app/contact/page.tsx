import ContactForm from '@/components/contact-form'

export default function Contact() {
  return (
    <section className="w-screen h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-10 text-zinc-900 dark:text-white">
          Let&apos;s talk about your Project
        </h2>
        <ContactForm />
      </div>
    </section>
  )
}
