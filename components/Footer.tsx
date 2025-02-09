import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">© 2024 My CryptoBro. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-pink-400 transition-colors duration-200">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-200">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-200">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

