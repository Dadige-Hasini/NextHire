import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Briefcase, LogOut, Search, Users, Filter, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth?role=recruiter");
        return;
      }

      if (session.user.user_metadata?.role !== "recruiter") {
        navigate("/student");
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NEXTHIRE
            </h1>
          </div>
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Recruiter! 👋</h2>
          <p className="text-muted-foreground">
            Find your next star hire from our talented student pool
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">5</div>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">42</div>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Shortlisted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">12</div>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">8</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Discover Talent</CardTitle>
            <CardDescription>Search and filter through student profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by skills, university, major..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Student Profiles Grid */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Top Candidates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="border-2 hover:border-primary transition-all cursor-pointer hover:shadow-xl group">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Profile Image */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center text-white text-2xl font-bold">
                      S{i}
                    </div>
                    
                    {/* Info */}
                    <div className="text-center">
                      <h4 className="font-semibold text-lg mb-1">Student {i}</h4>
                      <p className="text-sm text-muted-foreground">Computer Science • 2025</p>
                      <p className="text-xs text-muted-foreground mt-1">MIT</p>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">React</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Python</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">AWS</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" className="flex-1" size="sm">
                        View Profile
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-primary to-secondary" size="sm">
                        <Star className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
