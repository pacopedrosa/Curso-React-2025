const About = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Encabezado con gradiente */}
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
                <h1 className="text-3xl font-bold text-white">Sobre mi</h1>
              </div>
    
              {/* Contenido principal */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Sección de información personal */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Información Personal</h2>
                    <p className="text-gray-600">
                      Desarrollador web apasionado por crear experiencias digitales únicas y funcionales.
                      Especializado en React y tecnologías modernas de frontend.
                    </p>
                  </div>
    
                  {/* Sección de habilidades */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Habilidades</h2>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Git'].map((skill) => (
                        <span 
                          key={skill}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
    
                  {/* Enlaces */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Enlaces</h2>
                    <div className="flex items-center space-x-4">
                      <a 
                        href="https://github.com/pacopedrosa" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        {/* Icono de GitHub */}
                        <svg 
                          className="w-5 h-5 mr-2" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default About