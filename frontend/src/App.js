function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🛒 E-Commerce QA
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Professional Testing Suite
          </p>
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-700 font-semibold">✅ React funcionando</p>
            <p className="text-green-700 font-semibold">✅ Tailwind CSS activo</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            ¡Listo para empezar! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;