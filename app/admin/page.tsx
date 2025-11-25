"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { Star, Check, X, Trash2, LogOut } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  approved: boolean;
  createdat: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  triptype: string;
  travelers: string | null;
  budgetrange: string | null;
  message: string | null;
  createdat: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<"reviews" | "leads">("reviews");
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setIsAuthenticated(true);
      fetchData();
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`Login failed: ${error.message}`);
      setLoading(false);
      return;
    }

    if (data.user) {
      setIsAuthenticated(true);
      fetchData();
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setReviews([]);
    setLeads([]);
  };

  const fetchData = async () => {
    await Promise.all([fetchReviews(), fetchLeads()]);
  };

  const fetchReviews = async () => {
    const res = await fetch("/api/admin/reviews");
    if (res.ok) {
      const data = await res.json();
      setReviews(data);
    }
  };

  const fetchLeads = async () => {
    const res = await fetch("/api/admin/leads");
    if (res.ok) {
      const data = await res.json();
      setLeads(data);
    }
  };

  const handleApprove = async (id: string) => {
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: true }),
    });

    if (res.ok) {
      fetchReviews();
    } else {
      alert("Failed to approve review");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchReviews();
    } else {
      alert("Failed to delete review");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const pendingReviews = reviews.filter((r) => !r.approved);
  const approvedReviews = reviews.filter((r) => r.approved);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-2 px-4 ${
            activeTab === "reviews"
              ? "border-b-2 border-primary font-semibold"
              : "text-muted-foreground"
          }`}
        >
          Reviews ({pendingReviews.length} pending)
        </button>
        <button
          onClick={() => setActiveTab("leads")}
          className={`pb-2 px-4 ${
            activeTab === "leads"
              ? "border-b-2 border-primary font-semibold"
              : "text-muted-foreground"
          }`}
        >
          Leads ({leads.length})
        </button>
      </div>

      {activeTab === "reviews" && (
        <div className="space-y-6">
          {pendingReviews.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Pending Reviews</h2>
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="font-semibold mb-2">{review.name}</p>
                          <p className="text-muted-foreground mb-2">
                            {review.text}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.createdat).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(review.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(review.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {approvedReviews.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Approved Reviews</h2>
              <div className="space-y-4">
                {approvedReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="font-semibold mb-2">{review.name}</p>
                          <p className="text-muted-foreground mb-2">
                            {review.text}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.createdat).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(review.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {reviews.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">No reviews yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "leads" && (
        <div className="space-y-4">
          {leads.map((lead) => (
            <Card key={lead.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{lead.name}</h3>
                    <p className="text-muted-foreground">{lead.email}</p>
                    {lead.phone && (
                      <p className="text-muted-foreground">{lead.phone}</p>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(lead.createdat).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Trip Type:</span>{" "}
                    {lead.triptype}
                  </p>
                  {lead.travelers && (
                    <p>
                      <span className="font-semibold">Travelers:</span>{" "}
                      {lead.travelers}
                    </p>
                  )}
                  {lead.budgetrange && (
                    <p>
                      <span className="font-semibold">Budget:</span>{" "}
                      {lead.budgetrange}
                    </p>
                  )}
                  {lead.message && (
                    <p>
                      <span className="font-semibold">Message:</span>{" "}
                      {lead.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {leads.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">No leads yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}