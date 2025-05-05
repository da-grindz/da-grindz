import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

import { Container, Row, Col } from 'react-bootstrap';

import VegetarianVibesDash from '@/components/VegetarianVibesDash';
import QuickBentoRunDash from '@/components/QuickBentoRunDash';
import GrindzForGainsDash from '@/components/GrindzForGainsDash';
import SatisfyingSipsDash from '@/components/SatisfyingSipsDash';
import SugarRushDash from '@/components/SugarRushDash';
import DashboardButtons from '@/components/DashboardButtons';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const { email } = (session as { user: { email: string } }).user;

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      grindzMood: true,
    },
  });

  const mood = user?.grindzMood?.name;

  const renderMoodDashboard = () => {
    switch (mood) {
      case 'Vegetarian Vibes':
        return <VegetarianVibesDash />;
      case 'Quick Bento Run':
        return <QuickBentoRunDash />;
      case 'Grindz for Gains':
        return <GrindzForGainsDash />;
      case 'Satisfying Sips':
        return <SatisfyingSipsDash />;
      case 'Sugar Rush':
        return <SugarRushDash />;
      default:
        return (
          <Container id="allergy-banner" className="text-center p-5">
            <h2>Set your Grindz Mood in Preferences</h2>
            <p>Your dashboard will show personalized recommendations once you’ve selected a mood.</p>
          </Container>
        );
    }
  };

  return (
    <Container fluid className="py-3">
      {/* Banner */}
      <Container id="allergy-banner" className="p-4 mt-5 mb-5">
        <Row>
          <Col className="text-center px-5">
            <h1>Your Grindz Mood</h1>
            <p>
              Find meals curated to match your current vibe. Change your mood in preferences at any time.
            </p>
          </Col>
        </Row>

        {/* Shared Buttons */}
        <Row className="mb-4 justify-content-center text-center">
          <Col xs="auto">
            <DashboardButtons />
          </Col>
        </Row>
      </Container>

      {/* Mood-specific Dashboard */}
      {renderMoodDashboard()}
    </Container>
  );
};

export default DashboardPage;
