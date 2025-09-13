import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  const handleRefresh = () => {
    console.log('Refreshing scores...');
  };

  return <HeroSection onRefresh={handleRefresh} isRefreshing={false} />;
}