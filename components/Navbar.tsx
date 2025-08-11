"use client";

import { useState } from "react";
import { Search, Menu, User, PlusCircle, Trophy } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center text-blue-700 text-2xl font-bold"
            >
              Cook<span className="text-orange-600">Pedia</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-600"
                placeholder="ค้นหาสูตรอาหาร เช่น ต้มยำกุ้ง, ผัดไทย..."
              />
            </div>
          </div>

          {/* Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/ranking"
              className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors px-3 py-2 rounded-lg hover:bg-orange-50"
            >
              <Trophy className="h-5 w-5" />
              <span>Ranking</span>
            </Link>

            <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              <PlusCircle className="h-5 w-5" />
              <span>Share</span>
            </button>

            <SignedOut>
              <SignInButton mode="modal">
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </button>
              </SignInButton>
            </SignedOut>
            {/*if signedin */}
            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button onClick={() => setIsSheetOpen(true)}>
                  <Menu />
                </button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader className="items-center space-y-5 mt-7">
                  <div className="text-blue-700 font-bold text-xl">
                    Cook<span className="text-orange-600">Pedia</span>
                  </div>
                  <SheetTitle>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button className="px-20 bg-blue-500 font-bold">
                          Login or Register
                        </Button>
                      </SignInButton>
                    </SignedOut>

                    <SignedIn>
                      <SignOutButton redirectUrl="/">
                      <Button className="px-20 bg-red-400 font-bold">
                          Logout
                        </Button></SignOutButton>
                       
                    </SignedIn>
                  </SheetTitle>
                </SheetHeader>
                <hr />
                <Link href="/ranking">
                  <div
                    onClick={() => setIsSheetOpen(false)}
                    className="flex cursor-pointer items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                  >
                    <Trophy className="h-4 w-4" />
                    <span>Ranking</span>
                  </div>
                </Link>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-600" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500  text-gray-600"
            placeholder="ค้นหาสูตรอาหาร..."
          />
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <Link
              href="/ranking"
              className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-white rounded-lg transition-colors"
            >
              <Trophy className="h-5 w-5" />
              <span>อันดับสูตรยอดนิยม</span>
            </Link>

            <button className="flex items-center space-x-2 w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              <PlusCircle className="h-5 w-5" />
              <span>แชร์สูตร</span>
            </button>

            <button
              onClick={() => setIsLoggedIn(true)}
              className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <User className="h-5 w-5" />
              <span>เข้าสู่ระบบ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
