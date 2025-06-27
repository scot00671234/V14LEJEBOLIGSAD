import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SearchForm from '@/components/search-form';
import PropertyCard from '@/components/property-card';
import AuthModal from '@/components/auth-modal';
import { Shield, Search, MessageCircle } from 'lucide-react';
import type { Property } from '@shared/schema';

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const { data: featuredProperties, isLoading } = useQuery({
    queryKey: ['/api/properties'],
    select: (data: Property[]) => data.slice(0, 3), // Show only first 3 properties
  });

  const handleSearch = (filters: any) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key].toString());
    });
    window.location.href = `/properties${params.toString() ? '?' + params.toString() : ''}`;
  };

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              Find din 
              <span className="text-blue-600"> perfekte</span> bolig
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Tusindvis af lejemål over hele Danmark. Simpelt, sikkert og hurtigt.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <SearchForm onSearch={handleSearch} className="shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Populære boliger</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">Udvalgte lejemål fra vores platform</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="surface animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="flex space-x-4 mb-4">
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/properties">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-base font-medium">
                Se alle boliger
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Hvorfor vælge os?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Vi gør det nemt og sikkert at finde eller udleje boliger</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sikker platform</h3>
              <p className="text-gray-600 leading-relaxed">Alle udlejere verificeres, og din kommunikation er beskyttet gennem vores sikre beskedsystem.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="text-white h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart søgning</h3>
              <p className="text-gray-600 leading-relaxed">Avancerede filtre og personlige anbefalinger hjælper dig med at finde præcis den bolig, du søger.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-white h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Direkte kontakt</h3>
              <p className="text-gray-600 leading-relaxed">Kommuniker direkte med udlejere gennem vores indbyggede beskedsystem - hurtigt og nemt.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Klar til at finde din næste bolig?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">Opret en gratis konto og få adgang til tusindvis af lejemål</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-base font-medium"
              onClick={() => openAuthModal('register')}
            >
              Opret konto som lejer
            </Button>
            <Button 
              className="bg-blue-800 text-white hover:bg-blue-900 px-8 py-3 text-base font-medium border border-blue-500"
              onClick={() => openAuthModal('register')}
            >
              Bliv udlejer
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-danish-blue rounded flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <span className="text-xl font-bold">Lejebolig Nu</span>
              </div>
              <p className="text-gray-400 mb-4">Danmarks moderne platform for lejeboliger. Find din næste bolig nemt og sikkert.</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">For lejere</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/properties" className="hover:text-white transition-colors">Søg boliger</Link></li>
                <li><Link href="/favorites" className="hover:text-white transition-colors">Mine favoritter</Link></li>
                <li><Link href="/messages" className="hover:text-white transition-colors">Mine beskeder</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">For udlejere</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Opret annonce</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Mine annoncer</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Hjælp & FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontakt os</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privatlivspolitik</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vilkår</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Lejebolig Nu. Alle rettigheder forbeholdes.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </div>
  );
}
