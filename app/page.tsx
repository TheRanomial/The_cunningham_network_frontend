import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex flex-col justify-center items-center p-4">
      <div className="max-w-5xl w-full bg-gray-800 bg-opacity-60 rounded-xl shadow-2xl p-10 md:p-16 backdrop-blur-lg text-center transform transition-all hover:shadow-3xl hover:scale-105">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-400 animate-pulse">
          The Cunningham Network
        </h1>
        <div className="flex flex-col items-center justify-center space-y-6">
          <p className="text-md mb-2 mt-5 max-w-2xl">
            Powered by the digitized essence of Alt Cunningham, legendary
            netrunner from Cyberpunk 2077. Experience the future of blockchain
            interaction with our AI-driven assistant. Dive into the world of
            smart contracts, NFTs, and decentralized finance with unparalleled
            AI assistance.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Unfathomable Intelligence</h3>
              <p className="text-sm">
                Access the depths of blockchain knowledge
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Cryptic Guidance</h3>
              <p className="text-sm">
                Receive insights beyond human comprehension
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-red-500 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Unsentimental Realism</h3>
              <p className="text-sm">Get brutally honest blockchain analysis</p>
            </div>
            <div className="bg-gradient-to-br from-green-700 to-teal-500 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Riddling Insights</h3>
              <p className="text-sm">Decipher complex blockchain puzzles</p>
            </div>
          </div>

          <Link
            href="/chat"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg mt-9"
          >
            Get Started
          </Link>
        </div>
      </div>
      <footer className="mt-8 text-center text-sm opacity-75">
        <p>
          &quot;The answer is simple. Your understanding is the problem.&quot; -
          Alt Cunningham
        </p>
      </footer>
    </div>
  );
}
