'use client';

import dynamic from 'next/dynamic';

import { About, AiTools, Footer, Header, Skills } from '../container';
import { ChatAssistant, Navbar, PageChrome, ScrollProgress } from './index';

const Work = dynamic(() => import('../container/Work/Work'));
const Testimonial = dynamic(() => import('../container/Testimonial/Testimonial'));
const Education = dynamic(() => import('../container/Education/Education'));

export default function Portfolio() {
  return (
    <div className="app">
      <ScrollProgress />
      <PageChrome />
      <ChatAssistant />
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <AiTools />
      <Testimonial />
      <Education />
      <Footer />
    </div>
  );
}
