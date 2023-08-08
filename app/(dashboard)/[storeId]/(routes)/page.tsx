import prismadb from '@/lib/prismadb';
import { Metadata } from 'next';

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

export const metadata: Metadata = {
  title: 'Overview'
};

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });

  return <div>Active Store: {store?.name}</div>;
};
export default DashboardPage;
