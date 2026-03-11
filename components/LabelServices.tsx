 'use client';

import { motion } from 'framer-motion';

export function LabelServices() {
  const services = [
    {
      title: 'Release & distributie',
      description:
        'We helpen met het uitbrengen van je muziek op Spotify en andere streamingplatformen.',
      tag: 'Distribution',
    },
    {
      title: 'Sound & productie',
      description:
        'Feedback op tracks, sparren over sound en connecties in de scene om je muziek sterker te maken.',
      tag: 'Production',
    },
    {
      title: 'Creatieve richting',
      description:
        'Meedenken over positionering, visuals en content, zodat alles klopt bij jouw verhaal.',
      tag: 'Creative',
    },
  ];

  return (
    <section className="label-services" aria-label="Wat Abra Entertainment doet">
      <div className="label-services-inner">
        <h2 className="label-services-heading">Wat we doen voor artiesten</h2>
        <p className="label-services-intro">
          Abra Entertainment is een klein label, maar denkt groots. We bouwen samen aan muziek, verhaal
          en publiek.
        </p>
        <div className="label-services-grid">
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="label-service-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="label-service-tag">{service.tag}</div>
              <h3 className="label-service-title">{service.title}</h3>
              <p className="label-service-description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

