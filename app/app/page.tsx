import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { FaStethoscope, FaHospital, FaUserMd, FaCheckCircle, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      <Navigation />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <section style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '3rem',
          minHeight: '80vh',
        }}>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
            }}>
              Easily Find Your Ideal Doctor
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#cbd5e1',
              marginBottom: '2rem',
              lineHeight: '1.6',
            }}>
              Experience world-class healthcare with Apollo Hospitals. Book your appointment online and get the best medical care from our expert doctors.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
              <Link href="/appointments" style={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                display: 'inline-block',
              }}>
                Book Appointment
              </Link>
              <Link href="/#about" style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                padding: '1rem 2rem',
                border: '2px solid #10b981',
                borderRadius: '0.5rem',
                transition: 'all 0.2s',
              }}>
                Learn More
              </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#cbd5e1' }}>
              <span style={{ fontWeight: '600' }}>95K+ Join in already</span>
              <div style={{ display: 'flex', gap: '-0.5rem' }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    border: '3px solid #0f172a',
                    marginLeft: i > 1 ? '-10px' : '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: '600',
                  }}>
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              opacity: 0.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8rem',
              color: '#ffffff',
            }}>
              <FaUserMd />
            </div>
          </div>
        </section>

        <section id="search" style={{
          padding: '3rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '2rem',
            textAlign: 'center',
          }}>
            Find Your Perfect Doctor
          </h2>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}>
            <input
              type="text"
              placeholder="Doctor Name"
              style={{
                flex: 1,
                padding: '1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
              }}
            />
            <input
              type="text"
              placeholder="Specialist"
              style={{
                flex: 1,
                padding: '1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
              }}
            />
            <input
              type="text"
              placeholder="Hospital"
              style={{
                flex: 1,
                padding: '1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
              }}
            />
            <Link href="/appointments" style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              Search
            </Link>
          </div>
        </section>

        <section id="services" style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '3rem',
            textAlign: 'center',
          }}>
            Comprehensive Healthcare Services
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { icon: <FaStethoscope />, title: 'Emergency', desc: '24/7 emergency care with immediate response and expert medical attention.' },
              { icon: <FaHospital />, title: 'Medical Center', desc: 'State-of-the-art facilities with advanced medical equipment and technology.' },
              { icon: <FaUserMd />, title: 'Doctor Specialist', desc: 'Experienced specialists across all medical fields for comprehensive care.' },
            ].map((service, idx) => (
              <div key={idx} style={{
                backgroundColor: '#ffffff',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s',
              }}>
                <div style={{
                  fontSize: '3rem',
                  color: '#10b981',
                  marginBottom: '1rem',
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '1rem',
                }}>
                  {service.title}
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          padding: '4rem 2rem',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          margin: '4rem 0',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
          }}>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '1.5rem',
              }}>
                Easy Online Appointment Booking
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#cbd5e1',
                marginBottom: '2rem',
                lineHeight: '1.6',
              }}>
                Book your appointment in just a few clicks. Our online system makes it easy to schedule your visit with our expert doctors.
              </p>
              <Link href="/appointments" style={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-block',
              }}>
                Learn More
              </Link>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                width: '300px',
                height: '300px',
                margin: '0 auto',
                backgroundColor: '#10b981',
                borderRadius: '1rem',
                opacity: 0.3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '6rem',
                color: '#ffffff',
              }}>
                <FaUserMd />
              </div>
            </div>
          </div>
        </section>

        <section id="about" style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '3rem',
            textAlign: 'center',
          }}>
            Convenient Appointment Scheduling
          </h2>
          <div style={{
            display: 'flex',
            gap: '3rem',
            alignItems: 'center',
          }}>
            <div style={{ flex: 1 }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Book appointments 24/7 from anywhere',
                  'Choose your preferred doctor and time slot',
                  'Get instant confirmation via email',
                  'Reschedule or cancel easily online',
                  'Access your medical history anytime',
                ].map((feature, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                  }}>
                    <FaCheckCircle style={{ color: '#10b981', fontSize: '1.5rem', flexShrink: 0 }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/appointments" style={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-block',
                marginTop: '2rem',
              }}>
                Learn More
              </Link>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                width: '400px',
                height: '300px',
                margin: '0 auto',
                backgroundColor: '#10b981',
                borderRadius: '1rem',
                opacity: 0.3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '6rem',
                color: '#ffffff',
              }}>
                <FaUserMd />
              </div>
            </div>
          </div>
        </section>

        <section style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '3rem',
            textAlign: 'center',
          }}>
            Testimonial Patient's
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { name: 'Michael T', role: 'Medical Treatment', text: 'Excellent service and professional care. The online booking system made it so convenient to schedule my appointment.' },
              { name: 'Sarah M', role: 'Creative Director', text: 'The doctors are highly skilled and the facilities are top-notch. Highly recommend Apollo Hospitals for all medical needs.' },
            ].map((testimonial, idx) => (
              <div key={idx} style={{
                backgroundColor: '#ffffff',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              }}>
                <FaQuoteLeft style={{ fontSize: '3rem', color: '#10b981', marginBottom: '1rem' }} />
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                }}>
                  {testimonial.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: '700',
                  }}>
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#374151' }}>{testimonial.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '3rem',
            textAlign: 'center',
          }}>
            Blog Post
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {[1, 2, 3].map((idx) => (
              <div key={idx} style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              }}>
                <div style={{
                  height: '200px',
                  backgroundColor: '#10b981',
                  opacity: 0.3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  color: '#ffffff',
                }}>
                  <FaUserMd />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#374151',
                    marginBottom: '1rem',
                  }}>
                    Healthcare Tips and News
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '1rem',
                    lineHeight: '1.6',
                  }}>
                    Stay updated with the latest healthcare news and expert medical advice.
                  </p>
                  <Link href="/#blog" style={{
                    color: '#10b981',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer id="contact" style={{
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          padding: '4rem 2rem 2rem',
          marginTop: '4rem',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '2rem',
          }}>
            <div>
              <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '700' }}>Healthcare</h3>
              <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                Apollo Hospitals - Providing world-class healthcare services with expert doctors and advanced medical facilities.
              </p>
            </div>
            <div>
              <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '700' }}>Contact Us</h3>
              <p style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>123 Medical Street</p>
              <p style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>Phone: +1 234 567 8900</p>
              <p style={{ color: '#cbd5e1' }}>Email: info@apollohospitals.com</p>
            </div>
            <div>
              <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '700' }}>Link</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link href="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Home</Link>
                <Link href="/#about" style={{ color: '#cbd5e1', textDecoration: 'none' }}>About Us</Link>
                <Link href="/#services" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Services</Link>
                <Link href="/appointments" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Book Appointment</Link>
              </div>
            </div>
            <div>
              <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '700' }}>Subscribe & Newsletter</h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #475569',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                />
                <button style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            textAlign: 'center',
            color: '#cbd5e1',
          }}>
            Copyright © 2023 All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
