import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Home, User, Heart, MessageCircle, Plus, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Navbar() {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-gray-200/30">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Home className="text-white h-4 w-4" />
              </div>
              <span className="text-lg font-semibold text-gray-900 tracking-tight">Lejebolig Nu</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/properties" 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  location === '/properties' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                Boliger
              </Link>
              {isAuthenticated && user?.role === 'tenant' && (
                <Link 
                  href="/favorites" 
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    location === '/favorites' ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  Favoritter
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
                    Log ind
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
                    Opret konto
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/messages">
                  <Button variant="ghost" size="sm" className="hover:bg-gray-100" title="Beskeder">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </Link>
                
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="hover:bg-gray-100" title="Profil">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                
                {user?.role === 'landlord' && (
                  <Link href="/dashboard">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Opret annonce
                    </Button>
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-blue-600 text-white text-xs font-medium">
                          {getInitials(user?.name || '')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center cursor-pointer">
                        <User className="h-4 w-4 mr-3" />
                        Min profil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center cursor-pointer">
                        <Home className="h-4 w-4 mr-3" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {user?.role === 'tenant' && (
                      <DropdownMenuItem asChild>
                        <Link href="/favorites" className="flex items-center cursor-pointer">
                          <Heart className="h-4 w-4 mr-3" />
                          Favoritter
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                      <LogOut className="h-4 w-4 mr-3" />
                      Log ud
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
