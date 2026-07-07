import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import OptimizedImage from '../../components/OptimizedImage';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client, getImageSrc } from '../../client';
import { images } from '../../constants';
import { testimonialsList } from '../../data/cvData';
import ReviewForm from './ReviewForm';
import BrandShowcase from './BrandShowcase';
import './Testimonial.scss';

const TESTIMONIALS_QUERY = `*[_type == "testimonials" && (approved == true || !defined(approved))] | order(_createdAt desc)`;

const avatarFallbacks = [
  images.about01,
  images.about02,
  images.about03,
  images.about04,
];

const layoutSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 38,
  mass: 0.85,
};

const cardTransition = {
  layout: layoutSpring,
  opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

const slideTransition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] };

const testimonialKey = (item) =>
  `${(item?.name || '').trim().toLowerCase()}|${(item?.company || '').trim().toLowerCase()}`;

const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const getInitialsHue = (name = '') => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
};

const getTestimonialImage = (item, index) => {
  if (item?._useInitials) return '';
  const src = getImageSrc(item);
  if (src) return src;
  return avatarFallbacks[index % avatarFallbacks.length];
};

const getDirection = (from, to, total) => {
  if (from === to || total <= 1) return 0;
  const forward = (to - from + total) % total;
  const backward = (from - to + total) % total;
  return forward <= backward ? 1 : -1;
};

const normalizeTestimonials = (sanityItems) => {
  const fromSanity = (sanityItems?.length ? sanityItems : []).map((item, index) => {
    const fallback = testimonialsList[index % testimonialsList.length];

    return {
      ...item,
      name: item.name || fallback.name,
      role: item.role || fallback.role,
      company: item.company || fallback.company,
      feedback: item.feedback || fallback.feedback,
      rating: item.rating ?? fallback.rating ?? 5,
      _useInitials: item._useInitials ?? item.source === 'visitor',
    };
  });

  const seen = new Set(fromSanity.map(testimonialKey));
  const extras = testimonialsList
    .filter((item) => !seen.has(testimonialKey(item)))
    .map((item, index) => ({
      ...item,
      _id: `cv-${testimonialKey(item)}`,
      imgUrl: item.image,
      _avatarIndex: fromSanity.length + index,
    }));

  const merged = [...fromSanity, ...extras];
  return merged.length ? merged : testimonialsList;
};

/** Row of 3 slots: left (prev), center (active), right (next) */
const getVisibleRow = (items, activeIndex) => {
  const total = items.length;
  if (total === 0) return { left: null, center: null, right: null };

  const center = { item: items[activeIndex], index: activeIndex, role: 'active' };

  if (total === 1) {
    return { left: null, center, right: null };
  }

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  return {
    left: prevIndex !== activeIndex
      ? { item: items[prevIndex], index: prevIndex, role: 'before' }
      : null,
    center,
    right: nextIndex !== activeIndex
      ? { item: items[nextIndex], index: nextIndex, role: 'after' }
      : null,
  };
};

const StarRating = ({ rating, max = 5 }) => (
  <div className="app__testimonial-stars" aria-label={`${rating} out of ${max} stars`}>
    {Array.from({ length: max }, (_, index) => (
      index < rating
        ? <AiFillStar key={`star-${index}`} className="app__testimonial-star app__testimonial-star--filled" />
        : <AiOutlineStar key={`star-${index}`} className="app__testimonial-star" />
    ))}
  </div>
);

const TestimonialAvatar = ({ item, index }) => {
  const imageSrc = getTestimonialImage(item, item._avatarIndex ?? index);
  const useInitials = item._useInitials || !imageSrc;

  if (useInitials) {
    const hue = getInitialsHue(item.name);
    return (
      <div
        className="app__testimonial-avatar-initials"
        style={{ '--avatar-hue': hue }}
        aria-hidden
      >
        {getInitials(item.name)}
      </div>
    );
  }

  return (
    <OptimizedImage
      src={imageSrc}
      alt={item.name}
      width={72}
      height={72}
      className="app__testimonial-avatar-img"
    />
  );
};

