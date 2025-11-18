import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { FaStethoscope, FaHospital, FaUserMd, FaCheckCircle, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      <Navigation />
      
      <div>
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Easily Find Your Ideal Doctor
            </h1>
            <p className="hero-description">
              Experience world-class healthcare with Apollo Hospitals. Book your appointment online and get the best medical care from our expert doctors.
            </p>
            <div className="hero-buttons">
              <Link href="/appointments" className="btn-primary-hero">
                Book Appointment
              </Link>
              <Link href="/#about" className="btn-secondary-hero">
                Learn More
              </Link>
            </div>
            <div className="hero-stats">
              <span className="stats-text">95K+ Join in already</span>
              <div className="stats-avatars">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="avatar-circle">
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-icon-circle">
              <FaUserMd />
            </div>
          </div>
        </section>

        <section id="search" className="search-section">
          <h2 className="section-title">
            Find Your Perfect Doctor
          </h2>
          <div className="search-form">
            <input
              type="text"
              placeholder="Doctor Name"
              className="search-input"
            />
            <input
              type="text"
              placeholder="Specialist"
              className="search-input"
            />
            <input
              type="text"
              placeholder="Hospital"
              className="search-input"
            />
            <Link href="/appointments" className="search-button">
              Search
            </Link>
          </div>
        </section>

        <section id="services" className="services-section">
          <h2 className="section-title-large">
            Comprehensive Healthcare Services
          </h2>
          <div className="services-grid">
            {[
              { icon: <FaStethoscope />, title: 'Emergency', desc: '24/7 emergency care with immediate response and expert medical attention.' },
              { icon: <FaHospital />, title: 'Medical Center', desc: 'State-of-the-art facilities with advanced medical equipment and technology.' },
              { icon: <FaUserMd />, title: 'Doctor Specialist', desc: 'Experienced specialists across all medical fields for comprehensive care.' },
            ].map((service, idx) => (
              <div key={idx} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="service-title">
                  {service.title}
                </h3>
                <p className="service-description">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="feature-section">
          <div className="feature-container">
            <div className="feature-content">
              <h2 className="feature-title">
                Easy Online Appointment Booking
              </h2>
              <p className="feature-description">
                Book your appointment in just a few clicks. Our online system makes it easy to schedule your visit with our expert doctors.
              </p>
              <Link href="/appointments" className="feature-button">
                Learn More
              </Link>
            </div>
            <div className="feature-image">
              <div className="feature-icon-box">
                <FaUserMd />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <h2 className="section-title-large">
            Convenient Appointment Scheduling
          </h2>
          <div className="about-container">
            <div className="about-content">
              <ul className="features-list">
                {[
                  'Book appointments 24/7 from anywhere',
                  'Choose your preferred doctor and time slot',
                  'Get instant confirmation via email',
                  'Reschedule or cancel easily online',
                  'Access your medical history anytime',
                ].map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <FaCheckCircle className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/appointments" className="about-button">
                Learn More
              </Link>
            </div>
            <div className="about-image">
              <div className="about-icon-box">
                <FaUserMd />
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2 className="section-title-large">
            Testimonial Patient's
          </h2>
          <div className="testimonials-grid">
            {[
              { name: 'Michael T', role: 'Medical Treatment', text: 'Excellent service and professional care. The online booking system made it so convenient to schedule my appointment.' },
              { name: 'Sarah M', role: 'Creative Director', text: 'The doctors are highly skilled and the facilities are top-notch. Highly recommend Apollo Hospitals for all medical needs.' },
            ].map((testimonial, idx) => (
              <div key={idx} className="testimonial-card">
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-text">
                  {testimonial.text}
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="blog-section">
          <h2 className="section-title-large blog-title">
            Blog Post
          </h2>
          <div className="blog-grid">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="blog-card">
                <div className="blog-image">
                  <FaUserMd />
                </div>
                <div className="blog-content">
                  <h3 className="blog-card-title">
                    Healthcare Tips and News
                  </h3>
                  <p className="blog-card-text">
                    Stay updated with the latest healthcare news and expert medical advice.
                  </p>
                  <Link href="/#blog" className="blog-link">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer id="contact" className="footer">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-title">Healthcare</h3>
              <p className="footer-text">
                Apollo Hospitals - Providing world-class healthcare services with expert doctors and advanced medical facilities.
              </p>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Contact Us</h3>
              <p className="footer-text">123 Medical Street</p>
              <p className="footer-text">Phone: +1 234 567 8900</p>
              <p className="footer-text">Email: info@apollohospitals.com</p>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Link</h3>
              <div className="footer-links">
                <Link href="/" className="footer-link">Home</Link>
                <Link href="/#about" className="footer-link">About Us</Link>
                <Link href="/#services" className="footer-link">Services</Link>
                <Link href="/appointments" className="footer-link">Book Appointment</Link>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Subscribe & Newsletter</h3>
              <div className="footer-subscribe">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="footer-input"
                />
                <button className="footer-button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            Copyright © 2023 All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
