import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Github, Linkedin, LogOut, Award, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth?role=student");
        return;
      }

      if (session.user.user_metadata?.role !== "student") {
        navigate("/recruiter");
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
          <h2 className="text-3xl font-bold mb-2">Welcome back, Student! 👋</h2>
          <p className="text-muted-foreground">
            Ready to explore new opportunities?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 hover:border-primary transition-all cursor-pointer hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Linkedin className="w-5 h-5 text-primary" />
                LinkedIn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Connect Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-all cursor-pointer hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Github className="w-5 h-5 text-primary" />
                GitHub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Connect Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-all cursor-pointer hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="w-5 h-5 text-primary" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Add Skills
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-all cursor-pointer hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="w-5 h-5 text-primary" />
                Browse Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                Explore
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Complete your profile to get noticed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center text-white text-3xl font-bold">
                  {user?.email?.[0]?.toUpperCase()}
                </div>
                <div className="text-center">
                  <p className="font-medium">{user?.email}</p>
                  <p className="text-sm text-muted-foreground">Student</p>
                </div>
                <Button className="w-full" variant="outline">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Opportunities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recommended Opportunities</CardTitle>
              <CardDescription>Based on your profile and interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border rounded-lg hover:border-primary transition-all cursor-pointer">
                    <h3 className="font-semibold mb-2">Software Engineering Intern</h3>
                    <p className="text-sm text-muted-foreground mb-2">Company {i} • Remote • $25-35/hr</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">React</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">TypeScript</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Node.js</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
