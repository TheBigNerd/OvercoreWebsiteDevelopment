export default function Footer() {
    return (
      <footer className="bg-gray-300 py-8 text-center">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.instagram.com/overcoreuk/?hl=en-gb" aria-label="Instagram">
            <img src="/images/instagram_black.png" alt="Instagram" className="w-12 h-9" />
          </a>
          <a href="https://www.tiktok.com/@overcoreltd?_t=8prPUbAFBIG&_r=1" aria-label="TikTok">
            <img src="/images/Tiktok_black.png" alt="TikTok" className="w-8 h-9" />
          </a>
          <a href="https://www.linkedin.com/company/overcore-ltd" aria-label="Linkedin">
            <img src="/images/Linkedin_black.png" alt="Linkedin" className="w-8 h-9" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61566086200250" aria-label="Facebook">
            <img src="/images/facebook_black.png" alt="Facebook" className="w-7 h-9" />
          </a>
        </div>
        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 text-sm">
          <a href="#" className="hover:text-tall-poppy-600">Home</a>
          <a href="#" className="hover:text-tall-poppy-600">Services</a>
          <a href="/about-us" className="hover:text-tall-poppy-600">About</a>
          <a href="#" className="hover:text-tall-poppy-600">Terms</a>
          <a href="#" className="hover:text-tall-poppy-600">Privacy Policy</a>
        </div>
  
        {/* Copyright Text */}
        <p className="text-sm mt-4">
          Overcore © 2025. All rights reserved.
        </p>
      </footer>
    );
  }