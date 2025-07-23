import React, { useState } from 'react';
import { BookOpen, Users, User, Lock, Mail, Eye, EyeOff, Library, GraduationCap, Shield,Layers,Bookmark,FileText } from 'lucide-react';
import {Link,useLocation} from 'react-router-dom';


function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/book', label: 'Kitaplar', icon: BookOpen },
    { path: '/student', label: 'Öğrenciler', icon: Users },
    { path: '/author', label: 'Yazarlar', icon: User },
    { path: '/category', label: 'Kategoriler', icon: Layers },
    { path: '/bookcategory', label: 'Kitap Kategorileri', icon: Bookmark },
    { path: '/borrowrecord', label: 'Ödünç Kayıtları', icon: FileText },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-md">
      <ul className="space-y-3">
        {navItems.map(({ path, label, icon: Icon }) => (
          <li key={path}>
            <Link
              to={path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-300
                ${
                  location.pathname === path
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default function LibraryHomepage() {
   const [loginType, setLoginType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${loginType} giriş denemesi:`, formData);
    // Burada giriş işlemi yapılacak
  };
    return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Library className="h-8 w-8 text-white" />
              <h1 className="text-xl font-bold text-white">Dijital Kütüphane</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white/80">
                <Users className="h-4 w-4" />
                <span className="text-sm">1,247 Aktif Kullanıcı</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm">15,892 Kitap</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Navbar />
          
          
          
              <h2 className="text-5xl font-bold text-white leading-tight">
                Bilginin
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Kapısı</span>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Binlerce kitap, dergi ve akademik yayına anında erişim. Modern kütüphane deneyimini keşfedin.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <BookOpen className="h-8 w-8 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Dijital Koleksiyon</h3>
                </div>
                <p className="text-white/70">15,000+ kitap ve dergi koleksiyonu</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="h-8 w-8 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Topluluk</h3>
                </div>
                <p className="text-white/70">1,200+ aktif öğrenci ve akademisyen</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-white/70">Erişim</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-sm text-white/70">Yeni Kitap/Ay</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-white/70">Memnuniyet</div>
              </div>
              {/* Right Side - Login Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="space-y-6">
              
              {/* Login Type Selector */}
              <div className="flex bg-white/10 rounded-2xl p-2">
                <button
                  onClick={() => setLoginType('student')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    loginType === 'student' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <GraduationCap className="h-5 w-5" />
                  <span className="font-medium">Öğrenci</span>
                </button>
                <button
                  onClick={() => setLoginType('admin')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    loginType === 'admin' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Admin</span>
                </button>
              </div>

              {/* Form Header */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  {loginType === 'student' ? 'Öğrenci Girişi' : 'Admin Girişi'}
                </h3>
                <p className="text-white/70">
                  {loginType === 'student' 
                    ? 'Kütüphane hesabınızla giriş yapın' 
                    : 'Admin paneline erişim için giriş yapın'
                  }
                </p>
              </div>

              {/* Login Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">E-posta</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder={loginType === 'student' ? 'ogrenci@universite.edu' : 'admin@kutuphane.com'}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Şifre</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500" />
                    <span className="text-white/80 text-sm">Beni hatırla</span>
                  </label>
                  <button type="button" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                    Şifremi unuttum
                  </button>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                    loginType === 'student'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loginType === 'student' ? 'Öğrenci Girişi' : 'Admin Girişi'}
                </button>
              </div>

              {/* Additional Links */}
              <div className="pt-4 border-t border-white/20 text-center space-y-3">
                <p className="text-white/70 text-sm">
                  Hesabınız yok mu? 
                  <button className="text-blue-400 hover:text-blue-300 ml-1 transition-colors">
                    Kayıt olun
                  </button>
                </p>
                <div className="flex justify-center space-x-4 text-xs text-white/60">
                  <button className="hover:text-white transition-colors">Yardım</button>
                  <span>•</span>
                  <button className="hover:text-white transition-colors">İletişim</button>
                  <span>•</span>
                  <button className="hover:text-white transition-colors">Gizlilik</button>
                </div>
              </div>
            </div>
          </div>
        </div>
       
        
        

    </main>
      {/* Footer */}
      <footer className="relative z-10 bg-white/5 backdrop-blur-md border-t border-white/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-white/70">
            <p>&copy; 2024 Dijital Kütüphane. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}