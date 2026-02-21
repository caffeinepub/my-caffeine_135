import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRegisterMember } from '@/hooks/useQueries';
import { content } from '@/content/hi';

export function MemberRegistrationSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    districtState: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredMemberId, setRegisteredMemberId] = useState<bigint | null>(null);

  const registerMutation = useRegisterMember();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.fullName || !formData.phone || !formData.districtState || !formData.message) {
      toast.error('कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }

    try {
      const memberId = await registerMutation.mutateAsync({
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        districtOrState: formData.districtState,
        message: formData.message
      });

      setRegisteredMemberId(memberId);
      setShowSuccess(true);
      toast.success(content.memberRegistrationSuccess(memberId.toString()));
      
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        districtState: '',
        message: ''
      });

      // Hide success message after 8 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setRegisteredMemberId(null);
      }, 8000);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('पंजीकरण में त्रुटि हुई। कृपया पुनः प्रयास करें।');
    }
  };

  return (
    <section id="member-registration" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <UserPlus className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              सदस्य पंजीकरण
            </h2>
            <p className="text-lg text-muted-foreground">
              हमारे संगठन में शामिल हों और एकता, पारदर्शिता और न्याय के आंदोलन का हिस्सा बनें।
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>सदस्य के रूप में पंजीकरण करें</CardTitle>
              <CardDescription>
                हमारे संगठन में शामिल होने के लिए नीचे अपना विवरण भरें
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    पूरा नाम <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="अपना पूरा नाम दर्ज करें"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      फोन नंबर <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">ईमेल (वैकल्पिक)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="districtState">
                    जिला / राज्य <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="districtState"
                    placeholder="अपना जिला और राज्य दर्ज करें"
                    value={formData.districtState}
                    onChange={(e) => setFormData({ ...formData, districtState: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    आप क्यों शामिल होना चाहते हैं? <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="हमें बताएं कि आप सदस्य क्यों बनना चाहते हैं..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                {showSuccess && registeredMemberId && (
                  <Alert className="bg-primary/10 border-primary">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-primary">
                      {content.memberRegistrationSuccess(registeredMemberId.toString())}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? 'सबमिट हो रहा है...' : 'अभी पंजीकरण करें'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
