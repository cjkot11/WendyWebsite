"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement Supabase auth login here
    alert("Admin login will be implemented with Supabase Auth");
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchReviews();
    }
  }, [isAuthenticated]);

  const fetchReviews = async () => {
    // Fetch all reviews (including unapproved)
    // This requires admin authentication
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" className="w-full">Login</Button>
              </form>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Admin authentication will be implemented with Supabase Auth
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Review Management</h2>
            <p className="text-muted-foreground">
              Approve or delete client reviews pending moderation.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Lead Management</h2>
            <p className="text-muted-foreground">
              View and manage customer inquiries and trip requests.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
