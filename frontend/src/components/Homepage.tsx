"use client"
import { useState } from "react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import { ArrowRight, Play, Pause } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

const Homepage = () => {
  const [isPlaying, setIsPlaying] = useState(true)

  const images = [
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
  ] // Replace with your actual image paths

  const toggleVideoPlay = () => {
    const video = document.getElementById("hero-video") as HTMLVideoElement
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video id="hero-video" className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted>
          <source src="/path/to/your/video.mp4" type="video/mp4" />
        </video>

        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-3xl">
            Create Beautiful QR Codes in Seconds
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Generate custom QR codes for your business, events, or personal use with our easy-to-use platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/qrcode">
              <button className="bg-white text-black px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-white/90 transition-all">
                Get Started <ArrowRight className="size-4" />
              </button>
            </Link>
            <button
              onClick={toggleVideoPlay}
              className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="size-4" /> Pause Video
                </>
              ) : (
                <>
                  <Play className="size-4" /> Play Video
                </>
              )}
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our QR Code Generator</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create customized QR codes that match your brand and drive engagement with your audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Customizable Design",
                description: "Personalize your QR codes with colors, logos, and shapes that match your brand identity.",
              },
              {
                title: "Analytics & Tracking",
                description: "Monitor scans and engagement with detailed analytics to optimize your campaigns.",
              },
              {
                title: "Multiple QR Types",
                description: "Create QR codes for websites, vCards, WiFi networks, and more with just a few clicks.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-6">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">See What You Can Create</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through examples of QR codes created with our platform.
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              spaceBetween={0}
              slidesPerView={1}
              effect="fade"
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-[16/9]">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`QR Code Example ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                      <h3 className="text-2xl font-bold text-white mb-2">QR Code Example {index + 1}</h3>
                      <p className="text-white/80">
                        This QR code was created for a marketing campaign that increased engagement by 45%.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Create Your QR Code?</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of businesses and individuals who use our platform to create stunning QR codes.
            </p>
            <Link href="/qrcode">
              <button className="bg-white text-black px-10 py-5 rounded-full text-lg font-medium hover:bg-white/90 transition-all">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from people who have used our QR code generator for their businesses and projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Director",
                quote: "The QR codes we created drove 40% more traffic to our landing page during our last campaign.",
              },
              {
                name: "Michael Chen",
                role: "Event Organizer",
                quote: "We used custom QR codes for our event check-ins, and it made the process so much smoother.",
              },
              {
                name: "Emma Rodriguez",
                role: "Restaurant Owner",
                quote: "Our customers love scanning our QR code menus. It's been a game-changer for our business.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage

