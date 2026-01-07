import { Rocket, CheckCircle } from 'lucide-react'; // আইকন ইম্পোর্ট

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-slate-100 max-w-sm text-center">
        
        {/* Lucide Icon ব্যবহার */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Rocket className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Project Ready!
        </h1>
        
        <p className="text-slate-600 mb-6">
          React, Tailwind এবং Lucide Icon এখন সফলভাবে সেটআপ করা হয়েছে।
        </p>

        <button className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          <CheckCircle className="w-5 h-5" />
          Deploy to Vercel
        </button>
      </div>
    </div>
  )
}

export default App
