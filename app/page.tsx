import CryptoList from "@/components/CryptoList"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider" 

export default function Home() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <CryptoList />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