const TestimonialCard = ({ item, index, role, onSelect }) => {
  const isActive = role === 'active';

  return (
    <article
      className={`app__testimonial-item app__testimonial-item--${role}`}
      aria-hidden={!isActive}
      onClick={!isActive ? () => onSelect(index) : undefined}
      onKeyDown={!isActive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(index);
        }
      } : undefined}
      role={isActive ? undefined : 'button'}
      tabIndex={isActive ? -1 : 0}
    >
      <div className="app__testimonial-accent" aria-hidden />

      <div className="app__testimonial-avatar-wrap">
        <div className="app__testimonial-avatar">
          <TestimonialAvatar item={item} index={index} />
        </div>
      </div>

      <blockquote className="app__testimonial-content">
        <span className="app__testimonial-quote-mark" aria-hidden>&ldquo;</span>
        <StarRating rating={item.rating ?? 5} />
        <p className="app__testimonial-quote">{item.feedback}</p>
        <footer className="app__testimonial-author">
          <cite className="app__testimonial-name">{item.name}</cite>
          {item.role ? (
            <span className="app__testimonial-role">{item.role}</span>
          ) : null}
          {item.company ? (
            <span className="app__testimonial-company">{item.company}</span>
          ) : null}
        </footer>
      </blockquote>
    </article>
  );
};

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);
  const prefersReducedMotion = useReducedMotion();
  const motionTransition = prefersReducedMotion ? { duration: 0 } : cardTransition;
  const slideMotionTransition = prefersReducedMotion ? { duration: 0 } : slideTransition;

  const loadTestimonials = useCallback(() => {
    client.fetch(TESTIMONIALS_QUERY)
      .then((data) => setTestimonials(normalizeTestimonials(data)))
      .catch(() => setTestimonials(testimonialsList));
  }, []);

  const navigateTo = (index) => {
    if (index === currentIndex || !testimonials.length) return;
    setDirection(getDirection(currentIndex, index, testimonials.length));
    setCurrentIndex(index);
  };

  const goPrev = () => {
    if (!testimonials.length) return;
    setDirection(-1);
    setCurrentIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const goNext = () => {
    if (!testimonials.length) return;
    setDirection(1);
    setCurrentIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  const handleReviewSubmitted = (review, { approved }) => {
    if (!review || !approved) return;

    setTestimonials((prev) => {
      const key = testimonialKey(review);
      const withoutDuplicate = prev.filter((item) => testimonialKey(item) !== key);
      return [review, ...withoutDuplicate];
    });
    setDirection(0);
    setCurrentIndex(0);
  };

  useEffect(() => {
    loadTestimonials();

    client.fetch('*[_type == "brands"]').then((data) => {
      setBrands(data);
    });
  }, [loadTestimonials]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)');
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const visibleRow = useMemo(
    () => getVisibleRow(testimonials, currentIndex),
    [testimonials, currentIndex],
  );

  const { left, center, right } = visibleRow;
  const current = center?.item;

  const renderAnimatedSlot = (slot, position) => {
    if (!slot) {
      return (
        <div
          key={position}
          className="app__testimonial-slot app__testimonial-slot--empty"
          aria-hidden
        />
      );
    }

    const isActive = slot.role === 'active';
    const cardKey = slot.item._id || `${slot.item.name}-${slot.index}`;

    return (
      <div
        key={position}
        className={`app__testimonial-slot app__testimonial-slot--${position}`}
      >
        <motion.div
          layout
          layoutId={`testimonial-card-${cardKey}`}
          className="app__testimonial-slot-inner"
          animate={{
            opacity: isActive ? 1 : 0.62,
          }}
          transition={motionTransition}
        >
          <TestimonialCard
            item={slot.item}
            index={slot.index}
            role={slot.role}
            onSelect={navigateTo}
          />
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <h2 className="head-text app__testimonial-heading">
        Client <span>Testimonials</span>
      </h2>

      {testimonials.length > 0 && current && (
        <div className="app__testimonial-carousel">
          <div
            className="app__testimonial-track"
            aria-live="polite"
            aria-label={`Testimonial ${currentIndex + 1} of ${testimonials.length}`}
          >
            {isMobile ? (
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current._id || currentIndex}
                  className="app__testimonial-slot app__testimonial-slot--center app__testimonial-slot--mobile"
                  custom={direction}
                  initial={{ x: direction >= 0 ? '55%' : '-55%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction >= 0 ? '-55%' : '55%', opacity: 0 }}
                  transition={slideMotionTransition}
                >
                  <TestimonialCard
                    item={current}
                    index={currentIndex}
                    role="active"
                    onSelect={navigateTo}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <LayoutGroup id="testimonial-row">
                {renderAnimatedSlot(left, 'left')}
                {renderAnimatedSlot(center, 'center')}
                {renderAnimatedSlot(right, 'right')}
              </LayoutGroup>
            )}
          </div>

          <div className="app__testimonial-controls app__flex">
            <button type="button" className="app__testimonial-nav" onClick={goPrev} aria-label="Previous testimonial">
              <HiChevronLeft />
            </button>

            <div className="app__testimonial-dots" role="tablist" aria-label="Testimonials">
              {testimonials.map((item, index) => (
                <button
                  key={item._id || `${item.name}-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Testimonial ${index + 1}`}
                  className={`app__testimonial-dot ${index === currentIndex ? 'app__testimonial-dot--active' : ''}`}
                  onClick={() => navigateTo(index)}
                />
              ))}
            </div>

            <button type="button" className="app__testimonial-nav" onClick={goNext} aria-label="Next testimonial">
              <HiChevronRight />
            </button>
          </div>
        </div>
      )}

      <ReviewForm onSubmitted={handleReviewSubmitted} />

      <BrandShowcase brands={brands} />
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
  'app__section-white',
);
