export default function Footer() {
    return (
      <footer className="bg-gray-800 py-8 text-center">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.instagram.com/overcoreuk/?hl=en-gb" aria-label="Instagram">
            <img src="/images/Instagram.png" alt="Instagram" className="w-8 h-8" />
          </a>
          <a href="https://www.tiktok.com/@overcoreltd?_t=8prPUbAFBIG&_r=1" aria-label="TikTok">
            <img src="/images/Tiktok.png" alt="TikTok" className="w-8 h-8" />
          </a>
          <a href="https://www.linkedin.com/company/overcore-ltd" aria-label="Linkedin">
            <img src="/images/Linkedin.png" alt="Linkedin" className="w-8 h-8" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61566086200250" aria-label="Facebook">
            <img src="/images/Facebook.png" alt="Facebook" className="w-6 h-8" />
          </a>
        </div>
        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 text-gray-300 text-sm">
          <a href="#" className="hover:text-orange-400">Home</a>
          <a href="#" className="hover:text-orange-400">Services</a>
          <a href="/about-us" className="hover:text-orange-400">About</a>
          <a href="#" className="hover:text-orange-400">Terms</a>
          <a href="privacy" className="hover:text-orange-400">Privacy Policy</a>
        </div>
  
        {/* Copyright Text */}
        <p className="text-gray-400 text-sm mt-4">
          Overcore © 2025. All rights reserved.
        </p>
      </footer>
    );
  }