import React from 'react';
import { useUserProfile } from '../state/userProfile.state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

const UserProfileView: React.FC = () => {
  const { profileData, loading, error } = useUserProfile();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-lg">Loading profile data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-md border border-red-200">
        {error}
      </div>
    );
  }

  if (!profileData) {
    return <div className="text-center p-4">No profile data available</div>;
  }

  const { user, projects, amountReceived, amountDue } = profileData;

  const handleProjectClick = (projectId: string) => {
    router.push(`/work/${projectId}`);
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.profileImg} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">{user.phone}</p>
            </div>
          </div>

          {user.address && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Address</h3>
              <p>{user.address.street}</p>
              <p>{user.address.town}, {user.address.district}</p>
              <p>{user.address.state} - {user.address.pincode}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl">Financial Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-gray-500">Total Received</p>
              <p className="text-2xl font-bold text-green-600">₹{amountReceived.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-gray-500">Total Due</p>
              <p className="text-2xl font-bold text-red-600">₹{amountDue.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl">Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="p-4 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{project.name}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{project.location}</p>
                  <div className="mt-2 flex justify-between text-sm">
                    <span>Due: ₹{project.paymentDue}</span>
                    <span>Received: ₹{project.paymentReceived}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4">
              <p className="text-gray-500">No projects found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileView; 