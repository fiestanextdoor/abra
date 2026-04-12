'use client';

import { motion } from 'framer-motion';
import { ScrambleText } from '@/components/ScrambleText';

type LabelServicesProps = {
  introComplete?: boolean;
};

export function LabelServices({ introComplete = true }: LabelServicesProps) {
  const services = [
    {
      title: 'Release & distributie',
      description:
        'We helpen met het uitbrengen van je muziek op Spotify en andere streamingplatformen.',
      tag: 'distributie',
    },
    {
      title: 'Sound & productie',
      description:
        'Feedback op tracks, sparren over sound en connecties in de scene om je muziek sterker te maken.',
      tag: 'productie',
    },
    {
      title: 'Creatieve richting',
      description:
        'Meedenken over positionering, visuals en content, zodat alles klopt bij jouw verhaal.',
      tag: 'creatie',
    },
  ];

  return (
    <motion.section
      className="label-services"
      aria-label="wat abra entertainment doet"
      initial={{ opacity: 0, y: 24 }}
      animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
    >
      <motion.div
        className="label-services-inner"
        initial="hidden"
        animate={introComplete ? 'show' : 'hidden'}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <h2 className="label-services-heading">
          <ScrambleText text="wat we doen voor artiesten" />
        </h2>
        <p className="label-services-intro">
          Abra Entertainment is een klein label, maar denkt groots. We bouwen samen aan muziek, verhaal
          en publiek.
        </p>
        <div className="label-services-grid">
          {services.map((service) => (
            <motion.article
              key={service.title}
              className="label-service-card"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <div className="label-service-tag">{service.tag}</div>
              <h3 className="label-service-title">{service.title}</h3>
              <p className="label-service-description">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

