import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center">
          <Image
            src="https://i.postimg.cc/J41fHrQG/DALL-E-2025-02-02-11-22-12-A-minimalist-and-modern-logo-featuring-a-combination-of-a-dumbbell-and.webp"
            alt="My CryptoBro Logo"
            width={60}
            height={60}
            className="rounded-full border-2 border-white shadow-md"
          />
          <div className="ml-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
              My CryptoBro
            </h1>
            <p className="text-sm text-gray-300">Real-time cryptocurrency quotes</p>
          </div>
        </div>
      </div>
    </header>
  )
}

